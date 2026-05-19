export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head = 0;
  private tail = 0;
  private isFull = false;

  constructor(private capacity: number = 500) {
    this.buffer = new Array(capacity);
  }

  push(item: T): void {
    this.buffer[this.tail] = item;
    if (this.isFull) {
      this.head = (this.head + 1) % this.capacity;
    }
    this.tail = (this.tail + 1) % this.capacity;
    if (this.tail === this.head) {
      this.isFull = true;
    }
  }

  drain(): T[] {
    const result: T[] = [];
    if (this.size === 0) return result;

    let current = this.head;
    while (current !== this.tail || this.isFull) {
      const item = this.buffer[current];
      if (item !== undefined) {
        result.push(item);
      }
      current = (current + 1) % this.capacity;
      this.isFull = false;
    }
    this.head = 0;
    this.tail = 0;
    return result;
  }

  get size(): number {
    if (this.isFull) return this.capacity;
    if (this.tail >= this.head) return this.tail - this.head;
    return this.capacity - (this.head - this.tail);
  }

  clear(): void {
    this.head = 0;
    this.tail = 0;
    this.isFull = false;
  }
}
