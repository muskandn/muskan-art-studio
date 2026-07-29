/**
 * Creates a Sanity webhook that triggers Netlify rebuild on content changes.
 */
import { createClient } from '@sanity/client'

const token = 'skK9PYc8FIbBOj85Gs6QbKmltC2wOdfTWpY1piSLeAthgBD3T41RImk8sJZZaNyoTXjlvtgW32GemodEgNKibelpVTQlJIa7cW9se83QhR3cP9Sy1dYG45QeWn3j8KNZ5rmwOJ6o6ddnA7pRliJH1gBd5icz2QCbbZRoTa4voWKEASkaba9a'
const projectId = '25da9gto'
const netlifyHookUrl = 'https://api.netlify.com/build_hooks/6a695a036e6f40f40f104dfd'

console.log('🔧 Creating Sanity webhook...')

const res = await fetch(`https://api.sanity.io/v2021-10-04/hooks/projects/${projectId}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    type: 'document',
    name: 'Netlify Rebuild',
    url: netlifyHookUrl,
    httpMethod: 'POST',
    apiVersion: 'v2021-03-25',
    includeDrafts: false,
    dataset: 'production',
    rule: {
      on: ['create', 'update', 'delete'],
    },
  }),
})

if (!res.ok) {
  console.error(`❌ Failed: ${res.status}`, await res.text())
  process.exit(1)
}

const webhook = await res.json()
console.log('✅ Sanity webhook created!')
console.log(`   Name: ${webhook.name}`)
console.log(`   URL: ${webhook.url}`)
console.log('\n🎉 Auto-rebuild is now set up!')
console.log('   When you add/edit/delete artworks in Sanity Studio,')
console.log('   Netlify will automatically rebuild your site.')
