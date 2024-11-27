import {Node} from "../problems/node";
import {Location} from "../problems/location";

export abstract class SearchAgent<SearchProblem> {
    abstract search(problem: SearchProblem): Node;

    searchWithLogs(problem: SearchProblem): Node {
        let startMemory = process.memoryUsage().heapUsed;
        console.time("Search time: ");
        const node = this.search(problem);
        console.timeEnd("Search time: ");
        let endMemory = process.memoryUsage().heapUsed;
        console.log("Memory used: ", (endMemory - startMemory) / 1024 / 1024, "MB");
        // TODO: Refactor to make problems-independent
        let solution = node.solution;
        let solutionKeys = solution.map(location => Location[location]);
        console.log(this.constructor.name + " solution: ", solutionKeys.join(" -> "), "\n");
        return node;
    }
}