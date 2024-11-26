import {SearchProblem} from "../problem/search-problem";
import {Node} from "../problem/node";
import {Location} from "../problem/location";

export class DepthFirstSearch {
    search(problem: SearchProblem): Node {
        const explored: Location[] = [];
        const frontier: Node[] = []
        frontier.push(new Node(problem.initialState));
        explored.push(problem.initialState);
        let node: Node;

        while(frontier.length > 0) {
            node = frontier.pop();
            if(node.isGoalState(problem.goalState)) {
                return node;
            }
            for(const child of node.expand()) {
                if(!explored.includes(child.location)) {
                    explored.push(child.location);
                    frontier.push(child);
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
        console.log("DepthFirst solution: ", solutionKeys.join(" -> "), "\n");
        return node;
    }
}