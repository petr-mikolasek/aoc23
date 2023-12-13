import {input, testInput} from '../inputs/day11';
import {Coordinate, manhattanDistanceBetween} from '../stuff';

function partOneAndTwo(input: string, expansion: number): number {
    const map: string[] = input.split('\n');

    const galaxies: Coordinate[] = [];
    for (let y = 0; y < map.length; y++) {
        let matches = map[y].matchAll(/#/g);
        for (let m of matches) {
            galaxies.push({x: m.index!, y});
        }
    }

    const emptyRows: number[] = [];
    map.forEach((line, y) => {
        if (/^\.+$/.test(line)) emptyRows.push(y);
    });

    const emptyColumns: number[] = [];
    for (let x = 0; x < map[0].length; x++) {
        let empty = true;
        for (let y = 0; y < map.length; y++) {
            if (map[y][x] === '#') {
                empty = false;
                break;
            }
        }
        if (empty) emptyColumns.push(x);
    }

    emptyRows.reverse().forEach((row) => {
        galaxies.forEach((galaxy) => {
            if (galaxy.y > row) galaxy.y += expansion - 1;
        });
    });

    emptyColumns.reverse().forEach((column) => {
        galaxies.forEach((galaxy) => {
            if (galaxy.x > column) galaxy.x += expansion - 1;
        });
    });

    let distances = 0;
    while (galaxies.length > 0) {
        const currentGalaxy = galaxies.shift()!;
        for (let otherGalaxy of galaxies) distances += manhattanDistanceBetween(currentGalaxy, otherGalaxy);
    }

    return distances;
}

console.time('doSomething');

console.log(partOneAndTwo(input, 2));
console.log(partOneAndTwo(input, 1000000));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOneAndTwo(testInput, 2) === 374, 'part1');
console.assert(partOneAndTwo(testInput, 10) === 1030, 'part2.1');
console.assert(partOneAndTwo(testInput, 100) === 8410, 'part2.2');
