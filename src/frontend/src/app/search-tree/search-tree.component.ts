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
    const problem = new PathfindingProblem(new Position(0, 0), new Position(20, 25));
    const searchAgent = new AStarSearch();
    let state = searchAgent.startStepSearch(problem);
    this.generateTreeData(state);
    while(!state.solution) {
        state = searchAgent.searchStep();
        this.generateTreeData(state);
    }
    // state = searchAgent.searchStep();
    // // const parent = new LocationNode(Location.Berlin, Location.Istanbul);
    // // const searchState = new SearchState([parent, new LocationNode(Location.London, Location.Istanbul, parent)], []);
    // this.generateTreeData(state);
  }



  nodes: GraphNode[] = [];
  links: GraphLink[] = [];

  layout = new DagreNodesOnlyLayout();

  onNodeSelect($event: any) {
    
  }

  generateTreeData(searchState: SearchState<any>) {

    // const tree = new GraphTree();
    // this.nodes = tree.nodes;
    // this.links = tree.links;
    const clusters: GraphCluster[] = [];

    // For every node in the frontier: Add to the graph, use parent for link
    for(const node of searchState?.frontier) {

      if (this.nodes.find(graphNode => graphNode.id === node.state.toString()) === undefined) {
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
