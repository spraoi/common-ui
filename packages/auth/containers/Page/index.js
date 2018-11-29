import React from 'react';
import Context from '../../context';
import PageHandler from './PageHandler';
import { pageTypes } from './types';

const Page = props => (
  <Context.Consumer>
    {context => <PageHandler {...context} {...props} />}
  </Context.Consumer>
);

Page.propTypes = pageTypes;

export default Page;
