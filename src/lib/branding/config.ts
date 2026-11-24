/** Identity for this fork. Infrastructure names and API contracts stay upstream-compatible. */
export const brand = {
	appName: "OwnForge",
	companyName: "OwnForge",
	tagline: "Engineering Intelligent Infrastructure.",
	description: "E-mail, agenda e arquivos em um só lugar.",
	logoLight: "/branding/logo-light.svg",
	logoDark: "/branding/logo-dark.svg",
	icon: "/branding/mark.svg",
	favicon: "/favicon.ico",
	// Supply verified corporate details before publishing them.
	primaryDomain: "",
	supportEmail: "",
	sourceUrl: "/source/ownforge-source.tar.gz",
	showUpgradePrompts: false,
	defaultLocale: "pt-BR",
	defaultTimeZone: "America/Sao_Paulo",
	colors: {
		blue: "#2563EB", purple: "#7C3AED", cyan: "#22D3EE", violet: "#A855F7",
		graphite: "#0B1220", slate: "#1E293B", gray: "#475569", border: "#E2E8F0", background: "#F8FAFC",
		success: "#10B981", warning: "#F59E0B", danger: "#EF4444",
	},
} as const;
