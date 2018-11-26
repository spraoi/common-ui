# @spraoi/eslint-config

> An opinionated, extensible [eslint config](https://eslint.org/docs/developer-guide/shareable-configs) to enforce high-quality javascript.

## Installation

```bash
yarn add --dev @spraoi/eslint-config @spraoi/prettier-config eslint prettier
```

## Usage

Add the following configuration to the root of you project:

**.eslintrc**

```json
{
  "extends": "@spraoi/eslint-config"
}
```

**.prettierrc.js**

```javascript
module.exports = require('@spraoi/prettier-config');
```

**package.json**

```json
{
  "scripts": {
    "lint:js": "eslint \"src/**/*.js\""
  }
}
```

You can then run `yarn lint:js`.
