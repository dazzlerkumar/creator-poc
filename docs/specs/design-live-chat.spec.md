---
title: Live Chat Component Design Specification
version: 1.1
date_created: 2026-05-20
tags: [design, component, app]
---

# Introduction

This specification defines the user interface layout, structure, class token implementation, and behavior requirements for the modernized LiveChat component. The design aligns with modern visual styling using customized utility class tokens.

## 1. Purpose & Scope

Establish styling guidelines, HTML tag hierarchy, CSS classes, dynamic states, and test integration points for the LiveChat component. This specification provides reference rules for implementation, testing, and UI validation of the chat experience.

## 2. Definitions

- **Modernized Chat Header**: Component header containing active chat status indicators, message square icon, uppercase title, online activity dot, and options menu.
- **Modernized Message List**: Scrollable scroll region displaying list items with timestamps, bold user labels, and message body text.
- **Pinned Modernized Chat Input Area**: Absolute or fixed block containing emoji picker trigger, text input, and submission control.
- **Lucide Icons**: Icon library utilized to render visual indicators (MessageSquare, MoreVertical, Smile, Send, Pin, ChevronDown).
- **Thematic Design Tokens**: Tailwind utility tokens matching theme variables (bg-card, bg-background, bg-muted, border-border, text-foreground, text-muted-foreground, text-primary).
- **Color Variables**: Custom primary (var(--primary)), secondary (var(--secondary)), black, and white values defined in src/app/globals.css.

## 3. Requirements, Constraints & Guidelines

- **REQ-001 (Structure)**: Live Chat must render within a <section> container having the unique identifier chat-section and class layout flex-grow flex flex-col bg-card dark:bg-background overflow-hidden relative h-full min-h-0.
- **REQ-002 (Header Container)**: Header must occupy the top section of the chat container using class token px-5 py-4 border-b border-border flex justify-between items-center bg-card select-none.
- **REQ-003 (Header Elements)**: Header must include message square icon (MessageSquare styled with text/sizing utilities), bold uppercase title "Live Chat" (text-sm font-bold text-foreground tracking-tight uppercase), and a green activity dot.
- **REQ-004 (Activity Indicator)**: Activity dot must render beside the title and be styled using class token w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_6px_rgba(34,197,94,0.5)] to signal connected status.
- **REQ-005 (Header Menu)**: Options menu button must use class token w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground enclosing a MoreVertical symbol.
- **REQ-006 (Message List Container)**: Message list body must support vertical scrolling and use class token flex-grow p-5 space-y-5 overflow-y-auto relative min-h-0 with dynamic padding-bottom (pb-34 when emojis are displayed, pb-20 when hidden).
- **REQ-007 (Message Item Layout)**: Individual message items must use flex layout with gap class flex items-start gap-3 text-sm.
- **REQ-008 (Message Metadata & Typography)**: 
  - Timestamp must use fixed-width column styled with text-[11px] text-muted-foreground/60 font-medium pt-1 w-8 select-none.
  - Author label must use text-xs font-bold mr-1.5 transition-colors with text-foreground for viewers, and text-primary for moderators.
  - Message text must use text-sm text-muted-foreground break-words formatting.
- **REQ-009 (Input Area Wrapper)**: Chat input panel must be pinned or relative to the bottom boundary with class token p-4 bg-card border-t border-border bottom-0 left-0 right-0 z-30 fixed z-50 shrink-0.
- **REQ-010 (Input Bar Container)**: Interactive input row must use styling token bg-muted rounded-2xl flex items-center px-4 py-3 gap-3 border border-transparent focus-within:border-primary/30 focus-within:bg-card dark:focus-within:bg-zinc-900 transition-all shadow-sm max-w-2xl mx-auto.
- **REQ-011 (Input Elements)**:
  - Emoji toggle button must render Smile, trigger the visibility of the quick emojis panel on click, use aria-label="Toggle emoji picker", and use styling text-muted-foreground hover:text-primary transition-colors shrink-0 flex items-center justify-center.
  - Text input must be un-bordered with no focus ring, styled using bg-transparent border-none focus:ring-0 text-foreground flex-1 text-base md:text-xs placeholder:text-muted-foreground/40 p-0 outline-none.
  - Submit button must scale down on click, styled using flex items-center justify-center text-primary active:scale-95 disabled:opacity-40 transition-transform shrink-0 cursor-pointer containing a Send symbol.
- **REQ-012 (Color Variable Mapping)**: The layout, borders, text colors, and interactive elements must map specifically to primary (var(--primary)), secondary (var(--secondary)), black, and white color variables defined in src/app/globals.css.
- **CON-001 (Boundary Isolation)**: Message list scrolling must not trigger scroll actions on outer body containers during scroll limits.
- **CON-002 (Height Management)**: Overflow spacing at bottom of message list must match height of input container dynamically (using showEmojis state to switch between pb-34 and pb-20) to prevent message obstruction.
- **GUD-001 (Visual Theme)**: Component must preserve white/black backgrounds, primary theme colors (text-primary), secondary theme colors (text-secondary), and contrasting variant typography matching the src/app/globals.css color definitions to maximize visual clarity.

## 4. Interfaces & Data Contracts

Component props accept room/session identification and optional inline styling classes:

```typescript
interface LiveChatProps {
  sid: string;
  className?: string;
}
```

Dynamic chat messages contract used to populate the list:

```typescript
interface ChatMessage {
  id: string;
  timestamp: string;      // Expected format: ISO string or standard timestamp
  authorName: string;
  messageText: string;
  role: 'viewer' | 'moderator' | 'owner';
}
```

## 5. Acceptance Criteria

