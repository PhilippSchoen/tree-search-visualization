import {Location} from "./location";
import {LocationNode} from "./location-node";

describe('LocationNode', () => {
   test('expand should return an array of nodes', () => {
      const node = new LocationNode(Location.Berlin, Location.Mars);
      const childNodes = node.expand();
      expect(childNodes.length).toBeGreaterThan(1);
      const paris = childNodes.find(n => n.location === Location.Paris);
      expect(paris.location).toBe(Location.Paris);
   });

   test('Expand should work on child nodes', () => {
      const node = new LocationNode(Location.Berlin, Location.Mars);
      const childNodes = node.expand();
      const paris = childNodes.find(n => n.location === Location.Paris);
      const parisChildNodes = paris.expand();
      expect(parisChildNodes.length).toBeGreaterThan(1);
      const berlin = parisChildNodes.find(n => n.location === Location.Berlin);
      expect(berlin.location).toBe(Location.Berlin);
   });

   test('isGoalState should return true if location is goal', () => {
      const node = new LocationNode(Location.Berlin, Location.Berlin);
      expect(node.isGoalState()).toBe(true);
   });

   test('isGoalState should return false if location is not goal', () => {
      const node = new LocationNode(Location.Berlin, Location.Mars);
      expect(node.isGoalState()).toBe(false);
   });

   test('isGoalState should return false if goal state is undefined', () => {
      const node = new LocationNode(Location.Berlin, undefined);
      expect(node.isGoalState()).toBe(false);
   });

});