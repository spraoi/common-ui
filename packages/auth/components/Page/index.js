import React from 'react';
import Context from '../Context';
import PageHandler from './PageHandler';

const Page = props => (
  <Context.Consumer>
    {context => <PageHandler {...context} {...props} />}
  </Context.Consumer>
);

export default Page;
