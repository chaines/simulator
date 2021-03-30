import Vector2 from '../utils/Vector2';
import Food from '../objects/Food';
import { Agent } from '../types';
import Coordinates from '../utils/Coordinates';
import BasicWorld from '../worlds/BasicWorld';

class HungryAgent implements Agent {
  public hunger: number;
  public name: string;
  public speed: number;
  public size: number;
  public detectionRange: number;
  public food: number;
  public homeCoords: Coordinates;
  private currDirection: Vector2;

  constructor(public coords: Coordinates, public world?: BasicWorld) {
    this.hunger = 0;
    this.name = 'Hungry';
    this.food = 0;
    this.size = 1;
    this.speed = 1;
    this.detectionRange = 3;
    this.homeCoords = new Coordinates(coords.x, coords.y);
    if (world !== undefined) {
      this.currDirection = this.coords.vectorTo(world.center).normalize();
    } else {
      this.currDirection = Vector2.UNIT_VECTOR;
    }
  }

  isAlive() {
    return this.hunger < 10;
  }

  isActive() {
    return !(this.coords.x === this.homeCoords.x && this.coords.y === this.homeCoords.y);
  }

  act() {
    if (this.world === undefined) {
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
      this.currDirection = this.coords.vectorTo(closestFood.coords).normalize().multiply(this.speed);
    } else {
      do {
        this.currDirection = this.currDirection.rotate(Math.random() - 0.5);
      } while (!this.world?.inBounds(this.coords.add(this.currDirection)));
    }
    this.walk();
  }

  walk() {
    this.coords = this.coords.add(this.currDirection);
    this.hunger += this.speed * this.speed;
  }
}

export default HungryAgent;
