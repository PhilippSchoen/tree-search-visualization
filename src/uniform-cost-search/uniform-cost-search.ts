import {SearchProblem} from "../problems/location-problem/search-problem";
import {LocationNode} from "../problems/location-problem/location-node";
import {Location} from "../problems/location-problem/location";
import {SearchAgent} from "../tree-search/search-agent";

export class UniformCostSearch extends SearchAgent<SearchProblem> {
    search(problem: SearchProblem): LocationNode {
        const node = new LocationNode(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node;
        }

        const frontier: LocationNode[] = [node];
        const explored: Location[] = [node.location];

        while(frontier.length > 0) {
            frontier.sort((a, b) => a.cost - b.cost);

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