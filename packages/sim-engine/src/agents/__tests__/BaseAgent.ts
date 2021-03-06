import BaseWorld from '../../worlds/BaseWorld';
import { Coordinates } from '../../utils';
import BaseAgent from '../BaseAgent';

describe('BaseAgent', () => {
  const agent1 = new BaseAgent(new Coordinates(5, 5));
  const agent2 = new BaseAgent(new Coordinates(5, 5), new BaseWorld({ x: 100, y: 100 }));

  describe('isAlive', () => {
    it('returns true', () => {
      const alive = agent1.isAlive();
      const a2 = agent2.isAlive();
      expect(alive).toBeTruthy();
      expect(a2).toBeTruthy();
    });
  });

  describe('isActive', () => {
    it('returns true', () => {
      const a1 = agent1.isActive();
      const a2 = agent2.isActive();
      expect(a1).toBeTruthy();
      expect(a2).toBeTruthy();
    });
  });

  describe('act', () => {
    it('calls checkWorld', () => {
      const spy = jest.spyOn(agent2, 'checkWorld');
      agent2.act();
      expect(spy).toBeCalled();
    });

    it('throws an error if no world is defined', () => {
      const act = agent1.act.bind(agent1);
      expect(act).toThrow();
    });
  });

  describe('checkWorld', () => {
    it('returns true if world is assigned', () => {
      expect(agent2.checkWorld()).toBeTruthy();
    });

    it('does throw an error if the world is not supplied', () => {
      expect(agent1.checkWorld()).toBeFalsy();
    });
  });

  describe('isAgent', () => {
    it('determines if an object is an Agent', () => {
      expect(BaseAgent.isAgent(agent1)).toBeTruthy();
      expect(BaseAgent.isAgent(agent2)).toBeTruthy();

      const e = {
        coords: new Coordinates(0, 0),
        name: 'Not an agent',
      };
      expect(BaseAgent.isAgent(e)).toBeFalsy();
    });
  });
});
