import {Location} from "../../problems/location-problem/location";
import {DepthFirstSearch} from "./depth-first-search";
import {BreadthFirstSearch} from "../breadth-first-search/breadth-first-search";
import {UniformCostSearch} from "../uniform-cost-search/uniform-cost-search";
import {DepthLimitedSearch} from "../depth-limited-search/depth-limited-search";
import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";
import {LocationProblem} from "../../problems/location-problem/location-problem";

describe('DepthFirstSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new DepthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(node.state).toEqual(Location.Istanbul);
    });

    test('Search should support different search problems', () => {
        const agent = new DepthFirstSearch();
        const problem = new MockProblem("A", "Z");
        const node = agent.search(problem);
        expect(node.state).toEqual("A");
        expect(node.parent.state).toEqual("Z");
    });

    test('Search should find the optimal path if initial state is goal state', () => {
        const agent = new DepthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Berlin));
        expect(node.state).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find a path to its direct neighbor', () => {
        const agent = new DepthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.London));
        expect(node.state).toEqual(Location.London);
    });

    test('Search should not find an impossible path', () => {
        const agent = new DepthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Mars));
        expect(node).toBeUndefined();
    });

});

class MockNode extends Node<string> {

    constructor(public state: string, public goalState: string, public parent?: MockNode, public depth: number = 0) {
        super(state, goalState, parent, depth);
    }

    expand(): MockNode[] {
        return [new MockNode("A", this.goalState, this), new MockNode("B", this.goalState, this), new MockNode("C", this.goalState, this)];
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