import AWS from 'aws-sdk';
import Timer from '@spraoi/helpers/timer';
import uuid from 'uuid/v4';
import HC from './honeycomb';

const s3 = options =>
  new Promise((resolve, reject) => {
    const timer = new Timer();
    const s3 = new AWS.S3();

    s3[options.operation](options.options, (err, data) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (err) reject({ message: err.message, response: err });

      HC.logEvent({
        durationMs: timer.getDuration(),
        id: uuid(),
        name: 's3BucketRequest',
        requestData: JSON.stringify(options),
        responseData: JSON.stringify(data),
      });

      resolve(data);
    });
  });

export default s3;