import BaseLoop from '@simulation-engine/loops/BaseLoop';
import PixiRenderer from '@simulation-engine/renderers/PixiRenderer';
import HungryAgent from '@simulation-engine/agents/HungryAgent';
import GeneticDriftWorld, { HungryPopSettings } from '@simulation-engine/worlds/GeneticDriftWorld';
import { Readable, writable, Writable, get } from 'svelte/store';
import { Entity } from '@simulation-engine/types';

type SimRunnerSettings = {
  worldSize?: number;
  maxGenerations?: number;
  render?: boolean;
  tickSpeed?: number;
  foodPerCycle?: number;
  initialPopSize?: number;
  initialPopSettings?: HungryPopSettings;
  rendererSettings?: RendererSettings;
  renderElement?: HTMLElement;
};

type RendererSettings = {
  height?: number;
  width?: number;
  sizeToParent?: boolean;
  autoResize?: boolean;
  backgroundColor?: number;
  spriteList?: { className: string; url: string }[];
};

// There's some hella jankiness going on here, to allow proper execution context for the loop event
// listener. It's not the best way, I'm sure, but it's 2AM and I'm pretty sure it'll work.
export default class SimRunner {
  // Core components
  private loop: BaseLoop;
  private renderer: PixiRenderer;
  private world: GeneticDriftWorld;

  // Settings
  public worldSize: number;
  public maxGenerations: number;
  private _render: boolean;
  public tickSpeed: number;
  public foodPerCycle: number;
  public initialPopSize: number;
  public initialPopSettings: HungryPopSettings;
  public rendererSettings: RendererSettings;
  private renderElement: HTMLElement;

  // State
  private _start: number;
  private _stop: number;
  public running: Readable<boolean>;
  private _running: Writable<boolean>;
  private _r: boolean;
  public generation: Readable<number>;
  private _generation: Writable<number>;
  public historicSenseData: Readable<number[]>;
  private _historicSenseData: Writable<number[]>;
  public historicSpeedData: Readable<number[]>;
  private _historicSpeedData: Writable<number[]>;
  public historicPopulationData: Readable<number[]>;
  private _historicPopulationData: Writable<number[]>;
  public currGenData: Readable<[number, number][]>;
  private _currGenData: Writable<[number, number][]>;

  constructor(options: SimRunnerSettings) {
    this.init(options);
  }

  init(options?: SimRunnerSettings) {
    if (options) {
      this.worldSize = options.worldSize ?? 5600;
      this.maxGenerations = options.maxGenerations ?? 1000;
      this._render = options.render ?? false;
      this.foodPerCycle = options.foodPerCycle ?? 150;
      this.initialPopSize = options.initialPopSize ?? 50;
      this.initialPopSettings = options.initialPopSettings ?? {};
      this.rendererSettings = options.rendererSettings ?? {};
      this.tickSpeed = options.tickSpeed;
      this.rendererSettings.backgroundColor ??= 0x1f2937;
      this.rendererSettings.spriteList ??= [
        { className: 'Food', url: '/static/strawberry.png' },
        { className: 'HungryAgent', url: '/static/bat.png' },
      ];
      this.rendererSettings.width ??= 400;
      this.rendererSettings.height ??= 400;
      if (!options.renderElement) {
        this._render = false;
      } else {
        this.renderElement = options.renderElement;
      }
    }
    const worldLength = Math.floor(Math.sqrt(this.worldSize));
    const world = new GeneticDriftWorld({
      x: worldLength,
      y: worldLength,
      foodPerCycle: this.foodPerCycle,
      initialPopSize: this.initialPopSize,
      initialPopSettings: this.initialPopSettings,
    });
    this.world = world;
    if (this._render && this.renderElement) {
      this.initRenderer();
      this.loop = new BaseLoop({
        pauseOnTicks: true,
        fireEvents: true,
        world,
        renderer: this.renderer,
        tickFunc: (f) => {
          if (this.tickSpeed) {
            window.setTimeout(f, this.tickSpeed);
          } else {
            window.requestAnimationFrame(f);
          }
        },
      });
    } else {
      this.loop = new BaseLoop({
        pauseOnTicks: false,
        fireEvents: true,
        world,
        tickFunc: (f) => {
          window.setTimeout(f, this.tickSpeed ?? 0);
        },
      });
    }
    this.initStores();
  }

  initRenderer() {
    const renderer = new PixiRenderer();
    this.renderer = renderer;
    renderer.app.renderer.backgroundColor = this.rendererSettings.backgroundColor;
    renderer.app.view.width = this.rendererSettings.width;
    renderer.app.view.height = this.rendererSettings.height;
    renderer.addSprites(this.rendererSettings.spriteList);
    this.renderElement?.appendChild(renderer.app.view);
    renderer.app.resizeTo = this.renderElement;
    renderer.app.resize();
  }

