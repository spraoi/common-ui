module.exports = (baseConfig, env, defaultConfig) => {
  // defaultConfig.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
  defaultConfig.module.rules[0].use[0].loader = require.resolve('babel-loader');

  defaultConfig.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
  ];

  defaultConfig.module.rules[0].use[0].options.plugins = [
    require.resolve('@babel/plugin-proposal-class-properties'),
  ];

  console.log(JSON.stringify(defaultConfig, null, 2));

  return defaultConfig;
};
