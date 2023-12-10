import {input, testInput} from '../inputs/day9';

function differences(sequence: number[]): number[] {
    let differences: number[] = [];
    for (let i = 1; i < sequence.length; i++) {
        differences.push(sequence[i] - sequence[i - 1]);
    }
    return differences;
}

function extrapolate(sequence: number[], backwards = false): number {
    const diffs = differences(sequence);

    if (diffs.every((e) => e === 0)) return sequence[0];
    else
        return backwards
            ? sequence[0] - extrapolate(diffs, backwards)
            : sequence[sequence.length - 1] + extrapolate(diffs);
}

function partOneAndTwo(input: string, backwards = false): number {
    const sequences: number[][] = input.split('\n').map((row) => row.split(' ').map(Number));
    let sum = 0;

    for (let sequence of sequences) {
        sum += extrapolate(sequence, backwards);
    }

    return sum;
}

console.time('doSomething');

console.log(partOneAndTwo(input));
console.log(partOneAndTwo(input, true));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOneAndTwo(testInput) === 114, 'part1');
console.assert(partOneAndTwo(testInput, true) === 2, 'part2');
