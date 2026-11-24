import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/branding/config";
import { LegalNotice } from "@/components/legal-notice";

export default function NotFound() {
	return <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
		<Image unoptimized src={brand.icon} width={64} height={68} alt={brand.appName} />
		<p className="mt-8 text-sm font-semibold text-blue-700">404</p>
		<h1 className="mt-3 text-3xl font-semibold tracking-tight">Página não encontrada</h1>
		<p className="mt-3 max-w-sm text-neutral-600">O endereço pode ter mudado. Volte ao início para continuar.</p>
		<Link className="mt-8 rounded-xl bg-primary px-6 py-3 text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" href="/">Voltar ao início</Link>
		<LegalNotice />
	</main>;
}
