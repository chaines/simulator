<script lang="ts">
  import { onMount } from 'svelte';
  import { Writable} from 'svelte/store';
  import * as PIXI from 'pixi.js';

  export let name = 'Graph';
  export let maxGenerations: number;
  export let data: Writable<number[]>;
  export let liveGraph: boolean = true;
  const app = new PIXI.Application({antialias: true});
  app.renderer.backgroundColor = 0x333333;
  const graph = new PIXI.Graphics();
  app.stage = graph;
  onMount(() => {
    console.log('hello?!?');
    document.getElementById('graphRender-' + name).appendChild(app.view);
    app.resizeTo = document.getElementById('graphRender-' + name);
    app.resize();
  })

  const getStep = (data: number) => {
      return data > 5100 ? 1000 
        : data > 2600 ? 500 
        : data > 1100 ? 200 
        : data > 500 ? 100 
        : data > 250 ? 50 
        : data > 125 ? 25 
        : data > 50 ? 10 
        : data > 10 ? 5 
        : 1;
  }

  const renderGraph = (d: number[]) => {
    for(let child of app.stage.children) {
      child.destroy();
    }
    const newGraph = new PIXI.Graphics();
    newGraph.clear();
    newGraph.beginFill(0x6CA6CD); 
    const width = app.view.width;
    const height = app.view.height;
    const genWidth = width / maxGenerations;
    const maxData = Math.ceil(d.reduce((l, c) => l > c ? l : c, 0) * 1.2);
    const scaleY = height/maxData;
    const xLabelStep = getStep(maxGenerations);
    const yLabelStep = getStep(maxData);
    console.log(yLabelStep);
    
    let lastBottom = new PIXI.Point(0, height);
    let lastTop = new PIXI.Point(0, height - d[0] * scaleY);
    newGraph.lineStyle({width: 1, color: 0xcccccc, alpha: 0.25});
    for(let i = yLabelStep; i < maxData; i += yLabelStep) {
      let label = new PIXI.Text(i.toString(), { fontFamily: 'Arial', fontSize: 8, fill: 0xffffff});
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
        let label = new PIXI.Text(i.toString(), { fontFamily: 'Arial', fontSize: 8, fill: 0});
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
  <div id="graphRender-{name}" class="graphDisplay">

  </div>
</main>