import Head from 'next/head'
import Link from 'next/link'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function Home({ user }): JSX.Element {
  return (
    <>
      <Head>
        <title>Home – Mind Racing</title>
        <meta
          name='description'
          content='A proof of concept frontend for the Mind Racing BCI application.'
        />
      </Head>
      <main>
        <h1>You&apos;re now logged in</h1>
        <h2>{JSON.stringify(user, null, 2)}</h2>
        <Link href='/game'>Start game</Link>
        <Link href='/api/auth/logout'>Logout</Link>
      </main>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()
