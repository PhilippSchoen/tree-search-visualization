import {Primitive} from "../primitive";
import {State} from "../state";
import {Node} from "../node";
import {SearchProblem} from "../../problems/search-problem";
import {SearchAgent} from "../search-agent";
import * as _ from "lodash";

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
            if(startFrontier.length > 0) {
                this.expandFrontier(startFrontier, startExplored);
                const collision = this.areFrontiersColliding(startFrontier, goalFrontier);
                if(collision) {
                    return this.assemblePath(collision, problem);
                }
            }

            if(goalFrontier.length > 0) {
                this.expandFrontier(goalFrontier, goalExplored);
                const collision = this.areFrontiersColliding(startFrontier, goalFrontier);
                if(collision) {
                    return this.assemblePath(collision, problem);
                }
            }
        }
    }

    private expandFrontier(frontier: N[], explored: S[]): N | undefined {
        const node = frontier.shift();
        for(let child of node.expand()) {
            const state = child.state;

            if(this.isPrimitiveValue(state)) {
                if(!explored.includes(state)) {
                    if(child.isGoalState()) {
                        return child as N;
                    }

                    frontier.push(child as N);
                    explored.push(state);
                }

            }
            else {
                if(!explored.some(s => (s as State).equals(state))) {
                    if(child.isGoalState()) {
                        return child as N;
                    }

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
                // TODO: Only supports primitive states
                if(startNode.state === goalNode.state) {
                    return [startNode, goalNode];
                }
            }
        }

        return undefined;
    }

    private assemblePath(collision: N[], problem: P): N {
        let goalNode = collision[1].parent;
        let endOfPath = collision[0];
        while(goalNode) {
            const parent = _.cloneDeep(endOfPath);
            endOfPath = problem.createNode(goalNode.state, problem.goalState, parent);
            goalNode = goalNode.parent as N | undefined;
        }
        return endOfPath;
    }

}