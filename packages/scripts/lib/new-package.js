#!/usr/bin/env node
/* eslint no-console: 0 */
/* eslint sort-keys: 0 */

const sh = require('shelljs');
const packageJson = require('../package.json');
const { ask, write } = require('./helpers');

const packageDir = 'packages';
const testsDir = '__tests__';

async function askIsReactComponent() {
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

function createReadme({ packageName, packageDescription }) {
  write(
    'README.md',
    `# ${packageName}

> ${packageDescription}

## Installation

\`\`\`bash
yarn add ${packageName}
\`\`\`

## Usage

TODO
`
  );
}

function createLicense() {
  write(
    'LICENSE',
    `The MIT License

Copyright (c) ${new Date().getFullYear()} Spraoi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
`
  );
}

function createIndex({ componentName, isReactComponent }) {
  if (isReactComponent) {
    write(
      'index.js',
      `import React from 'react';

const ${componentName} = () => <div>${componentName} component</div>;

export default ${componentName};
`
    );
  } else {
    write(
      'index.js',
      `// TODO
`
    );
  }
}

function createIndexTest({ componentName, isReactComponent }) {
  if (isReactComponent) {
    write(
      `${testsDir}/index.test.js`,
      `import React from 'react';
import ReactDOM from 'react-dom';
import ${componentName} from '..';

describe('FileUpload component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<${componentName} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
`
    );
  } else {
    write(
      `${testsDir}/index.test.js`,
      `it('needs tests', () => expect(true).toEqual(true));
`
    );
  }
}

function createPackageJson({
  isReactComponent,
  name,
  packageDescription,
  packageName,
  packageVersion,
}) {
  const packageJsonObject = {
    name: packageName,
    description: packageDescription,
    version: packageVersion,
    license: 'MIT',
    homepage: `https://github.com/spraoi/common-ui/tree/master/packages/${name}`,
    repository: {
      type: 'git',
      url: 'https://github.com/spraoi/common-ui.git',
    },
    publishConfig: {
      access: 'public',
    },
    peerDependencies: {
      'prop-types': '*',
      react: '*',
      'react-dom': '*',
    },
  };

  if (!isReactComponent) delete packageJsonObject.peerDependencies;

  write(
    'package.json',
    `${JSON.stringify(packageJsonObject, null, 2)}
`
  );
}

module.exports = async function newPackage() {
  const isReactComponent = await askIsReactComponent();
  const componentName = isReactComponent ? await askComponentName() : null;
  const name = await askPackageName();
  const packageName = `@spraoi/${name}`;
  const packageDescription = await askPackageDescription();
  const packageLocation = `./${packageDir}/${name}`;
  const packageVersion = packageJson.version;

  console.log();
  if (isReactComponent) console.log('component name:\t\t', componentName);
  console.log('package name:\t\t', packageName);
  console.log('package description:\t', packageDescription);
  console.log('package location:\t', packageLocation);
  console.log('package version:\t', packageVersion);
  console.log();

  if ((await ask('is this okay? (y/n): ')) !== 'y') return;

  sh.mkdir('-p', packageLocation);
  sh.cd(packageLocation);
  sh.mkdir(testsDir);

  createReadme({ packageDescription, packageName });
  createLicense();
  createIndex({ componentName, isReactComponent });
  createIndexTest({ componentName, isReactComponent });

  createPackageJson({
    packageName,
    isReactComponent,
    packageDescription,
    name,
    packageVersion,
  });
};
