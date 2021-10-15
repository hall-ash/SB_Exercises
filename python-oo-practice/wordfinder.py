from random import choice
"""Word Finder: finds random words from a dictionary."""


class WordFinder:
    '''
    Reads words from a given file, prints the number of words read,
    and returns a random word from the file.

    >>> wf = WordFinder("words.txt")
    235886 words read

    >>> isinstance(wf.random(), str)
    True

    '''
    def __init__(self, file_path):
        '''Create a WordFinder instance and print the number of words it
        has read from the given file'''
        self._word_file = file_path
        self._word_count = 0
        self._words = self._get_words_from_file()
        self._print_word_count()
    
    def _get_words_from_file(self):
        '''Create a list of words read from the given file'''
        try:
            word_list = []
            with open(self._word_file, 'r') as file:
                for word in file:
                    self._word_count += 1
                    word_list.append(word.strip())
            return word_list
        except OSError as exc:
            print("There was a problem reading the file", exc)

    def _print_word_count(self):
        '''Print the number of words read from the file'''
        msg = ' word read' if self._word_count == 1 else ' words read'
        print(str(self._word_count) + msg)

    def random(self):
        '''Return a random word'''
        return choice(self._words)


class SpecialWordFinder(WordFinder):
    '''
    Reads words from a given file, prints the number of words read,
    and returns a random word from the file. Does not include lines that begin with
    '#' or blank lines. 

    '''

    def __init__(self, file_path):
        '''Create a SpecialWordFinder instance and print the number of words it
        has read from the given file excluding words that begin with '#'. '''
        super().__init__(file_path)

    def _get_words_from_file(self):
        '''Create a list of words read from the given file. Blank lines and 
        and words that begin with '#' are excluded.'''
        try:
            word_list = []
            with open(self._word_file, 'r') as file:
                for word in file:
                    if word.strip() and not word.startswith('#'):
                        self._word_count += 1
                        word_list.append(word.strip())
            return word_list
        except OSError as exc:
            print("There was a problem reading the file", exc)

