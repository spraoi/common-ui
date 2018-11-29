import PropTypes from 'prop-types';
import React from 'react';
import { Authenticator as AmplifyAuth } from 'aws-amplify-react/dist/Auth';
import AuthHandler from './AuthHandler';

const Authenticator = ({ amplifyConfig, page }) => (
  <AmplifyAuth amplifyConfig={amplifyConfig} hideDefault>
    <AuthHandler page={page} />
  </AmplifyAuth>
);

Authenticator.propTypes = {
  amplifyConfig: PropTypes.shape({}).isRequired,
  page: PropTypes.node.isRequired,
};

export default Authenticator;
