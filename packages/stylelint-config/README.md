# @spraoi/stylelint-config

> An opinionated, extensible [stylelint config](https://stylelint.io/user-guide/configuration/) to enforce high-quality
> stylesheets.

## Installation

```bash
yarn add --dev @spraoi/prettier-config @spraoi/stylelint-config prettier stylelint
```

## Usage

Add the following configuration to the root of your project:

**.stylelintrc**

```json
{
  "extends": ["@spraoi/stylelint-config"]
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
    "lint:styles": "stylelint --ignore-path .gitignore \"src/**/*.{js,css,scss}\""
  }
}
```

You can then run `yarn lint:styles`.
