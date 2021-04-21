import { makeAutoObservable, autorun } from 'mobx';

export enum Pages {
  LiveView,
  Graphs,
  Tables,
  Settings,
}
class UIStore {
  public running = false;
  public intervalId: number | null = null;
  // This is pretty jank, but I don't really have the patience to convert the enum to an object
  // right now (Cody April 2021)
  private _currentPage: Pages = localStorage.currentPage
    ? Pages[Pages[localStorage.currentPage]]
    : Pages.LiveView;
  private _darkMode = false;
  private _tableSize = Number(localStorage.tableSize) || 200;
  private _graphSize = Number(localStorage.graphSize) || 1000;
  private _agentGraphRaw = localStorage.agentGraphRaw === 'true';
  private _agentGraphTrend = localStorage.agentGraphTrend
    ? localStorage.agentGraphTrend === 'true'
    : true;
  private _speedGraphRaw = localStorage.speedGraphRaw
    ? localStorage.speedGraphRaw === 'true'
    : true;
  private _speedGraphTrend = localStorage.speedGraphTrend === 'true';
  private _senseGraphRaw = localStorage.senseGraphRaw
    ? localStorage.senseGraphRaw === 'true'
    : true;
  private _senseGraphTrend = localStorage.senseGraphTrend === 'true';

  get currentPage() {
    return this._currentPage;
  }
  get darkMode() {
    console.log('getting');
    return this._darkMode;
  }
  get tableSize() {
    return this._tableSize;
  }
  get graphSize() {
    return this._graphSize;
  }
  get agentGraphRaw() {
    return this._agentGraphRaw;
  }
  get agentGraphTrend() {
    return this._agentGraphTrend;
  }
  get speedGraphRaw() {
    return this._speedGraphRaw;
  }
  get speedGraphTrend() {
    return this._speedGraphTrend;
  }
  get senseGraphRaw() {
    return this._senseGraphRaw;
  }
  get senseGraphTrend() {
    return this._senseGraphTrend;
  }

  set darkMode(b: boolean) {
    console.log('toggle');
    console.log(b);
    localStorage.theme = b ? 'dark' : 'light';
    this._darkMode = b;
    console.log(this._darkMode);
  }

  set currentPage(p: Pages) {
    localStorage.currentPage = p;
    this._currentPage = p;
  }

  set tableSize(n: number) {
    localStorage.tableSize = n;
    this._tableSize = n;
  }

  set graphSize(n: number) {
    localStorage.graphSize = n;
    this._graphSize = n;
  }

  set agentGraphRaw(b: boolean) {
    localStorage.agentGraphRaw = b;
    this._agentGraphRaw = b;
  }

  set agentGraphTrend(b: boolean) {
    localStorage.agentGraphTrend = b;
    this._agentGraphTrend = b;
  }

  set speedGraphRaw(b: boolean) {
    localStorage.speedGraphRaw = b;
    this._speedGraphRaw = b;
  }

  set speedGraphTrend(b: boolean) {
    localStorage.speedGraphTrend = b;
    this._speedGraphTrend = b;
  }

  set senseGraphRaw(b: boolean) {
    localStorage.senseGraphRaw = b;
    this._senseGraphRaw = b;
  }

  set senseGraphTrend(b: boolean) {
    localStorage.senseGraphTrend = b;
    this._senseGraphTrend = b;
  }

  toggleDarkMode() {
    this.darkMode = !this._darkMode;
    console.log(this.darkMode);
  }

  constructor() {
    makeAutoObservable(this);
    this.darkMode = localStorage.theme
      ? localStorage.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}

export default new UIStore();
