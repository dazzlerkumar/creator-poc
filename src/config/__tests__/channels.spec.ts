import { describe, expect, it } from 'vitest';
import { channels } from '@/config/channels';

describe('Channels Configuration', () => {
  it('interpolates chat channel correctly', () => {
    expect(channels.chat('sid_test_1')).toBe('session:sid_test_1:chat');
  });

  it('interpolates activity channel correctly', () => {
    expect(channels.activity('sid_test_2')).toBe('session:sid_test_2:activity');
  });

  it('interpolates analytics channel correctly', () => {
    expect(channels.analytics('sid_test_3')).toBe('session:sid_test_3:analytics');
  });
});
