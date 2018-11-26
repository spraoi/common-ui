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

module.exports.parseTemplate = (template, data) => {
  const placeholders = template
    .split('{{{')
    .slice(1)
    .reduce((acc, chunk) => [...acc, chunk.split('}}}')[0]], []);

  return placeholders.reduce(
    (acc, placeholder) =>
      acc.replace(`{{{${placeholder}}}}`, data[placeholder]),
    template
  );
};

module.exports.read = file => fs.readFileSync(file, { encoding: 'utf8' });

module.exports.write = (file, data) => fs.writeFileSync(file, data);
