import {BreadthFirstSearch} from "./breadth-first-search";
import {Location} from "../problems/location-problem/location";
import {UniformCostSearch} from "../uniform-cost-search/uniform-cost-search";
import {LocationProblem} from "../problems/location-problem/location-problem";


describe('BreadthFirstSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search(new LocationProblem(Location.Berlin, Location.Istanbul));
        expect(node.state).toEqual(Location.Istanbul);
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