/**
 * One-off: writes the "What Inspired This" paragraph onto each original in
 * Sanity, and copies it onto the matching print.
 *
 * These are DRAFTS written to a brief — read every one and edit it in Sanity
 * Studio until it's actually true to you before the site goes out.
 *
 * Requires a write token:
 *   1. https://www.sanity.io/manage/project/25da9gto/api  ->  Tokens -> Add API token
 *   2. Name it anything, permission "Editor"
 *   3. Add to .env.local:  SANITY_API_WRITE_TOKEN=sk...
 *   4. node scripts/push-inspiration.mjs
 *
 * Safe to delete once it has been run.
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

// minimal .env.local reader so this works without extra deps
try {
  for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
} catch {}

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('❌ SANITY_API_WRITE_TOKEN missing from .env.local — see the header of this file.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '25da9gto',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const INSPIRATION = {
  'maa-durga-divine-fury':
    "I began this during a stretch when I didn't feel particularly strong myself. Durga isn't fierce because life is easy — she's fierce because something needs protecting, and that idea got under my skin and stayed there.\n\nHer face took the longest. I wanted her eyes to hold fury and tenderness in the same look, the way a mother's can. The charcoal went down hard and fast; the watercolour I let bleed wherever it wanted. By the time she was finished she felt less like something I had made and more like something that had been waiting for me to get out of the way.",

  'lord-shiva-the-destroyer':
    "Shiva has always unsettled me in the best way — the one who dissolves everything, and also the most forgiving. I kept turning over how destruction and mercy can live inside the same person, and this painting became my way of sitting with that question instead of answering it.\n\nThe blues went on slowly, almost like breathing. The charcoal I left rough and unresolved because I didn't want him to look tame. There's a stillness in him I was chasing more than depicting. Some evenings I'd paint for hours and realise I hadn't thought about a single other thing the whole time.",

  'lord-ganesha-remover-of-obstacles':
    "Every new sketchbook I have ever owned begins with Ganesha. It's habit by now, and also something closer to superstition — nothing starts properly until he's on the first page.\n\nFor this one I took the colour away entirely so the form had to carry it: the weight of the shoulders, the curve of the trunk, the small ornaments that only come right if you slow down. Painting him is the quietest I ever am. There's no drama in it, no big emotional release — just a slow settling, the way you feel when you finally sit down at the end of a long day.",

  'lord-krishna-the-divine-flute':
    "I painted this with music playing, which I almost never do — usually I need silence to think. But Krishna is sound. The whole point of him is that the flute reaches you before he does.\n\nSo I let the watercolour stay loose and let the edges dissolve wherever they wanted, because nothing about that music is sharp. The gold came last, in small touches, and that was the moment he finally felt present in the room. It's the most weightless thing I've made. When people tell me it looks like it's still moving, that's the part I got right.",

  'hanuman-the-devoted':
    "This one took something out of me. Hanuman is devotion with no conditions attached to it, and I'm not sure I fully understand that kind of love — I only know it when I see it.\n\nThe red went down first and came out angrier than I had intended, so I kept it. The charcoal went over the top in strokes I hadn't planned. There's a point in a painting where you stop steering and start following, and this one reached it faster than anything else I've done. I stepped back at the end and genuinely couldn't remember making some of those marks.",

  'lord-ram-maryada-purushottam':
    "Ram is the hardest of them to paint, because his strength is so quiet. No weapon raised, no fury — just someone who keeps choosing the harder right thing when the wrong one would be easier.\n\nI wanted all of that to sit in the eyes and nowhere else. The earth tones were deliberate; I didn't want him glowing or lifted away from us. He should look like someone you could stand beside. Righteousness isn't dramatic in real life. It's a decision made quietly, again and again, on ordinary days — and that's what I was reaching for.",

  'wild-horses-freedom-in-motion':
    "I have never ridden a horse. What pulls me in is something else entirely — that they run because they can, with nobody watching and nothing to prove to anyone.\n\nI was in a stretch of feeling quite boxed in when I started this, and I suspect I painted the thing I wanted rather than the thing I had. The oil let me build the muscle and the dust up in layers over days. The light was the final decision: warm, low, the kind you only get in the last hour before evening. Of everything I've made, this is the one I'd want where I could see it each morning.",

  'autumn-serenity-forest-path':
    "Autumn undoes me a little every year. Everything is letting go at once, and somehow it's the most beautiful the world ever looks — I've never quite made peace with those two facts sitting together.\n\nThis came out of an ordinary walk. Light coming down through the branches, leaves going without any fuss about it. I painted it slowly and it calmed me down. There's no figure on the path and that was deliberate — I wanted whoever stands in front of it to put themselves there. It's a painting about change stopping being frightening, which is something I'm still working on.",
}

// each print carries the story of the original it was made from
const PRINT_OF = {
  'print-maa-durga': 'maa-durga-divine-fury',
  'print-lord-shiva': 'lord-shiva-the-destroyer',
  'print-lord-ganesha': 'lord-ganesha-remover-of-obstacles',
  'print-lord-krishna': 'lord-krishna-the-divine-flute',
  'print-hanuman': 'hanuman-the-devoted',
  'print-lord-ram': 'lord-ram-maryada-purushottam',
  'print-wild-horses': 'wild-horses-freedom-in-motion',
  'print-autumn-serenity': 'autumn-serenity-forest-path',
}

const wanted = { ...INSPIRATION }
for (const [printSlug, originalSlug] of Object.entries(PRINT_OF)) {
  wanted[printSlug] = INSPIRATION[originalSlug]
}

const docs = await client.fetch('*[_type == "artwork"]{_id, "slug": slug.current, title}')
const bySlug = new Map(docs.map((d) => [d.slug, d]))

let tx = client.transaction()
let n = 0
const missing = []

for (const [slug, text] of Object.entries(wanted)) {
  const doc = bySlug.get(slug)
  if (!doc) { missing.push(slug); continue }
  tx = tx.patch(doc._id, (p) => p.set({ inspiration: text }))
  n++
}

if (missing.length) console.warn(`⚠️  no Sanity doc for: ${missing.join(', ')}`)
if (!n) { console.error('❌ nothing to write'); process.exit(1) }

await tx.commit()
console.log(`✅ wrote inspiration onto ${n} artworks`)
console.log('   Now review and edit each one in Sanity Studio so it reads as yours.')
