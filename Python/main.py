from PredecrtiveText import PredecrtiveText

dictionary = open('./dictionary.txt', 'r')
words = dictionary.read()
predecrtive_text = PredecrtiveText(words)


def readValue():
    print('Your number')
    value = input()
    correctWords = predecrtive_text.valid_words(value)
    print(correctWords)
    print('Do you want to get another list of words? type y or n')
    answer = input()
    if answer.lower() == 'y' or answer.lower() == 'yes':
        readValue()


readValue()
