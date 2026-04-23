<!--
Email to Team — Cinder Enrichment Template v2 (prime, 2026-04-23)

Simple {{field}} substitution ONLY. No Handlebars conditionals / iterators.
Arrays are pre-joined server-side into named string fields:
  {{concerns_list_html}}    — <ul><li>…</li></ul> or empty "<p>None flagged.</p>"
  {{highlights_list_html}}  — <ul><li>…</li></ul>
  {{finalized_at_human}}    — "2026-04-23 16:01 UTC" style
Keep it HTML. The renderer sends this directly as email.html.
-->
Subject: Cinder enrichment · {{brief_id}} · {{project}}

<!DOCTYPE html>
<html lang="{{preferred_language}}">
<head><meta charset="utf-8" /><title>Cinder enrichment · {{brief_id}}</title></head>
<body style="margin:0;padding:0;background:#0f1419;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#ece7de;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0f1419;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="620" style="max-width:620px;background:#141b24;border:1px solid rgba(196,160,98,.16);border-radius:16px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="padding:24px 28px 8px 28px;">
          <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#ece7de;letter-spacing:.3px;">Cinder enrichment</div>
          <div style="font-size:13px;color:#a8a39b;margin-top:4px;">Brief <span style="color:#c4a062;">{{brief_id}}</span> · Track <span style="color:#c4a062;">{{track}}</span> · Confidence <span style="color:#c4a062;">{{confidence}}</span></div>
        </td></tr>

        <!-- TL;DR strip -->
        <tr><td style="padding:16px 28px;">
          <div style="background:#171e28;border:1px solid rgba(196,160,98,.12);border-radius:12px;padding:16px 18px;">
            <div style="font-size:12px;letter-spacing:1.2px;color:#c4a062;text-transform:uppercase;margin-bottom:6px;">TL;DR</div>
            <div style="font-size:16px;color:#ece7de;line-height:1.5;"><strong style="color:#ece7de;">{{project}}</strong></div>
            <div style="font-size:14px;color:#a8a39b;margin-top:6px;">{{timing}}</div>
          </div>
        </td></tr>

        <!-- Scope -->
        <tr><td style="padding:8px 28px 4px 28px;">
          <div style="font-size:12px;letter-spacing:1.2px;color:#c4a062;text-transform:uppercase;margin-bottom:4px;">Scope</div>
          <div style="font-size:14px;line-height:1.65;color:#ece7de;">{{scope_summary}}</div>
        </td></tr>

        <!-- Next step -->
        <tr><td style="padding:16px 28px 4px 28px;">
          <div style="font-size:12px;letter-spacing:1.2px;color:#c4a062;text-transform:uppercase;margin-bottom:4px;">Recommended next step</div>
          <div style="font-size:14px;line-height:1.65;color:#ece7de;">{{next_step}}</div>
        </td></tr>

        <!-- Open concerns -->
        <tr><td style="padding:16px 28px 4px 28px;">
          <div style="font-size:12px;letter-spacing:1.2px;color:#c4a062;text-transform:uppercase;margin-bottom:4px;">Open concerns</div>
          {{concerns_list_html}}
        </td></tr>

        <!-- Chat highlights -->
        <tr><td style="padding:16px 28px 8px 28px;">
          <div style="font-size:12px;letter-spacing:1.2px;color:#c4a062;text-transform:uppercase;margin-bottom:4px;">Chat highlights</div>
          {{highlights_list_html}}
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:16px 28px 24px 28px;">
          <a href="https://forgingapps.com/{{preferred_language}}/brief-received?id={{brief_id}}" style="display:inline-block;background:#d8660b;color:#fff;text-decoration:none;font-size:14px;padding:10px 18px;border-radius:10px;font-weight:600;">Open the conversation →</a>
          <div style="font-size:12px;color:#7f7a72;margin-top:10px;">Prep a scoping brief for the discovery call. Contact: {{contact_name}}.</div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:12px 28px 20px 28px;border-top:1px solid rgba(196,160,98,.12);">
          <div style="font-size:11px;color:#7f7a72;line-height:1.6;">Finalized {{finalized_at_human}} · Cinder intake · ForgingApps</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
