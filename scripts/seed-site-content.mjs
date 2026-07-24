import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const source = await readFile(new URL('../src/content/siteContent.js', import.meta.url), 'utf8');
const moduleSource = `${source.replace('export const siteContent =', 'const siteContent =')}\nexport { siteContent };`;
const moduleUrl = `data:text/javascript;base64,${Buffer.from(moduleSource).toString('base64')}`;
const { siteContent } = await import(moduleUrl);

const sql = neon(process.env.DATABASE_URL);

await sql`
  UPDATE site_settings
  SET content = ${JSON.stringify(siteContent)}::jsonb
  WHERE site_settings_pk = 1
`;

console.log('Site content seeded successfully.');
