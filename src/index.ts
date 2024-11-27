import {BreadthFirstSearch} from "./breadth-first-search/breadth-first-search";
import {Location} from "./problems/location-problem/location";
import {UniformCostSearch} from "./uniform-cost-search/uniform-cost-search";
import {DepthFirstSearch} from "./depth-first-search/depth-first-search";
import {DepthLimitedSearch} from "./depth-limited-search/depth-limited-search";

const breadthFirstAgent = new BreadthFirstSearch();
const uniformCostAgent = new UniformCostSearch();
const depthFirstAgent = new DepthFirstSearch();
const depthLimitedAgent = new DepthLimitedSearch(4);

console.log("Show me the perfect path from Berlin to Istanbul! \n");

let node = breadthFirstAgent.searchWithLogs({initialState: Location.Berlin, goalState: Location.Istanbul});
node = uniformCostAgent.searchWithLogs({initialState: Location.Berlin, goalState: Location.Istanbul});
node = depthFirstAgent.searchWithLogs({initialState: Location.Berlin, goalState: Location.Istanbul});
node = depthLimitedAgent.searchWithLogs({initialState: Location.Berlin, goalState: Location.Istanbul});

console.log("Next, show me the path from Rome to Budapest! \n");

node = breadthFirstAgent.searchWithLogs({initialState: Location.Rome, goalState: Location.Budapest});
node = uniformCostAgent.searchWithLogs({initialState: Location.Rome, goalState: Location.Budapest});
node = depthFirstAgent.searchWithLogs({initialState: Location.Rome, goalState: Location.Budapest});
node = depthLimitedAgent.searchWithLogs({initialState: Location.Rome, goalState: Location.Budapest});