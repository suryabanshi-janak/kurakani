import Link from 'next/link';
import SignupForm from '@/components/SignupForm';
import { buttonVariants } from '@/components/ui/button';

export default function SignUpPage() {
  return (
    <div className='min-h-screen grid place-content-center'>
      <div className='w-fit sm:w-96'>
        <h1 className='text-center mt-4 text-primary font-semibold text-xl'>
          kurakani
        </h1>

        <div className='my-6'>
          <h4 className='font-semibold text-2xl mb-1'>Create an account</h4>
          <p>Get started today!</p>
        </div>

        <SignupForm />

        <p className='text-center mt-2'>
          Already have an account?{' '}
          <Link
            href='/signin'
            className={buttonVariants({
              variant: 'link',
              className: 'px-0',
            })}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
