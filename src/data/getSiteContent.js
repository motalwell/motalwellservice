import { sql } from '../lib/db';

export async function getSiteContent() {
  const [settings] = await sql`
    SELECT content
    FROM site_settings
    WHERE site_settings_pk = 1
  `;

  return settings.content;
}
