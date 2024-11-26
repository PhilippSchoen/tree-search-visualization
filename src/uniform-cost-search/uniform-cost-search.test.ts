import {Location} from "../problem/location";
import {UniformCostSearch} from "./uniform-cost-search";
import {BreadthFirstSearch} from "../breadth-first-search/breadth-first-search";

describe('UniformCostSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new UniformCostSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        expect(node.location).toEqual(Location.Istanbul);
    });

    test('Search should find a perfect solution if initial state is goal state', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Berlin});
        expect(node.location).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find a solution to its direct neighbor', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Paris});
        expect(node.location).toEqual(Location.Paris);
    });

    test('Search should not find an impossible path', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Mars});
        expect(node).toBeUndefined();
    });

    test('searchWithLogs should find the same solution as search', () => {
        const agent = new UniformCostSearch();
        let node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        let nodeWithLogs = agent.searchWithLogs({initialState: Location.Berlin, goalState: Location.Istanbul});

        expect(node.location).toEqual(nodeWithLogs.location);
        while(node) {
            expect(node.location).toEqual(nodeWithLogs.location);
            node = node.parent;
            nodeWithLogs = nodeWithLogs.parent;
        }
    });
});