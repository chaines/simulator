<script lang="ts">
  import { onMount } from 'svelte';
  import { Writable} from 'svelte/store';
  import * as PIXI from 'pixi.js';
  
  import { getStep, options } from './graph';

  export let name = 'Graph';
  export let data: Writable<number[]>;
  export let liveGraph: boolean = true;
  export let maxY: number;
  export let maxX: number;

<<<<<<< Updated upstream
=======
  // STATE
>>>>>>> Stashed changes
  const app = new PIXI.Application({antialias: true});
  let drawn = 0;


  // SETUP
  app.renderer.backgroundColor = options.backgroundColor;
  onMount(() => {
    document.getElementById('historicGraphRender-' + name).appendChild(app.view);
    app.resizeTo = document.getElementById('historicGraphRender-' + name);
    app.resize();
  })

<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
  const drawLabels = () => {
    const stage = new PIXI.Graphics();
    const xLabelStep = getStep(maxX);
    const yLabelStep = getStep(maxY);
    const width = app.view.width;
    const height = app.view.height;
    const xScale = width / maxX;
    const yScale = height / maxY;

    stage.lineStyle(options.lineStyle);
    
    for(let i = yLabelStep; i < maxY; i += yLabelStep) {
      let lineHeight = height - (i * yScale);
      let label = new PIXI.Text(i.toString(), options.labelStyle);
      label.anchor.set(0, 1);
      label.position.set(0, lineHeight);
      stage.addChild(label);
      stage.moveTo(0, lineHeight);
      stage.lineTo(width, lineHeight);
<<<<<<< Updated upstream
    }
    for(let i = xLabelStep; i < maxX; i += xLabelStep) {
      let labelLeft = i * xScale;
      let label = new PIXI.Text(i.toString(), options.labelStyle);
      label.anchor.set(0.5, 1);
      label.position.set(labelLeft, height);
      stage.addChild(label);
    }
    stage.lineStyle({width: 0});
    app.stage = stage;
    return stage;
  }

  const redrawAll = (d: number[]) => {
    const stage = drawLabels();
    const height = app.view.height;
    const width = app.view.width;
    const scaleX = width/maxX;
    const scaleY = height/maxY;

    const polygonPoints = [ new PIXI.Point(0, height)] 
    for (let i = 0; i < d.length; i++) {
      polygonPoints.push(new PIXI.Point(i * scaleX, height - (d[i] * scaleY)));
    }
    polygonPoints.push(new PIXI.Point((d.length - 1) * scaleX, height));
    stage.beginFill(options.foregroundColor);
    stage.drawPolygon(polygonPoints);
  }

  const renderGraph = (d: number[]) => {
    const maxData = Math.ceil(d.reduce((l, c) => l > c ? l : c, 0) * 1.2);
    maxY = Math.max(maxY, maxData);
    maxX = Math.max(maxX, d.length - 1);
    redrawAll(d);
=======
    }
    for(let i = xLabelStep; i < maxX; i += xLabelStep) {
      let labelLeft = i * xScale;
      let label = new PIXI.Text(i.toString(), options.labelStyle);
      label.anchor.set(0.5, 1);
      label.position.set(labelLeft, height);
      stage.addChild(label);
    }
    stage.lineStyle({width: 0});
    app.stage = stage;
    return stage;
  }

  const redrawAll = (d: number[]) => {
    const stage = drawLabels();
    const height = app.view.height;
    const width = app.view.width;
    const scaleX = width/maxX;
    const scaleY = height/maxY;

    const polygonPoints = [ new PIXI.Point(0, height)] 
    for (let i = 0; i < d.length; i++) {
      polygonPoints.push(new PIXI.Point(i * scaleX, height - (d[i] * scaleY)));
    }
    polygonPoints.push(new PIXI.Point((d.length - 1) * scaleX, height));
    stage.beginFill(options.foregroundColor);
    stage.drawPolygon(polygonPoints);
  }

  const incrementalDraw = (d: number[]) => {
    const stage = app.stage as PIXI.Graphics;
    const height = app.view.height;
    const width = app.view.width;
    const scaleX = width/maxX;
    const scaleY = height/maxY;

    const polygonPoints = [ new PIXI.Point(drawn * scaleX, height), new PIXI.Point(drawn * scaleX, height - (d[drawn] * scaleY))];
    for (let i = drawn + 1; i < d.length; i++) {
      polygonPoints.push(new PIXI.Point(i * scaleX, height - (d[i] * scaleY)));
    }
    polygonPoints.push(new PIXI.Point((d.length - 1) * scaleX, height));
    stage.beginFill(options.foregroundColor);
    stage.drawPolygon(polygonPoints);
  }

  const renderGraph = (d: number[]) => {
    const maxData = Math.ceil(d.reduce((l, c) => l > c ? l : c, 0) * 1.2);
    let doRedraw = false;
    if(maxData > maxY) {
      doRedraw = true;
      maxY = Math.floor(maxData * 1.2);
    }
    if(d.length > maxX) {
      doRedraw = true;
      maxX = Math.floor(d.length * 1.2);
    }
    if(doRedraw || drawn === 0) {
      redrawAll(d);
    } else {
      incrementalDraw(d);
    }
    drawn = d.length - 1;
>>>>>>> Stashed changes
    app.render();
  }

  data.subscribe((d) => {
    if(liveGraph || d.length >= maxX) {
      renderGraph(d);
    }
  })


</script>

<main class="graph">
  <h3>{name}</h3>
  <div id="historicGraphRender-{name}" class="graphDisplay">

  </div>
</main>