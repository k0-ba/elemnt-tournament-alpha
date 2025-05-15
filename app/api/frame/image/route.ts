import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure this route is not cached

export async function GET(req: NextRequest): Promise<Response> {
  try {
    // Parse query parameters
    const searchParams = req.nextUrl.searchParams;
    const text = searchParams.get('text') || 'Elemental Clash';
    
    // Create a simple SVG image with the text
    const svgWidth = 1200;
    const svgHeight = 630;
    
    // Format multi-line text for SVG
    const formattedText = text.split('\\n')
      .map((line, i) => `<tspan x="50%" dy="${i === 0 ? '0' : '1.5em'}">${line}</tspan>`)
      .join('');
    
    const svg = `
      <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0F3460;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1A1A2E;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="48" 
          font-weight="bold" 
          fill="white" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          ${formattedText}
        </text>
      </svg>
    `;
    
    // Return the SVG image
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    
    // Return a fallback SVG with error message
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1A1A2E" />
        <text 
          x="50%" 
          y="50%" 
          font-family="Arial, sans-serif" 
          font-size="48" 
          font-weight="bold" 
          fill="white" 
          text-anchor="middle" 
          dominant-baseline="middle"
        >
          Error generating image
        </text>
      </svg>
    `;
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store',
      },
    });
  }
}
