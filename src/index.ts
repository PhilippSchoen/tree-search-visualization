import {BreadthFirstSearch} from "./breadth-first-search/breadth-first-search";
import {Location} from "./breadth-first-search/problem/location";

const agent = new BreadthFirstSearch();

console.log("Show me the perfect path from Berlin to Istanbul! \n");

const node = agent.search({initialState: Location.Berlin, goalState: Location.Istanbul});
const solution = node.solution;
const solutionKeys = solution.map(location => Location[location]);
console.log("The perfect route is: ", solutionKeys.join(" -> "), "\n");
