import {remove} from 'lodash';
import {input, testInput} from '../inputs/day3';
import {Coordinate, getNeighbors} from '../stuff';

const partOne = (input: string): number => {
    const map: string[][] = input.split('\n').map((line) => line.split(''));
    const mapY = map.length;
    const mapX = map[0].length;
    let sum = 0;

    for (let y = 0; y < mapY; y++) {
        for (let x = 0; x < mapX; x++) {
            if (!/\d|\./.test(map[y][x])) {
                const neighbors = getNeighbors({x, y}, mapX, mapY, true);
                for (let n of neighbors) {
                    let point: Coordinate = {x: n.x, y: n.y};

                    if (!/\d/.test(map[point.y][point.x])) continue;

                    while (/\d/.test(map[point.y][point.x - 1])) {
                        point.x--;
                    }

                    let partNumber = '';
                    while (/\d/.test(map[point.y][point.x])) {
                        partNumber += map[point.y][point.x];
                        map[point.y][point.x] = '.';
                        point.x++;
                    }

                    sum += parseInt(partNumber);
                }
            }
        }
    }

    return sum;
};

const partTwo = (input: string): number => {
    const map: string[][] = input.split('\n').map((line) => line.split(''));
    const mapY = map.length;
    const mapX = map[0].length;
    let sum = 0;

    for (let y = 0; y < mapY; y++) {
        for (let x = 0; x < mapX; x++) {
            if (/\*/.test(map[y][x])) {
                const neighbors = getNeighbors({x, y}, mapX, mapY, true);
                const partNumbers: string[] = [];

                while (neighbors.length > 0) {
                    let point: Coordinate = neighbors.shift()!;

                    if (!/\d/.test(map[point.y][point.x])) continue;

                    while (/\d/.test(map[point.y][point.x - 1])) {
                        point.x--;
                    }

                    let partNumber = '';
                    while (/\d/.test(map[point.y][point.x])) {
                        partNumber += map[point.y][point.x];
                        remove(neighbors, point);
                        point.x++;
                    }
                    partNumbers.push(partNumber);
                }

                if (partNumbers.length === 2) sum += parseInt(partNumbers[0]) * parseInt(partNumbers[1]);
            }
        }
    }

    return sum;
};

console.time('doSomething');

console.log(partOne(input));
console.log(partTwo(input));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOne(testInput) === 4361, 'part1');
console.assert(partTwo(testInput) === 467835, 'part2');
