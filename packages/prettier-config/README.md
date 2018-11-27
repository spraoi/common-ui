# @spraoi/prettier-config

> A [prettier config](https://prettier.io/docs/en/configuration.html) to enforce consistently formatted code.

## Installation

```bash
yarn add --dev @spraoi/prettier-config prettier
```

## Usage

Add the following configuration to the root of you project:

**.prettierrc.js**

```javascript
module.exports = require('@spraoi/prettier-config');
```

**package.json**

```json
{
  "scripts": {
    "format": "prettier --write --ignore-path .gitignore \"**/*.{js,json,css,scss,md,yml}\""
  }
}
```

You can then run `yarn format`.
