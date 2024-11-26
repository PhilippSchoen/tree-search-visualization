import {SearchProblem} from "../problem/search-problem";
import {Location} from "../problem/location";
import {Node} from "../problem/node";

export class BreadthFirstSearch {
    search(problem: SearchProblem): Node {
        const node = new Node(problem.initialState);
        if(node.isGoalState(problem.goalState)) {
            return node;
        }

        const frontier: Node[] = [node];
        const explored: Location[] = [node.location];

        while(frontier.length > 0) {
            const currentNode = frontier.shift();
            for(let child of currentNode.expand()) {
                const location = child.location;
                if(child.isGoalState(problem.goalState)) {
                    return child;
                }
                if(!explored.includes(location)) {
                    frontier.push(child);
                    explored.push(location);
                }
            }
        }

        return undefined;
    }

    searchWithLogs(problem: SearchProblem): Node {
        let startMemory = process.memoryUsage().heapUsed;
        console.time("Search time: ");
        const node = this.search(problem);
        console.timeEnd("Search time: ");
        let endMemory = process.memoryUsage().heapUsed;
        console.log("Memory used: ", (endMemory - startMemory) / 1024 / 1024, "MB");
        let solution = node.solution;
        let solutionKeys = solution.map(location => Location[location]);
        console.log("BreadthFirst solution: ", solutionKeys.join(" -> "), "\n");
        return node;
    }
}