- **AC-001**: Given the chat section rendered, When user inspects container elements, Then the base section has the ID chat-section and the precise responsive styling applied.
- **AC-002**: Given header elements rendered, When viewing status dot, Then the green dot displays a glowing shadow using rgba value rgba(34,197,94,0.5).
- **AC-003**: Given message list populated, When moderator role posts message, Then the moderator author label text color uses text-primary token.
- **AC-004**: Given message list populated, When standard viewer role posts message, Then the author label text color uses text-foreground token.
- **AC-005**: Given user focuses message text input field, Then input container border transitions from transparent to border-primary/30 and background transitions to card background.
- **AC-006**: Given user clicks submit action button, Then submit icon container performs scaling micro-animation down to 95% scale factor.
- **AC-007**: Given user clicks the Smile toggle button, When the quick emojis panel is hidden, Then the quick emojis panel becomes visible and the message list bottom padding switches to pb-34.
- **AC-008**: Given user clicks the Smile toggle button, When the quick emojis panel is visible, Then the quick emojis panel becomes hidden and the message list bottom padding switches to pb-20.

## 6. Test Automation Strategy

- **Test Levels**: Unit, Integration, E2E.
- **Frameworks**: Vitest, React Testing Library.
- **Coverage Requirements**: Minimum 90% statement coverage.
- **Automated Validation Focus**:
  - CSS class injection checks based on props and roles.
  - Focus state class changes on the input bar.
  - Active submission scaling click checks.
  - Time formatting and conditional color applications.
  - Toggle states of quick emojis drawer on Smile button clicks.

## 7. Rationale & Context

Modernized markup uses clean visual boundaries (border-border) and spacious layouts to improve readability. Integrating theme design tokens ensures the component harmonizes with theme variations in adjacent widgets. Interactive transitions on focus-within inputs give immediate feedback during navigation.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: Centrifugo Message Broker - Handles WebSocket messaging channels.

### Third-Party Services
- **SVC-001**: Lucide Icon Package - Delivers high-quality vector iconography.

### Infrastructure Dependencies
None.

### Data Dependencies
- **DAT-001**: Live Session Identifier (sid) - Parameter mapping user connection to room feed.

### Technology Platform Dependencies
- **PLT-001**: React 19 / Next.js 16.
- **PLT-002**: Tailwind CSS.

## 9. Examples & Edge Cases

Reference template markup matching structural specification:

```tsx
import React, { useState, FormEvent } from 'react';
import { MessageSquare, MoreVertical, Smile, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LiveChat({ sid }: LiveChatProps) {
  const [inputText, setInputText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setInputText('');
  };

  return (
    <section className="flex-grow flex flex-col bg-card dark:bg-background overflow-hidden relative h-full min-h-0" id="chat-section">
      {/* Modernized Chat Header */}
      <div className="px-5 py-4 border-b border-border flex justify-between items-center bg-card select-none">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="text-sm font-bold text-foreground tracking-tight uppercase">Live Chat</h2>
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_6px_rgba(34,197,94,0.5)]"></span>
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Modernized Message List */}
      <div className={cn(
        "flex-grow p-5 space-y-5 overflow-y-auto relative min-h-0",
        showEmojis ? "pb-34" : "pb-20"
      )}>
        <div className="flex items-start gap-3 text-sm">
          <div className="text-[11px] text-muted-foreground/60 font-medium pt-1 w-8 select-none">21:04</div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold mr-1.5 transition-colors text-foreground">ProGamer99:</span>
            <span className="text-sm text-muted-foreground break-words">THAT HEADSHOT WAS INSANE</span>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <div className="text-[11px] text-muted-foreground/60 font-medium pt-1 w-8 select-none">21:06</div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-bold mr-1.5 transition-colors text-primary">Mod_Sarah:</span>
            <span className="text-sm text-muted-foreground break-words">Chill with the caps guys, keep it friendly.</span>
          </div>
        </div>
      </div>

      {/* Pinned Modernized Chat Input Area */}
      <div className="p-4 bg-card border-t border-border bottom-0 left-0 right-0 z-30 fixed z-50 shrink-0">
        {showEmojis && (
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none select-none max-w-2xl mx-auto mb-2 transition-all duration-200">
            {['👍', '❤️', '😂'].map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-muted hover:bg-card border border-border text-foreground text-base leading-none cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSend} className="bg-muted rounded-2xl flex items-center px-4 py-3 gap-3 border border-transparent focus-within:border-primary/30 focus-within:bg-card dark:focus-within:bg-zinc-900 transition-all shadow-sm max-w-2xl mx-auto">
          <button 
            type="button" 
            onClick={() => setShowEmojis(prev => !prev)}
            aria-label="Toggle emoji picker"
            className={cn(
              "hover:text-primary transition-colors shrink-0 flex items-center justify-center cursor-pointer",
              showEmojis ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Smile className="w-5.5 h-5.5" />
          </button>
          <input 
            className="bg-transparent border-none focus:ring-0 text-foreground flex-1 text-base md:text-xs placeholder:text-muted-foreground/40 p-0 outline-none" 
            placeholder="Send a message..." 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="flex items-center justify-center text-primary active:scale-95 transition-transform shrink-0 cursor-pointer">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
}
```

## 10. Validation Criteria

- **VAL-001**: Verification that structural wrapper matches the chat-section layout precisely.
- **VAL-002**: Validation that the green online status indicator features a blurred glowing green box-shadow.
- **VAL-003**: Check that moderator username styles to text-primary while viewer styles to text-foreground.
- **VAL-004**: Verify keyboard focus moves background to card background and adds border tint on the input section.
- **VAL-005**: Check that clicking the Smile toggle button switches the quick emojis visibility state and the bottom padding correctly.

## 11. Related Specifications / Further Reading

- [Audience Stage Component Design Specification](file:///Users/deepak/TechPix/creator-stage-frontend/docs/specs/design-audience-stage.spec.md)
