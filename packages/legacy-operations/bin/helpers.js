const spawn = require('child_process').spawn;

module.exports.exec = (command, args) => {
  spawn(command, args, { stdio: 'inherit' });
};
