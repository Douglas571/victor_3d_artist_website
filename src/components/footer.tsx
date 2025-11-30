import * as motion from "motion/react-client"
import { Button } from "./ui/button";
import Link from "next/link";
import { Instagram, Mail, Box } from "lucide-react";

import { getPersonalData } from "@/lib/data";

export function Footer() {
    const personalData = getPersonalData();
    return (
        <footer className="border-t bg-muted/50">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 px-4 md:px-6">
                <div className="flex w-full flex-col items-center">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Sígueme en redes para ver nuevos proyectos, tutoriales y avances.
                    </p>
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
                                style={{ display: 'inline-block' }}
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
        </footer>
    );
}
