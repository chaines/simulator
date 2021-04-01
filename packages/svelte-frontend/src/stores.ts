import { writable, Writable } from 'svelte/store';

export const maxGenerations: Writable<number> = writable<number>(1000);
export const visualize: Writable<boolean> = writable<boolean>(true);
export const worldSize: Writable<number> = writable<number>(5400);
export const tickSpeed: Writable<number> = writable<number>(0);
export const foodPerCycle: Writable<number> = writable<number>(150);
export const initialPopSize: Writable<number> = writable<number>(50);
export const initialSpeed: Writable<number> = writable<number>(1);
export const initialSense: Writable<number> = writable<number>(3);
export const mutationRate: Writable<number> = writable<number>(1);
export const selectedTab = writable(null);
export const selectedPanel = writable(null);
