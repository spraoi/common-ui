# @spraoi/svgo-config

> An [svgo config](https://github.com/svg/svgo) to keep svg files clean.

## Installation

```bash
yarn add --dev @spraoi/svgo-config svgo
```

## Usage

Add the following configuration to the root of you project:

**package.json**

```json
{
  "scripts": {
    "svgo": "svgo --config node_modules/@spraoi/svgo-config/svgo.yml -f src/images/icons"
  }
}
```

You can then run `yarn format`.
