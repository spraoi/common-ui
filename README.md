# Common UI

[![build status](https://travis-ci.org/spraoi/common-ui.svg?branch=master)](https://travis-ci.org/spraoi/common-ui/)
[![coverage status](https://coveralls.io/repos/github/spraoi/common-ui/badge.svg?branch=master)](https://coveralls.io/github/spraoi/common-ui/)

> Common code & configuration used between [@spraoi](https://github.com/spraoi/) UI projects.

## Development Setup

1. install git, node & yarn
2. clone the repo: `git clone git@github.com:spraoi/common-ui.git`
3. cd into it: `cd common-ui`
4. install dependencies: `yarn`

## Working With Packages

- run tests: `yarn test`
- fix (some) linting errors: `yarn lint:fix`

### General Guidelines

- all packages that contain business logic should have at least 1 test
- code coverage should be as close to 100% as possible
- a readme should exist with installation and usage instructions

#### Package Dependencies

These (if required) should be `peerDependencies`:

- `aws-amplify-react`
- `aws-amplify`
- `classnames`
- `lodash`
- `moment`
- `prop-types`
- `react-dom`
- `react`

These should be avoided, as we are moving away from redux:

- `redux-form`
- `redux-saga`
- `redux`

## Adding a Package

1. create a new branch: `git checkout -b package/[package-name]`
2. create the package boilerplate: `yarn new-package`
3. install any necessary dependencies (read: [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/))
4. add functionality & tests
5. create a PR

## Releasing

All packages stay on the same version, as we utilize [Lerna's fixed mode](https://github.com/lerna/lerna#fixedlocked-mode-default) for simplicity. However, only updated packages are release to NPM. When you make a change or add a package, you can create a new release with `yarn release`.
