import { del, put } from '@vercel/blob';
import { handleUpload } from '@vercel/blob/client';

export const runtime = 'nodejs';

const MAX_IMAGE_SIZE = 6 * 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function authorized(request) {
  return request.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Direct server upload for normal website images. This path is deliberately
    // used for files up to 4 MB because it is simpler and more reliable.
    if (!contentType.includes('application/json')) {
      if (!authorized(request)) {
        return Response.json({ error: 'Incorrect password.' }, { status: 401 });
      }

      const pathname = new URL(request.url).searchParams.get('pathname');
      if (!pathname) {
        return Response.json({ error: 'Missing image name.' }, { status: 400 });
      }

      if (!IMAGE_TYPES.includes(contentType)) {
        return Response.json({ error: 'Please choose a JPG, PNG or WEBP image.' }, { status: 400 });
      }

      const contentLength = Number(request.headers.get('content-length') || 0);
      if (contentLength > 4 * 1024 * 1024) {
        return Response.json({ error: 'This image must use the large-file upload path.' }, { status: 413 });
      }

      const blob = await put(pathname, request.body, {
        access: 'public',
        addRandomSuffix: true,
        contentType,
      });

      return Response.json(blob);
    }

    // Token endpoint and completion callback for direct client uploads above 4 MB.
    const body = await request.json();
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
