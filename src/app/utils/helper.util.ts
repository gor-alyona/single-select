export function trackById<T extends { id: number }>(_: number, item: T): number {
  return item.id;
}

export function trackByTitle<T extends { title: string }>(_: number, item: T): string {
  return item.title;
}

export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function';
}
