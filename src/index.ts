import {BreadthFirstSearch} from "./breadth-first-search/breadth-first-search";
import {Location} from "./problems/location-problem/location";
import {UniformCostSearch} from "./uniform-cost-search/uniform-cost-search";
import {DepthFirstSearch} from "./depth-first-search/depth-first-search";
import {DepthLimitedSearch} from "./depth-limited-search/depth-limited-search";
import {LocationProblem} from "./problems/location-problem/location-problem";

const breadthFirstAgent = new BreadthFirstSearch();
const uniformCostAgent = new UniformCostSearch();
const depthFirstAgent = new DepthFirstSearch();
const depthLimitedAgent = new DepthLimitedSearch(4);

console.log("Show me the perfect path from Berlin to Istanbul! \n");

breadthFirstAgent.searchWithLogs(new LocationProblem(Location.Berlin, Location.Istanbul));
uniformCostAgent.searchWithLogs(new LocationProblem(Location.Berlin, Location.Istanbul));
depthFirstAgent.searchWithLogs(new LocationProblem(Location.Berlin, Location.Istanbul));
depthLimitedAgent.searchWithLogs(new LocationProblem(Location.Berlin, Location.Istanbul));

console.log("Next, show me the path from Rome to Budapest! \n");

breadthFirstAgent.searchWithLogs(new LocationProblem(Location.Rome, Location.Budapest));
uniformCostAgent.searchWithLogs(new LocationProblem(Location.Rome, Location.Budapest));
depthFirstAgent.searchWithLogs(new LocationProblem(Location.Rome, Location.Budapest));
depthLimitedAgent.searchWithLogs(new LocationProblem(Location.Rome, Location.Budapest));