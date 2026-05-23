import { describe, expect, it } from 'vitest';
import { channels } from '@/config/channels';

describe('Channels Configuration', () => {
  it('interpolates chat channel correctly', () => {
    expect(channels.chat('sid_test_1')).toBe('video_broadcast:sid_test_1:chat');
  });

  it('interpolates broadcast channel correctly', () => {
    expect(channels.broadcast('sid_test_2')).toBe('video_broadcast:sid_test_2:broadcast');
  });

  it('interpolates dm channel correctly', () => {
    expect(channels.dm('sid_test_3', 'user_42')).toBe('video_broadcast:sid_test_3:dm:user_42');
  });

  it('interpolates activity channel correctly', () => {
    expect(channels.activity('sid_test_4')).toBe('video_broadcast:sid_test_4:activity');
  });

  it('interpolates analytics channel correctly', () => {
    expect(channels.analytics('sid_test_5')).toBe('video_broadcast:sid_test_5:analytics');
  });
});
