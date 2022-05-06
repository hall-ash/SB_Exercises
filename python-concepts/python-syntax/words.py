def print_upper_words(word_list, must_start_with):
    ''' Takes a list of words and a set of letters
        and prints each word in upper case on a separate 
        line if it begins with a letter in the set.'''
    
    upper_case_must_start_with = set()

    for letter in must_start_with:
        upper_case_must_start_with.add(letter.upper())

    for word in word_list:
        word = word.upper()
        first_letter = word[0]

        if first_letter in upper_case_must_start_with:
            print(word)
    

