import { describe, it, expect } from 'vitest';
import { creator_stage } from '../proto';

describe('Protobuf compilation', () => {
  it('correctly loads and exposes expected schemas', () => {
    expect(creator_stage).toBeDefined();
    
    const { AudienceChatEvent, AudienceChatMessage, CreatorChatEvent, BatchedChatMessages } = creator_stage.realtime.v1;
    
    expect(AudienceChatEvent).toBeDefined();
    expect(AudienceChatEvent.decode).toBeTypeOf('function');
    expect(AudienceChatEvent.encode).toBeTypeOf('function');
    
    expect(AudienceChatMessage).toBeDefined();
    expect(AudienceChatMessage.decode).toBeTypeOf('function');
    expect(AudienceChatMessage.encode).toBeTypeOf('function');
    
    expect(CreatorChatEvent).toBeDefined();
    expect(CreatorChatEvent.decode).toBeTypeOf('function');
    expect(CreatorChatEvent.encode).toBeTypeOf('function');
    
    expect(BatchedChatMessages).toBeDefined();
    expect(BatchedChatMessages.decode).toBeTypeOf('function');
    expect(BatchedChatMessages.encode).toBeTypeOf('function');
  });
});
