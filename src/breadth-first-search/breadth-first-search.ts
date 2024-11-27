import {SearchProblem} from "../problems/location-problem/search-problem";
import {Location} from "../problems/location-problem/location";
import {LocationNode} from "../problems/location-problem/location-node";
import {SearchAgent} from "../tree-search/search-agent";

export class BreadthFirstSearch extends SearchAgent<SearchProblem, LocationNode> {
    search(problem: SearchProblem): LocationNode {
        const node = new LocationNode(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node;
        }

        const frontier: LocationNode[] = [node];
        const explored: Location[] = [node.location];

        while(frontier.length > 0) {
            const currentNode = frontier.shift();
            for(let child of currentNode.expand()) {
                const location = child.location;
                if(child.isGoalState(problem.goalState)) {
                    return child;
                }
                if(!explored.includes(location)) {
                    frontier.push(child);
                    explored.push(location);
                }
            }
        }

        return undefined;
    }

}