import React from 'react';

const blacklistProps = ({ as = 'div', blacklist = [] } = {}) => props => {
  const safeProps = { ...props };
  blacklist.forEach(item => delete safeProps[item]);
  return React.createElement(as, safeProps);
};

export default blacklistProps;
