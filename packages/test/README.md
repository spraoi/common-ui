# @spraoi/test

> A preconfigured testing setup with [enzyme](https://github.com/airbnb/enzyme) and [jest](https://github.com/facebook/jest).

## Installation

```bash
yarn install --dev @spraoi/test
```

## Usage

This package exposes a single executable (`spraoi-test`) for running tests. Arguments are passed along to the jest cli.
Generally, the test script should be added to your `package.json` file like so:

```json
{
  "scripts": {
    "test": "spraoi-test --coverage"
  }
}
```
