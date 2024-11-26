import {Location} from "./location";
import {Node} from "./node";

describe('Node', () => {
   test('expand should return an array of nodes', () => {
      const node = new Node(Location.Berlin);
      const childNodes = node.expand();
      expect(childNodes.length).toBeGreaterThan(1);
      const paris = childNodes.find(n => n.location === Location.Paris);
      expect(paris.location).toBe(Location.Paris);
   });

   test('Expand should work on child nodes', () => {
      const node = new Node(Location.Berlin);
      const childNodes = node.expand();
      const paris = childNodes.find(n => n.location === Location.Paris);
      const parisChildNodes = paris.expand();
      expect(parisChildNodes.length).toBeGreaterThan(1);
      const berlin = parisChildNodes.find(n => n.location === Location.Berlin);
      expect(berlin.location).toBe(Location.Berlin);
   });

   test('isGoalState should return true if location is goal', () => {
      const node = new Node(Location.Berlin);
      expect(node.isGoalState(Location.Berlin)).toBe(true);
   });

   test('isGoalState should return false if location is not goal', () => {
      const node = new Node(Location.Berlin);
      expect(node.isGoalState(Location.Paris)).toBe(false);
   });

   test('isGoalState should return false if goal state is undefined', () => {
      const node = new Node(Location.Berlin);
      expect(node.isGoalState(undefined)).toBe(false);
   });

   test("solution should return the node's solution path, with the goal state being the last element", () => {
      const node = new Node(Location.Berlin);
      const parent1 = new Node(Location.Paris, node);
      const parent2 = new Node(Location.London, parent1);

      expect(parent2.solution).toEqual([Location.Berlin, Location.Paris, Location.London]);
   });
});