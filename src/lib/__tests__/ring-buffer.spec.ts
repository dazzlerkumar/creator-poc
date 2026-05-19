import { describe, expect, it } from 'vitest';
import { RingBuffer } from '@/lib/ring-buffer';

describe('RingBuffer', () => {
  it('enqueues items with push', () => {
    const buffer = new RingBuffer<string>(3);
    buffer.push('a');
    buffer.push('b');
    expect(buffer.size).toBe(2);
  });

  it('calculates size correctly', () => {
    const buffer = new RingBuffer<number>(5);
    expect(buffer.size).toBe(0);
    buffer.push(1);
    expect(buffer.size).toBe(1);
    buffer.push(2);
    expect(buffer.size).toBe(2);
  });

  it('handles overflow by overwriting at head', () => {
    const buffer = new RingBuffer<string>(3);
    buffer.push('a');
    buffer.push('b');
    buffer.push('c');
    expect(buffer.size).toBe(3);

    // Overflowing: oldest ('a') should be overwritten
    buffer.push('d');
    expect(buffer.size).toBe(3);

    // The sequential output of drain should reflect the oldest being overwritten
    const items = buffer.drain();
    expect(items).toEqual(['b', 'c', 'd']);
  });

  it('drains all items and resets pointers', () => {
    const buffer = new RingBuffer<number>(4);
    buffer.push(10);
    buffer.push(20);
    expect(buffer.size).toBe(2);

    const drained = buffer.drain();
    expect(drained).toEqual([10, 20]);
    expect(buffer.size).toBe(0);

    // Can push new items after drain
    buffer.push(30);
    expect(buffer.size).toBe(1);
    expect(buffer.drain()).toEqual([30]);
  });

  it('clears all contents', () => {
    const buffer = new RingBuffer<string>(3);
    buffer.push('x');
    buffer.push('y');
    expect(buffer.size).toBe(2);

    buffer.clear();
    expect(buffer.size).toBe(0);
    expect(buffer.drain()).toEqual([]);
  });
});
