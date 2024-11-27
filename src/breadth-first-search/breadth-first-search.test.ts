import {BreadthFirstSearch} from "./breadth-first-search";
import {Location} from "../problems/location";
import {UniformCostSearch} from "../uniform-cost-search/uniform-cost-search";


describe('BreadthFirstSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        expect(node.location).toEqual(Location.Istanbul);
    });

    test('Search should find the optimal path from Berlin to Istanbul', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        expect(node.parent.parent.parent.parent.parent).toBeUndefined();
        expect(node.parent.parent.parent.parent.location).toEqual(Location.Berlin);
        expect(node.parent.parent.parent.location).toEqual(Location.Vienna);
        expect(node.parent.parent.location).toEqual(Location.Budapest);
        expect(node.parent.location).toEqual(Location.Bucharest);
        expect(node.location).toEqual(Location.Istanbul);
    });

    test('Search should find the optimal path if initial state is goal state', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Berlin});
        expect(node.location).toEqual(Location.Berlin);
        expect(node.parent).toBeUndefined();
    });

    test('Search should find the optimal path to its direct neighbor', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Paris});
        expect(node.location).toEqual(Location.Paris);
        expect(node.parent.location).toEqual(Location.Berlin);
        expect(node.parent.parent).toBeUndefined();
    });

    test('Search should not find an impossible path', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Mars});
        expect(node).toBeUndefined();
    });

});