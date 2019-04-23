import React from 'react';
import { BarLoader } from 'react-spinners';
import { ThemeConsumer } from 'styled-components';
import Box from '../Box';

const Spinner = props => (
  <ThemeConsumer>
    {theme => (
      <Box
        display="flex"
        justifyContent="center"
        py="xl"
        width="100%"
        {...props}
      >
        <BarLoader color={theme.colors.textPrimary} />
      </Box>
    )}
  </ThemeConsumer>
);

export default Spinner;
