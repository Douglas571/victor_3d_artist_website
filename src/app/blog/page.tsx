import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllPosts } from "@/lib/data";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container py-12 md:py-24 px-4 md:px-6">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 font-heading">
                    Blog
                </h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <Card className="h-full hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground line-clamp-3">
                                        {post.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                {posts.length === 0 && (
                    <p className="text-muted-foreground">No posts found.</p>
                )}
            </main>
            <Footer />
        </div>
    );
}
