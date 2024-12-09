import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {NgFor} from "@angular/common";
import {DagreNodesOnlyLayout, NgxGraphModule} from "@swimlane/ngx-graph";
import {GraphNode} from "./entities/graph-node";
import {GraphLink} from "./entities/graph-link";
import {SearchState} from "../../../../tree-search/search-state";
import {BreadthFirstSearch} from "../../../../tree-search/breadth-first-search/breadth-first-search";
import {PathfindingProblem} from "../../../../problems/pathfinding-problem/pathfinding-problem";
import {Position} from "../../../../problems/pathfinding-problem/position";
import {GraphCluster} from "./entities/graph-cluster";
import {AStarSearch} from "../../../../tree-search/a-star-search/a-star-search";
import {SearchAgent} from "../../../../tree-search/search-agent";
import {UniformCostSearch} from "../../../../tree-search/uniform-cost-search/uniform-cost-search";
import {GreedyBestFirstSearch} from "../../../../tree-search/greedy-best-first-search/greedy-best-first-search";
import {DepthLimitedSearch} from '../../../../tree-search/depth-limited-search/depth-limited-search';
import {DepthFirstSearch} from '../../../../tree-search/depth-first-search/depth-first-search';
import {BidirectionalSearch} from '../../../../tree-search/bidirectional-search/bidirectional-search';


@Component({
  selector: 'app-search-tree',
  imports: [NgFor, NgxGraphModule],
  templateUrl: './search-tree.component.html',
  styleUrl: './search-tree.component.scss'
})
export class SearchTreeComponent implements AfterViewInit {
  @ViewChild('treeTab', {static: false}) treeTab: ElementRef;

  searchAlgorithms: string[] = [
    'Breadth-First-Search', 'Depth-First-Search', 'Depth-Limited-Search', 'Uniform-Cost-Search', 'Bidirectional-Search', 'Greedy-Best-First-Search', 'A-Star-Search'
  ];

  agent: SearchAgent<any, any>;

  ngAfterViewInit() {
    const tabButtons = this.treeTab.nativeElement.querySelectorAll('button');

    tabButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        this.handleTabChange(event);
      });
    });
  }

  handleTabChange(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const selectedTabId = target.getAttribute('aria-controls');
    console.log('Tab changed:', selectedTabId);

    switch(selectedTabId) {
        case 'Breadth-First-Search':
            this.agent = new BreadthFirstSearch();
            break;
        case 'A-Star-Search':
            this.agent = new AStarSearch();
            break;
        case 'Uniform-Cost-Search':
            this.agent = new UniformCostSearch();
            break;
        case 'Greedy-Best-First-Search':
            this.agent = new GreedyBestFirstSearch();
            break;
        case 'Depth-Limited-Search':
            this.agent = new DepthLimitedSearch(10);
            break;
        case 'Depth-First-Search':
            this.agent = new DepthFirstSearch();
            break;
        case 'Bidirectional-Search':
            this.agent = new BidirectionalSearch();
            break;
        default:
    }

    this.links = [];
    this.nodes = [];

    const problem = new PathfindingProblem(new Position(0, 0), new Position(3, 3));
    let state = this.agent.startStepSearch(problem);
    this.generateTreeData(state);
    while(!state.solution) {
      state = this.agent.searchStep();
      this.generateTreeData(state);
    }
  }

  constructor(private cdr: ChangeDetectorRef) {
    const problem = new PathfindingProblem(new Position(0, 0), new Position(3, 3));
    const searchAgent = new AStarSearch();
    let state = searchAgent.startStepSearch(problem);
    this.generateTreeData(state);
    while(!state.solution) {
        state = searchAgent.searchStep();
        this.generateTreeData(state);
    }

  }


  nodes: GraphNode[] = [];
  links: GraphLink[] = [];

  layout = new DagreNodesOnlyLayout();

  onNodeSelect($event: any) {

  }

  setColor(node: { label: string }) {
    if(this.solutionNodes.includes(node.label)) {
      return '#FF0000';
    }
    if(this.frontierNodes.includes(node.label)) {
      return '#0000FF';
    }
    if(this.exploredNodes.includes(node.label)) {
      return '#00FF00';
    }
    return '#FFFFFF';
  }

  exploredNodes: string[] = [];
  frontierNodes: string[] = [];
  solutionNodes: string[] = [];

  generateTreeData(searchState: SearchState<any>) {

    // const tree = new GraphTree();
    // this.nodes = tree.nodes;
    // this.links = tree.links;
    const clusters: GraphCluster[] = [];

    this.frontierNodes.forEach(node => {
      if(!searchState.frontier.find(n => n.state.toString() === node)) {
        this.frontierNodes = this.frontierNodes.filter(n => n !== node);
        this.exploredNodes.push(node);
      }
    });

    if(searchState.solution) {
      let solution = searchState.solution;
      this.solutionNodes = [];
      while(solution) {
        this.solutionNodes.push(solution.state.toString());
        solution = solution.parent;
      }
    }

    // For every node in the frontier: Add to the graph, use parent for link
    for(const node of searchState?.frontier) {

      if (this.nodes.find(graphNode => graphNode.id === node.state.toString()) === undefined) {

        this.frontierNodes.push(node.state.toString());

        const graphNode: GraphNode = {
          id: node.state.toString(),
          label: node.state.toString()
        };

        if (clusters.find(cluster => cluster.id === ("cluster-" + node.state.toString())) === undefined) {
          const cluster: GraphCluster = {
            id: "cluster-" + node.state.toString(),
            label: "cluster-" + node.state.toString()
          };
          clusters.push(cluster);
        }

        this.nodes.push(graphNode);
        // this.nodes.push(graphNode);
        if (node.parent) {
          const graphLink: GraphLink = {
            id: node.state.toString(),
            source: node.parent.state.toString(),
            target: node.state.toString(),
            label: 'is parent of'
          };

          const cluster = clusters.find(cluster => cluster.id === ("cluster-" + node.parent.state.toString()));
          if (cluster) {
            cluster.childNodeIds.push(node.state.toString());
          }


          this.links.push(graphLink);
        }

      }

    }

  }

}
