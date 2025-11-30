import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SketchfabEmbed } from "@/components/sketchfab-embed";
import { getAllModels, getPersonalData } from "@/lib/data";
import { Instagram, Mail, Box } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CategoriesFilterDropdownMenu } from "@/components/categoriesFilterDropdownMenu";

import * as motion from "motion/react-client";


export default function ModelsPage() {
	const personalData = getPersonalData();
	const models = getAllModels();

	const newestModels = models
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1 container mx-auto">
				{/* Gallery Section */}
				<motion.section
					className="w-full py-12 md:py-24 lg:py-32"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div className="container px-4 md:px-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center font-heading">
							Modelos 3D
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{models.map((model) => (
								<div key={model.slug} className="flex flex-col space-y-2">
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
								</div>
							))}
						</div>
						{models.length === 0 && (
							<p className="text-center text-muted-foreground">No models found. Add some TOML files to content/models/</p>
						)}
					</div>
				</motion.section>
			</main>
			<Footer />
		</div>
	);
}