'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import LanguageToggle from '@/components/LanguageToggle'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { stripLocaleFromPath } from '@/lib/i18n/routing'

interface NavbarProps {
  pinned?: boolean
}

const navItems = [
  { href: '/services', labelKey: 'nav.services' },
  { href: '/ai-consulting', labelKey: 'nav.aiConsulting' },
  { href: '/workshop', labelKey: 'nav.workshop' },
  { href: '/demo', labelKey: 'nav.demo' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/blog', labelKey: 'nav.blog' },
] as const

function isActivePath(currentPath: string, itemPath: string) {
  if (itemPath === '/') return currentPath === '/'
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ pinned = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation('common')
  const { localePath } = useLanguage()

  const positionClasses = pinned ? 'sticky top-0 z-50' : 'relative'
  const currentPath = stripLocaleFromPath(pathname || '/')

  return (
    <nav className={`${positionClasses} bg-forge-dark/95 backdrop-blur-sm border-b border-forge-stone`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href={localePath('/')} className="flex items-center gap-2 font-cinzel text-xl font-bold text-forge-gold hover:text-forge-ember transition">
            <img src="/logo.svg" alt="ForgingApps logo" width={32} height={32} className="inline-block" />
            <span>ForgingApps</span>
          </Link>

          <div className="hidden xl:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActivePath(currentPath, item.href)

              return (
                <Link
                  key={item.href}
                  href={localePath(item.href)}
                  aria-current={active ? 'page' : undefined}
                  className={joinClasses(
                    'rounded-md px-3 py-2 transition border border-transparent',
                    active
                      ? 'bg-forge-ember/35 text-white border-forge-ember/70 shadow-sm shadow-forge-ember/20'
                      : 'hover:text-forge-gold hover:border-forge-gold/40 hover:bg-forge-gold/5'
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              )
            })}
            <LanguageToggle />
            <Link
              href={localePath('/contact')}
              aria-current={isActivePath(currentPath, '/contact') ? 'page' : undefined}
              className={joinClasses(
                'btn-small hover:bg-forge-gold hover:text-forge-dark',
                isActivePath(currentPath, '/contact')
                  ? 'bg-forge-gold text-forge-dark ring-2 ring-forge-ember/70'
                  : 'bg-forge-ember text-white'
              )}
            >
              {t('nav.contact')}
            </Link>
          </div>

          <button type="button" className="xl:hidden text-forge-gold hover:text-forge-ember transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="xl:hidden pb-4 border-t border-forge-stone">
            <div className="flex flex-col gap-3 pt-3">
              <div className="py-2"><LanguageToggle /></div>
              {navItems.map((item) => {
                const active = isActivePath(currentPath, item.href)

                return (
                  <Link
                    key={item.href}
                    href={localePath(item.href)}
                    aria-current={active ? 'page' : undefined}
                    className={joinClasses(
                      'rounded-md px-3 py-2 transition border border-transparent',
                      active
                        ? 'bg-forge-ember/35 text-white border-forge-ember/70 shadow-sm shadow-forge-ember/20'
                        : 'hover:text-forge-gold hover:border-forge-gold/40 hover:bg-forge-gold/5'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </Link>
                )
              })}
              <Link
                href={localePath('/contact')}
                aria-current={isActivePath(currentPath, '/contact') ? 'page' : undefined}
                className={joinClasses(
                  'btn-small hover:bg-forge-gold hover:text-forge-dark w-full text-center',
                  isActivePath(currentPath, '/contact')
                    ? 'bg-forge-gold text-forge-dark ring-2 ring-forge-ember/70'
                    : 'bg-forge-ember text-white'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
