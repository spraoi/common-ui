import { INIT_SETTINGS, START_SESSION_CONFIG } from './config';
import { CONTROLS } from '../CoBrowsingProvider/constants';

const initSessionEvent = widgetKey => {
  return new Promise(resolve => {
    const SETTINGS = {
      ...INIT_SETTINGS,
      widget_key: widgetKey,
    };
    window.Surfly.init(SETTINGS, function(initResult) {
      if (initResult.success) {
        if (!window.Surfly.isInsideSession)
          resolve(!window.Surfly.isInsideSession);
        //show session button
        else {
          console.log(
            'initSessionEvent currentSession:' + window.Surfly.currentSession
          );
          resolve(window.Surfly.isInsideSession);
        }
      }
    });
  });
};

const sessionStartEvent = (userData, followerLink, agentId) => {
  return new Promise(resolve => {
    const userInformation = {
      name: `${userData.given_name} ${userData.family_name}`,
      email: userData.email,
    };
    if (userData['custom:license_number']) {
      window.Surfly.session(START_SESSION_CONFIG, followerLink).startFollower(
        null,
        {
          ...userInformation,
          agent_id: agentId,
        }
      );
    } else {
      window.Surfly.session(START_SESSION_CONFIG)
        .on('session_started', function(session, event) {})
        .startLeader(null, userInformation);
    }
  });
};

const sessionEndEvent = () => {
  return new Promise(resolve => {
    window.Surfly.on('session_ended', function(session, event) {
      console.log('session_ended event:=>');
      console.log(event);
      resolve({ session: session, event: event });
    });
  });
};

const agentStatusEvent = () => {
  return new Promise(resolve => {
    window.Surfly.on('agent_status', function(api, event) {
      resolve(event.available);
    });
  });
};

const userActivityEvent = () => {
  return new Promise(resolve => {
    window.Surfly.on('user_activity', function(session, event) {
      resolve({ session: session, event: event });
    });
  });
};

function controlEvent() {
  window.Surfly.on(
    'control',
    function(session, event) {
      console.log('controlEvent control:=>');
      console.log(event);
      const controlOfPage = event.to > 0 ? CONTROLS.AGENT : CONTROLS.CUSTOMER;
      this.setState({ controlOfPage: controlOfPage });
    }.bind(this)
  );
}

const viewerJoinedEvent = () => {
  return new Promise(resolve => {
    window.Surfly.on('viewer_joined', function(session, event) {
      resolve({ session: session, event: event });
    });
  });
};

const viewerLeftEvent = () => {
  return new Promise(resolve => {
    window.Surfly.on('viewer_left', function(session, event) {
      resolve({ session: session, event: event });
    });
  });
};

const fileDownloadEvent = () => {
  return new Promise(resolve => {
    window.Surfly.on('file_download', function(session, event) {
      resolve({ session: session, event: event });
    });
  });
};

const relocatedEvent = () => {
  return new Promise(resolve => {
    window.Surfly.on('relocated', function(session, event) {
      resolve({ session: session, event: event });
    });
  });
};

export {
  initSessionEvent,
  sessionStartEvent,
  agentStatusEvent,
  userActivityEvent,
  controlEvent,
  sessionEndEvent,
  viewerJoinedEvent,
  viewerLeftEvent,
  fileDownloadEvent,
  relocatedEvent,
};
