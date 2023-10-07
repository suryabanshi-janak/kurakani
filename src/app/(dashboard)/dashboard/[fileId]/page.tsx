import ChatWrapper from '@/components/ChatWrapper';
import PdfRenderer from '@/components/PdfRenderer';
import { getAuthSession } from '@/lib/auth-option';
import { db } from '@/lib/db';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: {
    fileId: string;
  };
}

export default async function page({ params }: PageProps) {
  const { fileId } = params;

  const session = await getAuthSession();

  if (!session) redirect('/login');

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: session.user.id,
    },
  });

  if (!file) return notFound();

  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-4rem)]'>
      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>
        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            <PdfRenderer />
          </div>
        </div>

        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
}
