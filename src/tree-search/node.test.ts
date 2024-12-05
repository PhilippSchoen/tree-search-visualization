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

    test('cost is calculated correctly', () => {
       let node = new MockNode(5, 500);
       expect(node.cost).toBe(1);

       node = new MockNode(5, 500, undefined, 5);
       expect(node.cost).toBe(5);
    });

    test('cost is calculated correctly for child nodes', () => {
        const node = new MockNode(5, 500);
        const childNodes = node.expand();
        expect(childNodes[0].cost).toBe(2);
        expect(childNodes[0].parent.cost).toBe(1);
        const deepChild = childNodes[0].expand()[0];
        expect(deepChild.cost).toBe(3);

        const expensiveNode = new MockNode(5, 500, undefined, 5);
        const expensiveChildNodes = expensiveNode.expand();
        expect(expensiveChildNodes[0].cost).toBe(6);
    });
});

class MockNode extends Node<number> {
    constructor(state: number, goalState: number, parent?: Node<number>, cost: number = 1) {
        super(state, goalState, parent, cost);
    }

    expand(): MockNode[] {
        return [new MockNode(1, this.goalState, this)];
    }

    isGoalState(): boolean {
        return this.goalState === this.state;
    }

    override get solution(): number[] {
        return [this.state];
    }

    printSolution() {
        console.log(this.solution);
    }
}