# VicandisLux — Owner To-Do

The sync point between me and the owner. I maintain it; you answer. Nothing asked
of you lives only in chat. Last updated after the SEO / AI-readability pass.

---

## 🔴 NEEDS YOUR ANSWER (blocking for production launch)

### 1. What is the real production domain?
I assumed **`https://vicandislux.md`** (inferred from the `office@vicandislux.md`
email) and baked it into every absolute URL at build time — canonical tags, the
sitemap, `hreflang` alternates, Open Graph / Twitter image URLs, JSON-LD and
`llms.txt`.
- **Why you, not an agent:** only you know the domain you'll actually launch on.
- **If wrong:** search engines index the wrong host, social share cards point at
  a 404 image, and hreflang self-references break. Every SEO artifact is affected.
- **How it's handled:** it's a single build variable (`NEXT_PUBLIC_SITE_URL`), so
  fixing it is one word once you confirm — nothing needs rewriting.
- **Your move.** Confirm `vicandislux.md`, or give me the real domain.

### 2. Real company identity — PARTIALLY RESOLVED by the new design handoff
The 2026-08-18 handoff supplied real facts, now implemented: **IDNO `1003600168698`**,
address **str. Milescu Spătaru 7/1, Chișinău**, contact email **`director@vicandislux.md`**.
The earlier address disagreement is settled (Milescu Spătaru wins).
**Still placeholder — narrower ask remains:**
- **IBAN** and **VAT code** — still `[de completat]` (moot for now: the whole
  procurement dossier that displayed them is being removed — see #7).
- **Phone** — ✅ RESOLVED: real number `+373 69 337 792` provided and applied
  across all i18n (site.ts + ro/en/ru: display + `tel:` hrefs, 16 spots).
- **The `NEXT_PUBLIC_ORG_VERIFIED` gate is still OFF** — but now UNBLOCKED. IDNO,
  address AND phone are all real, so NAP is safe to publish as JSON-LD / `llms.txt`
  structured data.
- **Why you, not an agent:** flipping the gate publishes verifiable business data.
- **Your move (narrowed):** say the word and I flip `NEXT_PUBLIC_ORG_VERIFIED=1`
  (and, per #4, can upgrade schema `Organization` → `LocalBusiness`). IBAN/VAT
  remain moot (the section that showed them is removed — see #7).

---

## 🔵 RATIFY OR REJECT (my recommendation + evidence — just yes/no)

### 3. Allow AI assistants to crawl the site — RECOMMEND YES
You asked to make it "readable for AI," so `robots.txt` currently **allows all
crawlers**, including GPTBot, ClaudeBot, PerplexityBot and Google-Extended, and
I added `/llms.txt` plus FAQ structured data specifically so assistants can quote
you accurately.
- **Yes:** ChatGPT / Claude / Perplexity can cite VicandisLux and surface it in
  answers — a growing referral channel.
- **No (block AI training bots):** you opt out of being used for training, but
  also out of those referrals. I'll add per-agent `Disallow` rules on request.
- **Your move:** ratify, or tell me to block them.

### 4. Upgrade `Organization` → `LocalBusiness` once #2 is verified — RECOMMEND YES
With a real address + phone, switching the schema type unlocks Google's local
pack / Maps eligibility. Costs nothing; only makes sense with real NAP.
- **Your move:** yes/no (blocked on #2 either way).

### 5. Real social profile URLs?
The new handoff changed **which** networks appear — now **Facebook / Instagram /
Viber** (was LinkedIn/Facebook/Instagram/YouTube) — but the links and JSON-LD
`sameAs` are still `#` placeholders. Real URLs add a trust signal and let
assistants link your profiles.
- **Your move:** send the real Facebook / Instagram / Viber URLs, or say "no socials yet."

### 7. Dropping the public-procurement dossier — RATIFY (implemented per handoff)
The new design **removes the entire "Pentru licitații" section** and replaces it
with a slim **"Referințe"** (institutional experience only). Gone: the legal-data
table (IDNO/IBAN/VAT/bank), the **downloadable eligibility PDFs** (registry extract,
tax-clearance, DUAE), and the "documente actualizate / răspuns 24h" assurances.
- **Why you, not an agent:** this is a go-to-market decision — that section was
  built specifically to win **public tenders / EU-funded projects**. Removing it
  says you're no longer courting that channel through the site.
- **If wrong (kept out):** procurement officers lose the self-serve dossier; you
  handle eligibility docs manually per bid.
- **If wrong (should stay):** trivial to restore — the component still exists.
- **Your move:** ratify the removal, or tell me to keep the dossier.

### 8. Removing the Product Detail page — RATIFY (implemented per handoff)
The standalone product spec page (`#produs`, Bosch Integrus sheet with spec table)
is **removed**; catalog "Detalii" links now point at the configurator.
- **If wrong:** you lose per-product SEO landing potential. Restorable.
- **Your move:** ratify, or ask to keep product pages.

### 9. Pricing now in MDL + `director@` email — RATIFY (implemented per handoff)
Prices switched **EUR → MDL** with new figures (packages 3 000 / 4 000 / 7 000 MDL;
rate card single MDL column), the **configurator no longer shows a price estimate**
(now a "Sumar configurație"), and the public email is **`director@vicandislux.md`**.
- **Why you, not an agent:** these are commercial + contact facts.
- **Note:** the email change interacts with #1 (domain) — both assume `vicandislux.md`.
- **Your move:** ratify the MDL figures + email, or send corrections.

### 6. Security hardening later — RECOMMEND ACCEPT FOR LAUNCH
The `Content-Security-Policy` I shipped (in `public/_headers`) allows
`'unsafe-inline'` for scripts/styles — unavoidable for a static export that has
no per-request nonce. Safe and standard for a brochure site; can be tightened if
you host somewhere that supports nonces/hashing (Cloudflare Pages/Workers).
- **Your move:** accept for launch (default), or flag hardening as a priority.

---

## 🟡 DEFERRED (agreed to expand later — do NOT drop)

- **Real photography.** PARTIAL: the **hero** now uses a real photo
  (`hero-conferinta.jpg`, a medical-congress conference-system install). The
  remaining `FOTO EVENIMENT` placeholders (catalog, case studies, references)
  still need real event photos — a separate pass.
- **The other ~20 designs in the bundle** (Blog, Case Study, Service Template,
  Pricing page, etc.) are not built — only the single-page `Site.dc.html`.
- **RU/EN copy is my translation, not certified.** Fine for the marketing copy;
  have a native reviewer check the tender/legal sections before a real bid.

---

## ✅ DECIDED (brief; details in README.md)

- Stack: Next.js 16 static export + Tailwind 4; deployed as a disposable,
  `noindex` GitHub Pages preview.
- i18n: RO source of truth, RU/EN fully translated, per-script fonts
  (Space Grotesk latin / Manrope cyrillic).
- Typographic quotes normalised per language; header backdrop-filter and the
  mobile FAQ sticky-overlap bugs fixed.
- SEO/AI pass (this session): robots, sitemap+hreflang, JSON-LD (Org/WebSite/FAQ),
  llms.txt, PWA manifest, generated brand OG image + icons, security headers.
