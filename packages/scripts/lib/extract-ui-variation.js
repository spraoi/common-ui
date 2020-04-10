#!/usr/bin/env node

const dependencyTree = require('dependency-tree');
const path = require('path');
const sh = require('shelljs');
const { ask } = require('./utilities/helpers');

module.exports = async function extractUiVariation() {
  const variation = await ask('variation name: ');
  const extractLocation = await ask('extraction location: ');

  const currentDir = `${sh.pwd()}/`;
  const rootComponents = ['src/components/Layout/index.js'];
  const ignore = ['README.md', 'CHANGELOG.md', 'cypress.json', 'node_modules'];
  let necessaryFiles = [];

  const addNecessaryFile = (p) => necessaryFiles.push(p);
  const addRootComponent = (p) => rootComponents.push(p);
  const filterRootItems = (p) => !ignore.includes(p) && sh.test('-f', p);

  sh.ls('-A').filter(filterRootItems).forEach(addNecessaryFile);
  sh.ls(`configs/*${variation}*`).forEach(addNecessaryFile);
  sh.ls('configs/*default*').forEach(addNecessaryFile);
  sh.ls('static/*').forEach(addNecessaryFile);

  sh.ls(`src/routes/${variation}/*`).forEach(addRootComponent);
  sh.ls(`src/routes/default/*`).forEach(addRootComponent);

  rootComponents.forEach((component) => {
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
