import { FormInstance } from 'rc-field-form/es/interface';
import { Store } from '@alitajs/dform';
import { getInitKeyValue, getByteLen, transformFile, getRandom } from '..';
import { filterObjList, resetLabel, changeDateFormat } from '../tool';
import lookPng from '../../assets/look.png';

test('this is getInitKeyValue test', async () => {
  let form: FormInstance<string> = {
    getFieldValue: () => {},
    getFieldsValue: () => {
      return '';
    },
    getFieldError: (number) => {
      return [''];
    },
    getFieldsError: () => {
      return [];
    },
    isFieldsTouched: () => {
      return true;
    },
    isFieldTouched: () => {
      return false;
    },
    isFieldValidating: () => {
      return false;
    },
    isFieldsValidating: () => {
      return false;
    },
    resetFields: () => {},
    setFields: () => {},
    setFieldsValue: () => {},
    submit: () => {},
    validateFields: function (nameList?: any[]): Promise<Store> {
      throw new Error('Function not implemented.');
    },
  };
  console.log(
    getInitKeyValue({
      form: form,
      key: 'index',
      data: ['1', '2', { initKey: 'index' }],
    }),
  );
});
// utils
test('this is changeDateFormat test', async () => {
  let nowTime = new Date();
  expect(changeDateFormat(nowTime, 'year')).toBe(nowTime.getFullYear() + '');
  expect(changeDateFormat(nowTime, 'time', '时间')).toBe('时间');
});
test('this is getByteLen test', async () => {
  expect(getByteLen('index')).toBe(5);
  expect(getByteLen('in我dex')).toBe(7);
});
test('this is resetLabel test', async () => {
  expect(resetLabel(['1'], ['2'])).toContain('1');
  expect(resetLabel(['1'], ['2', '3'])).toContain('3');
});
test('this is filterObjList test', async () => {
  expect(filterObjList('1', ['1', 2, '3'], '1').length).toBe(0);
  expect(filterObjList('1', [], '1').length).toBe(0);
});
test('this is getRandom test', async () => {
  expect(getRandom()).toBeDefined();
});
test('this is transformFile test', async () => {
  expect(transformFile(lookPng)).toBeDefined();
  expect(
    transformFile(
      'https://img2.baidu.com/it/u=2770537964,1423592535&fm=26&fmt=auto&gp=0.jpg',
    ),
  ).toBeDefined();
  transformFile(lookPng)
    .then((result: any) => {
      expect(result).toBe('look.png');
    })
    .catch((err: any) => {});
});
