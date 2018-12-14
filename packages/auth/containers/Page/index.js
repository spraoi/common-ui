import React from 'react';
import { Location } from '@reach/router';
import PageHandler from './PageHandler';
import { AuthConsumer } from '../..';
import { pageTypes } from './types';

const Page = props => (
  <Location>
    {location => (
      <AuthConsumer>
        {context => <PageHandler {...location} {...context} {...props} />}
      </AuthConsumer>
    )}
  </Location>
);

Page.propTypes = pageTypes;

export default Page;
