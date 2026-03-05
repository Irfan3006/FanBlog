import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.formData();
        const file = data.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const filePath = path.join(uploadDir, fileName);

        // Ensure directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        await fs.writeFile(filePath, buffer);

        return new Response(JSON.stringify({ url: `/uploads/${fileName}` }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
// 