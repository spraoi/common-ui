import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link } from 'rebass';

export default props => <Link as={GatsbyLink} {...props} />;
