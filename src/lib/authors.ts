export interface Author {
    name: string;
    bio: string;
    avatar?: string;
    role: string;
}

export const authors: Record<string, Author> = {
    "Irfan": {
        name: "Irfan",
        bio: "Irfan is a full-stack developer passionate about building modern web applications with Astro and Node.js. He loves minimalism and clean code.",
        avatar: "/uploads/author-irfan.jpg",
        role: "Lead Developer & Writer"
    },
    "Fan": {
        name: "Fan",
        bio: "Fan is a content creator and tech enthusiast who loves exploring new frameworks and sharing knowledge with the community.",
        role: "Editor"
    }
};

export function getAuthor(name: string): Author | undefined {
    return authors[name] || authors[Object.keys(authors).find(k => k.toLowerCase() === name.toLowerCase()) || ""];
}
