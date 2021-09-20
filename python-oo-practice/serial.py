"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=100):
        '''
        Create SerialGenerator instance that increments serial numbers starting from
        the given start number. 
        '''
        self.start_num = start
        self.curr_num = start - 1

    def __repr__(self):
        return f"<SerialGenerator start_num={self.start_num} curr_num={self.curr_num}>"
    
    def generate(self):
        '''Generates the next serial number beggining at the given start number.'''
        self.curr_num += 1
        return self.curr_num
    
    def reset(self):
        '''Resets the serial number to the initial start number.'''
        self.curr_num = self.start_num - 1

