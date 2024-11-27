import {Location} from "../problems/location-problem/location";
import {DepthLimitedSearch} from "./depth-limited-search";

describe('DepthLimitedSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new DepthLimitedSearch(10);
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        expect(node.location).toEqual(Location.Istanbul);
    });

    test('Search should find the optimal path if initial state is goal state', () => {
        const agent = new DepthLimitedSearch(10);
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Berlin});
        expect(node.location).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find a solution to its direct neighbor', () => {
        const agent = new DepthLimitedSearch(10);
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Paris});
        expect(node.location).toEqual(Location.Paris);
        expect(node.parent.location).toEqual(Location.Berlin);
        expect(node.parent.parent).toBeUndefined();
    });

    test('Search should not find an impossible path', () => {
        const agent = new DepthLimitedSearch(10);
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Mars});
        expect(node).toBeUndefined();
    });

    test('Search should not find a path if limit is too low', () => {
        const agent = new DepthLimitedSearch(2);
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        expect(node).toBeUndefined();
    });
});