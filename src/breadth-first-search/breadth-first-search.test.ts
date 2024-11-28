import {BreadthFirstSearch} from "./breadth-first-search";
import {Location} from "../problems/location-problem/location";
import {LocationProblem} from "../problems/location-problem/location-problem";
import {Node} from "../tree-search/node";
import {SearchProblem} from "../problems/search-problem";


describe('BreadthFirstSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(node.state).toEqual(Location.Istanbul);
    });

    test('Search should support different search problems', () => {
        const agent = new BreadthFirstSearch();
        const problem = new MockProblem(1, 5);
        const node = agent.search(problem);
        expect(node.state).toEqual(1);
        expect(node.parent.state).toEqual(5);
    });

    test('Search should find the optimal path from Berlin to Istanbul', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(node.parent.parent.parent.parent.parent).toBeUndefined();
        expect(node.parent.parent.parent.parent.state).toEqual(Location.Berlin);
        expect(node.parent.parent.parent.state).toEqual(Location.Vienna);
        expect(node.parent.parent.state).toEqual(Location.Budapest);
        expect(node.parent.state).toEqual(Location.Bucharest);
        expect(node.state).toEqual(Location.Istanbul);
    });

    test('Search should find the optimal path if initial state is goal state', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Berlin));
        expect(node.state).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find the optimal path to its direct neighbor', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Paris));
        expect(node.state).toEqual(Location.Paris);
        expect(node.parent.state).toEqual(Location.Berlin);
        expect(node.parent.parent).toBeUndefined();
    });

    test('Search should not find an impossible path', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Mars));
        expect(node).toBeUndefined();
    });

});

class MockNode extends Node<number> {

    constructor(public state: number, public parent?: MockNode, public depth: number = 0) {
        super(state, parent, depth);
    }

    expand(): MockNode[] {
        return [new MockNode(1, this), new MockNode(2, this), new MockNode(3, this)];
    }

    isGoalState(goal: number): boolean {
        return goal === this.state;
    }

    printSolution(): void {
    }

    get solution(): number[] {
        return [];
    }

}

class MockProblem extends SearchProblem<number, MockNode> {

    constructor(public goalState: number, public initialState: number) {
        super();
    }

    createNode(state: number): MockNode {
        return new MockNode(state);
    }

}