import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import slugify from 'slugify';

const POSTS_PATH = path.join(process.cwd(), 'content', 'posts');

export const GET: APIRoute = async () => {
    return new Response(JSON.stringify({ message: "Use the posts utility instead" }), { status: 400 });
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { title, author, description, tags, category, content, image, slug: existingSlug } = data;

        const slug = existingSlug || slugify(title, { lower: true, strict: true });
        const filePath = path.join(POSTS_PATH, `${slug}.md`);

        const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${new Date().toISOString()}
author: "${author.replace(/"/g, '\\"')}"
category: "${(category || 'General').replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
tags: ${tags}
image: ${image || ''}
---

${content}`;

        await fs.writeFile(filePath, frontmatter, "utf-8");

        return new Response(JSON.stringify({ success: true, slug }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    try {
        const { slug } = await request.json();
        const filePath = path.join(POSTS_PATH, `${slug}.md`);
        await fs.unlink(filePath);
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const PUT: APIRoute = async ({ request }) => {
    // Similar to POST but preserves date or updates it
    try {
        const data = await request.json();
        const { title, author, description, tags, category, content, image, slug, date } = data;

        const filePath = path.join(POSTS_PATH, `${slug}.md`);

        const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date || new Date().toISOString()}
author: "${author.replace(/"/g, '\\"')}"
category: "${(category || 'General').replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
tags: ${tags}
image: ${image || ''}
---

${content}`;

        await fs.writeFile(filePath, frontmatter, "utf-8");

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
