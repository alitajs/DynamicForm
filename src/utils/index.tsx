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
  console.log(stringDate);
  const dateList = stringDate.split('-');
  let numberDateList = dateList.map(item => {
    return parseInt(item);
  });

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
  var len = 0;
  val.split('').map(item => {
    if (item.match(/[^\x00-\xff]/gi) != null) {
      len += 2;
    } else {
      len += 1;
    }
  });
  return len;
};
