import {Location} from "./problem/location";
import {locationMap} from "./problem/location-map";

export class Node {

    constructor(public parent: Node, public location: Location) {
    }

    expand(): Node[] {
        const locations = locationMap[this.location];
        const childNodes: Node[] = [];
        for(let child of locations) {
            childNodes.push(new Node(this, child));
        }
        return childNodes;
    }

    isGoalState(goal: Location): boolean {
        return this.location === goal;
    }
}