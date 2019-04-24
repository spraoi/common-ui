import moment from 'moment';

/**
 * Formats a timestamp.
 * @param time
 * @returns {string}
 */
const formatTimeSince = time => moment(time).fromNow();

export default formatTimeSince;
