import { CoBrowsingConsumer } from '@spraoi/cobrowsing';
import SessionsHandler from './SessionsHandler';

const SessionsContainer = props => (
  <CoBrowsingConsumer>
    {context => <SessionsHandler {...context} {...props} />}
  </CoBrowsingConsumer>
);

export default SessionsContainer;