  // Let the jankiness begin
  initStores() {
    this._historicPopulationData ??= writable([]);
    this.historicPopulationData = { subscribe: this._historicPopulationData.subscribe };
    this._historicSenseData ??= writable([]);
    this.historicSenseData = { subscribe: this._historicSenseData.subscribe };
    this._historicSpeedData ??= writable([]);
    this.historicSpeedData = { subscribe: this._historicSpeedData.subscribe };
    this._generation ??= writable(0);
    this.generation = { subscribe: this._generation.subscribe };
    this._currGenData ??= writable([]);
    this.currGenData = { subscribe: this._currGenData.subscribe };
    this._running ??= writable(false);
    this.running = { subscribe: this._running.subscribe };
    this._historicPopulationData.set([this.initialPopSize]);
    this._historicSenseData.set([this.initialPopSettings.detectionRange ?? 3]);
    this._historicSpeedData.set([this.initialPopSettings.speed ?? 1]);
    this._generation.set(0);
    this._currGenData.set([]);
    this._running.set(false);
  }

  run() {
    console.log('running...');
    if (!this.loop) {
      this.init();
    }
    if (!this._r) {
      this._running.set(true);
      this._r = true;
      this._start = Date.now();

      // TODO: This is ugly as hell, jeeze (April 2021)
      this.loop.addEventListener('cycle', this.loopFunc.bind(this));
      this.loop.start();
    }
  }

  pause() {
    this.loop.pause();
    this._r = false;
    this._running.set(false);
  }

  /**
   * Destroys the loop, cannot be restarted.
   */
  stop() {
    this.loop.pause();
    this.loop = null;
  }

  setRenderElement(el: HTMLElement) {
    this.renderElement = el;
    if (this.renderer && el) {
      el.appendChild(this.renderer.app.view);
      this.renderer.app.resizeTo = el;
      this.renderer.app.resize();
    } else {
      this.initRenderer();
    }
  }

  render(r: boolean) {
    this._render = r;
    if (r && this.renderElement && !this.renderer) {
      this.setTickFunc();
      this.initRenderer();
      this.loop.setRenderer(this.renderer);
      this.loop.pauseOnTicks(true);
    } else if (!r) {
      this.loop.pauseOnTicks(false);
      this.renderer = null;
      this.renderElement?.removeChild(this.renderElement.firstChild);
      this.loop.setRenderer(null);
    }
  }

  isRunning() {
    return this.running;
  }

  private loopFunc(entities: Entity[]) {
    let generation = get(this.generation);
    let tmp: [number, number][] = [];
    let totalSpeed = 0;
    let totalSense = 0;
    let agents: HungryAgent[] = entities.filter((e) => e instanceof HungryAgent) as HungryAgent[];
    const agentCount = agents.length;
    let avgSpeed = 0;
    let avgSense = 0;
    generation++;
    this._generation.set(generation);
    if (generation === this.maxGenerations) {
      this._stop = Date.now();
      this._running.set(false);
      this._r = false;
      this.loop.pause();
      console.log(`Time to ${generation} generations: ${Math.floor((this._stop - this._start) / 10) / 100}s`);
    }
    for (const a of agents) {
      tmp.push([a.speed, a.detectionRange]);
      totalSpeed += a.speed;
      totalSense += a.detectionRange;
    }
    this._currGenData.set(tmp);
    if (agentCount !== 0) {
      avgSpeed = totalSpeed / agentCount;
      avgSense = totalSense / agentCount;
    } else {
      this._stop = Date.now();
      this._running.set(false);
      this._r = false;
      console.log(`Time to ${generation} generations: ${Math.floor((this._stop - this._start) / 10) / 100}s`);
    }
    this._historicPopulationData.update((d) => [...d, agentCount]);
    this._historicSpeedData.update((d) => [...d, avgSpeed]);
    this._historicSenseData.update((d) => [...d, avgSense]);
  }

  private setTickFunc() {
    if (this.tickSpeed) {
      this.loop.tickFunc = (f) => setTimeout(f, this.tickSpeed);
    } else {
      this.loop.tickFunc = (f) => requestAnimationFrame(f);
    }
  }

  destroy() {
    if (this.renderElement && this.renderer) {
      this.renderElement.removeChild(this.renderer.app.view);
    }
    this.renderer?.app.destroy();
    this.loop.pause();
  }
}
