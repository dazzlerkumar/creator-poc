import { describe, it, expect } from 'vitest';
import { creator_stage } from '../proto';

describe('Protobuf compilation', () => {
  it('correctly loads and exposes expected schemas', () => {
    expect(creator_stage).toBeDefined();
    
    const { ChatMessage, ChatPublishRequest, BatchedChatMessages, AnalyticsHeartbeat, ActivityEvent } = creator_stage.realtime.v1;
    
    expect(ChatMessage).toBeDefined();
    expect(ChatMessage.decode).toBeTypeOf('function');
    expect(ChatMessage.encode).toBeTypeOf('function');
    
    expect(ChatPublishRequest).toBeDefined();
    expect(ChatPublishRequest.decode).toBeTypeOf('function');
    expect(ChatPublishRequest.encode).toBeTypeOf('function');
    
    expect(BatchedChatMessages).toBeDefined();
    expect(BatchedChatMessages.decode).toBeTypeOf('function');
    expect(BatchedChatMessages.encode).toBeTypeOf('function');
    
    expect(AnalyticsHeartbeat).toBeDefined();
    expect(AnalyticsHeartbeat.decode).toBeTypeOf('function');
    expect(AnalyticsHeartbeat.encode).toBeTypeOf('function');
    
    expect(ActivityEvent).toBeDefined();
    expect(ActivityEvent.decode).toBeTypeOf('function');
    expect(ActivityEvent.encode).toBeTypeOf('function');
  });
});
