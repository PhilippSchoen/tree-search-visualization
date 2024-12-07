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

    test('Search should work with step search', () => {
       const agent = new BreadthFirstSearch();
       let state = agent.startStepSearch(new LocationProblem(Location.Berlin, Location.Istanbul));
       expect(state.frontier.length).toBe(1);
       expect(state.explored.length).toBe(1);
       expect(state.solution).toBeUndefined();
       while(!state.solution) {
           state = agent.searchStep();
       }
       expect(state.explored.length).toBe(7);
       expect(state.solution.state).toEqual(Location.Istanbul);
       expect(state.solution.depth).toBe(4);
    });

    test('Step search should work with different search problems', () => {
        const agent = new BreadthFirstSearch();
        let state = agent.startStepSearch(new MockProblem("A", "Z"));
        expect(state.frontier.length).toBe(1);
        expect(state.explored.length).toBe(1);
        expect(state.solution).toBeUndefined();
        while(!state.solution) {
            state = agent.searchStep();
        }
        expect(state.frontier.length).toBe(0);
        expect(state.explored.length).toBe(1);
        expect(state.solution.state).toEqual("A");
        expect(state.solution.depth).toBe(1);

        state = agent.startStepSearch(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(state.frontier.length).toBe(1);
        expect(state.explored.length).toBe(1);
        expect(state.solution).toBeUndefined();
        while(!state.solution) {
            state = agent.searchStep();
        }
        expect(state.frontier.length).toBe(0);
        expect(state.explored.length).toBe(7);
        expect(state.solution.state).toEqual(Location.Istanbul);
        expect(state.solution.depth).toBe(4);
    });

});

class MockNode extends Node<string> {

    constructor(public override state: string, public override goalState: string, public override parent?: MockNode) {
        super(state, goalState, parent);
    }

    expand(): MockNode[] {
        return [new MockNode("A", this.goalState, this), new MockNode("B", this.goalState, this), new MockNode("C", this.goalState, this)];
    }

    isGoalState(): boolean {
        return this.goalState === this.state;
    }

    printSolution(): void {
    }

    override get solution(): string[] {
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