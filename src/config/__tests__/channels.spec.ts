import { describe, expect, it } from 'vitest';
import { channels } from '@/config/channels';

describe('Channels Configuration', () => {
  it('interpolates audience channel correctly', () => {
    expect(channels.audience('sid_test_1')).toBe('video_broadcast:sid_test_1:audience');
  });

  it('interpolates broadcast channel correctly', () => {
    expect(channels.broadcast('sid_test_2')).toBe('video_broadcast:sid_test_2:creator');
  });

  it('interpolates dm channel correctly', () => {
    expect(channels.directMessage('sid_test_3', 'user_42')).toBe('video_broadcast:sid_test_3:dm:user_42');
  });
});
