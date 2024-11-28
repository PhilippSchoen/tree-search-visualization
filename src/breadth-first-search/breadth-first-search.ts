import {SearchAgent} from "../tree-search/search-agent";
import {Node} from "../tree-search/node";
import {SearchProblem} from "../problems/search-problem";

export class BreadthFirstSearch<State, N extends Node<State>, P extends SearchProblem<State, N>> extends SearchAgent<P, N> {
    search(problem: P): N {
        const node = problem.createNode(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node as unknown as N;
        }

        const frontier: N[] = [node as unknown as N];
        const explored: State[] = [node.state];

        while(frontier.length > 0) {
            const currentNode = frontier.shift();
            for(let child of currentNode.expand()) {
                const state = child.state;
                if(child.isGoalState(problem.goalState)) {
                    return child as N;
                }
                if(!explored.includes(state)) {
                    frontier.push(child as N);
                    explored.push(state);
                }
            }
        }

        return undefined;
    }

}
