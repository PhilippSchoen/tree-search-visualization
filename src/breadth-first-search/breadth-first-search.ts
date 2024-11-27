import {SearchProblem} from "../problems/search-problem";
import {Location} from "../problems/location";
import {Node} from "../problems/node";
import {SearchAgent} from "../tree-search/search-agent";

export class BreadthFirstSearch extends SearchAgent<SearchProblem> {
    search(problem: SearchProblem): Node {
        const node = new Node(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node;
        }

        const frontier: Node[] = [node];
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