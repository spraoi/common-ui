import moment from 'moment';

const formatTimeSince = time => moment(time).fromNow();

export default formatTimeSince;
