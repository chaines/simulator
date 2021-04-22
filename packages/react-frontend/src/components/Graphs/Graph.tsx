import { observer } from 'mobx-react-lite';
import React, { useRef, useEffect } from 'react';
import RootStore from '../../stores';
import UIStore from '../../stores/UI';

const redraw = (canvas: HTMLCanvasElement, attribute, movingAverage, raw, fullGraph) => {
  const data = fullGraph
    ? RootStore.historicGenerationData
    : RootStore.historicGenerationData.slice(
        Math.max(RootStore.generationCount - UIStore.graphSize, 0)
      );
  const maxX = Math.max(data.length, UIStore.graphSize);
  const maxY = data.reduce((prev, curr) => Math.max(prev, curr[attribute]), 0) * 1.2;
  const context = canvas.getContext('2d');
  const height = canvas.height;
  const width = canvas.width;
  const scaleX = width / maxX;
  const scaleY = height / maxY;
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;
  drawYLabels(canvas, maxY);
  if (fullGraph) drawXLabels(canvas, maxX);
  if (raw) {
    context.beginPath();
    context.strokeStyle = UIStore.darkMode ? '#4c86ad' : '#A5B4FC';
    for (let i = 1; i < data.length; i++) {
      context.lineTo(i * scaleX, height - data[i][attribute] * scaleY);
    }
    context.stroke();
  }

  if (movingAverage) {
    context.beginPath();
    context.strokeStyle = '#FF8C00';
    if (data.length > 20) {
      for (let i = 0; i < data.length; i++) {
        context.lineTo(i * scaleX, height - getMovingAverage(data, i, 20, attribute) * scaleY);
      }
    }
    context.stroke();
  }
};

const drawYLabels = (canvas: HTMLCanvasElement, maxY: number) => {
  const context = canvas.getContext('2d');
  const height = canvas.height;
  const width = canvas.width;
  const yLabelStep = getStep(maxY);
  const yScale = height / maxY;
  context.strokeStyle = UIStore.darkMode ? 'rgba(204, 204, 204, .25)' : '#C7D2FE';
  context.fillStyle = context.strokeStyle;
  context.lineWidth = 1;
  context.font = '10px arial';
  context.textBaseline = 'bottom';
  context.textAlign = 'left';
  for (let i = yLabelStep; i < maxY; i += yLabelStep) {
    context.beginPath();
    context.moveTo(0, height - i * yScale);
    context.lineTo(width, height - i * yScale);
    context.stroke();
    context.fillText(i + '', 0, height - i * yScale);
  }
};

const drawXLabels = (canvas: HTMLCanvasElement, maxX: number) => {
  const context = canvas.getContext('2d');
  const height = canvas.height;
  const width = canvas.width;
  const xLabelStep = getStep(maxX);
  const xScale = width / maxX;
  context.beginPath();
  context.textAlign = 'center';
  for (let i = xLabelStep; i < maxX; i += xLabelStep) {
    context.fillText(i + '', i * xScale, height);
  }
};

const getMovingAverage = (data, index, width, attribute) => {
  if (index < width / 2) {
    let cap = Math.ceil(index + width / 2);
    let total = 0;
    for (let i = 0; i < cap; i++) {
      total += data[i][attribute];
    }
    return total / cap;
  } else if (data.length < index + width / 2) {
    let start = Math.ceil(index - width / 2);
    let total = 0;
    for (let i = start; i < data.length; i++) {
      total += data[i][attribute];
    }
    return total / (data.length - start);
  } else {
    let start = Math.ceil(index - width / 2);
    let end = Math.ceil(index + width / 2);
    let total = 0;
    for (let i = start; i < end; i++) {
      total += data[i][attribute];
    }
    return total / (end - start);
  }
};

const getStep = (data: number) => {
  return data > 5100
    ? 1000
    : data > 2600
    ? 500
    : data > 1100
    ? 200
    : data > 500
    ? 100
    : data > 250
    ? 50
    : data > 125
    ? 25
    : data > 50
    ? 10
    : data > 10
    ? 5
    : data > 3
    ? 1
    : data > 1.5
    ? 0.5
    : data > 0.5
    ? 0.1
    : 0.05;
};

const clearCanvas = (canvas: HTMLCanvasElement) => {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
};

const redrawCanvas = (canvas: HTMLCanvasElement) => {
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;
};

const Graph = observer(({ attribute = 'agents', movingAverage = false, raw = true }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    redrawCanvas(canvas.current);
    document.addEventListener('resize', () => {
      redrawCanvas(canvas.current);
      redraw(canvas.current, attribute, movingAverage, raw, !UIStore.running);
    });
  }, []);
  useEffect(() => {
    if (RootStore.generationCount)
      redraw(canvas.current, attribute, movingAverage, raw, !UIStore.running);
    else clearCanvas(canvas.current);
  }, [RootStore.generationCount, UIStore.running]);
  return <canvas ref={canvas} className="h-80 w-96 bg-white dark:bg-gray-900 min-w-full"></canvas>;
});

export default Graph;
