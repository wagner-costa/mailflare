"use client";

import Image from "next/image";
import { brand } from "@/lib/branding/config";
import { LegalNotice } from "@/components/legal-notice";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
		<Image unoptimized src={brand.icon} width={64} height={68} alt={brand.appName} />
		<h1 className="mt-8 text-3xl font-semibold tracking-tight">Não foi possível carregar esta página</h1>
		<p className="mt-3 max-w-sm text-neutral-600">Tente novamente para continuar seu trabalho.</p>
		<button className="mt-8 rounded-xl bg-primary px-6 py-3 text-primary-foreground" onClick={reset}>Tentar novamente</button>
		<LegalNotice />
	</main>;
}
