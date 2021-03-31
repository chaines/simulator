<script lang="ts">
  import { onMount } from 'svelte';
  import { Writable} from 'svelte/store';
  import * as PIXI from 'pixi.js';
  
  import { getStep, options } from './graph';

  export let name = 'Graph';
  export let maxGenerations: number;
  export let data: Writable<number[]>;
  export let liveGraph: boolean = true;
  const app = new PIXI.Application({antialias: true});
  app.renderer.backgroundColor = options.backgroundColor;
  onMount(() => {
    document.getElementById('historicGraphRender-' + name).appendChild(app.view);
    app.resizeTo = document.getElementById('historicGraphRender-' + name);
    app.resize();
  })

  const renderGraph = (d: number[]) => {
    for(let child of app.stage.children) {
      child.destroy();
    }
    const newGraph = new PIXI.Graphics();
    newGraph.clear();
    newGraph.beginFill(options.foregroundColor); 
    const width = app.view.width;
    const height = app.view.height;
    const genWidth = width / maxGenerations;
    const maxData = Math.ceil(d.reduce((l, c) => l > c ? l : c, 0) * 1.2);
    const scaleY = height/maxData;
    const xLabelStep = getStep(maxGenerations);
    const yLabelStep = getStep(maxData);
    
    let lastBottom = new PIXI.Point(0, height);
    let lastTop = new PIXI.Point(0, height - d[0] * scaleY);
    newGraph.lineStyle(options.lineStyle);
    for(let i = yLabelStep; i < maxData; i += yLabelStep) {
      let label = new PIXI.Text(i.toString(), options.labelStyle);
      let labelHeight = height - (i * height / maxData);
      label.anchor.set(0, 1);
      label.position.set(0, labelHeight);
      newGraph.addChild(label);
      newGraph.moveTo(0, labelHeight);
      newGraph.lineTo(width, labelHeight);
    }
    newGraph.lineStyle({width: 0});
    for(let i = 1; i < d.length; i++) {
      let x = i * genWidth;
      let y = d[i] * scaleY;
      let bottom = new PIXI.Point(x, height);
      let top = new PIXI.Point(x, height - y);
      newGraph.drawPolygon(lastBottom, lastTop, top, bottom);
      if(i % xLabelStep === 0) {
        let label = new PIXI.Text(i.toString(), options.labelStyle);
        label.anchor.set(.5, 1);
        label.position.set(bottom.x, bottom.y);
        newGraph.addChild(label);
      }
      lastBottom = bottom;
      lastTop = top;
    }

    app.stage = newGraph;
    app.render();
  }

  data.subscribe((d) => {
    if(liveGraph || d.length >= maxGenerations) {
      renderGraph(d);
    }
  })


</script>

<main class="graph">
  <h3>{name}</h3>
  <div id="historicGraphRender-{name}" class="graphDisplay">

  </div>
</main>