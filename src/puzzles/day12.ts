import {input, testInput} from '../inputs/day12';

type SpringRecord = {s: string; g: number[]};

function placeSprings(record: SpringRecord, pos: number, index: number, solved: number[][]): number {
    for (let s of solved) {
        if (s[0] === pos && s[1] === index) return s[2];
    }

    let arrs = 0;
    for (
        let move = 0;
        pos + move < record.s.length - record.g.reduce((a, v, i) => (i >= index ? a + v + 1 : a), 0) + 2;
        move++
    ) {
        if (record.s[move + pos - 1] && record.s[move + pos - 1] === '#') break;
        if (
            /^[?#]+$/.test(record.s.substring(move + pos, move + pos + record.g[index])) &&
            (!record.s[move + pos + record.g[index]] || record.s[move + pos + record.g[index]] !== '#')
        ) {
            if (index < record.g.length - 1) {
                arrs += placeSprings(record, move + pos + record.g[index] + 1, index + 1, solved);
            } else if (!/#/.test(record.s.substring(move + pos + record.g[index]))) {
                arrs++;
            }
        }
    }

    solved.push([pos, index, arrs]);
    return arrs;
}

function partOne(input: string): number {
    const records: SpringRecord[] = input.split('\n').map((row) => {
        return {s: row.split(' ')[0], g: row.split(' ')[1].split(',').map(Number)};
    });
    let arrangements = 0;

    for (let r of records) arrangements += placeSprings(r, 0, 0, []);

    return arrangements;
}

function partTwo(input: string): number {
    const records: SpringRecord[] = input.split('\n').map((row) => {
        return {
            s: row.split(' ')[0].concat('?').repeat(5).slice(0, -1),
            g: row.split(' ')[1].concat(',').repeat(5).slice(0, -1).split(',').map(Number),
        };
    });

    let arrangements = 0;

    for (let i = 0; i < records.length; i++) {
        arrangements += placeSprings(records[i], 0, 0, []);
    }

    return arrangements;
}

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 21, 'part1');
console.assert(partTwo(testInput) === 525152, 'part2');
