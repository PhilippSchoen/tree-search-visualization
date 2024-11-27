import {SearchProblem} from "../problems/search-problem";
import {Node} from "../problems/node";
import {Location} from "../problems/location";
import {SearchAgent} from "../tree-search/search-agent";

export class UniformCostSearch extends SearchAgent<SearchProblem> {
    search(problem: SearchProblem): Node {
        const node = new Node(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node;
        }

        const frontier: Node[] = [node];
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