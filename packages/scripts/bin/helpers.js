const fs = require('fs');
const readline = require('readline');

module.exports.ask = question =>
  new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, answer => {
      resolve(answer);
      rl.close();
    });
  });

module.exports.write = (file, data) => {
  fs.writeFile(file, data, () => {});
};
