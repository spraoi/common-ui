import PropTypes from 'prop-types';
import styled from 'styled-components';

const themeOrValue = (props, theme, or) => {
  const value = props.find(p => p) || or;
  return theme[value] || value;
};

const Box = styled.div`
  display: ${p => p.display};
  justify-content: ${p => p.justifyContent};
  align-items: ${p => p.alignItems};
  max-width: ${p => p.theme.maxWidths[p.maxWidth] || p.maxWidth};
  margin-top: ${p => themeOrValue([p.mt, p.my, p.m], p.theme.space, 0)};
  margin-right: ${p => themeOrValue([p.mr || p.mx || p.m], p.theme.space, 0)};
  margin-bottom: ${p => themeOrValue([p.mb || p.my || p.m], p.theme.space, 0)};
  margin-left: ${p => themeOrValue([p.ml || p.mx || p.m], p.theme.space, 0)};
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
  maxWidth: PropTypes.string,
  mb: PropTypes.string,
  ml: PropTypes.string,
  mr: PropTypes.string,
  mt: PropTypes.string,
  mx: PropTypes.string,
  my: PropTypes.string,
  pb: PropTypes.string,
  pl: PropTypes.string,
  pr: PropTypes.string,
  pt: PropTypes.string,
  px: PropTypes.string,
  py: PropTypes.string,
};

Box.defaultProps = {
  alignItems: null,
  backgroundColor: null,
  color: null,
  display: null,
  justifyContent: null,
  maxWidth: null,
  mb: null,
  ml: null,
  mr: null,
  mt: null,
  mx: null,
  my: null,
  pb: null,
  pl: null,
  pr: null,
  pt: null,
  px: null,
  py: null,
};

export default Box;
