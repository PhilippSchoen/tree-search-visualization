import {Primitive} from "../primitive";
import {State} from "../state";
import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";
import {SearchAgent} from "../search-agent";

export class BidirectionalSearch<S extends Primitive | State, N extends Node<S>, P extends SearchProblem<S, N>> extends SearchAgent<P, N> {
    search(problem: P): N {
        const startNode = problem.createNode(problem.initialState, problem.goalState);
        const goalNode = problem.createNode(problem.goalState, problem.initialState);

        if(startNode.isGoalState()) {
            return startNode;
        }

        const startFrontier: N[] = [startNode];
        const goalFrontier: N[] = [goalNode];
        const startExplored: S[] = [startNode.state];
        const goalExplored: S[] = [goalNode.state];

        while(startFrontier.length > 0 || goalFrontier.length > 0) {
            this.expandFrontier(startFrontier, startExplored);
            let collision = this.areFrontiersColliding(startFrontier, goalFrontier);
            if(collision) {
                // Assemble the path
                let goalNode = collision[1];
                let endOfPath = collision[0];
                while(goalNode) {
                    // Create new node with the same state as goalNode and set endOfPath as its parent
                    // Set endOfPath to new node
                    // Set goalNode to its parent
                }
            }

            this.expandFrontier(goalFrontier, goalExplored);
            collision = this.areFrontiersColliding(startFrontier, goalFrontier);
            if(collision) {
                // Assemble the path
            }
        }
    }

    private expandFrontier(frontier: N[], explored: S[]): N | undefined {
        const node = frontier.shift();
        for(let child of node.expand()) {
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
        }

        return undefined;
    }

    private areFrontiersColliding(startFrontier: N[], goalFrontier: N[]): N[] | undefined {
        for(let startNode of startFrontier) {
            for(let goalNode of goalFrontier) {
                if(startNode.state === goalNode.state) {
                    return [startNode, goalNode];
                }
            }
        }

        return undefined;
    }

}