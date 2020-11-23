import Timer from '@spraoi/helpers/timer';
import isJSON from '@spraoi/helpers/is-json';
import objectToQueryString from '@spraoi/helpers/object-to-query-string';
import request from 'follow-redirects';
import { HEADERS } from '@spraoi/helpers/constants';
import { v4 as uuidv4 } from 'uuid';
import HC from './honeycomb';

request.maxBodyLength = 100 * 1024 * 1024; // 100 MB

const http = (originalOptions) => {
  const options = originalOptions;
  const timer = new Timer();

  if (/^https:\/\//.test(options.host)) options.https = true;
  options.host = options.host.replace(/^https?:\/\//, '');
  const splitHost = options.host.split('/');
  options.host = splitHost.shift();
  const prePath = splitHost.join('/');

  options.headers = options.headers || {};
  options.headers.Host = options.host;
  options.headers[HEADERS.HC_PARENT_ID] = uuidv4();

  const query = objectToQueryString(options.queryParams);
  options.path = `/${prePath}/${options.path}${query}`.replace(/\/+/g, '/');

  if (options.body) {
    options.body =
      typeof options.body === 'object'
        ? JSON.stringify(options.body)
        : options.body;

    options.headers[HEADERS.CONTENT_LENGTH] = Buffer.byteLength(options.body);
  }

  const handler = options.https ? request.https : request.http;
  let responseBody = '';

  return new Promise((resolve, reject) => {
    const req = handler.request(options, (stream) => {
      stream.on('data', (chunk) => {
        responseBody += chunk;
      });

      stream.on('end', () => {
        HC.logEvent({
          durationMs: timer.getDuration(),
          id: options.headers[HEADERS.HC_PARENT_ID],
          name: 'httpRequest',
          requestData: JSON.stringify(options),
          responseData: responseBody,
          trace: {
            ...HC.getTraceData(),
            span_id: options.headers[HEADERS.HC_PARENT_ID],
          },
        });

        if (!isJSON(responseBody)) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ response: responseBody });
        } else if (stream.statusCode < 200 || stream.statusCode > 299) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            response: JSON.parse(responseBody),
            statusCode: stream.statusCode,
          });
        } else {
          resolve(JSON.parse(responseBody));
        }
      });
    });

    if (options.body) req.write(options.body);
    req.end();
  });
};

export default http;
