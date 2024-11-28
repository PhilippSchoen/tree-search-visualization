import {SearchAgent} from "../tree-search/search-agent";
import {Node} from "../tree-search/node";
import {SearchProblem} from "../problems/search-problem";

export class UniformCostSearch<State, N extends Node<State>, P extends SearchProblem<State, N>> extends SearchAgent<P, N> {
    search(problem: P): N {
        const node = problem.createNode(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node;
        }

        const frontier: N[] = [node];
        const explored: State[] = [node.state];

        while(frontier.length > 0) {
            frontier.sort((a, b) => a.cost - b.cost);

            const currentNode = frontier.shift();
            for(let child of currentNode.expand()) {
                const location = child.state;
                if(child.isGoalState(problem.goalState)) {
                    return child as N;
                }
                if(!explored.includes(location)) {
                    frontier.push(child as N);
                    explored.push(location);
                }
            }
        }

        return undefined;
    }

}