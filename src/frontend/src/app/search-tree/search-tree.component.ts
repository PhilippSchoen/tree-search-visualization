import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
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
import {SearchAlgorithm} from './entities/search-algorithm';
import {SearchProblem} from "../../../../problems/search-problem";
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-search-tree',
  imports: [NgFor, NgxGraphModule],
  templateUrl: './search-tree.component.html',
  styleUrl: './search-tree.component.scss'
})
export class SearchTreeComponent implements AfterViewInit, OnChanges {
  @ViewChild('treeTab', {static: false}) treeTab: ElementRef;
  @Input() selectedAlgorithm!: SearchAgent<any, any>;
  @Input() selectedProblem!: SearchProblem<any, any>;
  @Output() algorithmChange = new EventEmitter<SearchAgent<any, any>>();

  @Input() set searchState(obs: Observable<SearchState<any>>) {
    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchSubscription = obs.subscribe({
      next: (state) => {
        this.state = state;
        this.generateTreeData(state);
        console.log("Received state: ", state);
      },
      complete: () => {
        console.log("Tree data: ", this.frontierNodes, this.exploredNodes, this.solutionNodes);
        // Generate tree
        this.drawTree(this.state);
        console.log("Tree drawn: ", this.nodes, this.links);
      }
    });
  }

  private searchSubscription: Subscription;
  private state: SearchState<any>;

  searchAlgorithms: Record<SearchAlgorithm, SearchAgent<any, any>> = {
    [SearchAlgorithm.BFS]: new BreadthFirstSearch(),
    [SearchAlgorithm.AStar]: new AStarSearch(),
    [SearchAlgorithm.Dijkstra]: new UniformCostSearch(),
    [SearchAlgorithm.GreedyBest]: new GreedyBestFirstSearch(),
    [SearchAlgorithm.DLS]: new DepthLimitedSearch(10),
    [SearchAlgorithm.DFS]: new DepthFirstSearch(),
    [SearchAlgorithm.Bidirectional]: new BidirectionalSearch()
  }

  get searchAlgorithmValues() {
    return Object.values(SearchAlgorithm);
  }

  ngAfterViewInit() {
    const tabButtons = this.treeTab.nativeElement.querySelectorAll('button');

    tabButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        this.handleTabChange(event);
      });
    });
    this.selectedAlgorithm = this.searchAlgorithms[SearchAlgorithm.BFS];
    // this.generateTree();
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.generateTree();
  }

  handleTabChange(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const selectedTabId = target.getAttribute('aria-controls');

    this.selectedAlgorithm = this.searchAlgorithms[selectedTabId];
    this.algorithmChange.emit(this.selectedAlgorithm);

    this.links = [];
    this.nodes = [];

    // this.generateTree();
  }

  constructor(private cdr: ChangeDetectorRef) {

  }

  nodes: GraphNode[] = [];
  links: GraphLink[] = [];

  layout = new DagreNodesOnlyLayout();

  setColor(node: { label: string }) {
    if(this.solutionNodes.find(n => n.id === node.label)) {
      return '#FF0000';
    }
    if(this.frontierNodes.find(n => n.id === node.label)) {
      return '#0000FF';
    }
    if(this.exploredNodes.find(n => n.id === node.label)) {
      return '#00FF00';
    }
    return '#FFFFFF';
  }

  exploredNodes: {id: string, parent?: string}[] = [];
  frontierNodes: {id: string, parent?: string}[] = [];
  solutionNodes: {id: string, parent?: string}[] = [];


  generateTree() {
      let state = this.selectedAlgorithm.startStepSearch(this.selectedProblem);
      this.generateTreeData(state);
      while(!state.solution) {
        state = this.selectedAlgorithm.searchStep();
        this.generateTreeData(state);
      }
      this.generateTreeData(state);
  }

  generateTreeData(searchState: SearchState<any>) {

    // Called for all intermediate search results

    // Move reached nodes from frontier to explored
    this.frontierNodes.forEach(node => {
      if(!searchState.frontier.find(n => n.state.toString() === node.id)) {
        this.frontierNodes = this.frontierNodes.filter(n => n !== node);
        this.exploredNodes.push(node);
      }
    });

    // Add frontier nodes
    for(const node of searchState?.frontier) {
      if(this.frontierNodes.find(n => n.id === node.state.toString())) {
        continue;
      }
      this.frontierNodes.push({id: node.state.toString(), parent: node.parent?.state.toString()});
    }

    // Add solution nodes
    if(searchState.solution) {
      let solution = searchState.solution;
      this.solutionNodes = [];
      while(solution) {
        this.solutionNodes.push({id: solution.state.toString(), parent: solution.parent.state.toString()});
        solution = solution.parent;
      }
    }

  }

  private drawTree(state: SearchState<any>) {
    console.log("Drawing");
    const clusters: GraphCluster[] = [];
    this.nodes = [];
    this.links = [];

    // Create clusters for each node
    for(const node of this.exploredNodes) {
      const cluster: GraphCluster = {
        id: "cluster-" + node.id,
        label: "cluster-" + node.id,
        childNodeIds: []
      };
      clusters.push(cluster);
    }

    // Draw explored
    for(const explored of this.exploredNodes) {

      const graphNode: GraphNode = {
        id: explored.id,
        label: explored.id
      };

      // Assign to parent cluster
      if(explored.parent) {
        const cluster = clusters.find(cluster => cluster.id === ("cluster-" + explored.parent));
        if (cluster) {
          cluster.childNodeIds.push(explored.id);
        }

        // Create link
        const graphLink: GraphLink = {
          id: explored.id,
          source: explored.parent,
          target: explored.id,
          label: 'is parent of'
        };

        this.links.push(graphLink);
      }

      this.nodes.push(graphNode);
    }

    this.frontierNodes = [];
    this.exploredNodes = [];
    this.solutionNodes = [];
  }

}
