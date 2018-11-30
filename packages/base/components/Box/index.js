import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.span`
  display: ${p => p.display};
  justify-content: ${p => p.justifyContent};
  align-items: ${p => p.alignItems};
  margin-top: ${p => p.theme.space[p.mt || p.my || p.m]};
  margin-right: ${p => p.theme.space[p.mr || p.mx || p.m]};
  margin-bottom: ${p => p.theme.space[p.mb || p.my || p.m]};
  margin-left: ${p => p.theme.space[p.ml || p.mx || p.m]};
  padding-top: ${p => p.theme.space[p.pt || p.py || p.p]};
  padding-right: ${p => p.theme.space[p.pr || p.px || p.p]};
  padding-bottom: ${p => p.theme.space[p.pb || p.py || p.p]};
  padding-left: ${p => p.theme.space[p.pl || p.px || p.p]};
  background-color: ${p => p.theme.colors[p.backgroundColor]};
  color: ${p => p.theme.colors[p.color]};
`;

Box.propTypes = {
  alignItems: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  display: PropTypes.string,
  justifyContent: PropTypes.string,
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  my: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  px: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  py: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Box.defaultProps = {
  alignItems: 'normal',
  backgroundColor: 'inherit',
  color: 'inherit',
  display: 'inherit',
  justifyContent: 'initial',
  mb: 0,
  ml: 0,
  mr: 0,
  mt: 0,
  mx: 0,
  my: 0,
  pb: 0,
  pl: 0,
  pr: 0,
  pt: 0,
  px: 0,
  py: 0,
};

export default Box;
