import {SearchAgent} from "./search-agent";
import {LocationNode} from "../problems/location-problem/location-node";
import {Location} from "../problems/location-problem/location";
import {Node} from "./node";

describe('SearchAgent', () => {
    test('searchWithLogs should find the same solution as search', () => {
        const agent = new MockSearch();
        let node = agent.search(1);
        let nodeWithLogs = agent.searchWithLogs(1);

        expect(node.state).toEqual(nodeWithLogs.state);
        while(node) {
            expect(node.state).toEqual(nodeWithLogs.state);
            node = node.parent;
            nodeWithLogs = nodeWithLogs.parent;
        }
    });
});

class MockSearch extends SearchAgent<number, MockNode> {
    search(problem: number): MockNode {
        return new MockNode(5);
    }
}

class MockNode extends Node<number> {

    constructor(public state: number, public parent?: MockNode, public depth: number = 0) {
        super(state, parent, depth);
    }

    expand(): MockNode[] {
        return [];
    }

    isGoalState(goal: number): boolean {
        return false;
    }

    printSolution(): void {
    }

    get solution(): number[] {
        return [];
    }

}