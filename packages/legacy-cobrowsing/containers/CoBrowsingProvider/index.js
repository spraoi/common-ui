import Beforeunload from 'react-beforeunload';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getSecretKeyValues } from '@spraoi/legacy-aws';
import '../SurflyLibrary/index';
import {
  CONTROLS,
  SECRET_KEY,
  SESSION_STATES,
  STORAGE_KEYS,
} from './constants';
import { Provider } from '../../context';
import {
  getAllSessions,
  getSessionInformation,
} from '../SurflyLibrary/SurflyServices';
import {
  controlEvent,
  initSessionEvent,
  sessionStartEvent,
} from '../SurflyLibrary/SurflyEvents';

export default class CoBrowsingProvider extends Component {
  constructor(props) {
    super(props);
    this.controlEvent = controlEvent.bind(this);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    sessionState: localStorage.getItem(STORAGE_KEYS.SPRFLY_SESSION)
      ? SESSION_STATES.RUNNING
      : SESSION_STATES.EXPIRE,
    sessions: [],
    sessionsLoading: true,
    currentSession: {},
    controlOfPage: CONTROLS.CUSTOMER,
    init: false,
    surflyApiKey: null,
    surflyWidgetKey: null,
  };

  async componentDidMount() {
    if (
      this.props.enabled &&
      this.state.sessionState === SESSION_STATES.EXPIRE
    ) {
      this.initSession();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.enabled &&
      prevProps.enabled !== this.props.enabled &&
      !this.state.init
    ) {
      this.initSession();
    } else if (this.props.enabled) {
      if (
        prevState.sessionState !== this.state.sessionState &&
        this.state.sessionState === SESSION_STATES.RUNNING
      ) {
        this.controlEvent();
      }
    }
  }

  initSession = async () => {
    if (!this.state.surflyWidgetKey) {
      const secretValues = await this.getSecrets();
      this.setState({
        surflyApiKey: secretValues[`api_key_${SPRAOI_ENV.STAGE}`],
        surflyWidgetKey: secretValues[`widget_key_${SPRAOI_ENV.STAGE}`],
      });
    }
    const isInit = await initSessionEvent(this.state.surflyWidgetKey);
    this.setState({ init: isInit });
  };

  getSecrets = async () => {
    const secretValues = await getSecretKeyValues(SECRET_KEY);
    return secretValues;
  };

  startSession = async (followerLink = null, agentId = null) => {
    this.setState({ sessionState: SESSION_STATES.RUNNING });
    localStorage.setItem(STORAGE_KEYS.SPRFLY_SESSION, true);
    const result = await sessionStartEvent(
      this.props.userData,
      followerLink,
      agentId
    );
    return result;
  };

  getSessionList = async values => {
    const sessions = await getAllSessions({
      isActive: true,
      apiKey: this.state.surflyApiKey,
    });
    this.setState({ sessions: sessions, sessionsLoading: false });
  };

  getSessionDetails = async sessionId => {
    const session = await getSessionInformation({
      sessionId: sessionId,
      apiKey: this.state.surflyApiKey,
    });
    this.setState({ currentSession: session });
  };

  startPollingSessions = async ({ interval }) => {
    if (!this.state.surflyApiKey) {
      const secretValues = await this.getSecrets();
      this.setState({
        surflyApiKey: secretValues[`api_key_${SPRAOI_ENV.STAGE}`],
        surflyWidgetKey: secretValues[`widget_key_${SPRAOI_ENV.STAGE}`],
      });
    }
    this.getSessionList();
    this.pullNewSessions = interval
      ? setInterval(() => this.getSessionList(), interval)
      : this.getSessionList();
  };

  stopPollingSessions = () => {
    clearInterval(this.pullNewSessions);
  };

  closeSession = () => {
    localStorage.removeItem(STORAGE_KEYS.SPRFLY_SESSION);
  };

  render() {
    const { children, enabled, isAgent } = this.props;
    const { sessionState, sessions, sessionsLoading } = this.state;
    return (
      <Beforeunload onBeforeunload={() => this.closeSession()}>
        {enabled ? (
          <Provider
            value={{
              isStarted: sessionState === SESSION_STATES.RUNNING,
              isClosed: sessionState === SESSION_STATES.EXPIRE,
              isAgent: isAgent,
              startPollingSessions: this.startPollingSessions,
              stopPollingSessions: this.stopPollingSessions,
              getSessionDetails: this.getSessionDetails,
              startSession: this.startSession,
              sessions: sessions,
              sessionsLoading: sessionsLoading,
            }}
          >
            {children}
          </Provider>
        ) : (
          <>{children}</>
        )}
      </Beforeunload>
    );
  }
}
