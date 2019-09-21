import SpraoiFileUpload from '@spraoi/file-upload';
import React from 'react';
import InputWrapper from '../InputWrapper';

const FileUpload = props => (
  <InputWrapper {...props}>
    {rest => <SpraoiFileUpload {...rest} />}
  </InputWrapper>
);

export default FileUpload;
