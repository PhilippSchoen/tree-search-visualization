import {GraphNode} from "./graph-node";
import {GraphLink} from "./graph-link";

export class GraphTree {
    nodes: GraphNode[] = [
        {
            id: 'first',
                label: 'A',
        }, {
            id: 'second',
                label: 'B',
        }
    ];
    links: GraphLink[] = [
        {
            id: 'a',
                source: 'first',
            target: 'second',
            label: 'is parent of'
        },
        //{
        //     id: 'b',
        //         source: 'first',
        //         target: 'third',
        //         label: 'custom label'
        // }
    ];

    constructor() {
    }
}

// [links]="[
// {
//     id: 'a',
//         source: 'first',
//     target: 'second',
//     label: 'is parent of'
// }, {
//     id: 'b',
//         source: 'first',
//         target: 'third',
//         label: 'custom label'
// }
// ]"
//     [nodes]="[
// {
//     id: 'first',
//         label: 'A'
// }, {
//     id: 'second',
//         label: 'B'
// }, {
//     id: 'third',
//         label: 'C'
// }
// ]"