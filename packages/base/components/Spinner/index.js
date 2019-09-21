import React, { useContext } from 'react';
import { BarLoader } from 'react-spinners';
import { ThemeContext } from 'styled-components';
import Box from '../Box';

const Spinner = props => {
  const theme = useContext(ThemeContext);

  return (
    <Box display="flex" justifyContent="center" py={6} width="100%" {...props}>
      <BarLoader color={theme.colors.text.primary} />
    </Box>
  );
};

export default Spinner;
