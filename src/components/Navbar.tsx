import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { getAuthSession } from '@/lib/auth-option';
import UserAccountNav from './UserAccountNav';
import MobileNav from './MobileNav';

export default async function Navbar() {
  const session = await getAuthSession();
  const user = session?.user;

  return (
    <nav className='sticky h-16 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex items-center justify-between h-16 border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold text-primary text-xl'
          >
            <span>kurakani.</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className='hidden space-x-4 sm:flex items-center'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  Pricing
                </Link>
                <Link
                  href='/signin'
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  Sign in
                </Link>
                <Link href='/signup' className={buttonVariants({})}>
                  Get started <ArrowRight className='h-4 w-4 ml-2' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({ variant: 'ghost' })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={user?.name ?? 'Your account'}
                  email={user?.email ?? ''}
                  imageUrl={user?.image ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
