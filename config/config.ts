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
        hd: true,
        dva: false
      },
    ],
    join(__dirname, '..', 'config/plugin.ts'),
  ],
};
