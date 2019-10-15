const ReactTooltip = jest.requireActual('react-tooltip');
ReactTooltip.rebuild = jest.fn();
module.exports = ReactTooltip;
