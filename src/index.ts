import {BreadthFirstSearch} from "./tree-search/breadth-first-search/breadth-first-search";
import {Location} from "./problems/location-problem/location";
import {UniformCostSearch} from "./tree-search/uniform-cost-search/uniform-cost-search";
import {DepthFirstSearch} from "./tree-search/depth-first-search/depth-first-search";
import {DepthLimitedSearch} from "./tree-search/depth-limited-search/depth-limited-search";
import {LocationProblem} from "./problems/location-problem/location-problem";
import {PathfindingProblem} from "./problems/pathfinding-problem/pathfinding-problem";
import {EightPuzzleState} from "./problems/eight-puzzle-problem/eight-puzzle-state";
import {EightPuzzleProblem} from "./problems/eight-puzzle-problem/eight-puzzle-problem";
import {Position} from "./problems/pathfinding-problem/position";
import {GreedyBestFirstSearch} from "./tree-search/greedy-best-first-search/greedy-best-first-search";
import {AStarSearch} from "./tree-search/a-star-search/a-star-search";

const breadthFirstAgent = new BreadthFirstSearch();
const uniformCostAgent = new UniformCostSearch();
const depthFirstAgent = new DepthFirstSearch();
const depthLimitedAgent = new DepthLimitedSearch(10);
const greedyBestFirstAgent = new GreedyBestFirstSearch();
const aStarAgent = new AStarSearch();

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
greedyBestFirstAgent.searchWithLogs(eightPuzzleProblem);

console.log("Finally, find the best path from (10, 7) to (7, 10)! \n");
depthLimitedAgent.searchWithLogs(pathfindingProblem);
breadthFirstAgent.searchWithLogs(pathfindingProblem);
greedyBestFirstAgent.searchWithLogs(pathfindingProblem);

console.log("Now, a complex pathfinding problem for informed search algorithms! \n");
const pathfindingProblem2 = new PathfindingProblem(new Position(-7, 25), new Position(122, -8));
greedyBestFirstAgent.searchWithLogs(pathfindingProblem2);
aStarAgent.searchWithLogs(pathfindingProblem2);

console.log("Let's try the informed search algorithms with an 8-Puzzle problem! \n");
const initialState2 = new EightPuzzleState();
greedyBestFirstAgent.searchWithLogs(new EightPuzzleProblem(initialState2, solutionState));
aStarAgent.searchWithLogs(new EightPuzzleProblem(initialState2, solutionState));