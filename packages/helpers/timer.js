export default class Timer {
  constructor() {
    this.startTime = Date.now();
  }

  getDuration() {
    return Date.now() - this.startTime;
  }
}
