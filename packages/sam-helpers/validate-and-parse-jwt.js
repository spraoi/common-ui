import jwt from 'jsonwebtoken';
import rasha from 'rasha';
import http from './http';

const { REGION, USER_POOL_ID } = process.env;
const cachedKeys = {};

const validateAndParseJwt = async token =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      async (header, callback) => {
        let keys = cachedKeys[USER_POOL_ID];

        if (!keys) {
          ({ keys } = await http({
            host: `cognito-idp.${REGION}.amazonaws.com`,
            https: true,
            path: `/${USER_POOL_ID}/.well-known/jwks.json`,
          }));

          cachedKeys[USER_POOL_ID] = keys;
        }

        const pem = await rasha.export({
          jwk: keys.find(k => k.kid === header.kid),
        });

        callback(null, pem);
      },
      { ignoreExpiration: true },
      (err, claims) => {
        // eslint-disable-next-line prefer-promise-reject-errors
        if (err) reject({ message: err.message, statusCode: 400 });
        resolve(claims);
      }
    );
  });

export default validateAndParseJwt;
