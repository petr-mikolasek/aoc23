import {input, testInput} from '../inputs/day5';

type Range = {start: number; end: number};

function parseInput(input: string): {seeds: number[]; mappings: number[][][]} {
    const almanac = input.split('\n\n');
    const seeds: number[] = almanac
        .shift()!
        .replace('seeds: ', '')
        .split(' ')
        .map((n) => parseInt(n));

    const mappings: number[][][] = almanac.map((mapping) =>
        mapping
            .split('\n')
            .splice(1)
            .map((row) => row.split(' ').map((n) => parseInt(n)))
    );

    return {seeds, mappings};
}

function convert(number: number, mapping: number[][]): number {
    for (let row of mapping) {
        if (number >= row[1] && number < row[1] + row[2]) return row[0] + number - row[1];
    }
    return number;
}

const partOne = (input: string): number => {
    const {seeds, mappings} = parseInput(input);

    let minLocation = 1234567890123456;

    for (let seed of seeds) {
        let number = seed;
        for (let mapping of mappings) {
            number = convert(number, mapping);
        }
        minLocation = Math.min(minLocation, number);
    }

    return minLocation;
};

const partTwo = (input: string): number => {
    const {seeds, mappings} = parseInput(input);

    let ranges: Range[] = [];
    for (let i = 0; i < seeds.length; i += 2) {
        ranges.push({start: seeds[i], end: seeds[i] + seeds[i + 1] - 1});
    }

    for (let mapping of mappings) {
        const newRanges: Range[] = [];
        while (ranges.length > 0) {
            const seed = ranges.shift()!;

            let notChanged = true;
            for (let row of mapping) {
                const map: Range = {start: row[1], end: row[1] + row[2] - 1};
                const move = row[0] - row[1];
                if (seed.start > map.end || map.start > seed.end) continue;

                if (seed.start >= map.start && seed.end <= map.end) {
                    newRanges.push({start: seed.start + move, end: seed.end + move});
                    notChanged = false;
                    break;
                }

                if (seed.start >= map.start && seed.end > map.end) {
                    newRanges.push({start: seed.start + move, end: map.end + move});
                    ranges.push({start: map.end + 1, end: seed.end});
                    notChanged = false;
                    break;
                }

                if (seed.start < map.start && seed.end <= map.end) {
                    newRanges.push({start: map.start + move, end: seed.end + move});
                    ranges.push({start: seed.start, end: map.start - 1});
                    notChanged = false;
                    break;
                }

                if (seed.start < map.start && seed.end > map.end) {
                    newRanges.push({start: map.start + move, end: map.end + move});
                    ranges.push({start: seed.start, end: map.start - 1});
                    ranges.push({start: map.end + 1, end: seed.end});
                    notChanged = false;
                    break;
                }

                throw Error(`This shouldn't have happened`);
            }

            if (notChanged) newRanges.push(seed);
        }

        ranges = ranges.concat(newRanges);
    }

    let minLocation = ranges[0].start;

    for (let range of ranges) minLocation = Math.min(minLocation, range.start);

    return minLocation;
};

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 35, 'part1');
console.assert(partTwo(testInput) === 46, 'part2');
