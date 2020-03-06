import isJSON from './is-json';

const parseJsonOrObject = payload => {
  const payloadIsJson = isJSON(payload);
  const parsedPayload = payloadIsJson ? JSON.parse(payload) : payload;

  if (typeof parsedPayload !== 'object' || parsedPayload === null) {
    return { isJson: payloadIsJson, isObject: false, payload };
  }

  return { isJson: payloadIsJson, isObject: true, payload: parsedPayload };
};

export default parseJsonOrObject;
