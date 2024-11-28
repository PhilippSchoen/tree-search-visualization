import {Location} from "../problems/location-problem/location";
import {UniformCostSearch} from "./uniform-cost-search";
import {BreadthFirstSearch} from "../breadth-first-search/breadth-first-search";
import {Node} from "../tree-search/node";
import {SearchProblem} from "../problems/search-problem";
import {LocationProblem} from "../problems/location-problem/location-problem";

describe('UniformCostSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new UniformCostSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(node.state).toEqual(Location.Istanbul);
    });

    test('Search should find a perfect solution if initial state is goal state', () => {
        const agent = new UniformCostSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Berlin));
        expect(node.state).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find a solution to its direct neighbor', () => {
        const agent = new UniformCostSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Paris));
        expect(node.state).toEqual(Location.Paris);
    });

    test('Search should not find an impossible path', () => {
        const agent = new UniformCostSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Mars));
        expect(node).toBeUndefined();
    });

    test('Search should support different search problems', () => {
        const agent = new UniformCostSearch();
        const problem = new MockProblem("A", "Z");
        const node = agent.search(problem);
        expect(node.state).toEqual("A");
        expect(node.parent.state).toEqual("Z");
    });

});

class MockNode extends Node<string> {

    constructor(public state: string, public parent?: MockNode, public depth: number = 0) {
        super(state, parent, depth);
    }

    expand(): MockNode[] {
        return [new MockNode("A", this), new MockNode("B", this), new MockNode("C", this)];
    }

    isGoalState(goal: string): boolean {
        return goal === this.state;
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

    createNode(state: string): MockNode {
        return new MockNode(state);
    }

}