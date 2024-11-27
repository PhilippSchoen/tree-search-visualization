import {SearchProblem} from "../problems/location-problem/search-problem";
import {LocationNode} from "../problems/location-problem/location-node";
import {Location} from "../problems/location-problem/location";
import {SearchAgent} from "../tree-search/search-agent";

export class DepthFirstSearch extends SearchAgent<SearchProblem, LocationNode> {
    search(problem: SearchProblem): LocationNode {
        const explored: Location[] = [];
        const frontier: LocationNode[] = []
        frontier.push(new LocationNode(problem.initialState));
        explored.push(problem.initialState);
        let node: LocationNode;

        while(frontier.length > 0) {
            node = frontier.pop();
            if(node.isGoalState(problem.goalState)) {
                return node;
            }
            for(const child of node.expand()) {
                if(!explored.includes(child.location)) {
                    explored.push(child.location);
                    frontier.push(child);
                }
            }
        }

        return undefined;
    }

}