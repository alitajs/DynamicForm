export default {
  esm: {
    type: 'rollup',
  },
  cjs: {
    type: 'rollup',
  },
  umd: {
    name: 'DynamicForm',
    globals: {
      react: 'React',
    },
  },
  disableTypeCheck: true,
  cssModules: false,
  // namedExports: {
  //   'react-is': [
  //     'isFragment',
  //   ]
  // },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
