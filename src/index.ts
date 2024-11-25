import {BreadthFirstSearch} from "./breadth-first-search/breadth-first-search";
import {Location} from "./breadth-first-search/problem/location";

const agent = new BreadthFirstSearch();

console.log("Show me the perfect path from Berlin to Istanbul! \n");

let node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
let solution = node.solution;
let solutionKeys = solution.map(location => Location[location]);
console.log("The perfect route is: ", solutionKeys.join(" -> "), "\n");

console.log("Next, show me the perfect path from Rome to Budapest! \n");
node = agent.search({initialState: Location.Rome, goalState: Location.Budapest});
solution = node.solution;
solutionKeys = solution.map(location => Location[location]);
console.log("The perfect route is: ", solutionKeys.join(" -> "), "\n");