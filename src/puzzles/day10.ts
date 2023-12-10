import {input, otherTestInput, testInput, yetAnotherTestInput} from '../inputs/day10';
import {Coordinate} from '../stuff';

function connectedPipes(pipes: string[][], loc: Coordinate): Coordinate[] {
    switch (pipes[loc.y][loc.x]) {
        case '|':
            return [
                {x: loc.x, y: loc.y - 1},
                {x: loc.x, y: loc.y + 1},
            ];
        case '-':
            return [
                {x: loc.x - 1, y: loc.y},
                {x: loc.x + 1, y: loc.y},
            ];
        case 'L':
            return [
                {x: loc.x, y: loc.y - 1},
                {x: loc.x + 1, y: loc.y},
            ];
        case 'J':
            return [
                {x: loc.x, y: loc.y - 1},
                {x: loc.x - 1, y: loc.y},
            ];
        case '7':
            return [
                {x: loc.x, y: loc.y + 1},
                {x: loc.x - 1, y: loc.y},
            ];
        case 'F':
            return [
                {x: loc.x, y: loc.y + 1},
                {x: loc.x + 1, y: loc.y},
            ];
        default:
            throw Error(`This shouldn't have happened`);
    }
}

function partOneAndTwo(input: string): {maxDist: number; enclosedArea: number} {
    const pipes: string[][] = input.split('\n').map((line) => line.split(''));
    const distances: number[][] = new Array(pipes.length)
        .fill([])
        .map((l) => (l = new Array(pipes[0].length).fill(-1)));
    const queue: Coordinate[] = [];
    let maxDist = 1;

    for (let y = 0; y < pipes.length; y++) {
        for (let x = 0; x < pipes[0].length; x++) {
            if (pipes[y][x] === 'S') {
                distances[y][x] = 0;
                queue.push({x, y});

                let possibleStartPipes = ['|', '-', 'L', 'J', '7', 'F'];
                if (/-|F|L/.test(pipes[y][x - 1])) {
                    possibleStartPipes = possibleStartPipes.filter((pipe) => /-|J|7/.test(pipe));
                }
                if (/-|J|7/.test(pipes[y][x + 1])) {
                    possibleStartPipes = possibleStartPipes.filter((pipe) => /-|F|L/.test(pipe));
                }
                if (pipes[y - 1] && /\||F|7/.test(pipes[y - 1][x])) {
                    possibleStartPipes = possibleStartPipes.filter((pipe) => /\||J|L/.test(pipe));
                }
                if (pipes[y + 1] && /\||J|L/.test(pipes[y + 1][x])) {
                    possibleStartPipes = possibleStartPipes.filter((pipe) => /\||F|7/.test(pipe));
                }
                pipes[y][x] = possibleStartPipes[0];

                break;
            }
        }
    }

    while (queue.length > 0) {
        const loc = queue.shift()!;
        const currentDist = distances[loc.y][loc.x];
        const adjLocs = connectedPipes(pipes, loc);
        adjLocs.forEach((adjLoc) => {
            if (distances[adjLoc.y][adjLoc.x] === -1) {
                distances[adjLoc.y][adjLoc.x] = currentDist + 1;
                maxDist = Math.max(maxDist, currentDist + 1);
                queue.push(adjLoc);
            }
        });
    }

    // Part 2
    for (let y = 0; y < distances.length; y++) {
        for (let x = 0; x < distances[0].length; x++) {
            if (distances[y][x] === -1) pipes[y][x] = '.';
        }
    }

    let enclosedArea = 0;
    for (let y = 0; y < pipes.length; y++) {
        let line = pipes[y].join('');
        line = line.replace(/F-*J|L-*7/g, '|').replace(/F-*7|L-*J/g, '');
        const matches = line.match(/\|\.*\|/g);
        if (matches) for (let match of matches) enclosedArea += match.length - 2;
    }

    return {maxDist, enclosedArea};
}

console.time('doSomething');

const res = partOneAndTwo(input);
console.log(res.maxDist);
console.log(res.enclosedArea);

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOneAndTwo(testInput).maxDist === 8, 'part1');
console.assert(partOneAndTwo(testInput).enclosedArea === 1, 'part2.1');
console.assert(partOneAndTwo(otherTestInput).enclosedArea === 8, 'part2.2');
console.assert(partOneAndTwo(yetAnotherTestInput).enclosedArea === 10, 'part2.3');
