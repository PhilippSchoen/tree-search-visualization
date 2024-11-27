import {SearchProblem} from "../problems/search-problem";
import {Node} from "../problems/node";
import {Location} from "../problems/location";
import {SearchAgent} from "../tree-search/search-agent";

export class DepthFirstSearch extends SearchAgent<SearchProblem> {
    search(problem: SearchProblem): Node {
        const explored: Location[] = [];
        const frontier: Node[] = []
        frontier.push(new Node(problem.initialState));
        explored.push(problem.initialState);
        let node: Node;

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