import {Node} from "./node";

export abstract class SearchAgent<SearchProblem, N extends Node<unknown>> {
    abstract search(problem: SearchProblem): N;

    searchWithLogs(problem: SearchProblem): N {
        let startMemory = process.memoryUsage().heapUsed;
        console.time("Search time: ");
        const node = this.search(problem);
        console.timeEnd("Search time: ");
        let endMemory = process.memoryUsage().heapUsed;
        console.log("Memory used: ", (endMemory - startMemory) / 1024 / 1024, "MB");
        node.printSolution();
        return node;
    }
}