import moment from 'moment';

/**
 * Formats a timestamp.
 * @param time
 * @returns {string}
 */
const formatTimeSince = time => moment.duration(time, 'seconds').humanize();

export default formatTimeSince;
