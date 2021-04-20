import { BaseAgent } from '@simulation-engine/agents';
import { World } from '@simulation-engine/types';
import Coordinates from '@simulation-engine/utils/Coordinates';
import Vector2 from '@simulation-engine/utils/Vector2';
import { Food } from '@simulation-engine/objects';

export type HungryAgentOptions = {
  coords: Coordinates;
  speed?: number;
  size?: number;
  detectionRange?: number;
  mutationRate?: number;
};
export enum HungryAgentStatus {
  DEAD = 0,
  ALIVE,
  BREED,
}

export enum HungryAgentAction {
  WAITING = 0,
  FORAGING,
  RETURNING_HOME,
}

class HungryAgent extends BaseAgent {
  private _energy: number;
  private _speed: number;
  private _size: number;
  private _detectionRange: number;
  private _food: number;
  private _mutationRate: number;
  private _homeCoords: Coordinates;
  private _status: HungryAgentStatus;
  private _action: HungryAgentAction;

  private _currDirection: Vector2;
  private static BASE_ENERGY = 75;

  constructor(
    { coords, speed, size, detectionRange, mutationRate }: HungryAgentOptions,
    public world?: World
  ) {
    super(coords, world, 'Hungry');
    this._energy = HungryAgent.BASE_ENERGY;
    this._food = 0;
    this._size = size ?? 1;
    this._speed = speed ?? 1;
    this._detectionRange = detectionRange ?? 3;
    this._mutationRate = mutationRate ?? 1;
    this._status = HungryAgentStatus.ALIVE;
    this._action = HungryAgentAction.WAITING;
    this._homeCoords = new Coordinates(coords.x, coords.y);

    if (this.world !== undefined) {
      this._currDirection = this.coords.vectorTo(this.world.center).normalize();
    } else {
      this._currDirection = Vector2.UNIT_VECTOR;
    }
  }

  get energy() {
    return this._energy;
  }
  get speed() {
    return this._speed;
  }
  get size() {
    return this._size;
  }
  get detectionRange() {
    return this._detectionRange;
  }
  get food() {
    return this._food;
  }
  get mutationRate() {
    return this._mutationRate;
  }
  get status() {
    return this._status;
  }
  get action() {
    return this._action;
  }

  isAlive() {
    return this._status !== HungryAgentStatus.DEAD;
  }

  isActive() {
    return this._action !== HungryAgentAction.WAITING;
  }

  act(cycleTime: number) {
    super.act();
    if (this._status === HungryAgentStatus.DEAD) return;
    switch (this._action) {
      case HungryAgentAction.RETURNING_HOME:
        if (this.coords.distanceTo(this._homeCoords) <= this._speed) {
          // If we will make it home this cycle, go ahead and set our vector directly to home
          // and assign us to the 'WAITING' action.
          this._action = HungryAgentAction.WAITING;
          this._currDirection = this.coords.vectorTo(this._homeCoords);
        }
        this.walk();
        break;
      case HungryAgentAction.WAITING:
        if (this.food > 0) {
          return;
        }
        this._action = HungryAgentAction.FORAGING;
        break;
      case HungryAgentAction.FORAGING:
        const foodInRange = this.world
          .getNearby(this.coords, this._detectionRange)
          .filter((e) => e instanceof Food) as Food[];
        let closestFood: Food | undefined;
        let distanceToClosest = this.world.x * this.world.y;
        for (let food of foodInRange) {
          if (this.coords.distanceTo(food.coords) < distanceToClosest) {
            distanceToClosest = this.coords.distanceTo(food.coords);
            closestFood = food;
          }
        }
        if (closestFood) {
          // If there is food within detection range, move towards the closest
          const foodVector = this.coords.vectorTo(closestFood.coords);
          if (foodVector.magnitude() < this._speed) {
            this._currDirection = foodVector;
          } else {
            this._currDirection = foodVector.normalize().multiply(this._speed);
          }
        } else {
          // Otherwise, randomly turn slightly, and keep walking.
          this._currDirection = this._currDirection.rotate(Math.random() - 0.5);
          if (!this.world.inBounds(this.coords.add(this._currDirection))) {
            // If the current direction would put us out of bounds, just turn towards the center
            this._currDirection = this.coords
              .vectorTo(this.world.center)
              .normalize()
              .multiply(this._speed);
          }
        }

        // If we're on top of food, eat it, otherwise move in the current direction
        if (closestFood?.coords.equals(this.coords)) {
          this.eat(closestFood);
        } else {
          this.walk();
        }
        break;
    }

    if (
      (this._food >= 2 || (this._food >= 1 && cycleTime >= 0.5)) &&
      this._action === HungryAgentAction.FORAGING
    ) {
      this._action = HungryAgentAction.RETURNING_HOME;
      this._currDirection = this.coords
        .vectorTo(this._homeCoords)
        .normalize()
        .multiply(this._speed);
    }
  }

  /**
   * Move in the current direction, and subtract appropriate energy. If energy <= 0, mark agent as dead
   */
  walk() {
    this.coords = this.coords.add(this._currDirection);
    this._energy -=
      this._currDirection.magnitude() * this._currDirection.magnitude() + this.detectionRange;
    if (this._energy <= 0) {
      this._energy = 0;
      this._status = HungryAgentStatus.DEAD;
    }
  }

  /**
   * Eats a food, and gains energy
   */
  eat(food: Food) {
    this._energy += HungryAgent.BASE_ENERGY;
    this._food++;
    this.world!.removeEntity(food);
  }

  /**
   * Call at the end of the 'day'
   */
  endCycle() {
    super.act();
    if (!this.coords.equals(this._homeCoords)) {
      this._status = HungryAgentStatus.DEAD;
    } else if (this.food >= 2) {
      this._status = HungryAgentStatus.BREED;
    } else if (this.food >= 1) {
      this._status = HungryAgentStatus.ALIVE;
    } else {
      this._status = HungryAgentStatus.DEAD;
    }
    this._action = HungryAgentAction.WAITING;
    this._food = 0;
    this._energy = HungryAgent.BASE_ENERGY;
    this._currDirection = this.coords.vectorTo(this.world.center).normalize().multiply(this._speed);
  }

  spawnChild() {
    super.act();
    const spawnCoords = this.world.generateSpawnPoint();
    const newSpeed = Math.max(0, this.speed + (Math.random() - 0.5) * (this.mutationRate / 4));
    const newSize = Math.max(0, this.size + (Math.random() - 0.5) * (this.mutationRate / 8));
    const newDetectionRange = Math.max(
      0,
      this.detectionRange + (Math.random() - 0.5) * (this.mutationRate / 3)
    );
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
