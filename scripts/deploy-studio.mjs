/**
 * Deploy Sanity Studio to sanity.studio hosting
 * Usage: node scripts/deploy-studio.mjs
 */
import { execSync } from 'child_process'

// Step 1: Build the studio
console.log('🔨 Building Sanity Studio...')
try {
  execSync('npx sanity build dist-studio --yes', {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' },
  })
} catch (e) {
  console.error('Build failed:', e.message)
  process.exit(1)
}

// Step 2: Deploy using the Sanity CLI with auto-yes
console.log('\n🚀 Deploying to sanity.studio...')
try {
  execSync('npx sanity deploy dist-studio --yes', {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: { ...process.env, NODE_TLS_REJECT_UNAUTHORIZED: '0' },
  })
} catch (e) {
  console.error('Deploy failed:', e.message)
  process.exit(1)
}

console.log('\n✅ Studio deployed!')
