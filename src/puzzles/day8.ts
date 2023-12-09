import {keys} from 'lodash';
import {anotherTestInput, input, testInput, yetAnotherTestInput} from '../inputs/day8';
import {lowestCommonMultiple} from '../stuff';

function parseInput(input: string): {instructions: string; map: {[node: string]: string[]}} {
    const instructions = input.split('\n\n')[0];
    let map: {[node: string]: string[]} = {};

    input
        .split('\n\n')[1]
        .split('\n')
        .forEach((row) => {
            const res = row.match(/(\w+)/g);
            if (res) map[res[0]] = [res[1], res[2]];
        });

    return {instructions, map};
}

function partOne(input: string): number {
    const {instructions, map} = parseInput(input);

    let end = false;
    let counter = 0;
    let cur = 'AAA';

    while (!end) {
        cur = instructions[counter % instructions.length] === 'L' ? map[cur][0] : map[cur][1];

        counter++;

        if (cur === 'ZZZ') end = true;
    }

    return counter;
}

function partTwo(input: string): number {
    const {instructions, map} = parseInput(input);

    let end = false;
    let counter = 0;
    let cur = keys(map).filter((node) => node.endsWith('A'));
    let len = new Array(cur.length).fill(0);

    while (!end) {
        for (let i = 0; i < cur.length; i++) {
            cur[i] = instructions[counter % instructions.length] === 'L' ? map[cur[i]][0] : map[cur[i]][1];
            if (cur[i].endsWith('Z')) len[i] = counter + 1;
        }

        counter++;

        if (len.filter((path) => path > 0).length === cur.length) end = true;
    }

    console.log(len);

    return len.reduce(lowestCommonMultiple, 1);
}

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 2, 'part1.1');
console.assert(partOne(anotherTestInput) === 6, 'part1.2');
console.assert(partTwo(yetAnotherTestInput) === 6, 'part2');
