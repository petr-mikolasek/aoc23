import {intersection} from 'lodash';
import {input, testInput} from '../inputs/day4';

const partOne = (input: string): number => {
    const cards = input.split('\n').map((line) => line.split(/: +| \| +/g));
    let sum = 0;

    for (let line of cards) {
        const winningNums = line[1].split(/ +/).map((n) => parseInt(n));
        const myNums = line[2].split(/ +/).map((n) => parseInt(n));

        const numMatches = intersection(winningNums, myNums).length;

        if (numMatches > 0) sum += 2 ** (numMatches - 1);
    }
    return sum;
};

const partTwo = (input: string): number => {
    const cards = input.split('\n').map((line) => line.split(/: +| \| +/g));
    const cardAmounts: number[] = new Array(cards.length).fill(1);

    for (let i = 0; i < cards.length; i++) {
        const winningNums = cards[i][1].split(/ +/).map((n) => parseInt(n));
        const myNums = cards[i][2].split(/ +/).map((n) => parseInt(n));

        const numMatches = intersection(winningNums, myNums).length;

        for (let j = 1; j <= numMatches; j++) {
            cardAmounts[i + j] += cardAmounts[i];
        }
    }

    return cardAmounts.reduce((sum, n) => sum + n);
};

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 13, 'part1');
console.assert(partTwo(testInput) === 30, 'part2');
