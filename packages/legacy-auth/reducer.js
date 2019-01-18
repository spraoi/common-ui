import * as actions from './actions';

export default (state = { isInitializing: true }, { payload, type }) => {
  if (type === actions.setState().type) {
    return { ...state, ...payload };
  } else {
    return state;
  }
};
