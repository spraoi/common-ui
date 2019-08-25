import React from 'react';
import SessionsHandler from './SessionsHandler';
import { Consumer } from '../../context';

const SessionsContainer = props => (
  <Consumer>{context => <SessionsHandler {...context} {...props} />}</Consumer>
);

export default SessionsContainer;
