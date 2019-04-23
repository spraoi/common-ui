import moment from 'moment';

/**
 * Formats a timestamp.
 * @param time
 * @returns {string}
 */
const formatDateTimePretty = time =>
  moment(time).format('dddd, MMM Do, YYYY hh:mm A');

export default formatDateTimePretty;
