import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";
import {GreedyBestFirstSearch} from "../greedy-best-first-search/greedy-best-first-search";
import {LocationProblem} from "../../problems/location-problem/location-problem";
import {Location} from "../../problems/location-problem/location";
import {AStarSearch} from "./a-star-search";
import {BreadthFirstSearch} from "../breadth-first-search/breadth-first-search";
import {PathfindingProblem} from "../../problems/pathfinding-problem/pathfinding-problem";
import {Position} from "../../problems/pathfinding-problem/position";

describe('AStarSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new AStarSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(node.state).toEqual(Location.Istanbul);
    });

    test('Search should find a perfect solution if initial state is goal state', () => {
        const agent = new AStarSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Berlin));
        expect(node.state).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find a solution to its direct neighbor', () => {
        const agent = new AStarSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Paris));
        expect(node.state).toEqual(Location.Paris);
        expect(node.depth).toBe(1);
    });

    test('Search should not find an impossible path', () => {
        const agent = new AStarSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Mars));
        expect(node).toBeUndefined();
    });

    test('Search should support different search problems', () => {
        const agent = new AStarSearch();
        const problem = new MockProblem("A", "Z");
        const node = agent.search(problem);
        expect(node.state).toEqual("A");
    });

    test('Search should expand the node with the lowest cost + heuristic first', () => {
        const agent = new AStarSearch();
        const problem = new MockProblem("A", "Z");
        const node = agent.search(problem);
        expect(node.state).toEqual("A");
        expect(node.parent.state).toEqual("C");
        expect(node.parent.parent.state).toEqual("Z");
    });

    test('Weighted A* should prioritize heuristic over cost', () => {
       const agent = new AStarSearch(20);
         const problem = new MockProblem("A", "Z");
        const node = agent.search(problem);
        expect(node.state).toEqual("A");
        expect(node.parent.state).toEqual("B");
        expect(node.parent.parent.state).toEqual("Z");
    });

    test('Search should work with step search', () => {
        const agent = new AStarSearch();
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
        const agent = new AStarSearch();
        let state = agent.startStepSearch(new MockProblem("A", "Z"));
        expect(state.frontier.length).toBe(1);
        expect(state.explored.length).toBe(1);
        expect(state.solution).toBeUndefined();
        while(!state.solution) {
            state = agent.searchStep();
        }
        expect(state.explored.length).toBe(4);
        expect(state.solution.state).toEqual("A");
        expect(state.solution.depth).toBe(2);

        state = agent.startStepSearch(new LocationProblem(Location.Berlin, Location.Istanbul));
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

    test('Search should use both cost and heuristic to calculate f value', () => {
        const agent = new AStarSearch();
        const problem = new PathfindingProblem(new Position(0, 0), new Position(2, 2));
        const node = agent.startStepSearch(problem);
        let state = agent.searchStep();
        while(!state.solution) {
            state = agent.searchStep();
        }
        expect(agent.explored.length).toBe(17);
    });
});

class MockNode extends Node<string> {

    constructor(public override state: string, public override goalState: string, public override parent?: MockNode, public override cost: number = 1, public override heuristic: number = 0) {
        super(state, goalState, parent, cost, heuristic);
    }

    expand(): MockNode[] {
        if(this.state === "Z") {
            return [new MockNode("B", this.goalState, this, 20, 0), new MockNode("C", this.goalState, this, 2, 2), new MockNode("D", this.goalState, this, 0, 20)];
        }
        return [new MockNode("A", this.goalState, this, 1, 3), new MockNode("B", this.goalState, this, 1, 7), new MockNode("C", this.goalState, this, 20, 5)];
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