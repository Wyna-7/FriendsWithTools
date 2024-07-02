import { redirect } from 'next/navigation';

export default async function Home () {
  return (
    <main>
      {redirect('/sign-in')};
    </main>
  );
}

