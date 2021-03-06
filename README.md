# Common UI [![build status](https://circleci.com/gh/spraoi/common-ui/tree/master.svg?style=svg&circle-token=1661d8b9279c17d96feac567a37282771929f481)](https://circleci.com/gh/spraoi/common-ui/tree/master)

> Common code & configuration for [@spraoi](https://github.com/spraoi/) UI
> projects.

## Development Setup

1. install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git),
   [Node](https://nodejs.org/en/download) &
   [Yarn](https://yarnpkg.com/lang/en/docs/install)
2. clone the repo: `git clone git@github.com:spraoi/common-ui.git`
3. cd into it: `cd common-ui`
4. install dependencies: `yarn`
5. install our helper scripts: `yarn global add @spraoi/scripts`

## Working With Packages

- run tests: `yarn test`
- run linter: `yarn lint`

### General Guidelines

- every package should contain a `README.md` file with installation and usage
  instructions
- define package dependencies as `peerDependencies` when applicable
- packages that contain business logic should have at least 1 test
- code coverage should be as close to 100% as possible

### Adding a Package

1. create a new branch: `git checkout -b package/[package-name]`
2. run the package wizard: `spraoi new-package`
3. define any necessary dependencies (you should be familiar with
   [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/))
4. add functionality & tests
5. update the package&rsquo;s README.md
6. create a PR

### Testing In Real Projects

It can be hard to fully test a shared component without using it in a real
project. To avoid having to push to NPM just to try something out, you can use
[Yalc](https://github.com/whitecolor/yalc).

## Publishing to NPM

We use [Lerna](https://github.com/lerna/lerna) for managing package versions and
publishing to NPM. When you make a change or add a package, you can create a new
release with `yarn release`. Write access to the
[Spraoi NPM org](https://www.npmjs.com/org/spraoi) is necessary.
