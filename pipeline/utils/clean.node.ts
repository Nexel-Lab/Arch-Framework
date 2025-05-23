import { rimraf } from 'rimraf'
import { glob } from 'glob'

const patternsToRemove: string[] = [
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lockb',
  'package-lock.json',
  'node_modules',
  'packages/**/node_modules',
]

async function cleanDirectories(): Promise<void> {
  try {
    for (const pattern of patternsToRemove) {
      const files = await glob(pattern, {
        ignore: {
          childrenIgnored: (p: { isNamed: (name: string) => boolean }) =>
            p.isNamed('node_modules'),
        },
        dot: true, // Include dotfiles
      })

      if (files.length > 0) {
        await rimraf(files)
        console.log(`✓ Removed ${files.length} matches for: ${pattern}`)
      }
    }
    console.log('\n🧹 Cleanup completed successfully!')
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    process.exit(1)
  }
}

// Execute cleanup
cleanDirectories()
