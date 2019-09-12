import React from 'react';

export const BarLoader = jest
  .fn()
  .mockImplementation(props => <div {...props} />);
