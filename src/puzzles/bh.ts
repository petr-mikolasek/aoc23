import {input, testInput} from '../inputs/day';

function partOne(input: string): number {
    return 0;
}

function partTwo(input: string): number {
    return 0;
}

console.time('doSomething');

// console.log(partOne(input));
// console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 1, 'part1');
console.assert(partTwo(testInput) === 1, 'part2');
