import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgFor} from "@angular/common";
import {NgxGraphModule} from "@swimlane/ngx-graph";
import {GraphNode} from "./entities/graph-node";
import {GraphLink} from "./entities/graph-link";
import {SearchState} from "../../../../tree-search/search-state";
import {BreadthFirstSearch} from "../../../../tree-search/breadth-first-search/breadth-first-search";
import {AStarSearch} from "../../../../tree-search/a-star-search/a-star-search";
import {SearchAgent} from "../../../../tree-search/search-agent";
import {UniformCostSearch} from "../../../../tree-search/uniform-cost-search/uniform-cost-search";
import {GreedyBestFirstSearch} from "../../../../tree-search/greedy-best-first-search/greedy-best-first-search";
import {DepthLimitedSearch} from '../../../../tree-search/depth-limited-search/depth-limited-search';
import {DepthFirstSearch} from '../../../../tree-search/depth-first-search/depth-first-search';
import {BidirectionalSearch} from '../../../../tree-search/bidirectional-search/bidirectional-search';
import {SearchAlgorithm} from './entities/search-algorithm';
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-search-tree',
  imports: [NgFor, NgxGraphModule],
  templateUrl: './search-tree.component.html',
  styleUrl: './search-tree.component.scss'
})
export class SearchTreeComponent {
  @ViewChild('treeTab', {static: false}) treeTab: ElementRef;
  @Input() selectedAlgorithm!: SearchAgent<any, any>;
  @Output() algorithmChange = new EventEmitter<SearchAgent<any, any>>();

  @Input() set searchState(obs: Observable<SearchState<any>>) {
    this.searchNodes = [];

    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.searchSubscription = obs.subscribe({
      next: (state) => {
        this.generateTreeData(state);
      },
      complete: () => {
        this.drawTree();
      }
    });
  }

  searchNodes: {id: string, color: string, parent?: string}[] = [];
  nodes: GraphNode[] = [];
  links: GraphLink[] = [];

  searchAlgorithms: Record<SearchAlgorithm, SearchAgent<any, any>> = {
    [SearchAlgorithm.BFS]: new BreadthFirstSearch(),
    [SearchAlgorithm.AStar]: new AStarSearch(),
    [SearchAlgorithm.Dijkstra]: new UniformCostSearch(),
    [SearchAlgorithm.GreedyBest]: new GreedyBestFirstSearch(),
    [SearchAlgorithm.DLS]: new DepthLimitedSearch(10),
    [SearchAlgorithm.DFS]: new DepthFirstSearch(),
    [SearchAlgorithm.Bidirectional]: new BidirectionalSearch()
  }

  private searchSubscription: Subscription;

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
  }

  private handleTabChange(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const selectedTabId = target.getAttribute('aria-controls');

    this.selectedAlgorithm = this.searchAlgorithms[selectedTabId];
    this.algorithmChange.emit(this.selectedAlgorithm);

    this.links = [];
    this.nodes = [];
  }

  setColor(node: { label: string }) {
    const test = this.searchNodes.find(n => n.id === node.label);
    if(test) {
      return test.color;
    }
    return '#FFF';
  }

  private generateTreeData(searchState: SearchState<any>) {
    // Move reached nodes from frontier to explored
    const frontierNodes = this.searchNodes.filter(node => node.color === '#0000FF');
    for(const node of frontierNodes) {
      if(!searchState.frontier.find(n => n.state.toString() === node.id)) {
        node.color = '#00FF00';
      }
    }

    // Add frontier nodes
    for(const node of searchState?.frontier) {
      if(this.searchNodes.find(n => n.id === node.state.toString())) {
        continue;
      }
      this.searchNodes.push({id: node.state.toString(), color: '#0000FF', parent: node.parent?.state.toString()});
    }

    // Add solution nodes
    if(searchState.solution) {
      let solution = searchState.solution;
      while(solution) {
        const node = this.searchNodes.find(n => n.id === solution.state.toString());
        if(node) {
          node.color = '#FF0000';
        }
        solution = solution.parent;
      }
    }
  }

  private drawTree() {
    this.nodes = [];
    this.links = [];

    // Limit rendered tree nodes to 200
    const drawnNodes = this.searchNodes.slice(0, 200);

    // Draw nodes
    for(const node of drawnNodes) {
      const graphNode: GraphNode = {
        id: node.id,
        label: node.id
      };

      // Create link
      if(node.parent) {
        const graphLink: GraphLink = {
          id: node.id,
          source: node.parent,
          target: node.id,
          label: 'is parent of'
        };
        this.links.push(graphLink);
      }
      this.nodes.push(graphNode);
    }
  }
}
