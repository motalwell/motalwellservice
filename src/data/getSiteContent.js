import { siteContent } from '../content/siteContent';
import { sql } from '../lib/db';

export async function getSiteContent() {
  const [settings] = await sql`
    SELECT content
    FROM site_settings
    WHERE site_settings_pk = 1
  `;

  if (!settings?.content?.company) {
    await sql`
      UPDATE site_settings
      SET content = ${JSON.stringify(siteContent)}::jsonb
      WHERE site_settings_pk = 1
    `;

    return siteContent;
  }

  return settings.content;
}
