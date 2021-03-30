import Vector2 from '../utils/Vector2';
import Food from '../objects/Food';
import Coordinates from '../utils/Coordinates';
import BasicWorld from '../worlds/BasicWorld';
import BaseAgent from './BaseAgent';

class HungryAgent extends BaseAgent {
  public energy: number;
  public speed: number;
  public size: number;
  public detectionRange: number;
  public food: number;
  public homeCoords: Coordinates;
  public nextStatus: number;
  private currDirection: Vector2;
  static DEAD = 0;
  static ALIVE = 1;
  static BREED = 2;

  constructor(public coords: Coordinates, public world?: BasicWorld) {
    super(coords, world, 'Hungry');
    this.energy = 100;
    this.food = 0;
    this.size = 1;
    this.speed = 1;
    this.detectionRange = 30;
    this.nextStatus = HungryAgent.ALIVE;
    this.homeCoords = new Coordinates(coords.x, coords.y);
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

  act() {
    if (this.world === undefined) {
      return;
    }
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
      if (foodVector.magnitude() < this.speed) {
        this.currDirection = foodVector;
      } else {
        this.currDirection = foodVector.normalize().multiply(this.speed);
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

  eat(food: Food) {
    this.energy += 100;
    this.food++;
    this.world?.removeEntity(food);
    this.currDirection = this.coords.vectorTo(this.homeCoords).normalize().multiply(this.speed);
  }

  walk() {
    this.coords = this.coords.add(this.currDirection);
    this.energy -= this.speed * this.speed * 2;
    if (this.energy <= 0) {
      this.nextStatus = HungryAgent.DEAD;
    }
  }
}

export default HungryAgent;
