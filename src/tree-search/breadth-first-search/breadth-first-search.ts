import {SearchAgent} from "../search-agent";
import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";
import {Primitive} from "../primitive";
import {State} from "../state";
import {SearchState} from "../search-state";

export class BreadthFirstSearch<S extends Primitive | State, N extends Node<S>, P extends SearchProblem<S, N>> extends SearchAgent<P, N> {


    frontier: N[] = [];
    explored: S[] = [];

    search(problem: P): N {
        const node = problem.createNode(problem.initialState, problem.goalState);
        if(node.isGoalState()) {
            return node;
        }

        const frontier: N[] = [node];
        const explored: S[] = [node.state];

        while(frontier.length > 0) {
            const currentNode = frontier.shift();
            for(let child of currentNode.expand()) {
                const state = child.state;
                if(child.isGoalState()) {
                    return child as N;
                }
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

                if(!explored.includes(state)) {
                    frontier.push(child as N);
                    explored.push(state);
                }

            }
        }

        return undefined;
    }

    searchStep(): SearchState<S> {
        const currentNode = this.frontier.shift();
        for(let child of currentNode.expand()) {
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
            
            if(child.isGoalState()) {
                return new SearchState(this.frontier, this.explored, child as N);
            }
        }
        return new SearchState(this.frontier, this.explored);
    }

    startStepSearch(problem: P): SearchState<S> {
        const node = problem.createNode(problem.initialState, problem.goalState);
        this.frontier = [node];
        this.explored = [node.state];

        if(node.isGoalState()) {
            return new SearchState(this.frontier, this.explored, node);
        }

        return new SearchState(this.frontier, this.explored);
    }

}
