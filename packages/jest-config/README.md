# @spraoi/jest-config

> A preconfigured, extensible testing configuration with [Enzyme](https://airbnb.io/enzyme/) and
> [Jest](https://jestjs.io/en/).

## Installation

```bash
yarn add --dev \
  @babel/core \
  @babel/plugin-transform-runtime \
  @babel/runtime \
  @spraoi/babel-preset \
  @spraoi/jest-config \
  babel-core@^7.0.0-bridge \
  jest
```

## Usage

Add the following configuration to the root of you project:

**jest.config.js**

```javascript
module.exports = require('@spraoi/jest-config');
```

**package.json**

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

You can then run `yarn test`.
