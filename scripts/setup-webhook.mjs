/**
 * Creates a Netlify build hook via API and outputs the URL for Sanity webhook.
 */
import { readFileSync } from 'fs'
import { join } from 'path'
import { homedir } from 'os'

const siteId = '62f587d7-ba33-4880-bfd7-1fc7f532efaf'

// Read Netlify token from config
let token
try {
  const configPath = join(homedir(), 'AppData', 'Roaming', 'netlify', 'Config', 'config.json')
  const config = JSON.parse(readFileSync(configPath, 'utf8'))
  token = config.users?.['creativelogsmuskan@gmail.com']?.auth?.token
  if (!token) {
    // Try userId-based lookup
    const userId = Object.keys(config.users || {})[0]
    token = config.users?.[userId]?.auth?.token
  }
} catch (e) {
  // fallback
}

if (!token) {
  console.error('❌ Could not find Netlify auth token. Run `netlify login` first.')
  process.exit(1)
}

console.log('🔧 Creating Netlify build hook...')

const res = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/build_hooks`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ title: 'sanity-content-update' }),
})

if (!res.ok) {
  console.error(`❌ Failed: ${res.status} ${await res.text()}`)
  process.exit(1)
}

const hook = await res.json()
console.log('✅ Build hook created!')
console.log(`\n🔗 Build Hook URL: ${hook.url}`)
console.log('\nNow add this URL as a webhook in Sanity:')
console.log('  1. Go to https://www.sanity.io/manage/project/25da9gto/api#webhooks')
console.log('  2. Click "Add Webhook"')
console.log('  3. Name: "Netlify Rebuild"')
console.log(`  4. URL: ${hook.url}`)
console.log('  5. Dataset: production')
console.log('  6. Trigger on: Create, Update, Delete')
console.log('  7. Save!')
