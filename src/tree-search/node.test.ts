import {Node} from "./node";
import {LocationNode} from "../problems/location-problem/location-node";
import {Location} from "../problems/location-problem/location";

describe('Node', () => {
    test('New node should have a depth of 0', () => {
        const node = new MockNode(5, 5);
        expect(node.depth).toBe(0);
    });

    test('Deep child node should have the correct depth', () => {
        const node = new MockNode(5, 6);
        const childNodes = node.expand();
        const deepChild = childNodes[0].expand()[0];
        expect(deepChild.depth).toBe(2);
        expect(node.depth).toBe(0);
    });

    test("solution should return the node's solution path, with the goal state being the last element", () => {
        const node = new LocationNode(Location.Berlin, Location.London);
        const parent1 = new LocationNode(Location.Paris, Location.London, node);
        const parent2 = new LocationNode(Location.London, Location.London, parent1);

        expect(parent2.solution).toEqual([Location.Berlin, Location.Paris, Location.London]);
    });
});

class MockNode extends Node<number> {
    constructor(state: number, goalState: number, parent?: Node<number>, cost: number = 0) {
        super(state, goalState, parent, cost);
    }

    expand(): MockNode[] {
        return [new MockNode(1, this.goalState, this)];
    }

    isGoalState(): boolean {
        return this.goalState === this.state;
    }

    get solution(): number[] {
        return [this.state];
    }

    printSolution() {
        console.log(this.solution);
    }
}