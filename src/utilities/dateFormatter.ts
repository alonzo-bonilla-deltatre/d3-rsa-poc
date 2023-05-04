import moment from 'moment';

export const formatDate = (date: string, format: string = '') => {
  if (date) {
    if (!format) {
      format = 'YYYY/MM/DD HH:mm:ss';
    }
    return moment(date).utc(false).format(format);
  } else {
    return null;
  }
};
