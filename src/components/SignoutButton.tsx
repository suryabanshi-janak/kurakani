'use client';

import { signOut } from 'next-auth/react';

export default function SignoutButton() {
  const onSignOut = () => signOut();

  return <button onClick={onSignOut}>Log out</button>;
}
