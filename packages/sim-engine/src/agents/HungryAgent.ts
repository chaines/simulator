import Vector2 from '../utils/Vector2';
import Food from '../objects/Food';
import Coordinates from '../utils/Coordinates';
import BaseWorld from '../worlds/BaseWorld';
import BaseAgent from './BaseAgent';

export type HungryAgentOptions = {
  coords: Coordinates;
  speed?: number;
  size?: number;
  detectionRange?: number;
  mutationRate?: number;
};

class HungryAgent extends BaseAgent {
  public energy: number;
  public speed: number;
  public size: number;
  public detectionRange: number;
  public food: number;
  public homeCoords: Coordinates;
  public nextStatus: number;
  public currStatus: number;

  private currDirection: Vector2;
  private mutationRate: number;

  public static DEAD = 0;
  public static ALIVE = 1;
  public static BREED = 2;
  public static WAITING = 0;
  public static FORAGING = 1;
  public static RETURNING_HOME = 2;

  private static BASE_ENERGY = 200;

  constructor({ coords, speed, size, detectionRange, mutationRate }: HungryAgentOptions, public world?: BaseWorld) {
    super(coords, world, 'Hungry');
    this.energy = HungryAgent.BASE_ENERGY;
    this.food = 0;
    this.size = size || 1;
    this.speed = speed || 1;
    this.detectionRange = detectionRange || 3;
    this.nextStatus = HungryAgent.ALIVE;
    this.homeCoords = new Coordinates(coords.x, coords.y);
    this.mutationRate = mutationRate || 1;
    this.currStatus = HungryAgent.WAITING;
    if (world !== undefined) {
      this.currDirection = this.coords.vectorTo(world.center).normalize();
    } else {
      this.currDirection = Vector2.UNIT_VECTOR;
    }
  }

  isAlive() {
    return this.nextStatus !== HungryAgent.DEAD;
  }

  isActive() {
    return !(this.coords.x === this.homeCoords.x && this.coords.y === this.homeCoords.y);
  }

  act(cycleTime?: number) {
    this.checkWorld();
    this.world = this.world as BaseWorld;

    if (this.currStatus === HungryAgent.RETURNING_HOME) {
      const distanceToHome = this.coords.distanceTo(this.homeCoords);
      if (distanceToHome <= this.speed / 2) {
        this.currStatus = HungryAgent.WAITING;
        this.currDirection = this.coords.vectorTo(this.homeCoords);
      } else {
        this.currDirection = this.coords
          .vectorTo(this.homeCoords)
          .normalize()
          .multiply(this.speed / 2);
      }
      this.walk();
      return;
    } else if (this.currStatus === HungryAgent.WAITING && this.food > 0) {
      return;
    } else {
      this.currStatus = HungryAgent.FORAGING;
      if (this.nextStatus === HungryAgent.DEAD) {
        return;
      }
      const detected = this.world.getNearby(this.coords, this.detectionRange);
      let closestFood: Food | undefined = undefined;
      let distanceToClosest: number = this.world.x * this.world.y;
      for (let entity of detected) {
        if (entity instanceof Food && this.coords.distanceTo(entity.coords) < distanceToClosest) {
          distanceToClosest = this.coords.distanceTo(entity.coords);
          closestFood = entity;
        }
      }
      if (closestFood !== undefined) {
        const foodVector = this.coords.vectorTo(closestFood.coords);
        if (foodVector.magnitude() < this.speed / 2) {
          this.currDirection = foodVector;
        } else {
          this.currDirection = foodVector.normalize().multiply(this.speed / 2);
        }
      } else {
        do {
          this.currDirection = this.currDirection.rotate(Math.random() - 0.5);
        } while (!this.world?.inBounds(this.coords.add(this.currDirection)));
      }
      if (closestFood !== undefined && closestFood.coords.equals(this.coords)) {
        this.eat(closestFood);
      } else {
        this.walk();
      }
    }
    this.updateStatus(cycleTime || 0);
  }

  eat(food: Food) {
    if (!this.world?.entities.includes(food)) {
      console.log('Too slow');
    }
    this.energy += HungryAgent.BASE_ENERGY;
    this.food++;
    this.world?.removeEntity(food);
  }

  walk() {
    this.coords = this.coords.add(this.currDirection);
    this.energy -= this.speed * this.speed * 2 + this.detectionRange * 2;
    if (this.energy <= 0) {
      this.nextStatus = HungryAgent.DEAD;
    }
  }

  updateStatus(cycleTime: number) {
    if ((this.food >= 2 || (this.food >= 1 && cycleTime >= 0.5)) && this.currStatus === HungryAgent.FORAGING) {
      this.currStatus = HungryAgent.RETURNING_HOME;
      this.currDirection = this.coords
        .vectorTo(this.homeCoords)
        .normalize()
        .multiply(this.speed / 2);
    }
  }

  endCycle() {
    this.checkWorld();
    this.world = this.world as BaseWorld;
    if (!this.coords.equals(this.homeCoords)) {
      this.nextStatus = HungryAgent.DEAD;
    } else if (this.energy > HungryAgent.BASE_ENERGY && this.food >= 2) {
      this.nextStatus = HungryAgent.BREED;
    } else if (this.energy > HungryAgent.BASE_ENERGY / 2 && this.food >= 1) {
      this.nextStatus = HungryAgent.ALIVE;
    } else {
      this.nextStatus = HungryAgent.DEAD;
    }
    this.energy = HungryAgent.BASE_ENERGY;
    this.food = 0;
    this.currDirection = this.coords
      .vectorTo(this.world.center)
      .normalize()
      .multiply(this.speed / 2);
  }

  spawnChild(): HungryAgent {
    this.checkWorld();
    const spawnCoords = (this.world as BaseWorld).generateSpawnPoint();
    const newSpeed = this.speed + (Math.random() - 0.5) * (this.mutationRate / 4);
    const newSize = this.size + (Math.random() - 0.5) * (this.mutationRate / 8);
    const newDetectionRange = this.detectionRange + (Math.random() - 0.5) * (this.mutationRate / 3);
    return new HungryAgent(
      {
        coords: spawnCoords,
        speed: newSpeed,
        size: newSize,
        detectionRange: newDetectionRange,
        mutationRate: this.mutationRate,
      },
      this.world
    );
  }
}

export default HungryAgent;
