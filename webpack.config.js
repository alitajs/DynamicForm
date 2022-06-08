const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');
// const pkg = require('./package.json');
// const path = require('path');

const webpackConfig = getWebpackConfig(false);

webpackConfig.forEach((config, index) => {
  if (!config.externals) {
    config.externals = {};
  }
  config.externals['antd-mobile'] = 'antd-mobile-v2';
  config.output.library = 'DynamicForm';
  // config.output.clean = true;
  // config.output.path = path.join(process.cwd(), 'dist');
  // config.output.filename = 'dform.js';
  config.entry = {
    [index === 0 ? `dform.min` : 'dform']: './src/index.ts',
  };
});

module.exports = webpackConfig;
