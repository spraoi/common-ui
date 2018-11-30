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

## Working With Packages

- run tests: `yarn test`
- run linter: `yarn lint`

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
5. update the package&rsquo;s README.md
6. create a PR

### Testing In Real Projects

It can be hard to fully test a shared component without using it in a real project. To avoid having to push to NPM just
to try something out, you can use the `spraoi link` command.

In the UI project root, run (replacing the packages path appropriately):

```bash
spraoi link --packages ../path/to/common-ui/packages
```

This symlinks all packages to your local `node_modules` directory—allowing you to import as usual and test with ease.
Note that `yarn` will throw an error if you attempt to install or remove anything after doing this. You can remove the
symlinks with `spraoi unlink` to avoid it.

## Reusable React Components

Creating React components that can be reused across projects presents an interesting problem. Each project, in general,
requires its own unique styles. In order to support this flexibility, reusable components need to:

1. utilize a project-wide theme
2. be easily extensible

### Project-Wide Themes

We use [styled-components' theming](https://www.styled-components.com/docs/advanced) capabilities to pass global styles
through to common components. The theme structure can be found in our
[base `App` component](https://github.com/spraoi/common-ui/blob/master/packages/base/components/App/types.js). 

### Extensibility

It's also very easy to [extend basic components](https://www.styled-components.com/docs/basics#extending-styles) with
styled-components. However, TODO: figure out how to build more complex shared components.

## Publishing to NPM

We use [Lerna](https://github.com/lerna/lerna) for managing package versions and publishing to NPM. When you make a
change or add a package, you can create a new release with `yarn release`. You&rsquo;ll need to get write access to the
[Spraoi NPM org](https://www.npmjs.com/org/spraoi) if you don&rsquo;t already have it.
