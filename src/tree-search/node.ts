export abstract class Node<State> {
    public depth: number = 0;

    protected constructor(public state: State, public parent?: Node<State>, public cost: number = 0) {
        if(parent) {
            this.depth = parent.depth + 1;
        }
    }

    abstract expand(): Node<State>[];

    abstract isGoalState(goal: State): boolean;

    abstract get solution(): State[];

    abstract printSolution?(): void;
    
}