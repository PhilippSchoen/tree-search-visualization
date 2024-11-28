import {Position} from "./position";
import {PathfindingNode} from "./pathfinding-node";

describe('PathfindingNode', () => {
   test('expand should return the positions to the top, bottom, left and right of the given position', () => {
        const node = new PathfindingNode(new Position(3, -1));
        const childNodes = node.expand();
        expect(childNodes.length).toBe(4);
        const up = childNodes.find(n => n.position.x === node.position.x && n.position.y === node.position.y + 1);
        expect(up.position).toBeDefined()
        const down = childNodes.find(n => n.position.x === node.position.x && n.position.y === node.position.y - 1);
        expect(down.position).toBeDefined()
        const left = childNodes.find(n => n.position.x === node.position.x - 1 && n.position.y === node.position.y);
        expect(left.position).toBeDefined()
        const right = childNodes.find(n => n.position.x === node.position.x + 1 && n.position.y === node.position.y);
        expect(right.position).toBeDefined()
   });

   test('Expand should work on child nodes', () => {
        const node = new PathfindingNode(new Position(543, -123));
        const childNodes = node.expand();
        expect(childNodes.length).toBe(4);
        const finalChildNodes = childNodes[0].expand();
        expect(finalChildNodes.length).toBe(4);
        const up = finalChildNodes.find(n => n.position.x === childNodes[0].position.x && n.position.y === childNodes[0].position.y + 1);
        expect(up.position).toBeDefined()
        const down = finalChildNodes.find(n => n.position.x === childNodes[0].position.x && n.position.y === childNodes[0].position.y - 1);
        expect(down.position).toBeDefined()
        const left = finalChildNodes.find(n => n.position.x === childNodes[0].position.x - 1 && n.position.y === childNodes[0].position.y);
        expect(left.position).toBeDefined()
        const right = finalChildNodes.find(n => n.position.x === childNodes[0].position.x + 1 && n.position.y === childNodes[0].position.y);
        expect(right.position).toBeDefined()
   });

   test('isGoalState should return true if position is goal', () => {
        const node = new PathfindingNode(new Position(22, -7));
        expect(node.isGoalState(new Position(22, -7))).toBe(true);
   });

   test('isGoalState should return false if position is not goal', () => {
        const node = new PathfindingNode(new Position(-22, 7));
        expect(node.isGoalState(new Position(22, -7))).toBe(false);
   });

   test('isGoalState should return false if goal state is undefined', () => {
        const node = new PathfindingNode(new Position(-22, 7));
        expect(node.isGoalState(undefined)).toBe(false);
   })
});