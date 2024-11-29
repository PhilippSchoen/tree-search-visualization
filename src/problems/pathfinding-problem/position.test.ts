import {Position} from "./position";

describe('Position', () => {
    test('equals should return true if x and y are the same', () => {
        const position1 = new Position(1, 2);
        const position2 = new Position(1, 2);
        expect(position1.equals(position2)).toBe(true);
    });

    test('equals should return false if both x and y are different', () => {
        const position1 = new Position(1, 2);
        const position2 = new Position(2, 1);
        expect(position1.equals(position2)).toBe(false);
    });

    test('equals should return false if only x is different', () => {
        const position1 = new Position(1, 2);
        const position2 = new Position(2, 2);
        expect(position1.equals(position2)).toBe(false);
    });

    test('equals should return false if second position is undefined', () => {
        const position1 = new Position(1, 2);
        expect(position1.equals(undefined)).toBe(false);
    });
});