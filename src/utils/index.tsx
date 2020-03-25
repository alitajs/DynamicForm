import moment from 'moment';

/**
 * 时间展示类型改变事件
 * @param val
 */
export const changeDateFormat = (val: Date, modeType: string) => {
  let dateFormat = '';
  switch (modeType) {
    case 'datetime':
      dateFormat = moment(val).format('YYYY-MM-DD HH:mm');
      break;
    case 'month':
      dateFormat = moment(val).format('YYYY-MM');
      break;
    case 'time':
      dateFormat = moment(val).format('hh:mm');
      break;
    case 'year':
      dateFormat = moment(val).format('YYYY');
      break;
    default:
      dateFormat = moment(val).format('YYYY-MM-DD');
      break;
  }
  return dateFormat;
};

export const dateChange = (date: Date | string) => {
  const stringDate = moment(date).format('YYYY-MM-DD-HH-mm-ss');
  const dateList = stringDate.split('-');
  const numberDateList = dateList.map(item => parseInt(item, 10));

  return new Date(
    numberDateList[0],
    numberDateList[1] - 1,
    numberDateList[2],
    numberDateList[3],
    numberDateList[4],
    numberDateList[5],
  );
};

export const getByteLen = (val: string) => {
  let len = 0;
  val.split('').forEach(item => {
    // eslint-disable-next-line no-control-regex
    if (item.match(/[^\x00-\xff]/gi) != null) {
      len += 2;
    } else {
      len += 1;
    }
  });
  return len;
};

export const data1 = [
  { label: '福建省', value: '1', flag: false },
  { label: '广东省', value: '2', flag: false },
  { label: '江西省', value: '3', flag: false },
  { label: '广西省', value: '4', flag: false },
  { label: '江苏省', value: '5', flag: false },
  { label: '浙江省', value: '6', flag: false },
  { label: '内蒙省', value: '7', flag: false },
  { label: '新疆省', value: '8', flag: false },
];

export const data2 = [
  { label: '福州市', value: '11', flag: false },
  { label: '漳州市', value: '12', flag: false },
  { label: '泉州市', value: '13', flag: false },
  { label: '厦门市', value: '14', flag: false },
  { label: '三明市', value: '15', flag: false },
  { label: '莆田市', value: '16', flag: false },
  { label: '南平市', value: '17', flag: false },
];

export const data3 = [
  { label: '鼓楼区', value: '111', flag: false },
  { label: '芗城区', value: '112', flag: false },
  { label: '闽侯县', value: '113', flag: false },
  { label: '台江区', value: '114', flag: false },
  { label: '龙文区', value: '115', flag: false },
  { label: '晋安区', value: '116', flag: false },
  { label: '苍山区', value: '117', flag: false },
];

export const resetListAndLabel = (list: any) => {
  let data: { label: string; value: string }[] = [];
  switch (list.length) {
    case 0:
      list.push('请选择省');
      data = data1;
      break;
    case 1:
      list.push('请选择市');
      data = data2;
      break;
    case 2:
      list.push('请选择区/县');
      data = data3;
      break;
    case 3:
      data = data3;
      break;
    default:
      break;
  }
  return { data, list };
};
