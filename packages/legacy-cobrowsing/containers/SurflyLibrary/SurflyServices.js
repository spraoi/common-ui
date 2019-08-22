import { callApi } from './helper';

const getAllSessions = params => {
  return new Promise(async resolve => {
    let data = await callApi('sessions', params);
    if (data.detail) data = [];
    resolve(data);
  });
};

const getSessionInformation = params => {
  return new Promise(async resolve => {
    const data = await callApi(`sessions/${params.sessionId}`, params);
    resolve(data);
  });
};

const getAllQueues = params => {
  return new Promise(async resolve => {
    const data = await callApi('queue', params);
    resolve(data);
  });
};

export { getAllSessions, getSessionInformation, getAllQueues };
