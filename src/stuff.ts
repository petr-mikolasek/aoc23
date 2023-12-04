export type Coordinate = {x: number; y: number};

export const binaryIntoDec = (arrayBin: Array<number>): number => {
    let arrayLength = arrayBin.length;
    let decimalNumber = 0;
    for (let i = 0; i < arrayLength; i++) {
        decimalNumber += arrayBin[i] * 2 ** (arrayLength - 1 - i);
    }
    return decimalNumber;
};

export const parseCoordinate = (entry: string): Coordinate => {
    let splitEntry = entry.split(',');
    return {x: parseInt(splitEntry[0]), y: parseInt(splitEntry[1])};
};

export const getNeighbors = (point: Coordinate, width: number, height: number, diag: boolean): Coordinate[] => {
    let possibleMoves: Coordinate[] = [];
    if (point.x < 0 || point.y < 0 || point.x >= width || point.y >= height)
        throw console.error('Coordinate out of grid.');

    if (point.x > 0 && point.y > 0 && diag) possibleMoves.push({x: point.x - 1, y: point.y - 1});
    if (point.x > 0) possibleMoves.push({x: point.x - 1, y: point.y});
    if (point.x > 0 && point.y < height - 1 && diag) possibleMoves.push({x: point.x - 1, y: point.y + 1});
    if (point.y > 0) possibleMoves.push({x: point.x, y: point.y - 1});
    if (point.y < height - 1) possibleMoves.push({x: point.x, y: point.y + 1});
    if (point.x < width - 1 && point.y > 0 && diag) possibleMoves.push({x: point.x + 1, y: point.y - 1});
    if (point.x < width - 1) possibleMoves.push({x: point.x + 1, y: point.y});
    if (point.x < width - 1 && point.y < height - 1 && diag) possibleMoves.push({x: point.x + 1, y: point.y + 1});

    return possibleMoves;
};

export const distanceBetween = (loc1: Coordinate, loc2: Coordinate): number => {
    return Math.sqrt((loc1.x - loc2.x) ** 2 + (loc1.y - loc2.y) ** 2);
};

export const manhattanDistanceBetween = (loc1: Coordinate, loc2: Coordinate): number => {
    return Math.abs(loc1.x - loc2.x) + Math.abs(loc1.y - loc2.y);
};

console.assert(distanceBetween({x: -1, y: 1}, {x: -1, y: 1}) == 0);
console.assert(distanceBetween({x: 0, y: 0}, {x: 3, y: 4}) == 5);
console.assert(distanceBetween({x: -2, y: 1}, {x: 1, y: -3}) == 5);

console.assert(manhattanDistanceBetween({x: -1, y: 1}, {x: -1, y: 1}) == 0);
console.assert(manhattanDistanceBetween({x: 0, y: 0}, {x: 3, y: 4}) == 7);
console.assert(manhattanDistanceBetween({x: -2, y: 1}, {x: 1, y: -3}) == 7);