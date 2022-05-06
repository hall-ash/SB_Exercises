def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    vowels = set('aeiouAEIOU')

    str_vowels = [letter for letter in s if letter in vowels]
    
    str_vowels.reverse()

    chars = list(s)

    j = 0

    for i in range(len(chars)):
        if chars[i] in vowels:
            chars[i] = str_vowels[j]
            j += 1
    
    return "".join(chars)
