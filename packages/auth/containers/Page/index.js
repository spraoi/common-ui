import React from 'react';
import { Location } from '@reach/router';
import Context from '../../context';
import PageHandler from './PageHandler';
import { pageTypes } from './types';

const Page = props => (
  <Location>
    {location => (
      <Context.Consumer>
        {context => <PageHandler {...location} {...context} {...props} />}
      </Context.Consumer>
    )}
  </Location>
);

Page.propTypes = pageTypes;

export default Page;
