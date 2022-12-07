import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day04.txt';

type NumTuple = [number, number];

/** In how many assignment pairs does one range fully contain the other */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  let count = 0;
  inputArr.forEach(pair => {
    const idxOfSeparator = pair.indexOf(',');
    const range1 = pair.substring(0, idxOfSeparator);
    const range2 = pair.substring(idxOfSeparator+1, pair.length);

    const range1Tuple: NumTuple = createTupleOfRange(range1);
    const range2Tuple: NumTuple = createTupleOfRange(range2);
    
    // fully contained
    if ((range1Tuple[0] <= range2Tuple[0] && range1Tuple[1] >= range2Tuple[1]) || (range2Tuple[0] <= range1Tuple[0] && range2Tuple[1] >= range1Tuple[1])) {
      count++;
    }
  });

  console.log(`Part One: ${count}`);
}

/** In how many assignment pairs do the ranges overlap */
function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  let count = 0;
  inputArr.forEach(pair => {
    const idxOfSeparator = pair.indexOf(',');
    const range1 = pair.substring(0, idxOfSeparator);
    const range2 = pair.substring(idxOfSeparator+1, pair.length);

    const range1Tuple: NumTuple = createTupleOfRange(range1);
    const range2Tuple: NumTuple = createTupleOfRange(range2);
    
    if ((range1Tuple[0] <= range2Tuple[1]) && (range2Tuple[0] <= range1Tuple[1])) {
      count++;
    }
  });

  console.log(`Part Two: ${count}`);
}

function createTupleOfRange(range: string): NumTuple {
  const idxOfSeparator = range.indexOf('-');
  return [+range.substring(0, idxOfSeparator), +range.substring(idxOfSeparator + 1, range.length)]
}

solvePartOne();
solvePartTwo();
