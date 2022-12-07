import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day02.txt';

/** solution */
function solvePartOne(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  let totalScore = 0;

  inputArr.forEach(match => {
    const enemiesChoice = match[0];
    const yourChoice = match[2];

    let shapeScore = getShapeScore(yourChoice);
    let outcomeScore = playMatch(enemiesChoice, yourChoice);

    totalScore += shapeScore + outcomeScore;
  });

  console.log(`Part One: ${totalScore}`);
}

function getShapeScore(yourChoice: string): number {
    let shapeScore = 0;
    switch(yourChoice) {
      case 'X': 
        shapeScore = 1;
        break;
      case 'Y': 
        shapeScore = 2;
        break;
      case 'Z': 
        shapeScore = 3;
        break;
    }
    return shapeScore;
}

/** returns the score you get when playing the match (0 - lost, 3 - draw, 6 - won) */
function playMatch(enemiesChoice: string, yourChoice: string): number {
  let score = 0;
  switch(enemiesChoice) {
    // A beats Z, B beats X, C beats Y
    case 'A': 
      score = (yourChoice === 'X') ? 3 : (yourChoice === 'Z' ? 0 : 6);
      break;
    case 'B': 
      score = yourChoice === 'Y' ? 3 : (yourChoice === 'X' ? 0 : 6);
      break;
    case 'C': 
      score = yourChoice === 'Z' ? 3 : (yourChoice === 'Y' ? 0 : 6);
      break;
  }

  return score;
}

function solvePartTwo(): void {
  const inputArr: string[] = Utility.readInputIntoStringArr(INPUT_FILE);

  let totalScore = 0;

  inputArr.forEach(match => {
    const enemiesChoice = match[0];
    const result = match[2];
    const yourChoice = getNeededShape(enemiesChoice, result);

    let shapeScore = getShapeScore(yourChoice);
    let outcomeScore = playMatch(enemiesChoice, yourChoice);

    totalScore += shapeScore + outcomeScore;
  });

  console.log(`Part Two: ${totalScore}`);
}

// in this case the result means something else: X - loose, Y - draw, Z - win
function getNeededShape(enemiesChoice: string, result: string): string {
  let yourChoice = '';
  switch(enemiesChoice) {
    case 'A': 
      yourChoice = (result === 'X') ? 'Z' : (result === 'Z' ? 'Y' : 'X');
      break;
    case 'B': 
      yourChoice = result === 'Y' ? 'Y' : (result === 'X' ? 'X' : 'Z');
      break;
    case 'C': 
      yourChoice = result === 'Z' ? 'X' : (result === 'Y' ? 'Z' : 'Y');
      break;
  }

  return yourChoice;
}

solvePartOne();
solvePartTwo();
