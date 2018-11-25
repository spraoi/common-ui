import React from 'react';
import ReactDOM from 'react-dom';
import FileUpload from '..';

describe('FileUpload component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileUpload />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
