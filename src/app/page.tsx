import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SketchfabEmbed } from "@/components/sketchfab-embed";
import { getAllModels, getPersonalData } from "@/lib/data";
import { Instagram, Mail, Box } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import * as motion from "motion/react-client"

import { Vortex } from "@/components/ui/shadcn-io/vortex";

export default function Home() {
  const personalData = getPersonalData();
  const models = getAllModels();

  const newestModels = models
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);


  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full">
        {/* Hero Section */}

        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-heading text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {personalData.name}
                </motion.h1>
                <motion.p
                  className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {personalData.role} de {personalData.location}.
                </motion.p>
                <motion.p
                  className="mx-auto max-w-[700px] text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {personalData.bio}
                </motion.p>
              </motion.div>
              <motion.div
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {personalData.socials.instagram && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    style={{ display: 'inline-block' }} // Ensure button doesn't take full width
                  >
                    <Button variant="outline" size="icon" asChild>
                      <Link href={personalData.socials.instagram} target="_blank">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Link>
                    </Button>
                  </motion.div>
                )}
                {personalData.socials.sketchfab && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Button variant="outline" size="icon" asChild>
                      <Link href={personalData.socials.sketchfab} target="_blank">
                        <Box className="h-4 w-4" />
                        <span className="sr-only">Sketchfab</span>
                      </Link>
                    </Button>
                  </motion.div>
                )}
                {personalData.socials.email && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    style={{ display: 'inline-block' }}
                  >
                    <Button variant="outline" size="icon" asChild>
                      <Link href={personalData.socials.email}>
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center font-heading">
              Portfolio
            </h2>
            <div className="flex flex-wrap justify-center gap-6 w-full">
              {newestModels.map((model, index) => (
                <motion.div
                  key={model.slug}
                  className="flex flex-col space-y-2 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
                >
                  <SketchfabEmbed url={model.sketchfab_url} title={model.title} />
                  <div className="p-4 bg-card rounded-lg border shadow-sm">
                    <h3 className="text-xl font-bold">{model.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {model.description}
                    </p>
                    <div className="mt-4 flex gap-2">
                      {model.tags && model.tags.map(tag => (
                        <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {models.length === 0 && (
              <p className="text-center text-muted-foreground">No models found. Add some TOML files to content/models/</p>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <a href="/models" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
              Ver todos los modelos
            </a>
          </div>

        </motion.section>
      </main>
      <Footer />
    </div >
  );
}
