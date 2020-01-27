import formatDuration from './format-duration';

const formatTimeSince = since =>
  formatDuration(Math.max(new Date().getTime() - new Date(since).getTime(), 0));

export default formatTimeSince;
