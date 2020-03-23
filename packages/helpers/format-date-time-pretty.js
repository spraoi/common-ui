import moment from 'moment';

const formatDateTimePretty = (time) =>
  moment(time).format('dddd, MMM Do, YYYY hh:mm A');

export default formatDateTimePretty;
