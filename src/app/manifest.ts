import { brand } from "@/lib/branding/config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: brand.appName,
		short_name: brand.appName,
		description: brand.description,
		id: "/",
		scope: "/",
		start_url: "/inbox",
		display: "standalone",
		background_color: brand.colors.background,
		theme_color: brand.colors.background,
		icons: [
			{ src: "/icon-192.png", sizes: "192x192", type: "image/png" },
			{ src: "/icon-512.png", sizes: "512x512", type: "image/png" },
			{ src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
		],
	};
}
