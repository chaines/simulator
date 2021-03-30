import BasicWorld from '../BasicWorld';
import BaseAgent from '../../agents/BaseAgent';
import Coordinates from '../../utils/Coordinates';

describe('Basic World Class', () => {
  let world: BasicWorld;
  let agent1: BaseAgent;
  let agent2: BaseAgent;
  beforeEach(() => {
    world = new BasicWorld(100, 100);
    agent1 = new BaseAgent(new Coordinates(1, 1));
    agent2 = new BaseAgent(new Coordinates(1, 2));
  });

  describe('addEntity', () => {
    it('should add agents to the entities array', () => {
      world.addEntity(agent1);
      expect(world.entities.length).toBe(1);
      expect(world.entities.includes(agent1)).toBe(true);
      world.addEntity(agent2);
      expect(world.entities.length).toBe(2);
      expect(world.entities.includes(agent2)).toBe(true);
    });

    it('should not add duplicate entities', () => {
      world.addEntity(agent1);
      world.addEntity(agent1);
      expect(world.entities.length).toBe(1);
    });

    it('should return true if successful in adding entity', () => {
      const results = world.addEntity(agent1);
      expect(results).toBe(true);
    });

    it('should return false if attempting to add duplicate', () => {
      world.addEntity(agent1);
      const results = world.addEntity(agent1);
      expect(results).toBe(false);
    });
  });

  describe('removeEntity', () => {
    it('should remove an entity from the entities array', () => {
      world.addEntity(agent1);
      world.addEntity(agent2);
      world.removeEntity(agent2);
      expect(world.entities.length).toBe(1);
      expect(world.entities.includes(agent2)).toBe(false);
    });
    it('should only remove an entity if present in the world', () => {
      world.addEntity(agent1);
      world.removeEntity(agent2);
      expect(world.entities.length).toBe(1);
      expect(world.entities.includes(agent1)).toBe(true);
      expect(world.entities.includes(agent2)).toBe(false);
    });
    it('should return true on successful removal', () => {
      world.addEntity(agent1);
      const results = world.removeEntity(agent1);
      expect(results).toBe(true);
    });
    it("should return false if the entity wasn't found in the world", () => {
      world.addEntity(agent1);
      const results = world.removeEntity(agent2);
      expect(results).toBe(false);
    });
  });

  describe('getNearby', () => {
    let agent3: BaseAgent;
    let agent4: BaseAgent;
    let agent5: BaseAgent;
    beforeEach(() => {
      agent3 = new BaseAgent(new Coordinates(10, 12));
      agent4 = new BaseAgent(new Coordinates(15, 12));
      agent5 = new BaseAgent(new Coordinates(100, 90));
      world.addEntity(agent1);
      world.addEntity(agent2);
      world.addEntity(agent3);
      world.addEntity(agent4);
      world.addEntity(agent5);
    });

    it('Should be empty with a range of 0', () => {
      const results = world.getNearby(new Coordinates(15, 15), 0);
      expect(results.length).toBe(0);
    });

    it('Should detect nearby entities along the x axis', () => {
      let results = world.getNearby(new Coordinates(12, 12), 2);
      expect(results.length).toBe(1);
      results = world.getNearby(new Coordinates(12, 12), 3);
      expect(results.length).toBe(2);
    });

    it('Should detect nearby entities along the y axis', () => {
      let results = world.getNearby(new Coordinates(10, 11), 1);
      expect(results.length).toBe(1);
      results = world.getNearby(new Coordinates(10, 10), 2);
      expect(results.length).toBe(1);
    });

    it('Should detect all entities when radius encompasses whole board', () => {
      let results = world.getNearby(new Coordinates(50, 50), Math.sqrt(50000));
      expect(results.length).toBe(5);
    });
  });

  describe('inBounds', () => {
    it('Should return true for all integer values in the constraints', () => {
      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
          expect(world.inBounds(new Coordinates(i, j))).toBe(true);
        }
      }
    });
    it('should return false if either x or y is out of bounds in either direction', () => {
      expect(world.inBounds(new Coordinates(50, 101))).toBe(false);
      expect(world.inBounds(new Coordinates(101, 50))).toBe(false);
      expect(world.inBounds(new Coordinates(-1, 50))).toBe(false);
      expect(world.inBounds(new Coordinates(50, -1))).toBe(false);
    });
    it('should properly adjust to the size of the world', () => {
      expect(world.inBounds(new Coordinates(99, 99))).toBe(true);
      expect(new BasicWorld(50, 50).inBounds(new Coordinates(99, 99))).toBe(false);
    });
  });
});
