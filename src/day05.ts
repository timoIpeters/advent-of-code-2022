import { TIMEOUT } from 'dns';
import { parse } from 'path';
import { Utility } from './utilities';

/** filename -> located in the data folder */
const INPUT_FILE = 'day05.txt';

interface Instruction {
  amount: number;
  from: number;
  to: number;
}

/** solution */
function solvePartOne(): void {
  // initialize stacks
  const stacks = [
    ["W", "M", "L", "F"],
    ["B", "Z", "V", "M", "F"],
    ["H", "V", "R", "S", "L", "Q"],
    ["F", "S", "V", "Q", "P", "M", "T", "J"],
    ["L", "S", "W"],
    ["F", "V", "P", "M", "R", "J", "W"],
    ["J", "Q", "C", "P", "N", "R", "F"],
    ["V", "H", "P", "S", "Z", "W", "R", "B"],
    ["B", "M", "J", "C", "G", "H", "Z", "W"]
  ];

  // const stacks = [
  //   ["Z", "N"],
  //   ["M", "C", "D"],
  //   ["P"]
  // ];

  // read instructions
  const instructions = Utility.readInputIntoStringArr(INPUT_FILE).filter(line => line.startsWith("m"));
  const parsedInstructions = parseInstructions(instructions);

  // execute instructions
  parsedInstructions.forEach(ins => {
    for(let i = 0; i < ins.amount; i++) {
      const moving = stacks[ins.from].pop() as string;
      stacks[ins.to].push(moving);
    }
  });

  const result = stacks.reduce((acc, curr) => acc + curr.pop(), "");
  console.log(`Part One: ${result}`);
}

function solvePartTwo(): void {
  const stacks = [
    ["W", "M", "L", "F"],
    ["B", "Z", "V", "M", "F"],
    ["H", "V", "R", "S", "L", "Q"],
    ["F", "S", "V", "Q", "P", "M", "T", "J"],
    ["L", "S", "W"],
    ["F", "V", "P", "M", "R", "J", "W"],
    ["J", "Q", "C", "P", "N", "R", "F"],
    ["V", "H", "P", "S", "Z", "W", "R", "B"],
    ["B", "M", "J", "C", "G", "H", "Z", "W"]
  ];

  // read instructions
  const instructions = Utility.readInputIntoStringArr(INPUT_FILE).filter(line => line.startsWith("m"));
  const parsedInstructions = parseInstructions(instructions);

  // execute instructions
  parsedInstructions.forEach(ins => {
    let moving = [];
    for(let i = stacks[ins.from].length - 1, j = 0; j < ins.amount; i--, j++) {
      const itemToMove = stacks[ins.from].pop() as string;
      moving.unshift(itemToMove);
    }

    moving.forEach(item => {
      stacks[ins.to].push(item);
    })
  });

  const result = stacks.reduce((acc, curr) => acc + curr.pop(), "");

  console.log(`Part Two: ${result}`);
}

function parseInstructions(instructions: string[]): Instruction[] {
  const parsedInstructions: Instruction[] = [];
  instructions.forEach(ins => {
    const amountIdx = ins.search(/\d+/);
    const amount = +ins.substring(amountIdx, ins.indexOf(" ", amountIdx));
    let temp = ins.substring(ins.indexOf("f"), ins.length);

    const fromIdx = temp.search(/\d+/);
    const from = +temp[fromIdx] - 1;
    temp = temp.substring(fromIdx + 1, ins.length);

    const toIdx = temp.search(/\d+/);
    const to = +temp[toIdx] - 1;

    parsedInstructions.push({amount, from, to});
  });

  return parsedInstructions;
}

solvePartOne();
solvePartTwo();
