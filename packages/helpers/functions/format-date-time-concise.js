import moment from 'moment';

/**
 * Formats a timestamp.
 * @param time
 * @returns {string}
 */
const formatDateTimeConcise = time => moment(time).format('MM/DD/YY HH:mm');

export default formatDateTimeConcise;
