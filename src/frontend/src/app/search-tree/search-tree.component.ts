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
    this.generateTree();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.generateTree();
  }

  handleTabChange(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const selectedTabId = target.getAttribute('aria-controls');

    this.selectedAlgorithm = this.searchAlgorithms[selectedTabId];
    this.algorithmChange.emit(this.selectedAlgorithm);

    this.links = [];
    this.nodes = [];

    this.generateTree();
  }

  constructor(private cdr: ChangeDetectorRef) {

  }

  nodes: GraphNode[] = [];
  links: GraphLink[] = [];

  layout = new DagreNodesOnlyLayout();

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
