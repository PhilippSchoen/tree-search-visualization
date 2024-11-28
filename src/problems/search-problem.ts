export abstract class SearchProblem<State, N> {
    abstract initialState: State;
    abstract goalState: State;

    abstract createNode(state: State): N;
}