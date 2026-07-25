import { sql } from '../../../lib/db';

export const dynamic = 'force-dynamic';

function authorized(request) {
  return request.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function GET(request) {
  if (!authorized(request)) {
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const [settings] = await sql`
    SELECT
      content->'company' AS company,
      content->'hero' AS hero,
      content->'about' AS about
    FROM site_settings
    WHERE site_settings_pk = 1
  `;

  return Response.json(settings);
}

export async function PATCH(request) {
  if (!authorized(request)) {
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const { section, data } = await request.json();

  await sql`
    UPDATE site_settings
    SET content = jsonb_set(content, ARRAY[${section}], ${JSON.stringify(data)}::jsonb)
    WHERE site_settings_pk = 1
  `;

  return Response.json({ saved: true });
}
