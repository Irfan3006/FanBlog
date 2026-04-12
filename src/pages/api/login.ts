import type { APIRoute } from 'astro';

// Hardcoded admin credentials — keep this file private
const ADMIN_PASSWORD = 'Irfan@FanBlog2026!';

// Simple in-memory brute-force protection (resets on server restart)
const attempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export const POST: APIRoute = async ({ request, cookies }) => {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    // Check lockout
    const record = attempts.get(ip);
    if (record && record.count >= MAX_ATTEMPTS) {
        if (now - record.lastAttempt < LOCKOUT_MS) {
            return new Response(JSON.stringify({ error: 'Too many attempts. Try again in 15 minutes.' }), { status: 429 });
        }
        // Reset after lockout period
        attempts.delete(ip);
    }

    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
        // Clear failed attempts on success
        attempts.delete(ip);

        cookies.set('admin_session', 'authenticated_fanBlog_2026', {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 8 // 8 hours
        });
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Track failed attempt
    const current = attempts.get(ip) ?? { count: 0, lastAttempt: now };
    attempts.set(ip, { count: current.count + 1, lastAttempt: now });

    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
};
