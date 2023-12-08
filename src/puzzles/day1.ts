import {input, testInput, testInputPart2} from '../inputs/day1';

const wordsForDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function parseDigit(digit: string): number {
    if (digit.length === 1) return parseInt(digit);
    else return wordsForDigits.indexOf(digit) + 1;
}

function partOne(input: string): number {
    let sum = 0;
    const lines = input.split('\n');

    for (let line of lines) {
        const digits = line.match(/\d/g);
        if (digits !== null) {
            sum += parseInt(digits[0] + digits[digits.length - 1]);
        }
    }

    return sum;
}

function partTwo(input: string): number {
    let sum = 0;
    const lines = input.split('\n');
    const regex: RegExp = /\d|one|two|three|four|five|six|seven|eight|nine/;

    for (let line of lines) {
        const firstDigit = parseDigit(line.match(regex)![0]);

        let lastDigit: number;
        for (let i = 1; i <= line.length; i++) {
            const match = line.substring(line.length - i).match(regex);
            if (match !== null) {
                lastDigit = parseDigit(match[0]);
                break;
            }
        }

        sum += 10 * firstDigit + lastDigit!;
    }

    return sum;
}

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 142, 'part1');
console.assert(partTwo(testInputPart2) === 281, 'part2');
