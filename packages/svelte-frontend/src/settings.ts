export const defaultSimRunnerSettings = {
  maxGenerations: 100,
  visualize: false,
  worldSize: 5400,
  tickSpeed: 0,
  foodPerCycle: 150,
  initialPopSize: 50,
  initialPopSettings: {
    speed: 1,
    detectionRange: 3,
    mutationRate: 1,
  },
};

export const vw = (vw: number) => {
  return window.innerWidth / vw;
};

export const vh = (vh: number) => {
  return window.innerHeight / vh;
};
