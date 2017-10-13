const fs = require('fs');

module.exports = class Predective {
  constructor(dictionary) {
    this.dictionaryTree = {};
    this.keyMap = {
      2: 'abc',
      3: 'def',
      4: 'ghi',
      5: 'jkl',
      6: 'mno',
      7: 'pqrs',
      8: 'tuv',
      9: 'wxyz'
    }

    this.compileDictionary(dictionary);
  }

  compileDictionary(dictionary) {
    const dictionaryArary = dictionary.split('\n');

    dictionaryArary.forEach(word => {
      let tree = this.dictionaryTree;
      word.split('').forEach((char, i) => {
        if (tree[char] === undefined) {
          tree[char] = word.length !== i + 1 ? {} : { $: 1 }
        }

        tree = tree[char];
      });
    });
  }

  findWords(numericWord) {
    if (typeof numericWord === 'number') {
      numericWord = numericWord.toString();
    }

    const sequence = this.getSequence(numericWord);
    const words = this.getWordListRecursion(sequence, this.dictionaryTree, 0, '', []);
    return words;
  }

  getSequence(numericWord) {
    const sequence = [];
    numericWord.split('').forEach(num => {
      if (this.keyMap[num] === undefined) {
        throw new Error(`Wrong char ${num}. You should use only numbers from 2 to 9.`)
      }

      sequence.push(this.keyMap[num]);
    })

    return sequence;
  }

  getWordListRecursion(sequence, currentTree, currentDepth, currentWord, availableWords) {
    const totalDepth = sequence.length;
    const words = availableWords || [];
    const currentSequence = sequence[currentDepth];

    let sequenceTree = this.dictionaryTree;
    let wordTree = {};
    let inUseTree = {};

    currentSequence.split('').forEach(letter => {
      let word = currentWord;
      if (typeof currentTree[letter] !== 'undefined') {
        const tree = currentTree[letter];
        word += letter

        if (currentDepth + 1 === totalDepth && typeof tree['$'] === 'number') {
          words.push(word)
        } else if (currentDepth + 1 < totalDepth) {
          this.getWordListRecursion(sequence, tree, currentDepth + 1, word, words)
        }

      }
    })

    return words;
  }
}