#!/usr/bin/env node
/* eslint no-console: 0 */

const deepmerge = require('deepmerge');
const recursiveReaddir = require('recursive-readdir');
const sh = require('shelljs');
const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const { resolve } = require('path');
const { yamlDump, yamlParse } = require('yaml-cfn');
const { parseTemplate, read, write } = require('./utilities/helpers');

function buildGraphqlPartial({ project, variation }) {
  const variationTypes = fileLoader(
    `templates/${project}/src/graphql/${variation}/*.graphql`
  );

  const defaultTypes = fileLoader(
    `templates/${project}/src/graphql/default/*.graphql`
  );

  const allTypes = [...variationTypes, ...defaultTypes];

  if (!allTypes.length) return;

  const schema = mergeTypes(allTypes, { all: true })
    .replace(/^\s*\n/gm, '')
    .replace(/^/gm, '        ');

  const cfGraphqlSchemaTemplate = read(
    resolve(__dirname, 'templates/cf-graphql-schema/template.yml.txt')
  );

  const fileToGenerate = `templates/${project}/src/partials/${variation}/api-schema-generated.yml`;
  write(fileToGenerate, parseTemplate(cfGraphqlSchemaTemplate, { schema }));

  console.log(`generated ${fileToGenerate}`);
}

async function mergeCloudformationTemplates({ project, variation }) {
  const defaultPartials = await recursiveReaddir(
    `templates/${project}/src/partials/default`
  );

  const variationPartialsDir = `templates/${project}/src/partials/${variation}`;

  const variationPartials = sh.test('-d', variationPartialsDir)
    ? await recursiveReaddir(variationPartialsDir)
    : [];

  const allPartials = [...defaultPartials, ...variationPartials];
  const parsedPartials = allPartials.map((f) => yamlParse(read(f)));
  const mergedParsedPartials = deepmerge.all(parsedPartials);
  const template = yamlDump(mergedParsedPartials);
  const fileToGenerate = `templates/${project}/dist/${variation}/template.yml`;
  write(fileToGenerate, template);

  console.log(`generated ${fileToGenerate}`);
}

module.exports = async function buildSamCfTemplate({ project, variation }) {
  buildGraphqlPartial({ project, variation });
  await mergeCloudformationTemplates({ project, variation });
};
