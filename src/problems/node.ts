import {Location} from "./location";
import {locationMap} from "./location-map";

export class Node {

    public depth: number = 0;

    constructor(public location: Location, public parent?: Node, public cost: number = 0) {
        if(parent) {
            this.depth = parent.depth + 1;
        }
    }

    expand(): Node[] {
        const locations = locationMap[this.location];
        const childNodes: Node[] = [];
        for(const [location, cost] of locations.entries()) {
            childNodes.push(new Node(location, this, cost));
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