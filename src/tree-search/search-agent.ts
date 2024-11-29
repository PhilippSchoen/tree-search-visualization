import {Node} from "./node";
import {Primitive} from "./primitive";

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

    protected isPrimitiveValue(value: any): value is Primitive {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean' ||
            typeof value === 'bigint' ||
            typeof value === 'symbol' ||
            value === null ||
            value === undefined
        );
    }
}