import { v4 as uuidv4 } from 'uuid';
import { Client } from '@elastic/elasticsearch';
import Timer from '@spraoi/helpers/timer';
import HC from './honeycomb';

const { node, password, username } = JSON.parse(process.env.ES_DETAILS);

const client = new Client({
  auth: {
    password,
    username,
  },
  node,
});

/**
 * Elastic search wrapper
 *
 * Required: ES_DETAILS
 *
 * @param {*} { operation, options } Use operation to specify type of Elastic search operation. Use options to pass parameters to the Elastic search operation.
 */

const es = async ({ operation, options }) => {
  const timer = new Timer();
  const eventId = uuidv4();
  try {
    const res = await client[operation](options.options);
    HC.logEvent({
      durationMs: timer.getDuration(),
      id: eventId,
      name: 'elasticSearch',
      requestData: JSON.stringify(options),
      responseData: JSON.stringify(res),
      'trace.span_id': eventId,
    });
    return res;
  } catch (e) {
    HC.logEvent({
      durationMs: timer.getDuration(),
      errorData: JSON.stringify(e),
      id: eventId,
      name: 'elasticSearch',
      requestData: JSON.stringify(options),
      'trace.span_id': eventId,
    });
    return new Error(JSON.stringify(e));
  }
};

export default es;
