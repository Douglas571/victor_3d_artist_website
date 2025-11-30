import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
    return (
        <header className="
            flex items-center flex-col
            sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur 
            supports-[backdrop-filter]:bg-background/60
        ">
            <div className="container flex h-14 items-center justify-between px-4 md:px-6">
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold inline-block font-heading text-primary text-xl">VICTOR</span>
                    </Link>
                    <nav className="flex gap-6">
                        <Link
                            href="/models"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Modelos
                        </Link>

                        <Link
                            href="/blog"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Blog
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
