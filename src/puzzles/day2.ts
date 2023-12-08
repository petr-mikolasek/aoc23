import {input, testInput} from '../inputs/day2';

type RGB = {[color: string]: number};
const bag: RGB = {red: 12, green: 13, blue: 14};

function partOneAndTwo(input: string, power = false): number {
    let sum = 0;

    input.split('\n').forEach((line) => {
        const game = line.split(/: |; /g);
        const minCubes: RGB = {red: 0, green: 0, blue: 0};
        for (let i = 1; i < game.length; i++) {
            game[i].split(', ').forEach((cube) => {
                const cubeInfo = cube.split(' ');
                minCubes[cubeInfo[1]] = Math.max(minCubes[cubeInfo[1]], parseInt(cubeInfo[0]));
            });
        }

        if (power) {
            sum += minCubes.red * minCubes.green * minCubes.blue;
        } else {
            if (minCubes.red <= bag.red && minCubes.green <= bag.green && minCubes.blue <= bag.blue) {
                sum += parseInt(game[0].split(' ')[1]);
            }
        }
    });

    return sum;
}

console.time('doSomething');

console.log(partOneAndTwo(input));
console.log(partOneAndTwo(input, true));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOneAndTwo(testInput) === 8, 'part1');
console.assert(partOneAndTwo(testInput, true) === 2286, 'part2');
