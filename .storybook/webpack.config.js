module.exports = ({ config }) => {
  config.module.rules[0].use[0].loader = require.resolve('babel-loader');

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['react-app', { flow: false, typescript: true }],
        require.resolve('@emotion/babel-preset-css-prop'),
      ],
      plugins: [require.resolve('@babel/plugin-proposal-class-properties')],
    },
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
