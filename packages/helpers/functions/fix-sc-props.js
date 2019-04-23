/**
 * Convert boolean props to 0 and 1.
 * See: https://github.com/styled-components/styled-components/issues/439
 * @param {object} props
 * @returns {object}
 */
const fixSCProps = props => {
  const fixedProps = {};

  Object.keys(props).forEach(key => {
    let value = props[key];
    if (props[key] === true) value = 1;
    if (props[key] === false) value = 0;
    fixedProps[key] = value;
  });

  return fixedProps;
};

export default fixSCProps;
