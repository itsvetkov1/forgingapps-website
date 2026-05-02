import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../components/Navbar.tsx', import.meta.url), 'utf8')

test('navbar derives active links from the localized current pathname', () => {
  assert.match(source, /import \{ usePathname \} from 'next\/navigation'/)
  assert.match(source, /import \{ stripLocaleFromPath \} from '@\/lib\/i18n\/routing'/)
  assert.match(source, /const pathname = usePathname\(\)/)
  assert.match(source, /const currentPath = stripLocaleFromPath\(pathname \|\| '\/'\)/)
})

test('navbar marks the active desktop and mobile item accessibly and visibly', () => {
  assert.match(source, /aria-current=\{active \? 'page' : undefined\}/)
  assert.match(source, /text-forge-gold border-forge-ember/)
  assert.match(source, /border-transparent hover:text-forge-gold/)
  assert.match(source, /text-forge-gold border-forge-ember pl-3/)
})

test('navbar active matching covers all top-level navigation destinations', () => {
  for (const href of ['/services', '/ai-consulting', '/demo', '/about', '/blog']) {
    assert.match(source, new RegExp(`href: '${href}'`))
  }

  assert.match(source, /isActivePath\(currentPath, '\/contact'\)/)
  assert.match(source, /currentPath === itemPath \|\| currentPath\.startsWith\(`\$\{itemPath\}\/`\)/)
})
