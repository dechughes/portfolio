// Module-level singleton — persists across client navigation
let _startTime: number | null = null;

export function setStartTime(t: number) {
  _startTime = t;
}

export function getStartTime(): number | null {
  return _startTime;
}

export function getElapsedSeconds(): number {
  if (_startTime === null) return 0;
  return Math.round((Date.now() - _startTime) / 1000);
}