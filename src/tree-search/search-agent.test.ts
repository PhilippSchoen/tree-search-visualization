import {SearchAgent} from "./search-agent";
import {LocationNode} from "../problems/location-problem/location-node";
import {Location} from "../problems/location-problem/location";

describe('SearchAgent', () => {
    test('searchWithLogs should find the same solution as search', () => {
        const agent = new MockSearch();
        let node = agent.search(1);
        let nodeWithLogs = agent.searchWithLogs(1);

        expect(node.location).toEqual(nodeWithLogs.location);
        while(node) {
            expect(node.location).toEqual(nodeWithLogs.location);
            node = node.parent;
            nodeWithLogs = nodeWithLogs.parent;
        }
    });
});

class MockSearch extends SearchAgent<number> {
    search(problem: number): LocationNode {
        return new LocationNode(Location.Berlin);
    }
}