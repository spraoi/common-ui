# @spraoi/stylelint-config

> An opinionated, extensible stylelint configuration to enforce high-quality stylesheets.

## Installation

```bash
yarn add --dev @spraoi/stylelint-config stylelint
```

## Usage

Add the following configuration to the root of your project:

**.stylelintrc**

```json
{
  "extends": ["@spraoi/stylelint-config"]
}
```

**package.json**

```json
{
  "scripts": {
    "lint:styles": "stylelint --fix \"src/**/*.(js|scss|css)\""
  }
}
```

You can then run `yarn lint:styles`. I recommend adding a stylelint plugin to your text editor of choice for a seamless
linting experience.
