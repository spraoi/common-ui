#!/usr/bin/env node
/* eslint no-console: 0 */

const fs = require('fs');
const sh = require('shelljs');
const { ask } = require('./helpers');

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

(async function run() {
  const isReactComponent = await askIsReactComponent();
  const componentName = isReactComponent ? await askComponentName() : null;
  const packageName = await askPackageName();
  const packageDescription = await askPackageDescription();
  const packageLocation = `${packageDir}/${packageName}`;
  const packageVersion = JSON.parse(fs.readFileSync('package.json')).version;

  console.log();
  if (isReactComponent) console.log('component name:\t\t', componentName);
  console.log('package name:\t\t', packageName);
  console.log('package description:\t', packageDescription);
  console.log('package location:\t', packageLocation);
  console.log('package version:\t', packageVersion);
  console.log();

  if ((await ask('is this okay? (y/n): ')) !== 'y') {
    console.log('okay.');
    return;
  }

  sh.mkdir(packageLocation);
  sh.cd(packageLocation);
  sh.mkdir(testsDir);

  fs.writeFile(
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

  fs.writeFile(
    `${testsDir}/index.test.js`,
    `import React from 'react';

const ${componentName} = () => <div>${componentName} component</div>;

export default ${componentName};
`
  );

  fs.writeFile(
    `${testsDir}/index.test.js`,
    `// TODO
`
  );

  fs.writeFile(
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

  //   `it('needs tests', () => expect(true).toEqual(true));
  // `

  //   `{
  //   "name": "${package_name}",
  //   "description": "${description}",
  //   "version": "${version}",
  //   "license": "MIT",
  //   "homepage": "https://github.com/spraoi/common-ui/tree/master/packages/${name}",
  //   "repository": {
  //     "type": "git",
  //     "url": "https://github.com/spraoi/common-ui.git"
  //   },
  //   "publishConfig": {
  //     "access": "public"
  //   },
  //   "peerDependencies": {
  //     "prop-types": "*",
  //     "react": "*",
  //     "react-dom": "*"
  //   }
  // }

  // The MIT License
  //
  // Copyright (c) $(date +'%Y') Spraoi
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy
  // of this software and associated documentation files (the "Software"), to deal
  // in the Software without restriction, including without limitation the rights
  // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  // copies of the Software, and to permit persons to whom the Software is
  // furnished to do so, subject to the following conditions:
  //
  //   The above copyright notice and this permission notice shall be included in
  // all copies or substantial portions of the Software.
  //
  //   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  //   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  //   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  // THE SOFTWARE.
})();
