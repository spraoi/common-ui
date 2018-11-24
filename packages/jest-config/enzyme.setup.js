const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

module.exports = () => enzyme.configure({ adapter: new Adapter() });
