import {countBy, isEqual, values} from 'lodash';
import {input, testInput} from '../inputs/day7';

type Hand = {cards: number[]; bid: number; type: number};

function convertCard(card: string, joker = false): number {
    switch (card) {
        case 'A':
            return 14;
        case 'K':
            return 13;
        case 'Q':
            return 12;
        case 'J':
            if (joker) return 1;
            else return 11;
        case 'T':
            return 10;
        default:
            return parseInt(card);
    }
}

function convertCards(cards: string, joker = false): number[] {
    const convertedCards: number[] = [];

    for (let card of cards) {
        convertedCards.push(convertCard(card, joker));
    }

    return convertedCards;
}

function getType(cards: number[], joker = false): number {
    let countsByCard = countBy(cards);

    let jokerCount = 0;

    if (joker) {
        jokerCount = countsByCard[1];
        countsByCard[1] = 0;
    }

    const counts = values(countsByCard).sort((a, b) => b - a);

    if (jokerCount) {
        counts[0] += jokerCount;
    }

    switch (counts[0]) {
        case 5:
            return 6;
        case 4:
            return 5;
        case 3:
            if (counts[1] === 2) return 4;
            else return 3;
        case 2:
            if (counts[1] === 2) return 2;
            else return 1;
        case 1:
            return 0;
        default:
            throw Error(`This shouldn't have happened`);
    }
}

function parseHand(handIn: string, joker = false): Hand {
    const splitHand = handIn.split(' ');
    const cardsAsNumbers = convertCards(splitHand[0], joker);

    return {
        cards: cardsAsNumbers,
        bid: parseInt(splitHand[1]),
        type: getType(cardsAsNumbers, joker),
    };
}

function compareHands(h1: Hand, h2: Hand): number {
    if (h1.type !== h2.type) return h1.type - h2.type;

    for (let i = 0; i < 5; i++) {
        if (h1.cards[i] !== h2.cards[i]) return h1.cards[i] - h2.cards[i];
    }

    return 0;
}

function partOneAndTwo(input: string, joker = false): number {
    const hands: Hand[] = input.split('\n').map((row) => parseHand(row, joker));

    hands.sort((h1, h2) => compareHands(h1, h2));

    let winnings = 0;
    for (let i = 0; i < hands.length; i++) {
        winnings += (i + 1) * hands[i].bid;
    }

    return winnings;
}

console.time('doSomething');

console.log(partOneAndTwo(input));
console.log(partOneAndTwo(input, true));

console.timeEnd('doSomething');

// tests
console.assert(input, 'Input is empty');
console.assert(partOneAndTwo(testInput) === 6440, 'part1');
console.assert(partOneAndTwo(testInput, true) === 5905, 'part2');
console.assert(isEqual(convertCards('4AQJT'), [4, 14, 12, 11, 10]), 'convertVards');
console.assert(getType([4, 14, 12, 11, 10]) === 0, 'getType 0');
console.assert(getType([6, 10, 10, 11, 10]) === 3, 'getType 3');
console.assert(getType([6, 10, 10, 11, 6]) === 2, 'getType 2');
console.assert(getType([6, 10, 10, 1, 6], true) === 4, 'getType with joker 4');
