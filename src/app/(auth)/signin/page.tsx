import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import SigninForm from '@/components/SigninForm';
import { buttonVariants } from '@/components/ui/button';

export default function SignInPage() {
  return (
    <div className='min-h-screen grid place-content-center relative'>
      <div className='w-fit sm:w-96'>
        <h1 className='text-center mt-4 text-primary font-semibold text-xl'>
          kurakani
        </h1>

        <div className='my-6'>
          <h4 className='font-semibold text-2xl mb-1'>Welcome back!</h4>
          <p>Sign in to continue</p>
        </div>

        <SigninForm />

        <p className='text-center mt-2'>
          First time using kurakani?{' '}
          <Link
            href='/signup'
            className={buttonVariants({
              variant: 'link',
              className: 'px-0',
            })}
          >
            Create a new account
          </Link>
        </p>

        <Link
          href='/'
          className={buttonVariants({
            variant: 'link',
            className: 'items-center gap-1 w-full text-zinc-800 mt-4',
          })}
        >
          <ChevronLeft className='h-4 w-4 mt-0.5' />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
