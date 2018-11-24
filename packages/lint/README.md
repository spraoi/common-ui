# @spraoi/eslint-config

> An opinionated [eslint config](https://eslint.org/docs/developer-guide/shareable-configs) to enforce high-quality code.

## Installation

```bash
yarn add --dev eslint prettier @spraoi/eslint-config
```

Optionally, install `husky` and `lint-staged` for git pre-commit hook linting support.

```bash
yarn add --dev husky lint-staged
```

## Usage

Add the following configuration to the root of you project:

**.eslintrc**

```json
{
  "extends": "@spraoi/lint"
}
```

**.prettierrc**

```json
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "es5"
}
```

**package.json**

```json
{
  "scripts": {
    "lint:js": "eslint --fix \"src/**/*.js\""
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.js": [
      "yarn lint:js"
    ]
  }
}
```

You can then run `yarn lint` to lint & fix your code. I recommend adding prettier & eslint plugins to your text editor
of choice for a seamless linting experience.