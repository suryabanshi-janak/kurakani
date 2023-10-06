import { getAuthSession } from '@/lib/auth-option';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) redirect('/signin');

  return <div>DashboardPage</div>;
}
