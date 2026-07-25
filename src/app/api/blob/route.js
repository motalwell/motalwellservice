import { del } from '@vercel/blob';
import { handleUpload } from '@vercel/blob/client';

export const runtime = 'nodejs';

const MAX_IMAGE_SIZE = 6 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function authorized(request) {
  return request.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function POST(request) {
  const body = await request.json();

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let payload;

        try {
          payload = JSON.parse(clientPayload || '{}');
        } catch {
          throw new Error('Incorrect password.');
        }

        if (payload.password !== process.env.ADMIN_PASSWORD) {
          throw new Error('Incorrect password.');
        }

        return {
          allowedContentTypes: IMAGE_TYPES,
          maximumSizeInBytes: MAX_IMAGE_SIZE,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });

    return Response.json(response);
  } catch (error) {
    return Response.json(
      { error: error?.message || 'Unable to upload the image.' },
      { status: 400 }
    );
  }
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
