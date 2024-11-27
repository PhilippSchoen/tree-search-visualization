import {SearchProblem} from "../problems/search-problem";
import {Location} from "../problems/location";
import {Node} from "../problems/node";
import {SearchAgent} from "../tree-search/search-agent";

export class DepthLimitedSearch extends SearchAgent<SearchProblem> {

    constructor(private limit: number) {
        super();
    }

    search(problem: SearchProblem): Node {
        const explored: Location[] = [];
        const frontier: Node[] = [];
        frontier.push(new Node(problem.initialState));
        explored.push(problem.initialState);
        let node: Node;

        while(frontier.length > 0) {
            node = frontier.pop();
            if(node.isGoalState(problem.goalState)) {
                return node;
            }
            for(const child of node.expand()) {
                if(!explored.includes(child.location) && child.depth <= this.limit) {
                    explored.push(child.location);
                    frontier.push(child);
                }
            }
        }

        return undefined;
    }
}