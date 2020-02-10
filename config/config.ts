import { join } from 'path';

export default {
  doc: {
    // father-doc 独有配置
    title: 'dForm',
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        hd: process.env.CUSTOM_DEV ? true : false,
        dva: false,
      },
    ],
    join(__dirname, '..', 'config/plugin.ts'),
  ],
};
