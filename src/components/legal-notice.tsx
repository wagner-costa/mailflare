import { brand } from "@/lib/branding/config";

/** Keep upstream authorship and corresponding source available on public screens too. */
export function LegalNotice() {
	return <p className="py-4 text-center text-xs text-neutral-500">{brand.appName} · Baseado em Mailflare · © 2026 Hieu Nguyen · <a className="underline underline-offset-4 hover:text-neutral-800" href={brand.sourceUrl}>Código-fonte · AGPLv3</a></p>;
}
