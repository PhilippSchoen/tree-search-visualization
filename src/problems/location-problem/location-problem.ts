import {Location} from "./location";
import {LocationNode} from "./location-node";
import {SearchProblem} from "../search-problem";

export class LocationProblem extends SearchProblem<Location, LocationNode> {
    constructor(public initialState: Location, public goalState: Location) {
        super();
    }

    createNode(state: Location, goalState: Location, parent?: LocationNode): LocationNode {
        return new LocationNode(state, goalState, parent);
    }
}