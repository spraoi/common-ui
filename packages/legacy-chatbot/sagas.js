import Braintree from 'braintree-web';
import { LexModelBuildingService, LexRuntime } from 'aws-sdk';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { callApi, uploadFiles } from '@spraoi/legacy-aws';
import * as actions from './actions';
import * as constants from './constants';

function* postLexRunTime({ payload }) {
  const postTestMessage = body => {
    return new Promise((resolve, reject) => {
      const lex = new LexRuntime({ apiVersion: '2016-11-28' });
      lex.postText(body, (err, data) => (err ? reject(err) : resolve(data)));
    });
  };

  try {
    const resultData = yield call(postTestMessage, payload);
    yield put(actions.getLexRunTimeInfo(resultData));
  } catch (e) {
    yield put(actions.foundLexRunTimeError(e));
  }
}

function* GetLexData({ payload }) {
  const getBotDetails = body => {
    return new Promise((resolve, reject) => {
      const modelBuilder = new LexModelBuildingService();
      modelBuilder.getBot(body, (err, data) =>
        err ? reject(err) : resolve(data)
      );
    });
  };

  try {
    const resultData = yield call(getBotDetails, payload);
    yield put(actions.botData(resultData));
  } catch (e) {
    yield put(actions.foundLexRunTimeError(e));
  }
}

function* getNonceSaga(params) {
  const braintreeToken = yield call(generateBraintreeTokenSaga, params.payload);
  const res = yield call(
    generateBraintreeNonceSaga,
    braintreeToken,
    params.payload
  );
  if (res) {
    if (res.creditCards && res.creditCards[0] && res.creditCards[0].nonce) {
      yield put(actions.brainTreeNonce(res.creditCards[0].nonce));
    } else if (
      res.details &&
      res.details.originalError &&
      res.details.originalError.error &&
      res.details.originalError.error.message
    ) {
      yield put(
        actions.foundLexRunTimeError(res.details.originalError.error.message)
      );
    } else if (res.message) {
      yield put(actions.foundLexRunTimeError(res.message));
    }
  }
}

function* generateBraintreeTokenSaga(data) {
  const headers = {};
  if (data && data.header) {
    if (data.header.businessId) {
      headers['x-spr-business-id'] = data.header.businessId;
    }
    if (data.header.forUserId) {
      headers['x-spr-for-user-id'] = data.header.forUserId;
    }
    if (data.header.locationId) {
      headers['x-spr-location-id'] = data.header.locationId;
    }
  }
  const response = yield call(callApi, {
    headers: headers,
    path: '/payments/token',
    method: 'POST',
  });

  return response.token;
}

function* generateBraintreeClientSaga(token) {
  return yield new Promise((resolve, reject) => {
    Braintree.client.create({ authorization: token }, (err, client) =>
      err ? reject(err) : resolve(client)
    );
  });
}

function* generateBraintreeNonceSaga(values, data) {
  const client = yield call(generateBraintreeClientSaga, values);
  return yield new Promise(resolve => {
    client.request(
      {
        data: {
          creditCard: {
            cvv: data.cvv,
            expiration_date: data.expiration_date,
            number: data.number,
          },
        },
        endpoint: 'payment_methods/credit_cards',
        method: 'POST',
      },
      (err, response) => (err ? resolve(err) : resolve(response))
    );
  });
}

function* uploadFileSaga({ payload: { file, bucketName } }) {
  try {
    const results = yield call(uploadFiles, {
      files: [file],
      bucket: bucketName,
      onProgress: progress => console.log(progress),
    });
    yield put(actions.getUploadedFileInfo(results));
  } catch (e) {
    yield put(actions.foundLexRunTimeError(e));
  }
}

export default function* sagas() {
  yield takeLatest(constants.GET_LEX_BOT_REQUEST, GetLexData);
  yield takeLatest(constants.POST_LEX_RUN_TIME_REQUEST, postLexRunTime);
  yield takeLatest(constants.GET_BRAINTREE_NONCE_REQUEST, getNonceSaga);
  yield takeEvery(constants.UPLOAD_FILE_REQUEST, uploadFileSaga);
}
