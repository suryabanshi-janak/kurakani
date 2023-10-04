import Navbar from '@/components/Navbar';
import { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
