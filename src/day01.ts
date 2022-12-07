import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day01.txt';

/** find the elf carying the most calories */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  let max_cals = findMaxCals(inputArr);

  console.log(`Part One: ${max_cals}`);
}

/** find the TOP THREE elfes carying the most calories */
function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  let lastSums: number[] = [];
  let max_cals_sum = 0;

  for(let i = 0; i <= 2; i++) {
    const lastSum = findMaxCals(inputArr, lastSums);
    lastSums.push(lastSum);
    max_cals_sum += lastSum;
  }

  console.log(`Part Two: ${max_cals_sum}`);
}

function findMaxCals(cals_arr: string[], exclude: number[] = []) {

  let max_cals = 0;
  let elf_cals: number[] = [];
  cals_arr.forEach((val, idx) => {
    if (idx === (cals_arr.length - 1)) {
      elf_cals.push(+val);
    }

    if (val === '' || idx === (cals_arr.length - 1)) {
      const sum = elf_cals.reduce((acc, curr) => acc + curr, 0);
      
      if (!exclude.includes(sum)) {
        if (sum > max_cals) {
          max_cals = sum;
        }
      }

      elf_cals = [];
    } else {
      elf_cals.push(+val);
    }
  });

  return max_cals;
}

solvePartOne();
solvePartTwo();
