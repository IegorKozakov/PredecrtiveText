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
    const wordsRec = this.getWordListRecursion(sequence, this.dictionaryTree, 0, '', []);
    const wordsCycle = this.getWordList(sequence);

    return {
      Recursion: wordsRec,
      Cycle: wordsCycle
    };
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

  getWordList(sequence) {
    const words = [];
    const totalWordLength = sequence.length;
    const sequenceMap = sequence.map(i => 0);

    let finished = false;
    let currentSequencePosition = 0;
    let word = ''
    let tree = this.dictionaryTree;
    let counter = 0;

    while (sequenceMap[0] < sequence[0].length) {
      counter += 1;

      const currentSequence = sequence[currentSequencePosition];
      const curentSequenceLength = currentSequence.length;
      const letterPosition = sequenceMap[currentSequencePosition];

      if (letterPosition + 1 > curentSequenceLength) {
        for (let i = currentSequencePosition; i < totalWordLength; i++) {
          sequenceMap[i] = 0
        }

        sequenceMap[currentSequencePosition - 1] += 1;
        currentSequencePosition -= 1;
        
        word = '';
        tree = this.dictionaryTree;
        
        for (let i = 0; i < currentSequencePosition; i++) {
          const letter = sequence[i].charAt(sequenceMap[i]);
          word += letter;
          tree = tree[letter];
        }

        continue;
      }

      const letter = currentSequence.charAt(letterPosition);
      
      if (typeof tree[letter] === 'object') {
        const currentWord = word + letter;

        if (currentSequencePosition + 1 === totalWordLength) {
          if (typeof tree[letter]['$'] === 'number') {
            words.push(currentWord);
          }
          sequenceMap[currentSequencePosition] += 1;
        } else if(currentSequencePosition + 1 < totalWordLength) {
          tree = tree[letter];
          word = currentWord;
          currentSequencePosition +=1;
        }
      } else {
        sequenceMap[currentSequencePosition] += 1;
      }
    }
    
    
    return words;
  }
}