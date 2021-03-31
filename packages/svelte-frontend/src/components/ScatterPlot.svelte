<script lang="ts">
  import { onMount } from 'svelte';
  import { Writable } from 'svelte/store';
  import * as PIXI from 'pixi.js';
  import { getStep, options } from './graph';

  export let name = 'Graph';
  export let data: Writable<[number, number][]>;

  let prevXstep = 0;
  let prevYstep = 0;
  const app = new PIXI.Application({antialias: true});
  app.renderer.backgroundColor = options.backgroundColor;
  app.stage = new PIXI.Graphics();

  onMount(() => {
    document.getElementById('scatterplot-' + name).appendChild(app.view);
    app.resizeTo = document.getElementById('scatterplot-' + name);
    app.resize();
  });

  const renderGraph = (data: [number, number][]) => {
    const width = app.view.width;
    const height = app.view.height;

    let maxY = data[0][1];
    let minY = data[0][1];
    let maxX = data[0][0];
    let minX = data[0][0];
    for(const d of data) {
      if(d[1] > maxY) maxY = d[1];
      if(d[1] < minY) minY = d[1];
      if(d[0] > maxX) maxX = d[0];
      if(d[0] < minX) minX = d[0];
    }
    const distY = maxY - minY;
    const distX = maxX - minX;
    minY = minY - distY/3;
    maxY = maxY + distY/3;
    minX = minX - distX/3;
    maxX = maxX + distX/3;
    
    const xStep = getStep(maxX - minX);
    const yStep = getStep(maxY - minY);
    const yScale = height/(maxY - minY);
    const xScale = width/(maxX - minX);

    let stage: PIXI.Graphics;

    app.stage.children.forEach(c => c.destroy());
    stage = new PIXI.Graphics;
    app.stage = stage;
    stage.clear();

    stage.lineStyle(options.lineStyle);
    for(let i = yStep; i < (maxY - minY); i+=yStep) {
      let lineHeight = height - (i * yScale);
      stage.moveTo(0, lineHeight);
      stage.lineTo(width, lineHeight);
      let label = new PIXI.Text((Math.floor((i + minY) * 100)/100).toString(), options.labelStyle);
      label.anchor.set(0, 1);
      label.position.set(0, lineHeight);
      stage.addChild(label);
    }

    for(let i = xStep; i < (maxX - minX); i += xStep) {
      let lineLeft = i * xScale;
      stage.moveTo(lineLeft, 0);
      stage.lineTo(lineLeft, height);
      let label = new PIXI.Text((Math.floor((i + minX) * 100)/100).toString(), options.labelStyle);
      label.anchor.set(1,1);
      label.position.set(lineLeft, height);
      stage.addChild(label);
    }
    stage.beginFill(options.foregroundColor);
    for(let d of data) {
      stage.drawCircle((d[0] - minX) * xScale, (d[1] - minY) * yScale, 10);
    }


  }

  data.subscribe(d => renderGraph(d));

</script>


<div class="graph">
  <h3>{name}</h3>
  <div id="scatterplot-{name}" class="graphDisplay"></div>
</div>