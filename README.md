# Common UI

[![build status](https://travis-ci.org/spraoi/common-ui.svg?branch=master)](https://travis-ci.org/spraoi/common-ui/)
[![coverage status](https://coveralls.io/repos/github/spraoi/common-ui/badge.svg?branch=master)](https://coveralls.io/github/spraoi/common-ui/)

> Common code & configuration for [@spraoi](https://github.com/spraoi/) UI projects.

## Development Setup

1. install git, node & yarn
2. clone the repo: `git clone git@github.com:spraoi/common-ui.git`
3. cd into it: `cd common-ui`
4. install dependencies: `yarn`
5. install helper scripts: `yarn global add @spraoi/scripts`

*Note:* you can safely ignore `peerDependency` warnings for packages that only define configuration.

## Working With Packages

- run tests: `yarn test`
- run linter: `yarn lint`
- run storybook: `TODO: add storybook`

### General Guidelines

- every package should contain a `README.md` file with installation and usage instructions
- define package dependencies as `peerDependencies` when applicable
- packages that contain business logic should have at least 1 test
- code coverage should be as close to 100% as possible

### Adding a Package

1. create a new branch: `git checkout -b package/[package-name]`
2. run the package wizard: `spraoi new-package`
3. define any necessary dependencies (you should be familiar with [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/))
4. add functionality & tests
5. create a PR

### Testing In Real Projects

It can be hard to fully test a shared component without using it in a real project. To avoid having to push to NPM just
to try something out, you can use the `spraoi link` command.

In the UI project root, run (replacing the packages path appropriately):
```bash
spraoi link --packages ../path/to/common-ui/packages
```

This symlinks all packages to your local `node_modules` directory—allowing you to import as usual and test with ease.

## Reusable React Components

Creating React components that can be reused across projects presents an interesting problem. Each project, in general,
requires its own unique styles. In order to support this flexibility, reusable components need to:

1. utilize a project-wide theme
2. have sane fallback styles
3. allow for one-off styles to be specified

These things should be possible without having to modify the component itself.

### Project-Wide Themes

TODO

### Fallback Styles

TODO

### One-Off Styles

TODO

## Publishing to NPM

We use [Lerna](https://github.com/lerna/lerna) for managing package versions and publishing to NPM. When you make a
change or add a package, you can create a new release with `yarn release`. You'll need to get write access to the
[Spraoi NPM org](https://www.npmjs.com/org/spraoi) if you don't already have it.
