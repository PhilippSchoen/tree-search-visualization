import {Location} from "./problem/location";
import {locationMap} from "./problem/location-map";

export class Node {

    constructor(public location: Location, public parent?: Node) {
    }

    expand(): Node[] {
        const locations = locationMap[this.location];
        const childNodes: Node[] = [];
        for(let child of locations) {
            childNodes.push(new Node(child, this));
        }
        return childNodes;
    }

    isGoalState(goal: Location): boolean {
        return this.location === goal;
    }

    get solution(): Location[] {
        const solution: Location[] = [];
        let node: Node = this;

        while(node) {
            solution.push(node.location);
            node = node.parent;
        }

        return solution.reverse();
    }
}