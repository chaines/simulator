<script lang="ts">
  import { onMount } from 'svelte';
  import { Readable} from 'svelte/store';
  import { maxGenerations } from '../../stores';
  import * as PIXI from 'pixi.js';
  
  import { getStep, options } from './graph';

  export let name = 'Graph';
  export let data: Readable<number[]>;
  export let liveGraph: boolean = true;
  export let maxY: number = 0;
  export let maxX: number = 0;
  export let done = !liveGraph;

  // STATE
  const foreground = new PIXI.Application({antialias: true, backgroundAlpha: 0});
  const background = new PIXI.Application({antialias: true, backgroundColor: options.backgroundColor});

  // Needed to allow users to scroll the webpage if the graph takes up the whole page (April 2021)
  foreground.renderer.plugins.interaction.autoPreventDefault = false;
  foreground.renderer.view.style.touchAction = 'auto';
  foreground.stage = new PIXI.Graphics();
  background.stage = new PIXI.Graphics();
  let drawn = 0;


  // SETUP
  onMount(() => {
    setTimeout(() => {
      const ele = document.getElementById('historicGraphRender-' + name);
      background.view.classList.add('absolute');
      foreground.view.classList.add('absolute');
      ele.appendChild(background.view);
      ele.appendChild(foreground.view);
      background.resizeTo = ele;
      foreground.resizeTo = ele;
      console.log(name, 'mounted');
      console.log(`${name} background height: ${background.view.height}`);
      background.resize();
      foreground.resize();
      data.subscribe((d) => {
        if(d.length === 1) {
          drawn = 0;
          maxY = 0;
          maxX = $maxGenerations + 1;
        }
        if((liveGraph && d.length > drawn + 1) || (done && !liveGraph)) {
          if(done) {
            maxX = d.length;
          }
          renderGraph(d);
        }

      })
    })
  })



  const drawLabels = () => {
    background.stage.destroy();
    foreground.stage.destroy();
    const stage = new PIXI.Graphics();
    const labelStage = new PIXI.Graphics();
    background.stage = stage;
    foreground.stage = labelStage;
    const xLabelStep = getStep(maxX);
    const yLabelStep = getStep(maxY);
    const width = background.view.width;
    const height = background.view.height;
    const xScale = width / maxX;
    const yScale = height / maxY;
    

    stage.beginFill(options.lineFill, options.lineAlpha);
    for(let i = yLabelStep; i < maxY; i += yLabelStep) {
      let lineHeight = height - (i * yScale);
      let label = new PIXI.Text(i.toString(), options.labelStyle);
      label.anchor.set(0, 1);
      label.position.set(0, lineHeight);
      labelStage.addChild(label);
     stage.drawRect(0, lineHeight, width, 1);
    }
    for(let i = xLabelStep; i < maxX; i += xLabelStep) {
      let labelLeft = i * xScale;
      let label = new PIXI.Text(i.toString(), options.labelStyle);
      label.anchor.set(1, 1);
      label.position.set(labelLeft, height);
      labelStage.addChild(label);
      stage.drawRect(labelLeft, 0, 1, height);
    }
    stage.endFill();
    return stage;
  }

  const redrawAll = (d: number[]) => {
    //const stage = drawLabels();
    const stage = foreground.stage as PIXI.Graphics;
    stage.clear();
    const height = foreground.view.height;
    const width = foreground.view.width;
    const scaleX = width/maxX;
    const scaleY = height/maxY;

    const polygonPoints = [ new PIXI.Point(0, height)] 
    stage.beginFill(options.foregroundColor, options.foregroundAlpha);
    for (let i = 0; i < d.length; i++) {
      polygonPoints.push(new PIXI.Point(i * scaleX, height - (d[i] * scaleY)));
    }
    polygonPoints.push(new PIXI.Point((d.length - 1) * scaleX, height));
    stage.drawPolygon(polygonPoints);
    stage.endFill();
  }

  const incrementalDraw = (d: number[]) => {
    const stage = foreground.stage as PIXI.Graphics;
    const height = foreground.view.height;
    const width = foreground.view.width;
    const scaleX = width/maxX;
    const scaleY = height/maxY;
    

    stage.lineStyle({width: 0});
    stage.beginFill(options.foregroundColor, options.foregroundAlpha);

    const polygonPoints = [ new PIXI.Point(drawn * scaleX, height), new PIXI.Point(drawn * scaleX, height - (d[drawn] * scaleY))];
    for (let i = drawn + 1; i < d.length; i++) {

      polygonPoints.push(new PIXI.Point(i * scaleX, height - (d[i] * scaleY)));
    }
    polygonPoints.push(new PIXI.Point((d.length - 1) * scaleX, height));
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
    if(doRedraw || (drawn === 0 && d.length >= 10) || (done)) {
      drawLabels();
      redrawAll(d);
      drawn = d.length - 1;
    } else if (d.length >= 10){
      incrementalDraw(d);
      drawn = d.length - 1;
    }
    background.render();
    foreground.render();
  }




</script>

<main class="w-full p-2">
  <h3>{name}</h3>
  <div id="historicGraphRender-{name}" class="h-80 w-full">

  </div>
</main>