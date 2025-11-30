import fs from "fs";
import path from "path";
import toml from "toml";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface PersonalData {
    name: string;
    role: string;
    location: string;
    bio: string;
    socials: {
        instagram: string;
        sketchfab: string;
        email: string;
    };
}

export interface Model {
    slug: string;
    title: string;
    description: string;
    date: string;
    sketchfab_url: string;
    instagram_url: string;
    tags: string[];
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    content: string;
}

export function getPersonalData(): PersonalData {
    const fullPath = path.join(contentDir, "data.toml");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return toml.parse(fileContents);
}

export function getAllModels(): Model[] {
    const modelsDir = path.join(contentDir, "models");
    if (!fs.existsSync(modelsDir)) return [];

    const fileNames = fs.readdirSync(modelsDir);
    const models = fileNames.filter(f => f.endsWith('.toml')).map((fileName) => {
        const fullPath = path.join(modelsDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const data = toml.parse(fileContents);
        return {
            slug: fileName.replace(/\.toml$/, ""),
            ...data,
            date: new Date(data.date).toISOString(),
        };
    });
    return models.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): BlogPost[] {
    const postsDir = path.join(contentDir, "blog");
    if (!fs.existsSync(postsDir)) return [];

    const fileNames = fs.readdirSync(postsDir);
    const posts = fileNames.filter(f => f.endsWith('.md')).map((fileName) => {
        const fullPath = path.join(postsDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
            slug: fileName.replace(/\.md$/, ""),
            ...data,
            content,
        } as BlogPost;
    });
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
    const fullPath = path.join(contentDir, "blog", `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
        slug,
        ...data,
        content,
    } as BlogPost;
}
