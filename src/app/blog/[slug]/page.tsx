import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getPostBySlug, getAllPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container py-12 md:py-24 max-w-3xl mx-auto">
                <article className="prose prose-stone dark:prose-invert lg:prose-xl mx-auto">
                    <h1 className="font-heading">{post.title}</h1>
                    <div className="text-muted-foreground mb-8">
                        {new Date(post.date).toLocaleDateString()}
                    </div>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>
            </main>
            <Footer />
        </div>
    );
}
