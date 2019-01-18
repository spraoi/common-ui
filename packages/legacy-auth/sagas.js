import { call, put, takeLatest } from 'redux-saga/effects';
import ReactGA from 'react-ga';
import * as aws from '@spraoi/aws';
import * as actions from './actions';
import * as constants from './constants';

const defaultState = {
  completeSignUpRequired: false,
  error: null,
  isAuthenticated: false,
  isInitializing: false,
  isLoading: false,
  resetPasswordCodeSent: false,
  resetPasswordSuccess: false,
  userAttributes: {},
  verificationRequired: false,
};

const cache = {};

function* completeSignUp({ payload }) {
  try {
    yield put(actions.setState({ isLoading: true }));
    yield call(aws.completeSignUp, { ...payload, ...cache.signInResponse });

    const userAttributes = {
      ...aws.getUserAttributes(),
      ...payload.newAttributes,
    };

    yield call(aws.callApi, {
      body: { userAttributes },
      method: 'POST',
      path: '/user',
    });

    yield put(
      actions.setState({
        ...defaultState,
        isAuthenticated: true,
        userAttributes,
      })
    );
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* initSaga() {
  try {
    if (SPRAOI_ENV.GOOGLE_ANALYTICS) {
      ReactGA.initialize(SPRAOI_ENV.GOOGLE_ANALYTICS);
    }

    yield call(aws.signInExternalResponse);
    const isAuthenticated = yield call(aws.isAuthenticated);

    yield put(
      actions.setState({
        ...defaultState,
        isAuthenticated: isAuthenticated,
        userAttributes: aws.getUserAttributes(),
      })
    );
  } catch (e) {
    yield put(actions.setState({ ...defaultState, error: e }));
  }
}

function* resetPasswordSaga({ payload }) {
  try {
    const {
      newPassword,
      newPasswordConfirmation,
      onSuccess,
      verificationCode,
    } = payload;

    yield put(actions.setState({ isLoading: true }));

    if (newPassword !== newPasswordConfirmation) {
      throw new Error(constants.ERRORS.PASSWORDS_SHOULD_MATCH);
    }

    yield call(aws.resetPassword, {
      newPassword: newPassword,
      user: cache.user,
      verificationCode: verificationCode,
    });

    yield put(
      actions.setState({
        ...defaultState,
        resetPasswordSuccess: true,
      })
    );

    if (onSuccess) onSuccess();
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* sendResetPasswordCodeSaga({ payload }) {
  try {
    const { email } = payload;
    yield put(actions.setState({ isLoading: true }));
    cache.user = yield call(aws.sendResetPasswordCode, email);

    yield put(
      actions.setState({
        ...defaultState,
        userAttributes: { email },
        resetPasswordCodeSent: true,
      })
    );
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* signInSaga({ payload }) {
  try {
    yield put(actions.setState({ isLoading: true }));
    payload.user = yield call(aws.getNewUser, payload.email);
    const res = yield call(aws.signIn, payload);

    if (res && res.callbacks && res.user) {
      cache.signInResponse = res;

      yield put(
        actions.setState({
          ...defaultState,
          completeSignUpRequired: true,
        })
      );
    } else {
      yield put(
        actions.setState({
          ...defaultState,
          isAuthenticated: true,
          userAttributes: aws.getUserAttributes(),
        })
      );
    }
  } catch (e) {
    yield put(
      actions.setState({
        error: e,
        isLoading: false,
        userAttributes: { email: payload.email },
        verificationRequired: e.code === 'UserNotConfirmedException',
      })
    );
  }
}

function* signInExternalSaga({ payload }) {
  try {
    yield call(aws.signInExternal, payload);
  } catch (e) {
    yield put(actions.setState({ error: e }));
  }
}

function* signOutSaga() {
  try {
    yield call(aws.signOut);
    yield put(actions.setState(defaultState));
  } catch (e) {
    yield put(actions.setState({ ...defaultState, error: e }));
  }
}

function* signUpSaga({ payload }) {
  try {
    const { email, password, rememberMe = false } = payload;
    yield put(actions.setState({ isLoading: true }));
    yield call(aws.signUp, payload);
    aws.setUserAttributes({ email, password, rememberMe });

    yield put(
      actions.setState({
        ...defaultState,
        userAttributes: { email },
        verificationRequired: true,
      })
    );
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

function* verifyEmailSaga({ payload }) {
  try {
    const { email, password, rememberMe } = aws.getUserAttributes();
    yield put(actions.setState({ isLoading: true }));
    const user = yield call(aws.getNewUser, email);
    payload.user = user;
    yield call(aws.verifyEmail, payload);
    yield put(actions.signIn({ email, password, rememberMe, user }));
  } catch (e) {
    yield put(actions.setState({ error: e, isLoading: false }));
  }
}

export default function* sagas() {
  yield takeLatest(constants.AUTH_COMPLETE_SIGN_UP, completeSignUp);
  yield takeLatest(constants.AUTH_INIT, initSaga);
  yield takeLatest(constants.AUTH_RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(
    constants.AUTH_SEND_RESET_PASSWORD_CODE,
    sendResetPasswordCodeSaga
  );
  yield takeLatest(constants.AUTH_SIGN_IN, signInSaga);
  yield takeLatest(constants.AUTH_SIGN_IN_EXTERNAL, signInExternalSaga);
  yield takeLatest(constants.AUTH_SIGN_OUT, signOutSaga);
  yield takeLatest(constants.AUTH_SIGN_UP, signUpSaga);
  yield takeLatest(constants.AUTH_VERIFY_EMAIL, verifyEmailSaga);
}