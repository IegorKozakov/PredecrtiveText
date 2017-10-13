const fs = require('fs');
const PredectiveText = require('./Predective');

fs.readFile('./dictionary.txt', 'utf8', (err, dictionary) => {
  const predective = new PredectiveText(dictionary);
  const words = predective.findWords(323);
  console.log(words);
});
