import {Primitive} from "../tree-search/primitive";
import {State} from "../tree-search/state";

export abstract class SearchProblem<S extends Primitive | State, N> {
    abstract initialState: S;
    abstract goalState: S;

    abstract createNode(state: S, goalState: S, parent?: N): N;
}