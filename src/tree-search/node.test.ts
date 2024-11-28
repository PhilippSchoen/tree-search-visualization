
import {Node} from "./node";

describe('Node', () => {
    test('New node should have a depth of 0', () => {
        const node = new MockNode(5);
        expect(node.depth).toBe(0);
    });

    test('Deep child node should have the correct depth', () => {
        const node = new MockNode(5);
        const childNodes = node.expand();
        const deepChild = childNodes[0].expand()[0];
        expect(deepChild.depth).toBe(2);
        expect(node.depth).toBe(0);
    });
});

class MockNode extends Node<number> {
    constructor(state: number, parent?: Node<number>, cost: number = 0) {
        super(state, parent, cost);
    }

    expand(): MockNode[] {
        return [new MockNode(1, this)];
    }

    isGoalState(goal: number): boolean {
        return goal === this.state;
    }

    get solution(): number[] {
        return [this.state];
    }

    printSolution() {
        console.log(this.solution);
    }
}