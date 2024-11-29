import {BreadthFirstSearch} from "./breadth-first-search";
import {Location} from "../../problems/location-problem/location";
import {LocationProblem} from "../../problems/location-problem/location-problem";
import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";

// TODO: Cover object problem with tests

describe('BreadthFirstSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(node.state).toEqual(Location.Istanbul);
    });

    test('Search should support different search problems', () => {
        const agent = new BreadthFirstSearch();
        const problem = new MockProblem("A", "Z");
        const node = agent.search(problem);
        expect(node.state).toEqual("A");
        expect(node.parent.state).toEqual("Z");
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