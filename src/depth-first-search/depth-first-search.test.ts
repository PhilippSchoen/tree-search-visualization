import {Location} from "../problems/location-problem/location";
import {DepthFirstSearch} from "./depth-first-search";
import {BreadthFirstSearch} from "../breadth-first-search/breadth-first-search";
import {UniformCostSearch} from "../uniform-cost-search/uniform-cost-search";

describe('DepthFirstSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new DepthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        expect(node.location).toEqual(Location.Istanbul);
    });

    test('Search should find the optimal path if initial state is goal state', () => {
        const agent = new DepthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Berlin});
        expect(node.location).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find a path to its direct neighbor', () => {
        const agent = new DepthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.London});
        expect(node.location).toEqual(Location.London);
    });

    test('Search should not find an impossible path', () => {
        const agent = new DepthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Mars});
        expect(node).toBeUndefined();
    });

});