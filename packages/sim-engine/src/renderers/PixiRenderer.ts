import * as PIXI from 'pixi.js';
import BaseWorld from '../worlds/BaseWorld';
import BaseAgent from '../agents/BaseAgent';
import { Renderer } from '../types';

class PixiRenderer implements Renderer {
  public app: PIXI.Application;
  private sprites: {
    [key: string]: PIXI.Texture;
  };
  constructor() {
    this.app = new PIXI.Application({ width: 500, height: 500 });
    this.app.renderer.backgroundColor = 0xd0d0d0;
    this.sprites = {};
  }
  render(world: BaseWorld) {
    const xScale = this.app.view.width / world.x;
    const yScale = this.app.view.height / world.y;
    const newStage = new PIXI.Container();
    for (const entity of world.entities) {
      if (this.sprites[entity.constructor.name]) {
        let eSprite = new PIXI.Sprite(this.sprites[entity.constructor.name]);
        eSprite.position.x = entity.coords.x * xScale;
        eSprite.position.y = entity.coords.y * yScale;
        const scale = 25 / eSprite.height;
        eSprite.height = eSprite.height * scale;
        eSprite.width = eSprite.width * scale;
        newStage.addChild(eSprite);
      }
    }
    this.app.stage = newStage;

    this.app.render();
  }

  addSprites(sprites: TextureLoader[]) {
    PIXI.Loader.shared.add(sprites.map((s) => s.url)).load(() => {
      console.log('sprites loaded');
      for (let s of sprites) {
        this.sprites[s.className] = PIXI.Loader.shared.resources[s.url].texture as PIXI.Texture;
      }
    });
  }

  getView() {
    return this.app.view;
  }
}
type TextureLoader = {
  className: string;
  url: string;
};
export default PixiRenderer;
