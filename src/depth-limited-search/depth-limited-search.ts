import {SearchAgent} from "../tree-search/search-agent";
import {SearchProblem} from "../problems/search-problem";
import {Node} from "../tree-search/node";

export class DepthLimitedSearch<State, N extends Node<State>, P extends SearchProblem<State, N>> extends SearchAgent<P, N> {

    constructor(private limit: number) {
        super();
    }

    search(problem: P): N {
        const explored: State[] = [];
        const frontier: N[] = [];
        frontier.push(problem.createNode(problem.initialState));
        explored.push(problem.initialState);
        let node: N;

        while(frontier.length > 0) {
            node = frontier.pop();
            if(node.isGoalState(problem.goalState)) {
                return node as N;
            }
            for(const child of node.expand()) {
                if(!explored.includes(child.state) && (child.depth <= this.limit)) {
                    explored.push(child.state);
                    frontier.push(child as N);
                }
            }
        }

        return undefined;
    }
}