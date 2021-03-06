#!/usr/bin/env node
/* eslint no-console: 0 */

const sh = require('shelljs');
const { resolve } = require('path');
const { ask, parseTemplate, read, write } = require('./utilities/helpers');

const packageDir = 'packages';
const testsDir = '__tests__';
const templateDir = 'templates/new-common-ui-package';

async function askIsComponent() {
  const answer = await ask('is this a react component? (y/n): ');
  return /^(y|yes)$/.test(answer);
}

async function askComponentName() {
  const answer = await ask('component name: ');

  if (!/^[A-Z][a-zA-Z]+$/.test(answer)) {
    console.error('error: MustUsePascalCase!');
    return askComponentName();
  }

  return answer;
}

async function askPackageName() {
  const answer = await ask('package name: ');

  if (sh.test('-e', `${packageDir}/${answer}`)) {
    console.error('error: package exists!');
    return askPackageName();
  }

  if (!/^[a-z-]+$/.test(answer)) {
    console.error('error: only lowercase letters and hyphens allowed.');
    return askPackageName();
  }

  return answer;
}

async function askPackageDescription() {
  const answer = await ask('package description: ');

  if (!/^[A-Z].+\.$/.test(answer)) {
    console.error('error: begin with an uppercase letter & end with a period.');
    return askPackageDescription();
  }

  return answer;
}

function createReadme(data) {
  const template = read(resolve(__dirname, templateDir, 'README.md.txt'));
  write('README.md', parseTemplate(template, data));
}

function createLicense() {
  const template = read(resolve(__dirname, templateDir, 'LICENSE.txt'));
  const data = { year: new Date().getFullYear() };
  write('LICENSE', parseTemplate(template, data));
}

function createIndex(data) {
  let template;

  if (data.isComponent) {
    template = read(resolve(__dirname, templateDir, 'index.js-component.txt'));
  } else {
    template = read(resolve(__dirname, templateDir, 'index.js.txt'));
  }

  write('index.js', parseTemplate(template, data));
}

function createIndexTest(data) {
  let template;

  if (data.isComponent) {
    template = read(
      resolve(__dirname, templateDir, 'index.test.js-component.txt')
    );
  } else {
    template = read(resolve(__dirname, templateDir, 'index.test.js.txt'));
  }

  write(`${testsDir}/index.test.js`, parseTemplate(template, data));
}

function createPackageJson(data) {
  const template = read(resolve(__dirname, templateDir, 'package.json.txt'));
  write('package.json', parseTemplate(template, data));
}

module.exports = async function newPackage() {
  const isComponent = await askIsComponent();
  const componentName = isComponent ? await askComponentName() : null;
  const name = await askPackageName();
  const packageName = `@spraoi/${name}`;
  const packageDescription = await askPackageDescription();
  const packageLocation = `./${packageDir}/${name}`;

  console.log();
  if (isComponent) console.log('component name:\t\t', componentName);
  console.log('package name:\t\t', packageName);
  console.log('package description:\t', packageDescription);
  console.log('package location:\t', packageLocation);
  console.log();

  if ((await ask('is this okay? (y/n): ')) !== 'y') {
    return console.log('okay.');
  }

  sh.mkdir('-p', packageLocation);
  sh.cd(packageLocation);
  sh.mkdir(testsDir);

  createIndex({ componentName, isComponent });
  createIndexTest({ componentName, isComponent });
  createLicense();
  createPackageJson({ isComponent, name, packageDescription, packageName });
  createReadme({ packageDescription, packageName });

  if (isComponent) {
    sh.exec('yarn add --peer prop-types react react-dom styled-components');
  }

  console.log('done!');
};
