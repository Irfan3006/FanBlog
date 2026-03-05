import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises';

export const GET: APIRoute = async ({ url }) => {
    const title = url.searchParams.get('title') || 'FanBlog';

    try {
        // Attempt to load Arial font from Windows
        let fontData;
        try {
            fontData = await fs.readFile('C:\\Windows\\Fonts\\arial.ttf');
        } catch (e) {
            // Fallback or handle error
            return new Response('Font not found on system', { status: 500 });
        }

        const svg = await satori(
            {
                type: 'div',
                props: {
                    style: {
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0a0a0a',
                        padding: '40px',
                        border: '20px solid #ff6b00',
                    },
                    children: [
                        {
                            type: 'div',
                            props: {
                                style: {
                                    fontSize: '32px',
                                    fontWeight: 'bold',
                                    color: '#ff6b00',
                                    marginBottom: '40px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '4px',
                                },
                                children: 'FanBlog',
                            },
                        },
                        {
                            type: 'div',
                            props: {
                                style: {
                                    fontSize: '72px',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    lineHeight: '1.2',
                                },
                                children: title,
                            },
                        },
                    ],
                },
            },
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Arial',
                        data: fontData,
                        weight: 400,
                        style: 'normal',
                    },
                ],
            }
        );

        const resvg = new Resvg(svg);
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();

        return new Response(pngBuffer as any, {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (e: any) {
        return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
    }
};
