class PredecrtiveText:
    dictionaryTree = {}
    dictionaryWords = []
    keyMap = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    }

    def __init__(self, words):
        self.dictionaryWords = words.split()

        root_tree = {}

        for word in self.dictionaryWords:
            letters = list(word)

            tree = root_tree

            for i, lett in enumerate(letters):
                last = False if len(letters) - (i + 1) else True
                letter = lett.lower()

                if letter in tree:
                    exist = True
                else:
                    exist = False

                if not exist:
                    tree[letter] = {'$': 1} if last else {}
                    tree = tree[letter]
                else:
                    tree = tree[letter]

        self.dictionaryTree = root_tree

    def valid_words(self, numeric_word):
        sequence = []

        for key in numeric_word:
            if key in self.keyMap:
                sequence.append(self.keyMap[key])
            else:
                print('Number is invalid. you can\'t use thes letter "', key, '"')

        available_words = self.find_words(
            sequence, self.dictionaryTree, 0, '', [])

        return available_words

    def find_words(self, sequence, tree, currentDepth, currentWord, availableWords):
        available_words = availableWords
        current_tree = tree
        total_dept = len(sequence)
        current_sequence = sequence[currentDepth]
        current_depth = currentDepth

        for letter in current_sequence:
            word = currentWord

            if letter in current_tree:
                value = current_tree[letter]

                word += letter

                if (current_depth + 1 == total_dept) and ('$' in value):
                    available_words.append(word)
                elif current_depth + 1 < total_dept:
                    self.find_words(sequence, value,
                                    current_depth + 1, word, available_words)

        return available_words
