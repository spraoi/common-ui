import AWS from 'aws-sdk';
import Timer from '@spraoi/helpers/timer';
import get from 'lodash/get';
import { v4 as uuidv4 } from 'uuid';
import HC from './honeycomb';

const db = (options) =>
  new Promise((resolve, reject) => {
    const timer = new Timer();
    let dynamo;
    if (options.documentClient) dynamo = new AWS.DynamoDB.DocumentClient();
    else dynamo = new AWS.DynamoDB();

    dynamo[options.operation](options.options, (err, data) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      if (err) reject({ message: err.message, response: err });
      let res = data;

      if (data && options.unmarshall) {
        let marshalledData = get(data, options.unmarshall);
        let marshalledDataIsArray = true;

        if (!Array.isArray(marshalledData)) {
          marshalledData = [marshalledData];
          marshalledDataIsArray = false;
        }

        const unmarshalledData = marshalledData.map(
          AWS.DynamoDB.Converter.unmarshall
        );

        res = marshalledDataIsArray ? unmarshalledData : unmarshalledData[0];
      }

      HC.logEvent({
        durationMs: timer.getDuration(),
        id: uuidv4(),
        name: `dynamoDb${options.documentClient ? '.documentClient' : ''}.${options.operation}`,
        requestData: JSON.stringify(options),
        responseData: JSON.stringify(res),
        'trace.span_id': eventId,
      });

      resolve(res);
    });
  });

export default db;
