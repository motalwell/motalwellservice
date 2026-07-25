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
      content->'navigation' AS navigation,
      content->'hero' AS hero,
      content->'stats' AS stats,
      content->'about' AS about,
      content->'photoCallout' AS "photoCallout",
      content->'servicesSection' AS "servicesSection",
      content->'services' AS services,
      content->'process' AS process,
      content->'faq' AS faq,
      content->'contact' AS contact,
      content->'quoteForm' AS "quoteForm",
      content->'successModal' AS "successModal",
      content->'footer' AS footer
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
