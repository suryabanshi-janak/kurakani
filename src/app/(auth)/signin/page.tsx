import UserAuthForm from '@/components/UserAuthForm';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

export default function SignInPage() {
  return (
    <div className='min-h-screen grid place-content-center'>
      <div className='w-96'>
        <h1 className='text-center mt-4 text-primary font-semibold text-xl'>
          kurakani
        </h1>

        <div className='my-6'>
          <h4 className='font-semibold text-2xl mb-1'>Welcome back!</h4>
          <p>Sign in to continue</p>
        </div>

        <UserAuthForm />
      </div>
    </div>
  );
}
