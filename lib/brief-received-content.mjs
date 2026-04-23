const STARTER_PROMPTS = {
  en: [
    'Walk me through what happens next',
    'How do you scope a project?',
    'What does payment look like?',
    'Show me an AI demo',
  ],
  bg: [
    'Разкажете ми какво следва оттук нататък',
    'Как подхождате към обхвата на един проект?',
    'Как изглежда плащането при вас?',
    'Покажете ми демо на AI',
  ],
}

const TIMELINE = {
  en: [
    { title: 'Founder reads your brief', meta: 'Within 24 hours on business days', detail: 'Active review window', state: 'active' },
    { title: 'Scoping call · 30 min', meta: 'Within a week, on Google Meet', detail: 'We sharpen scope and risks', state: 'pending' },
    { title: 'Written proposal', meta: 'Scope · price · timeline · team', detail: 'Clear plan before code', state: 'pending' },
    { title: 'Kickoff', meta: 'Once the proposal is accepted', detail: 'Build starts with founder context intact', state: 'pending' },
  ],
  bg: [
    { title: 'Основателят преглежда запитването Ви', meta: 'До 24 часа в работни дни', detail: 'Първият преглед вече е в ход', state: 'active' },
    { title: 'Разговор за обхвата · 30 мин', meta: 'До една седмица, в Google Meet', detail: 'Изчистваме целите и рисковете', state: 'pending' },
    { title: 'Писмено предложение', meta: 'Обхват · цена · срок · екип', detail: 'Ясен план преди първия ред код', state: 'pending' },
    { title: 'Старт', meta: 'След приемане на предложението', detail: 'Започваме с вече подреден контекст', state: 'pending' },
  ],
}

export function getBriefReceivedStarterPrompts(locale) {
  return [...(STARTER_PROMPTS[locale] || STARTER_PROMPTS.en)]
}

export function getBriefReceivedTimeline(locale) {
  return (TIMELINE[locale] || TIMELINE.en).map((step) => ({ ...step }))
}

export function getBriefReceivedOpeningMessage(locale, brief) {
  const firstName = brief?.firstName?.trim() || (locale === 'bg' ? 'там' : 'there' )
  const project = brief?.project?.trim()?.toLowerCase() || (locale === 'bg' ? 'проект' : 'project')

  if (locale === 'bg') {
    return `Здравейте, ${firstName}. Запитването Ви за ${project} вече е при Ивайло — ще го прегледа в рамките на 24 часа в работни дни.\n\nДокато го прегледа, аз съм тук да уточним заедно какво точно искате да постигнете, за кого е то, и как изглежда успехът. Колкото повече контекст съберем сега, толкова по-малко ще губим време на разговора. Кажете каквото Ви минава през ума — обхват, срокове, ограничения, или каквото и да е следващо нещо.`
  }

  return `Hey ${firstName}. Your brief on ${project} is with Ivaylo — he'll read it within 24 hours on business days.\n\nWhile he reviews it, I'm here to clarify scope, flag what's worth solving first, and capture anything the form didn't cover. The more we pin down now, the less back-and-forth you'll have on the call. Tell me what's on your mind — scope, timeline, constraints, or whatever the next thing on your plate is.`
}
