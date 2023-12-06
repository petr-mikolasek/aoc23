import {input, testInput} from '../inputs/day6';

type Race = {time: number; dist: number};

function findWaysToBeat(race: Race): number {
    for (let chargeTime = 1; chargeTime <= race.time / 2; chargeTime++) {
        if (chargeTime * (race.time - chargeTime) > race.dist) return race.time - 2 * chargeTime + 1;
    }
    return 0;
}

const partOne = (input: string): number => {
    const tmp = input
        .replace(/.*: +/g, '')
        .split('\n')
        .map((row) => row.split(/ +/).map((num) => parseInt(num)));

    const races: Race[] = [];
    for (let i = 0; i < tmp[0].length; i++) {
        races.push({time: tmp[0][i], dist: tmp[1][i]});
    }

    let waysToBeat = 1;

    for (let race of races) {
        waysToBeat *= findWaysToBeat(race);
    }

    return waysToBeat;
};

const partTwo = (input: string): number => {
    const tmp = input
        .replace(/.*: +| +/g, '')
        .split('\n')
        .map((num) => parseInt(num));

    const race: Race = {time: tmp[0], dist: tmp[1]};

    return findWaysToBeat(race);
};

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 288, 'part1');
console.assert(partTwo(testInput) === 71503, 'part2');
