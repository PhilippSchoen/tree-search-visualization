import {SearchAgent} from "../search-agent";
import {SearchProblem} from "../../problems/search-problem";
import {Node} from "../node";
import {Primitive} from "../primitive";
import {State} from "../state";
import {SearchState} from "../search-state";

export class DepthLimitedSearch<S extends Primitive | State, N extends Node<S>, P extends SearchProblem<S, N>> extends SearchAgent<P, N> {

    constructor(private limit: number) {
        super();
    }

    search(problem: P): N {
        const explored: S[] = [];
        const frontier: N[] = [];
        frontier.push(problem.createNode(problem.initialState, problem.goalState));
        explored.push(problem.initialState);
        let node: N;

        while(frontier.length > 0) {
            node = frontier.pop();
            if(node.isGoalState()) {
                return node as N;
            }
            for(const child of node.expand()) {
                const state = child.state;
                if(this.isPrimitiveValue(state)) {
                    if(!explored.includes(state) && (child.depth <= this.limit)) {
                        frontier.push(child as N);
                        explored.push(state);
                    }
                }
                else {
                    if(!explored.some(s => (s as State).equals(state)) && (child.depth <= this.limit)) {
                        frontier.push(child as N);
                        explored.push(state);
                    }
                }
            }
        }

        return undefined;
    }

    // TODO: Add step search
    searchStep(): SearchState<S> {
        return undefined;
    }

    startStepSearch(problem: P): SearchState<S> {
        return undefined;
    }
}