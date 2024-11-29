import {LocationProblem} from "../../problems/location-problem/location-problem";
import {Location} from "../../problems/location-problem/location";
import {GreedyBestFirstSearch} from "./greedy-best-first-search";
import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";

describe('GreedyBestFirstSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new GreedyBestFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(node.state).toEqual(Location.Istanbul);
    });

    test('Search should find a perfect solution if initial state is goal state', () => {
        const agent = new GreedyBestFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Berlin));
        expect(node.state).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find a solution to its direct neighbor', () => {
        const agent = new GreedyBestFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Paris));
        expect(node.state).toEqual(Location.Paris);
    });

    test('Search should not find an impossible path', () => {
        const agent = new GreedyBestFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Mars));
        expect(node).toBeUndefined();
    });

    test('Search should support different search problems', () => {
        const agent = new GreedyBestFirstSearch();
        const problem = new MockProblem("A", "Z");
        const node = agent.search(problem);
        expect(node.state).toEqual("A");
    });

    test('Search should expand the node with the lowest heuristic first', () => {
        const agent = new GreedyBestFirstSearch();
        const problem = new MockProblem("A", "Z");
        const node = agent.search(problem);
        expect(node.state).toEqual("A");
        expect(node.parent.state).toEqual("B");
        expect(node.parent.parent.state).toEqual("Z");
    });
});

class MockNode extends Node<string> {

    constructor(public state: string, public goalState: string, public parent?: MockNode, public cost: number = 0, public heuristic: number = 0) {
        super(state, goalState, parent, cost, heuristic);
    }

    expand(): MockNode[] {
        if(this.state === "Z") {
            return [new MockNode("B", this.goalState, this, 0, 5), new MockNode("C", this.goalState, this, 0, 7)];
        }
        return [new MockNode("A", this.goalState, this, 0, 3), new MockNode("B", this.goalState, this, 0, 7), new MockNode("C", this.goalState, this, 0, 5)];
    }

    isGoalState(): boolean {
        return this.goalState === this.state;
    }

    printSolution(): void {
    }

    get solution(): string[] {
        return [];
    }

}

class MockProblem extends SearchProblem<string, MockNode> {

    constructor(public goalState: string, public initialState: string) {
        super();
    }

    createNode(state: string, goalState: string): MockNode {
        return new MockNode(state, goalState);
    }

}