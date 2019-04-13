import React from 'react';
import { Location } from '@reach/router';
import AuthContext from '../../utilities/context';
import PageHandler from './PageHandler';
import { pageTypes } from './types';

const Page = props => (
  <Location>
    {location => (
      <AuthContext.Consumer>
        {context => <PageHandler {...location} {...context} {...props} />}
      </AuthContext.Consumer>
    )}
  </Location>
);

Page.propTypes = pageTypes;

export default Page;
