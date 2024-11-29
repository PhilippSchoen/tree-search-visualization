import {Location} from "./location";
import {locationMap} from "./location-map";
import {Node} from "../../tree-search/node";

export class LocationNode extends Node<Location>{

    constructor(public location: Location, public goalState: Location, public parent?: LocationNode, public cost: number = 0) {
        super(location, goalState, parent, cost);
    }

    expand(): LocationNode[] {
        const locations = locationMap[this.location];
        const childNodes: LocationNode[] = [];
        for(const [location, cost] of locations.entries()) {
            childNodes.push(new LocationNode(location,this.goalState, this, cost));
        }
        return childNodes;
    }

    isGoalState(): boolean {
        return this.location === this.goalState;
    }

    printSolution() {
        let solutionKeys = this.solution.map(location => Location[location]);
        console.log(this.constructor.name + " solution: ", solutionKeys.join(" -> "), "\n");
    }
}