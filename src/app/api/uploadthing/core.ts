import { getAuthSession } from '@/lib/auth-option';
import { db } from '@/lib/db';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const session = await getAuthSession();

      if (!session) throw new Error('Unauthorized');

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.file.create({
        data: {
          userId: metadata.userId,
          key: file.key,
          name: file.name,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: 'PENDING',
        },
      });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
