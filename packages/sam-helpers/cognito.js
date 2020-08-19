import AWS from 'aws-sdk';
import Timer from '@spraoi/helpers/timer';
import { v4 as uuidv4 } from 'uuid';
import HC from './honeycomb';

const cognito = (options) =>
  new Promise((resolve, reject) => {
    const timer = new Timer();
    const cognito = new AWS.CognitoIdentityServiceProvider();

    cognito[options.operation](options.options, (err, data) => {
      HC.logEvent({
        durationMs: timer.getDuration(),
        id: uuidv4(),
        name: 'cognitoQuery',
        requestData: JSON.stringify(options),
        responseData: JSON.stringify(data),
      });

      // eslint-disable-next-line prefer-promise-reject-errors
      if (err) reject({ message: err.message, response: err });
      else resolve(data);
    });
  });

export default cognito;
