import { getPriority } from 'os';
import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day03.txt';

/** find the item that is in both compartments of a backpack and sum up the items priorities */
/** lowercase a-z = priorities 1-26; uppercase A-Z = priorities 27-52 */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  const priorities: number[] = [];
  inputArr.forEach(backpack => {
    const mid = backpack.length / 2;
    const leftCompartment = backpack.substring(0, mid);
    const rightCompartment = backpack.substring(mid, backpack.length);

    let itemInBothCompartments = '';

    for(let l in leftCompartment.split(''))  {
      for(let r in rightCompartment.split('')) {
        if (leftCompartment[l] === rightCompartment[r]) {
          itemInBothCompartments = leftCompartment[l];
          break;
        }
      }
    }

    priorities.push(convertCharToPriority(itemInBothCompartments));
  });

  const result = priorities.reduce((acc, curr) => acc + curr, 0);
  console.log(`Part One: ${result}`);
}

/** find the itam that is in all 3 backpacks and sum up the item priorities */
function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  const groupPriorities: number[] = [];
  let groupBackpacks: string[][] = [];
  let backpackFiller: string[] = [];
  inputArr.forEach((backpack, idx) => {
    backpackFiller.push(backpack);

    if ((idx > 0 && (idx + 1) % 3 === 0) || (idx === inputArr.length - 1)) {
      groupBackpacks.push(backpackFiller);
      backpackFiller = [];
    }

  });

  groupBackpacks.forEach(groupBackpack => {
      const firstBackpack = groupBackpack[0];
      const secondBackpack = groupBackpack[1];
      const thirdBackpack = groupBackpack[2];

      let itemInAllBackpacks = '';
      for(let fst in firstBackpack.split(''))  {
        for(let snd in secondBackpack.split('')) {
          for(let trd in thirdBackpack.split('')) {
            if (firstBackpack[fst] === secondBackpack[snd] && secondBackpack[snd] === thirdBackpack[trd]) {
              itemInAllBackpacks = firstBackpack[fst];
              break;
            }
          }
        }
      }

      groupPriorities.push(convertCharToPriority(itemInAllBackpacks));
  });

  const result = groupPriorities.reduce((acc, curr) => acc + curr, 0);
  console.log(`Part Two: ${result}`);
}

function convertCharToPriority(char: string): number {
  let priority = -1;

  if (char === char.toLowerCase()) {
    priority = char.charCodeAt(0) - 96; // a has ASCII code 97 (96 because we want to start with 1)
  } else {
    priority = char.charCodeAt(0) - 38; // A has ASCII code 65 (38 because we want to start at 27 [38 = 65 - 27])
  }

  return priority;
}

solvePartOne();
solvePartTwo();
