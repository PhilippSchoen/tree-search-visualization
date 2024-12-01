import {SearchAgent} from "../search-agent";
import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";
import {Primitive} from "../primitive";
import {State} from "../state";

// TODO: Change cost system so it is additive with parent cost
export class UniformCostSearch<S extends Primitive | State, N extends Node<S>, P extends SearchProblem<S, N>> extends SearchAgent<P, N> {
    search(problem: P): N {
        const node = problem.createNode(problem.initialState, problem.goalState);
        if(node.isGoalState()) {
            return node;
        }

        const frontier: N[] = [node];
        const explored: S[] = [node.state];

        while(frontier.length > 0) {
            frontier.sort((a, b) => a.cost - b.cost);

            const currentNode = frontier.shift();
            for(let child of currentNode.expand()) {
                if(child.isGoalState()) {
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