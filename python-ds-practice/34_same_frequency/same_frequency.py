def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    def get_digit_freq(number): 
        number = str(number)
        digits = set(number)
        return {int(digit) : number.count(digit) for digit in digits}


    return get_digit_freq(num1) == get_digit_freq(num2)
