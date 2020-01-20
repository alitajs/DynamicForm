import moment from 'moment';

/**
 * 时间展示类型改变事件
 * @param val
 */
export const changeDateFormat = (val: Date, modeType: string) => {
  let dateFormat = '';
  switch (modeType) {
    case 'datetime':
      dateFormat = moment(val).format('YYYY-MM-DD hh:mm');
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


