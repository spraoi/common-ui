import AWS from 'aws-sdk';
import Timer from '@spraoi/helpers/timer';
import { v4 as uuidv4 } from 'uuid';
import HC from './honeycomb';

const s3 = (options) =>
  new Promise((resolve, reject) => {
    const timer = new Timer();
    const s3 = new AWS.S3();

    s3[options.operation](options.options, (err, data) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (err) reject({ message: err.message, response: err });
      const eventId = uuidv4();
      HC.logEvent({
        durationMs: timer.getDuration(),
        id: eventId,
        name: 's3BucketRequest',
        requestData: JSON.stringify(options),
        responseData: JSON.stringify(data),
        'trace.span_id': eventId,
      });

      resolve(data);
    });
  });

export default s3;
