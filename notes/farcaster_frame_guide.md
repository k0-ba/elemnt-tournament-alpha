# Farcaster Frame Implementation Guide

## What are Farcaster Frames?

Farcaster Frames are interactive elements that can be embedded in Farcaster posts (casts). They allow for rich, interactive experiences directly within the Farcaster client apps like Warpcast.

## Key Components of a Frame

1. **Frame Metadata**: HTTP headers that define how the frame behaves
2. **Frame Content**: The visual content of the frame (text or image)
3. **Frame Buttons**: Interactive elements that users can click
4. **Frame State**: Data maintained between interactions

## Implementation Steps

### 1. Set Up Frame Endpoint

Create an API route that handles both GET and POST requests:
- GET: Initial frame load
- POST: Button click interactions

```typescript
// Example route.ts structure
export async function GET(req: NextRequest) {
  // Return initial frame HTML
}

export async function POST(req: NextRequest) {
  // Handle button clicks
  // Update game state
  // Return updated frame HTML
}
```

### 2. Frame HTML Structure

Use the Frame SDK to generate properly formatted HTML:

```typescript
const html = `<!DOCTYPE html>
<html>
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="${imageUrl}" />
  <meta property="fc:frame:button:1" content="Button 1" />
  <meta property="fc:frame:button:2" content="Button 2" />
  <meta property="fc:frame:button:3" content="Button 3" />
  <meta property="fc:frame:post_url" content="${postUrl}" />
</head>
<body>
  <!-- Frame content -->
</body>
</html>`;
```

### 3. Handling Button Clicks

When a user clicks a button, the frame POST endpoint receives:
- Button index
- Message signature data
- User information

Extract this data and update game state accordingly.

### 4. Frame Validation (Optional)

For production apps, validate incoming frame messages:

```typescript
import { validateFrameMessage } from '@farcaster/frame-sdk';

// Inside POST handler
const { isValid, message } = await validateFrameMessage(body, {
  neynarApiKey: process.env.NEYNAR_API_KEY,
});

if (!isValid) {
  return new Response('Invalid frame message', { status: 400 });
}
```

## Best Practices

1. **Keep it Simple**: Frames have limited interactivity, design accordingly
2. **Text vs. Images**: Text-only frames load faster but images offer richer experiences
3. **State Management**: Use POST data and URLs to maintain state between interactions
4. **Error Handling**: Always provide fallback behavior for when things go wrong
5. **Testing**: Use the Warpcast Frame Validator during development

## Warpcast Color Scheme

The official Warpcast brand colors are:
- Primary Purple: #8A63D2
- Dark Background: #1E1E1E
- Light Text: #FFFFFF
- Secondary Gray: #4D4D4D
- Accent Colors: #E89B4B (orange) and #5EA9BE (blue)

## Resources

- [Farcaster Frame Documentation](https://docs.farcaster.xyz/reference/frames/spec)
- [Warpcast Frame Validator](https://warpcast.com/~/developers/frames)
- [Frame SDK](https://github.com/farcaster-project/frame-sdk)
