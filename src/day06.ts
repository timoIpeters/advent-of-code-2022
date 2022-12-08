import { markAsUntransferable } from 'worker_threads';
import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day06.txt';

/** How many characters need to be processed before the first start-of-packet marker is detected */
function solvePartOne(): void {
  const datastream: string = Utility.readInputIntoStringArr(INPUT_FILE)[0];

  const slidingWindowStrings = createSlidingWindowStrings([...datastream], 4);

  const marker = findMarker(slidingWindowStrings, 4);

  console.log(`Part One: ${marker}`);
}

/** How many characters need to be processed before the first start-of-message marker is detected */
function solvePartTwo(): void {
  const datastream: string = Utility.readInputIntoStringArr(INPUT_FILE)[0];

  const slidingWindowStrings = createSlidingWindowStrings([...datastream], 14);

  const marker = findMarker(slidingWindowStrings, 14);

  console.log(`Part One: ${marker}`);
}

function createSlidingWindowStrings(arr: any[], size: number): any[] {
  const windows: any[] = arr.reduce((acc,_,idx,arr) => {
    if (idx + size > arr.length) {
      return acc;
    }

    return acc.concat([arr.slice(idx, idx + size)]);
  }, []);
  return windows.map(window => window.join(""));
}

function findMarker(arr:string[], offset: number) {
  let marker = -1;
  for(let i = 0; marker === -1 && i < arr.length; i++) {
    const check = [...arr[i]].every(char => {
      const regex = new RegExp(`[^${char}]`, 'g');
      const occurrences = arr[i].replace(regex, "").length;
      if(occurrences === 1) {
        return true;
      }
    });

    if (check) {
      marker = offset + i;
    }
  }

  return marker;
}

solvePartOne();
solvePartTwo();
