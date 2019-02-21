# @spraoi/gatsby-config

> A sensible, extensible concoction of plugins & configuration for
> [Gatsby](https://www.gatsbyjs.org/docs/).

## Installation

```bash
yarn add gatsby
yarn add --dev @spraoi/gatsby-config
```

## Usage

Add the following configuration to the root of your project:

**gatsby-config.js**

```javascript
const defaults = require('@spraoi/gatsby-config');

module.exports = {
  ...defaults,
  siteMetadata: {
    title: 'Spraoi App',
  },
};
```
