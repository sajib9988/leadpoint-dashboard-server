// app/page.tsx or app/home/page.tsx depending on your routing

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/login'); // immediately redirects to /login
}
