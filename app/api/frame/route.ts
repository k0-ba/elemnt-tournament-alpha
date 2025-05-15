import { NextRequest, NextResponse } from 'next/server';

// Define elements
const elements = ['Fire 🔥', 'Earth 🌍', 'Water 💧'];
// Game rules:
// - Fire beats Earth
// - Earth beats Water
// - Water beats Fire

// Helper to get the base URL
function getBaseUrl() {
  return process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
}

// Helper to generate frame HTML with text-only content using Farcaster default styles
function createFrameHtml({
  title,
  text,
  buttons,
  postUrl = `${getBaseUrl()}/api/frame`,
}: {
  title: string;
  text: string;
  buttons: string[];
  postUrl?: string;
}) {
  const buttonTags = buttons.map((label, i) => 
    `<meta property="fc:frame:button:${i+1}" content="${label}" />`
  ).join('\n  ');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:post_url" content="${postUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${text}" />
  ${buttonTags}
</head>
<body>
  <h1>${title}</h1>
  <p>${text}</p>
  <p>View this in a Farcaster client like Warpcast!</p>
</body>
</html>`;
}

// Handle GET requests (initial frame load)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const text = 'Challenge the AI! Pick an element:';
  
  const html = createFrameHtml({
    title: 'Elemental Clash: Challenge the AI!',
    text,
    buttons: ['Fire 🔥', 'Earth 🌍', 'Water 💧'],
  });
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

// Handle POST requests (button clicks)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract the button index (simple extraction, no validation)
    // In a real app, you'd want to use proper frame message validation
    const buttonIndex = body?.untrustedData?.buttonIndex || 0;
    
    // Map button index to action
    // Button 1: Fire 🔥, Button 2: Earth 🌍, Button 3: Water 💧, Button 4: Play Again
    const buttonActions = ['Fire 🔥', 'Earth 🌍', 'Water 💧', 'restart'];
    const action = buttonIndex > 0 && buttonIndex <= buttonActions.length 
      ? buttonActions[buttonIndex - 1] 
      : null;
    
    if (action === 'restart' || !action) {
      // Initial frame or restart game
      const text = 'Challenge the AI! Pick an element:';
      
      const html = createFrameHtml({
        title: 'Elemental Clash: Challenge the AI!',
        text,
        buttons: ['Fire 🔥', 'Earth 🌍', 'Water 💧'],
      });
      
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    } else if (elements.includes(action)) {
      // User made a choice, generate AI choice and result
      const userChoice = action;
      const aiChoice = elements[Math.floor(Math.random() * elements.length)];
      
      // Safely determine the result with type checking
      let result = 'Tie';
      if (userChoice === aiChoice) {
        result = 'Tie';
      } else if (
        (userChoice === 'Fire 🔥' && aiChoice === 'Earth 🌍') ||
        (userChoice === 'Earth 🌍' && aiChoice === 'Water 💧') ||
        (userChoice === 'Water 💧' && aiChoice === 'Fire 🔥')
      ) {
        result = 'Win';
      } else {
        result = 'Lose';
      }
      
      const resultMessage = `You chose ${userChoice}
AI chose ${aiChoice}
Result: You ${result}!`;
      
      const text = resultMessage;
      
      const html = createFrameHtml({
        title: 'Elemental Clash: Result',
        text,
        buttons: ['Play AI Again?'],
      });
      
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }
    
    // Fallback for unknown action
    const text = 'Something went wrong. Try again?';
    
    const html = createFrameHtml({
      title: 'Elemental Clash: Error',
      text,
      buttons: ['Restart'],
    });
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error processing frame interaction:', error);
    
    // Error handling
    const text = 'Error processing your request. Try again?';
    
    const html = createFrameHtml({
      title: 'Elemental Clash: Error',
      text,
      buttons: ['Restart'],
    });
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
}
