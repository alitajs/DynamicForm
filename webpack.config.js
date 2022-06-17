const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');
// const pkg = require('./package.json');
const path = require('path');
const rimraf = require('rimraf');

const webpackConfig = getWebpackConfig(false);

webpackConfig.forEach((config, index) => {
  if (!config.externals) {
    config.externals = {};
  }
  const outputPath = path.join(process.cwd(), 'umd');
  rimraf.sync(outputPath);

  config.externals['antd-mobile'] = 'antd-mobile-v2';
  config.output.library = 'DynamicForm';

  config.output.path = outputPath;
  config.entry = {
    [index === 0 ? `dform.min` : 'dform']: './src/index.ts',
  };
});

module.exports = webpackConfig;
