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

export const resetLabel = (list: string[] = [], placeholderList: string[] = []) => {
  if (list.length === placeholderList.length) return list;
  list.push(placeholderList[list.length]);
  return list;
};

export const filterObjList = (label: string = '', data: any = [], value: string | number = '') => {
  if (data && data.length) {
    let filList = [];
    filList = data.filter((it: { [x: string]: string | number }) => {
      return it[label] === value;
    });
    return filList;
  }
  return [];
};
