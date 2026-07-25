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
    SELECT content->'company' AS company
    FROM site_settings
    WHERE site_settings_pk = 1
  `;

  return Response.json({ company: settings.company });
}

export async function PATCH(request) {
  if (!authorized(request)) {
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const { company } = await request.json();

  await sql`
    UPDATE site_settings
    SET content = jsonb_set(content, '{company}', ${JSON.stringify(company)}::jsonb)
    WHERE site_settings_pk = 1
  `;

  return Response.json({ saved: true });
}
