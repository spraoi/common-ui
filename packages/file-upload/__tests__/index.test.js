import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
import FileUpload from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FileUpload />, div);
  ReactDOM.unmountComponentAtNode(div);
});
