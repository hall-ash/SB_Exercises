const { getNumberArray, getMean, getMode, getMedian } = require('./math-funcs');

// converts comma-separated string of numbers to array of numbers
// '1,3,4,7' => [1, 2, 3, 4]
describe('geNumberArray unit tests', () => {

  describe('tests with valid input string', () => {
    const validInputString = '1,2,3';
    const inputLength = 3;
    const expectedOutput = [1, 2, 3];
  
    it('should convert a string of comma separated numbers to an array of those numbers', () => {
      const numArray = getNumberArray(validInputString);
  
      expect(numArray).toEqual(expectedOutput);
    });
  
    it('should convert a string of numbers to an array', () => {
      const numArray = getNumberArray(validInputString);
  
      expect(numArray).not.toBeInstanceOf(String);
      expect(numArray).toBeInstanceOf(Object);
    });
  
    it('should return an array of length n when given an input string of n numbers', () => {
      const numArray = getNumberArray(validInputString);
      expect(numArray.length).toEqual(inputLength);
    });

    it('should ignore starting, ending, and adjacent commas', () => {
      const startingComma = ',1,2,3';
      const endingComma = '1,2,3,';
      const adjCommas = '1,2,,3';

      for (input of [startingComma, endingComma, adjCommas]) {
        expect(getNumberArray(input)).toEqual(expectedOutput);
      }
    })
  });
  // end valid input tests

  describe('tests with invalid input strings', () => {
    it('should throw an error if the input string contains a non-number', () => {
      const nonNumberInput = '1,2,foo';
      const errMsg = 'foo is not a number';
      
      expect(() => getNumberArray(nonNumberInput)).toThrowError(message=errMsg);
    });

    it('should throw an error if the input is empty', () => {
      const emptyInput = '';
      const errMsg = 'no numbers were given';

      expect(() => getNumberArray(emptyInput)).toThrowError(message=errMsg);
    });
  })
  // end invalid input tests
});
// end getNumberArray tests


// precond: all elements of nonempty array are valid numbers
// returns mean of array of numbers
// [1, 2, 3] => 2
describe('getMean unit tests', () => {
  
  it('should return the mean of the given array of numbers', () => {
    const validInput = [1, 2, 3];
    const expectedOutput = 2;

    expect(getMean(validInput)).toEqual(expectedOutput);
  });

  it('should return null if the given array is empty', () => {
    const emptyInput = [];
    
    expect(getMean(emptyInput)).toBeNull();
  });
})
// end getMean tests


// precond: all elements of nonempty array are valid numbers
// returns median of array of numbers
// [1, 2, 3] =>  2
// [1, 2, 3, 4] => 2.5
describe('getMedian unit tests', () => {
  
  it('should return the median for a number array of even length', () => {
    const validInputEvenLength = [1, 2, 3, 4];
    const expectedOutput = 2.5;

    expect(getMedian(validInputEvenLength)).toEqual(expectedOutput);
  });

  it('should return the median for a number array of odd length', () => {
    const validInputOddLength = [1, 2, 3];
    const expectedOutput = 2;

    expect(getMedian(validInputOddLength)).toEqual(expectedOutput);
  });

  it('should return null if the given array is empty', () => {
    const emptyInput = [];
    
    expect(getMedian(emptyInput)).toBeNull();
  });
});
// end getMedian tests


// precond: all elements of nonempty array are valid numbers
// returns mode(s) of array of numbers
// [1, 2, 2, 3] => 2
// [1, 1, 2, 2, 3] => [1, 2]
describe('getMode unit tests', () => {
  
  it('should return multiple modes as an array for a multimodal number array', () => {
    const multModeInput = [1, 1, 2, 2, 3];
    const expectedOutput = [1, 2];

    expect(getMode(multModeInput)).toEqual(expectedOutput);
  });

  it('should return a single mode for a unimodal number array', () => {
    const singleModeInput = [1, 2, 2, 3];
    const expectedOutput = 2;

    expect(getMode(singleModeInput)).toEqual(expectedOutput);
  });

  it('should return null if the given array is empty', () => {
    const emptyInput = [];
    
    expect(getMode(emptyInput)).toBeNull();
  });
});
// end getMode tests