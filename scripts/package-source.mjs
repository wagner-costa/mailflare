// Publish the corresponding source with the app (AGPL section 13). No Git history, secrets or user data.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, mkdtempSync, rmSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
let files;
try {
	files = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).split("\0").filter(Boolean);
} catch {
	// The downloadable source has no Git history and must remain buildable.
	const roots = new Set(["src", "public", "scripts", "drizzle", "server", "deploy", "docs", "tests", ".github"]);
	const walk = (directory) => readdirSync(directory || ".", { withFileTypes: true }).flatMap((entry) => {
		const file = directory ? `${directory}/${entry.name}` : entry.name;
		if (entry.name === "node_modules" || entry.name.startsWith(".tmp-") || file === "public/source") return [];
		if (entry.isDirectory()) return directory || roots.has(entry.name) ? walk(file) : [];
		return entry.isFile() ? [file] : [];
	});
	files = walk("");
}
// Explicit additions keep untracked local configuration out of the public archive.
const additions = ["BRANDING.md", "BRANDING-VALIDATION.md", "src/lib/branding/config.ts", "src/app/brand-tokens.css", "scripts/prepare-branding.mjs", "scripts/package-source.mjs", "src/app/not-found.tsx", "src/app/error.tsx", "src/components/legal-notice.tsx"];
const safe = [...new Set([...files, ...additions])].filter((f) => !/^(\.git\/|\.agents\/|\.codex\/|\.aws\/|public\/source\/|screenshots\/|sponsors\/)/.test(f) && f !== "docs/demo.mp4" && !/(^|\/)(\.env(?!.*example)|\.dev\.vars(?!.*example))/.test(f));
mkdirSync("public/source", { recursive: true });
const temp = mkdtempSync(join(tmpdir(), "ownforge-source-"));
try {
	const list = join(temp, "files"); writeFileSync(list, safe.join("\0") + "\0");
	execFileSync("tar", ["-czf", "public/source/ownforge-source.tar.gz", "--null", "-T", list]);
} finally { rmSync(temp, { recursive: true, force: true }); }
console.log("Packaged corresponding source for /source/ownforge-source.tar.gz");
