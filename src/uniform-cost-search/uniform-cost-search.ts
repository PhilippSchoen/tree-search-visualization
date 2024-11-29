import {SearchAgent} from "../tree-search/search-agent";
import {Node} from "../tree-search/node";
import {SearchProblem} from "../problems/search-problem";
import {Primitive} from "../tree-search/primitive";
import {State} from "../tree-search/state";

export class UniformCostSearch<S extends Primitive | State, N extends Node<S>, P extends SearchProblem<S, N>> extends SearchAgent<P, N> {
    search(problem: P): N {
        const node = problem.createNode(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node;
        }

        const frontier: N[] = [node];
        const explored: S[] = [node.state];

        while(frontier.length > 0) {
            frontier.sort((a, b) => a.cost - b.cost);

            const currentNode = frontier.shift();
            for(let child of currentNode.expand()) {
                const location = child.state;
                if(child.isGoalState(problem.goalState)) {
                    return child as N;
                }
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