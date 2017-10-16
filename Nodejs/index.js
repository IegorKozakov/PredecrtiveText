const fs = require('fs');
const PredectiveText = require('./Predective');
const path = require('path');

fs.readFile(path.resolve(__dirname, './dictionary.txt'), 'utf8', (err, dictionary) => {
  if (err) {
    throw new Error(err)
  }

  const predective = new PredectiveText(dictionary);
  const words1 = predective.findWords(323);
  console.log('Words for 323');
  console.log(words1);
  const words2 = predective.findWords(534363);
  console.log('Words for 534363');
  console.log(words2);
});
