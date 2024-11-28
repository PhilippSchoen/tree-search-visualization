import {LocationProblem} from "../problems/location-problem/location-problem";
import {Location} from "../problems/location-problem/location";
import {LocationNode} from "../problems/location-problem/location-node";
import {SearchAgent} from "../tree-search/search-agent";
import {Node} from "../tree-search/node";

export class BreadthFirstSearch<N extends Node<Location>> extends SearchAgent<LocationProblem, N> {
    search(problem: LocationProblem): N {
        const node = problem.createNode(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node as unknown as N;
        }

        const frontier: N[] = [node as unknown as N];
        const explored: Location[] = [node.location];

        while(frontier.length > 0) {
            const currentNode = frontier.shift();
            for(let child of currentNode.expand()) {
                const location = child.state;
                if(child.isGoalState(problem.goalState)) {
                    return child as N;
                }
                if(!explored.includes(location)) {
                    frontier.push(child as N);
                    explored.push(location);
                }
            }
        }

        return undefined;
    }

}