import humanize from 'humanize-duration';

const formatDuration = since => humanize(since, { round: true });

export default formatDuration;
