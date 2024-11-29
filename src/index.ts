import {BreadthFirstSearch} from "./breadth-first-search/breadth-first-search";
import {Location} from "./problems/location-problem/location";
import {UniformCostSearch} from "./uniform-cost-search/uniform-cost-search";
import {DepthFirstSearch} from "./depth-first-search/depth-first-search";
import {DepthLimitedSearch} from "./depth-limited-search/depth-limited-search";
import {LocationProblem} from "./problems/location-problem/location-problem";
import {PathfindingProblem} from "./problems/pathfinding-problem/pathfinding-problem";
import {EightPuzzleNode} from "./problems/eight-puzzle-problem/eight-puzzle-node";
import {EightPuzzleState} from "./problems/eight-puzzle-problem/eight-puzzle-state";
import {EightPuzzleProblem} from "./problems/eight-puzzle-problem/eight-puzzle-problem";
import {Position} from "./problems/pathfinding-problem/position";

const breadthFirstAgent = new BreadthFirstSearch();
const uniformCostAgent = new UniformCostSearch();
const depthFirstAgent = new DepthFirstSearch();
const depthLimitedAgent = new DepthLimitedSearch(10);

const pathfindingProblem = new PathfindingProblem(new Position(10, 7), new Position(7, 10));
const solutionState = new EightPuzzleState();
solutionState.board = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const initialState = new EightPuzzleState();
initialState.board = [1, 2, 3, 4, 5, 6, 0, 7, 8];
const eightPuzzleProblem = new EightPuzzleProblem(initialState, solutionState);

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

console.log("Also, find a solution to my 8-Puzzle problem! \n");
breadthFirstAgent.searchWithLogs(eightPuzzleProblem);
depthLimitedAgent.searchWithLogs(eightPuzzleProblem);

console.log("Finally, find the best path from (10, 7) to (7, 10)! \n");
depthLimitedAgent.searchWithLogs(pathfindingProblem);
breadthFirstAgent.searchWithLogs(pathfindingProblem);