import moment from 'moment';

export function timeSince(utcDate) {
  const date1 = moment.utc(utcDate, 'MM/DD/YYYY HH:mm:ss.SSS').local();
  const date2 = new Date();
  const timeElapsed = date2 - date1;
  let messageString = '';
  switch (true) {
    case timeElapsed <= 10000:
      messageString = 'a few seconds ago';
      break;
    case timeElapsed < 60000:
      messageString = parseInt(timeElapsed / 1000) + ' seconds ago';
      break;
    case parseInt(timeElapsed / (1000 * 60)) === 1:
      messageString = 'a minute ago';
      break;
    case timeElapsed <= 600000:
      messageString = 'a few minutes ago';
      break;
    case timeElapsed < 3600000:
      messageString = parseInt(timeElapsed / (1000 * 60)) + ' minutes ago';
      break;
    case parseInt(timeElapsed / (1000 * 60 * 60)) === 1:
      messageString = 'an hour ago';
      break;
    case timeElapsed < 86400000:
      messageString = parseInt(timeElapsed / (1000 * 60 * 60)) + ' hours ago';
      break;
    case parseInt(timeElapsed / (1000 * 60 * 60 * 24)) === 1:
      messageString = 'a day ago';
      break;
    case timeElapsed < 2592000000:
      messageString =
        parseInt(timeElapsed / (1000 * 60 * 60 * 24)) + ' days ago';
      break;
    case parseInt(timeElapsed / (1000 * 60 * 60 * 24 * 30)) === 1:
      messageString = 'a month ago';
      break;
    case timeElapsed < 31556926000:
      messageString =
        parseInt(timeElapsed / (1000 * 60 * 60 * 24 * 30)) + ' months ago';
      break;
    case parseInt(timeElapsed / (1000 * 60 * 60 * 24 * 365)) === 1:
      messageString = 'a year ago';
      break;
    default:
      messageString =
        parseInt(timeElapsed / (1000 * 60 * 60 * 24 * 365)) + ' years ago';
      break;
  }

  return messageString;
}
