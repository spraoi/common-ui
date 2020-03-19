import AWS from 'aws-sdk';
import Timer from '@spraoi/helpers/timer';
import get from 'lodash/get';
import uuid from 'uuid/v4';
import warmer from 'lambda-warmer';
import { COGNITO_USER_ATTRIBUTES, HEADERS } from '@spraoi/helpers/constants';
import HC from './honeycomb';
import validateAndParseJwt from './validate-and-parse-jwt';

const { CLIENT_ID, CLIENT_IDS, REGION, TEMPLATE, VARIATION } = process.env;
AWS.config.update({ region: REGION });

export default ({ errorHandler, handler }) => ({
  handler: async (originalEvent, originalContext) => {
    const event = originalEvent;
    const context = originalContext;
    context.callbackWaitsForEmptyEventLoop = false;

    // since we can't pass custom event payloads for scheduled events, this
    // is a hack to enable lambda-warmer if the event resource is appropriate.
    if (event.resources && event.resources[0].includes('WarmingSchedule')) {
      event.warmer = true;

      // arbitrary concurrency for warming events. should eventually be
      // configurable via an env var.
      event.concurrency = 3;
    }

    // prevent lambda cold starts...
    // https://github.com/jeremydaly/lambda-warmer
    if (await warmer(event)) return 'warmed';

    const time = new Timer();
    const eventId = uuid();

    HC.init({
      parentId: eventId,
      serviceName: `${TEMPLATE}-${VARIATION}-graphql-resolver`,
      traceId: context.awsRequestId,
    });

    try {
      const userId = event.identityId
        ? event.identityId.replace(REGION, 'spr:user:')
        : null;

      const jwt = event.jwt || get(event, `headers[${HEADERS.JWT}]`);
      const claims = jwt ? await validateAndParseJwt(jwt) : null;

      // variation-based client id
      let clientId = CLIENT_ID;

      // cognito group-based client id
      if (!clientId && claims && CLIENT_IDS) {
        const claimedActiveGroup = get(
          event,
          `headers[${HEADERS.ACTIVE_GROUP}]`
        );

        const userGroups = claims[COGNITO_USER_ATTRIBUTES.GROUPS] || [];
        const clientIds = JSON.parse(CLIENT_IDS);
        const clientIdGroups = Object.keys(clientIds);

        const clientGroup =
          userGroups.includes(claimedActiveGroup) &&
          clientIdGroups.includes(claimedActiveGroup)
            ? claimedActiveGroup
            : clientIdGroups.find(group => userGroups.includes(group));

        clientId = clientIds[clientGroup];
      }

      const headers = {
        'Content-Type': 'application/json',
        [HEADERS.CLIENT_ID]: clientId,
        [HEADERS.TRACE_ID]: context.awsRequestId,
        [HEADERS.USER_ID]: userId,
      };

      const res = await handler({
        ...event,
        claims,
        clientId,
        headers,
        userId,
      });

      HC.logEvent({
        durationMs: time.getDuration(),
        id: eventId,
        name: event.field,
        parentId: null,
        requestData: JSON.stringify(event),
        responseData: JSON.stringify(res),
      });

      return res;
    } catch ({
      message = 'An unknown error occurred',
      response,
      stack,
      statusCode = 500,
    }) {
      let responseMessage = `${message} (${HC.getTraceId()})`;

      if (typeof errorHandler === 'function') {
        responseMessage = await errorHandler({ response, responseMessage });
      }

      const errorData = JSON.stringify({
        message: responseMessage,
        response,
        stack,
        statusCode,
        traceId: context.awsRequestId,
      });

      HC.logEvent({
        durationMs: time.getDuration(),
        errorData,
        id: eventId,
        name: event.field,
        parentId: null,
        requestData: JSON.stringify(event),
      });

      throw responseMessage;
    }
  },
});
