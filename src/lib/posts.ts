import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'node:path';

export interface Post {
    slug: string;
    title: string;
    date: string;
    author: string;
    description: string;
    category: string;
    tags: string[];
    image?: string;
    content: string;
    readingTime: string;
}

const POSTS_PATH = path.join(process.cwd(), 'content', 'posts');

export async function getAllPosts(): Promise<Post[]> {
    try {
        const files = await fs.readdir(POSTS_PATH);
        const mdFiles = files.filter(f => f.endsWith('.md'));

        const posts = await Promise.all(mdFiles.map(async (filename) => {
            const filePath = path.join(POSTS_PATH, filename);
            const fileContent = await fs.readFile(filePath, 'utf-8');

            // Basic Frontmatter parsing
            const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]+?)\r?\n---/);
            const content = fileContent.replace(/^---\r?\n[\s\S]+?\r?\n---/, '').trim();

            const frontmatter: any = {};
            if (frontmatterMatch) {
                frontmatterMatch[1].split('\n').forEach(line => {
                    const [key, ...valueParts] = line.split(':');
                    if (key && valueParts.length) {
                        const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
                        if (key.trim() === 'tags') {
                            frontmatter[key.trim()] = value.split(',').map(t => t.trim());
                        } else {
                            frontmatter[key.trim()] = value;
                        }
                    }
                });
            }

            const slug = filename.replace(/\.md$/, '');
            const readingTime = Math.ceil(content.split(/\s+/).length / 200) + ' min read';

            return {
                slug,
                title: frontmatter.title || 'Untitled',
                date: frontmatter.date || new Date().toISOString(),
                author: frontmatter.author || 'Anonymous',
                description: frontmatter.description || '',
                tags: frontmatter.tags || [],
                category: frontmatter.category || 'General',
                image: frontmatter.image,
                content,
                readingTime,
            };
        }));

        return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error('Error getting posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const filePath = path.join(POSTS_PATH, `${slug}.md`);
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Simple frontmatter parsing (using the same logic as getAllPosts for consistency)
        const frontmatterMatch = fileContent.match(/^---\r?\n([\s\S]+?)\r?\n---/);
        const content = fileContent.replace(/^---\r?\n[\s\S]+?\r?\n---/, '').trim();

        const frontmatter: any = {};
        if (frontmatterMatch) {
            frontmatterMatch[1].split('\n').forEach(line => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length) {
                    const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
                    if (key.trim() === 'tags') {
                        frontmatter[key.trim()] = value.split(',').map(t => t.trim());
                    } else {
                        frontmatter[key.trim()] = value;
                        frontmatter[key.trim()] = value;
                    }
                }
            });
        }

        const readingTime = Math.ceil(content.split(/\s+/).length / 200) + ' min read';

        return {
            slug,
            title: frontmatter.title || 'Untitled',
            date: frontmatter.date || new Date().toISOString(),
            author: frontmatter.author || 'Anonymous',
            description: frontmatter.description || '',
            tags: frontmatter.tags || [],
            category: frontmatter.category || 'General',
            image: frontmatter.image,
            content,
            readingTime,
        };
    } catch (error) {
        return null;
    }
}
