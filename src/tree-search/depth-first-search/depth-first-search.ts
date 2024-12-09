import {SearchAgent} from "../search-agent";
import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";
import {State} from "../state";
import {Primitive} from "../primitive";
import {SearchState} from "../search-state";

export class DepthFirstSearch<S extends Primitive | State, N extends Node<S>, P extends SearchProblem<S, N>> extends SearchAgent<P, N> {

    frontier: N[] = [];
    explored: S[] = [];

    search(problem: P): N {
        const explored: S[] = [];
        const frontier: N[] = []
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

    searchStep(): SearchState<S> {
        const node = this.frontier.pop();
        if(node.isGoalState()) {
            return new SearchState<S>(this.frontier, this.explored, node as N);
        }
        for(const child of node.expand()) {
            const state = child.state;
            if(this.isPrimitiveValue(state)) {
                if(!this.explored.includes(state)) {
                    this.frontier.push(child as N);
                    this.explored.push(state);
                }
            }
            else {
                if(!this.explored.some(s => (s as State).equals(state))) {
                    this.frontier.push(child as N);
                    this.explored.push(state);
                }
            }
        }
        return new SearchState<S>(this.frontier, this.explored);
    }

    startStepSearch(problem: P): SearchState<S> {
        const node = problem.createNode(problem.initialState, problem.goalState);
        const state = problem.initialState;
        this.frontier = [node];
        this.explored = [state];

        return new SearchState(this.frontier, this.explored);
    }

}