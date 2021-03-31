<script lang="ts">
  import { onMount } from 'svelte';
  import { Writable} from 'svelte/store';
  import * as PIXI from 'pixi.js';

  export let name = 'Graph';
  export let maxGenerations: number;
  export let data: Writable<number[]>;
  const app = new PIXI.Application({antialias: false});
  app.renderer.backgroundColor = 0xffffff;
  const graph = new PIXI.Graphics();
  app.stage = graph;
  onMount(() => {
    console.log('hello?!?');
    document.getElementById('graphRender-' + name).appendChild(app.view);
    app.resizeTo = document.getElementById('graphRender-' + name);
    app.resize();
  })

  data.subscribe((d) => {
    graph.clear();
    graph.beginFill(0x333333); 
    const width = app.view.width;
    const height = app.view.height;
    const genWidth = width / maxGenerations;
    const maxData = d.reduce((l, c) => l > c ? l : c, 0) * 1.2;
    const scaleY = height/maxData;
    let lastBottom = new PIXI.Point(0, height);
    let lastTop = new PIXI.Point(0, height - d[0] * scaleY);
    for(let i = 1; i < d.length; i++) {
      graph.moveTo(lastTop.x, lastTop.y);
      let x = i * genWidth;
      let y = d[i] * scaleY;
      let bottom = new PIXI.Point(x, height);
      let top = new PIXI.Point(x, height - y);
      // graph.lineStyle({ width: 10, color: 0xff});
      // graph.lineTo(top.x, top.y)
      // graph.lineStyle({width: 0});
      graph.drawPolygon(lastBottom, lastTop, top, bottom);
      lastBottom = bottom;
      lastTop = top;
    }
    app.render();

  })
</script>

<main>
  <h3>{name}</h3>
  <div id="graphRender-{name}" class="graphDisplay">

  </div>
</main>