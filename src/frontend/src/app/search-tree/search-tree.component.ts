import {Component} from '@angular/core';
import {NgFor} from "@angular/common";
import {DagreNodesOnlyLayout, NgxGraphModule} from "@swimlane/ngx-graph";
import {GraphNode} from "./entities/graph-node";
import {GraphLink} from "./entities/graph-link";
import {SearchState} from "../../../../tree-search/search-state";
import {LocationNode} from "../../../../problems/location-problem/location-node";
import {Location} from "../../../../problems/location-problem/location";
import {GraphTree} from "./entities/graph-tree";
import {LocationProblem} from "../../../../problems/location-problem/location-problem";
import {BreadthFirstSearch} from "../../../../tree-search/breadth-first-search/breadth-first-search";
import {PathfindingProblem} from "../../../../problems/pathfinding-problem/pathfinding-problem";
import {Position} from "../../../../problems/pathfinding-problem/position";
import {GraphCluster} from "./entities/graph-cluster";
import {AStarSearch} from "../../../../tree-search/a-star-search/a-star-search";


@Component({
  selector: 'app-search-tree',
  imports: [NgFor, NgxGraphModule],
  templateUrl: './search-tree.component.html',
  styleUrl: './search-tree.component.scss'
})
export class SearchTreeComponent {

  constructor() {
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

  searchAlgorithms: string[] = [
      'Breadth-First-Search', 'Depth-First-Search', 'Depth-Limited-Search', 'Uniform-Cost-Search', 'Bidirectional-Search', 'Greedy-Best-First-Search', 'A-Star-Search'
  ];

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
