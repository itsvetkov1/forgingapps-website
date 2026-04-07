import ConditionalShell from '@/components/ConditionalShell'
import EmberChatWidget from '@/components/ember/EmberChatWidget'
import { LanguageProvider } from '@/contexts/LanguageContext'

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider locale="en">
      <ConditionalShell>{children}</ConditionalShell>
      <EmberChatWidget />
    </LanguageProvider>
  )
}
