/**
 * Some helper functions for my different graph types.
 */

export const getStep = (data: number) => {
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

export const options = {
  backgroundColor: 0x1f2937,
  foregroundColor: 0x4c86ad,
  lineStyle: {
    width: 1,
    color: 0xcccccc,
    alpha: 0.25,
  },
  lineFill: 0xcccccc,
  lineAlpha: 0.25,
  foregroundAlpha: 0.75,
  clearLineStyle: {
    width: 0,
    color: 0,
    alpha: 0,
  },
  labelStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    fill: 0xf0f0f0,
  },
};
