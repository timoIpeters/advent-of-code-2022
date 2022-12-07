import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day01.txt';

/** find the elf carying the most calories */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  const result = Math.max(...getCalorieSums(inputArr));
  console.log(`Part One: ${result}`);
}

/** find the TOP THREE elfes carying the most calories */
function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  const result = getCalorieSums(inputArr).sort((x,y) => y - x).slice(0,3).reduce((acc, curr) => acc + curr, 0);
  console.log(`Part Two: ${result}`);
}

function getCalorieSums(inputArr: string[]): number[] {
  return getCalorieGroups(inputArr).map(calorieGroup => {
    return calorieGroup.reduce((acc, curr) => +acc + +curr, 0);
  });
};

function getCalorieGroups(inputArr: string[]): string[][] {
  const splitArr: string[][] = [];
  let startIdx = 0;
  inputArr.forEach((elem, index) => {
    if (elem === "") {
      splitArr.push(inputArr.slice(startIdx, index));
      startIdx = ++index;
    } else if (index === (inputArr.length - 1)) {
      splitArr.push(inputArr.slice(startIdx, inputArr.length));
    }
  });
  return splitArr;
}

solvePartOne();
solvePartTwo();
