import BaseWorld from '../worlds/BaseWorld';
import BaseAgent from '../agents/BaseAgent';
import { Renderer } from '../types';

class ConsoleRenderer implements Renderer {
  constructor() {}

  render(world: BaseWorld) {
    const arr: string[][] = [];
    console.clear();
    for (let i = 0; i < world.y; i++) {
      arr[i] = [];
      for (let j = 0; j < world.x; j++) {
        arr[i][j] = ' ';
      }
    }
    for (const entity of world.entities) {
      if (entity instanceof BaseAgent) {
        arr[Math.floor(entity.coords.y)][Math.floor(entity.coords.x)] = entity.isAlive() ? 'A' : 'D';
      } else {
        arr[Math.floor(entity.coords.y)][Math.floor(entity.coords.x)] = 'O';
      }
    }
    console.log(arr.map((line) => line.join('')).join('\n'));
  }
}
export default ConsoleRenderer;
