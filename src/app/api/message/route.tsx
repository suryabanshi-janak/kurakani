import { getAuthSession } from '@/lib/auth-option';
import { db } from '@/lib/db';
import { SendMessageValidator } from '@/lib/validators/sendmessge';
import { NextRequest } from 'next/server';

export default async function POST(req: NextRequest) {
  const body = await req.json();

  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { fileId, message } = SendMessageValidator.parse(body);

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: session.user.id,
    },
  });

  if (!file) {
    return new Response('Not Found', { status: 400 });
  }

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId: session.user.id,
      fileId,
    },
  });
}
