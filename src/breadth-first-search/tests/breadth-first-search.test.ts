import {BreadthFirstSearch} from "../breadth-first-search";
import {Location} from "../problem/location";


describe('BreadthFirstSearch', () => {
    test('Search should find a path from Berlin to Istanbul', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        expect(node.location).toEqual(Location.Istanbul);
    });

    test('Search should find the optimal path from Berlin to Istanbul', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
        expect(node.parent.parent.parent.parent).toBeUndefined();
        expect(node.parent.parent.parent.location).toEqual(Location.Berlin);
        expect(node.parent.parent.location).toEqual(Location.Vienna);
        expect(node.parent.location).toEqual(Location.Budapest);
        expect(node.location).toEqual(Location.Istanbul);
    });

    test('Search should not find an impossible path', () => {
        const agent = new BreadthFirstSearch();
        const node = agent.search({initialState: Location.Berlin, goalState: Location.Mars});
        expect(node).toBeUndefined();
    });
});