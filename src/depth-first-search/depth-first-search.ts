import {SearchAgent} from "../tree-search/search-agent";
import {Node} from "../tree-search/node";
import {SearchProblem} from "../problems/search-problem";
import {State} from "../tree-search/state";
import {Primitive} from "../tree-search/primitive";

export class DepthFirstSearch<S extends Primitive | State, N extends Node<S>, P extends SearchProblem<S, N>> extends SearchAgent<P, N> {
    search(problem: P): N {
        const explored: S[] = [];
        const frontier: N[] = []
        frontier.push(problem.createNode(problem.initialState));
        explored.push(problem.initialState);
        let node: N;

        while(frontier.length > 0) {
            node = frontier.pop();
            if(node.isGoalState(problem.goalState)) {
                return node as N;
            }
            for(const child of node.expand()) {
                const state = child.state;
                if(this.isPrimitiveValue(state)) {
                    if(!explored.includes(state)) {
                        frontier.push(child as N);
                        explored.push(state);
                    }
                }
                else {
                    if(!explored.some(s => (s as State).equals(state))) {
                        frontier.push(child as N);
                        explored.push(state);
                    }
                }
            }
        }

        return undefined;
    }

}