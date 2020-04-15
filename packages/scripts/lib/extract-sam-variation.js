#!/usr/bin/env node

const dependencyTree = require('dependency-tree');
const path = require('path');
const recursiveReaddir = require('recursive-readdir');
const sh = require('shelljs');
const { ask } = require('./utilities/helpers');

module.exports = async function extractSamVariation() {
  const project = await ask('project name: ');
  const variation = await ask('variation name: ');
  const extractLocation = await ask('extraction location: ');

  const currentDir = `${sh.pwd()}/`;
  const defaultGraphqlTypesDir = `templates/${project}/src/graphql/default`;
  const variationGraphqlTypesDir = `templates/${project}/src/graphql/${variation}`;
  const defaultPartialsDir = `templates/${project}/src/partials/default`;
  const variationPartialsDir = `templates/${project}/src/partials/${variation}`;
  const rootComponents = [];
  const ignore = ['README.md', 'CHANGELOG.md', 'node_modules'];

  const rootFiles = sh
    .ls('-A')
    .filter((p) => !ignore.includes(p) && sh.test('-f', p));

  const defaultGraphqlTypes = await recursiveReaddir(defaultGraphqlTypesDir);

  const variationGraphqlTypes = sh.test('-d', variationGraphqlTypesDir)
    ? await recursiveReaddir(variationGraphqlTypesDir)
    : [];

  const defaultPartials = await recursiveReaddir(defaultPartialsDir);

  const variationPartials = sh.test('-d', variationPartialsDir)
    ? await recursiveReaddir(variationPartialsDir)
    : [];

  let necessaryFiles = [
    ...rootFiles,
    ...defaultGraphqlTypes,
    ...variationGraphqlTypes,
    ...defaultPartials,
    ...variationPartials,
  ];

  sh.ls('lambdas').forEach((lambda) => {
    necessaryFiles.push(`lambdas/${lambda}/package.json`);
    rootComponents.push(`lambdas/${lambda}/src/${variation}.js`);
    rootComponents.push(`lambdas/${lambda}/src/index.js`);
  });

  rootComponents.forEach((component) => {
    if (!sh.test('-f', component)) return;

    const componentDependencies = dependencyTree
      .toList({
        directory: path.dirname(component),
        filename: component,
        filter: (p) => !ignore.some((i) => p.includes(i)),
      })
      .map((path) => path.replace(currentDir, ''));

    necessaryFiles = [...necessaryFiles, ...componentDependencies];
  });

  necessaryFiles.forEach((file) => {
    const cpLocation = path.join(extractLocation, file);
    sh.mkdir('-p', path.dirname(cpLocation));
    sh.cp(file, cpLocation);
  });
};
