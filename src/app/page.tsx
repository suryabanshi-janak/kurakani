import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
        <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
          <p className='text-sm font-semibold text-gray-700'>
            Kurakani is now public!
          </p>
        </div>
        <div className='max-w-4xl font-bold text-5xl md:text-6xl lg:text-7xl'>
          Chat with your <span className='text-green-600'>documents</span> in
          seconds.
        </div>

        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          Kurakani allows you to have conversations with any PDF document.
          Simply upload your file and start asking questions right away.
        </p>

        <Link
          href='/dashboard'
          target='_blank'
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5 text-base',
          })}
        >
          Get started <ArrowRight className='ml-2 w-5 h-5' />
        </Link>
      </MaxWidthWrapper>
    </>
  );
}
