import type { APIContext, MiddlewareNext } from 'astro';

export async function onRequest(context: APIContext, next: MiddlewareNext) {
    const { url, cookies, redirect } = context;

    // Check if the request is for the admin area
    if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/posts') || url.pathname.startsWith('/api/upload')) {
        // Simple cookie-based auth check
        const isAdmin = cookies.get('admin_session')?.value === 'true';

        if (!isAdmin && url.pathname !== '/admin/login') {
            return redirect('/admin/login');
        }
    }

    return next();
}
