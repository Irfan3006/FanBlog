import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
    const { password } = await request.json();

    // Load password from environment variable
    const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD;

    if (password === ADMIN_PASSWORD) {
        cookies.set('admin_session', 'true', {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24 hours
        });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
};
