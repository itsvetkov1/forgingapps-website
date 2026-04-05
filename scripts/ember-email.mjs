const BRAND = {
  dark: '#1a1a2e',
  panel: '#22243a',
  ember: '#e67e22',
  text: '#f5f7fb',
  muted: '#b8c0d4',
}

function baseTemplate({ title, intro, bodyHtml, footerNote = 'ForgingApps • Sofia, Bulgaria • https://forgingapps.com' }) {
  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:${BRAND.dark};font-family:Inter,Arial,sans-serif;color:${BRAND.text};">
      <div style="max-width:640px;margin:0 auto;padding:24px 16px;">
        <div style="background:linear-gradient(135deg, ${BRAND.ember}, #ff9f43);padding:18px 24px;border-radius:16px 16px 0 0;">
          <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;opacity:.9;">ForgingApps</div>
          <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2;color:#111;">${title}</h1>
        </div>
        <div style="background:${BRAND.panel};padding:24px;border-radius:0 0 16px 16px;border:1px solid rgba(255,255,255,.08);border-top:none;">
          <p style="margin:0 0 18px;color:${BRAND.muted};font-size:15px;line-height:1.6;">${intro}</p>
          ${bodyHtml}
          <hr style="border:none;border-top:1px solid rgba(255,255,255,.08);margin:24px 0;" />
          <p style="margin:0;color:${BRAND.muted};font-size:12px;line-height:1.6;">${footerNote}</p>
        </div>
      </div>
    </body>
  </html>`
}

function bulletList(items) {
  return `<ul style="padding-left:20px;margin:12px 0;color:${BRAND.text};font-size:14px;line-height:1.7;">${items.map((item) => `<li style="margin-bottom:8px;">${item}</li>`).join('')}</ul>`
}

export function internalLeadNotification(visitorInfo, conversationSummary, leadQuality) {
  const subject = `[${leadQuality}] New lead from Ember ${visitorInfo.name ? `- ${visitorInfo.name}` : '- Anonymous'}`
  const bodyHtml = `
    <div style="background:rgba(230,126,34,.08);border:1px solid rgba(230,126,34,.25);border-radius:12px;padding:16px;margin-bottom:18px;">
      <p style="margin:0 0 10px;font-weight:700;color:${BRAND.text};">Lead snapshot</p>
      <p style="margin:0 0 6px;color:${BRAND.muted};">Name: <span style="color:${BRAND.text};">${visitorInfo.name || 'Not provided'}</span></p>
      <p style="margin:0 0 6px;color:${BRAND.muted};">Email: <span style="color:${BRAND.text};">${visitorInfo.email || 'Not provided'}</span></p>
      <p style="margin:0 0 6px;color:${BRAND.muted};">Visitor ID: <span style="color:${BRAND.text};">${visitorInfo.visitorId}</span></p>
      <p style="margin:0;color:${BRAND.muted};">Lead quality: <span style="color:${BRAND.text};">${leadQuality}</span></p>
    </div>
    <h2 style="margin:0 0 10px;font-size:18px;color:${BRAND.text};">Conversation summary</h2>
    <p style="margin:0;color:${BRAND.muted};font-size:14px;line-height:1.7;white-space:pre-wrap;">${conversationSummary}</p>
  `

  return {
    subject,
    html: baseTemplate({
      title: 'New Ember lead notification',
      intro: 'A website visitor shared their email or asked for follow-up through Ember.',
      bodyHtml,
    }),
    text: `${subject}\n\nName: ${visitorInfo.name || 'Not provided'}\nEmail: ${visitorInfo.email || 'Not provided'}\nVisitor ID: ${visitorInfo.visitorId}\nLead quality: ${leadQuality}\n\nConversation summary:\n${conversationSummary}`,
  }
}

export function conversationSummaryEmail(visitorName, visitorEmail, conversationHighlights) {
  const safeName = visitorName || 'there'
  const subject = 'Your ForgingApps conversation summary'
  const bodyHtml = `
    <p style="margin:0 0 14px;color:${BRAND.text};font-size:15px;line-height:1.7;">Hi ${safeName},</p>
    <p style="margin:0 0 14px;color:${BRAND.muted};font-size:14px;line-height:1.7;">Here’s the summary of your conversation with Ember, so you can pick it up later without losing context.</p>
    ${bulletList(conversationHighlights)}
    <div style="margin-top:18px;padding:16px;border-radius:12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);">
      <p style="margin:0 0 8px;color:${BRAND.text};font-weight:700;">Useful links</p>
      ${bulletList([
        '<a href="https://forgingapps.com/ai-consulting" style="color:#ffb36b;">AI Consulting</a>',
        '<a href="https://forgingapps.com/demo/veloura-support" style="color:#ffb36b;">Live AI support demo</a>',
        '<a href="https://forgingapps.com/contact" style="color:#ffb36b;">Book a discovery call</a>',
      ])}
    </div>
    <p style="margin:18px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">If you want to continue the conversation, just reply to this email or contact us directly at <a href="mailto:hello@forgingapps.com" style="color:#ffb36b;">hello@forgingapps.com</a>.</p>
  `

  return {
    subject,
    html: baseTemplate({
      title: 'Your conversation summary',
      intro: `We saved the highlights from your Ember chat and sent them to ${visitorEmail}.`,
      bodyHtml,
    }),
    text: `Hi ${safeName},\n\nHere is your ForgingApps conversation summary:\n- ${conversationHighlights.join('\n- ')}\n\nUseful links:\n- https://forgingapps.com/ai-consulting\n- https://forgingapps.com/demo/veloura-support\n- https://forgingapps.com/contact\n\nReply to hello@forgingapps.com if you want to keep going.`,
  }
}

export function meetingConfirmation(visitorName, visitorEmail, meetingDetails) {
  const safeName = visitorName || 'there'
  const subject = 'Your ForgingApps Discovery Call Confirmed!'
  const bodyHtml = `
    <p style="margin:0 0 14px;color:${BRAND.text};font-size:15px;line-height:1.7;">Hi ${safeName},</p>
    <p style="margin:0 0 14px;color:${BRAND.muted};font-size:14px;line-height:1.7;">Your discovery call is confirmed. Here are the details:</p>
    ${bulletList([
      `Date & time: ${meetingDetails.dateTime || 'TBD'}`,
      `Meeting link: ${meetingDetails.meetLink || 'TBD'}`,
      `Topic: ${meetingDetails.topic || 'AI discovery call'}`,
      'What to expect: a 30-minute focused conversation about your goals, constraints, and what is actually worth building.',
    ])}
    <p style="margin:18px 0 0;color:${BRAND.muted};font-size:14px;line-height:1.7;">If anything changes, reply to <a href="mailto:hello@forgingapps.com" style="color:#ffb36b;">hello@forgingapps.com</a>.</p>
  `

  return {
    subject,
    html: baseTemplate({
      title: 'Discovery call confirmed',
      intro: `We’ve booked your call and sent the details to ${visitorEmail}.`,
      bodyHtml,
    }),
    text: `Hi ${safeName},\n\nYour ForgingApps discovery call is confirmed.\nDate & time: ${meetingDetails.dateTime || 'TBD'}\nMeeting link: ${meetingDetails.meetLink || 'TBD'}\nTopic: ${meetingDetails.topic || 'AI discovery call'}\n\nReply to hello@forgingapps.com if you need to reschedule.`,
  }
}
