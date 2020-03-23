import { CONFIG } from './constants';

export const callApi = async (path, params) => {
  let data = null,
    queryParams = '';
  if (params) {
    queryParams += params.agentId ? `&agent_id=${params.agentId}` : '';
    queryParams += params.isActive ? `&active_session=${params.isActive}` : '';
    queryParams += params.year ? `&year=${params.agentId}` : '';
    queryParams += params.month ? `&month=${params.month}` : '';
  }
  await fetch(
    CONFIG.URL + path + '/?api_key=' + params.apiKey + queryParams
  ).then(async (res) => {
    data = await res.json();
  });
  return data;
};
