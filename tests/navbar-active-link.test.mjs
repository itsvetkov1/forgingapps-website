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
  assert.match(source, /rounded-md px-3 py-2 transition border border-transparent/)
  assert.match(source, /bg-forge-ember\/35 text-white border-forge-ember\/70 shadow-sm shadow-forge-ember\/20/)
  assert.match(source, /hover:text-forge-gold hover:border-forge-gold\/40 hover:bg-forge-gold\/5/)
})

test('navbar switches to the mobile menu before the desktop links can collide with the logo', () => {
  assert.match(source, /className="hidden xl:flex items-center gap-8"/)
  assert.match(source, /className="xl:hidden text-forge-gold/)
  assert.match(source, /className="xl:hidden pb-4 border-t border-forge-stone"/)
  assert.doesNotMatch(source, /hidden md:flex items-center gap-8/)
  assert.doesNotMatch(source, /className="md:hidden text-forge-gold/)
})

test('navbar active matching covers all top-level navigation destinations', () => {
  for (const href of ['/services', '/ai-consulting', '/demo', '/about', '/blog']) {
    assert.match(source, new RegExp(`href: '${href}'`))
  }

  assert.match(source, /isActivePath\(currentPath, '\/contact'\)/)
  assert.match(source, /currentPath === itemPath \|\| currentPath\.startsWith\(`\$\{itemPath\}\/`\)/)
})
