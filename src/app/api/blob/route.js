import { del, put } from '@vercel/blob';

export const runtime = 'nodejs';

function authorized(request) {
  return request.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function POST(request) {
  if (!authorized(request)) {
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const section = formData.get('section');

  if (!file || !file.type?.startsWith('image/')) {
    return Response.json({ error: 'Choose an image file.' }, { status: 400 });
  }

  if (file.size > 4 * 1024 * 1024) {
    return Response.json({ error: 'Image must be 4 MB or smaller.' }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const blob = await put(`${section || 'images'}/${safeName}`, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  return Response.json({ url: blob.url });
}

export async function DELETE(request) {
  if (!authorized(request)) {
    return Response.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const { url } = await request.json();
  if (url?.includes('.public.blob.vercel-storage.com')) {
    await del(url);
  }

  return Response.json({ deleted: true });
}
