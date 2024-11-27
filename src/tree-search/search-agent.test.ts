import {SearchAgent} from "./search-agent";
import {Node} from "../problems/node";
import {Location} from "../problems/location";

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
    search(problem: number): Node {
        return new Node(Location.Berlin);
    }
}