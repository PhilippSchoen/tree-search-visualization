export abstract class Node<State> {
    public depth: number = 0;

    protected constructor(
        public state: State, public goalState: State,
        public parent?: Node<State>,
        public cost: number = 0, public heuristic: number = 0)
    {
        if(parent) {
            this.depth = parent.depth + 1;
        }
    }

    abstract expand(): Node<State>[];

    abstract isGoalState(): boolean;

    get solution(): State[] {
        const solution: State[] = [];
        let node: Node<State> = this;

        while(node) {
            solution.push(node.state);
            node = node.parent;
        }

        return solution.reverse();
    }

    abstract printSolution?(): void;
    
}