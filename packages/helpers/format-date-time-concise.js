import moment from 'moment';

const formatDateTimeConcise = (time) => moment(time).format('MM/DD/YY HH:mm');

export default formatDateTimeConcise;
