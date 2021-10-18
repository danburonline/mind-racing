import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'

import CountdownTimer from '../src/Timers/CountdownTimer'
import CountupTimer from '../src/Timers/CountupTimer'

const GameScene = dynamic(() => import('../src/GameScene/GameScene'), {
  ssr: false
})

export default function Home(): JSX.Element {
  const [gameIsRunning, setGameIsRunning] = useState(false)

  const countdownTimerOnCompleteHandler = () => {
    console.log('countdownTimerOnCompleteHandler run')
    setGameIsRunning(true)
  }

  return (
    <>
      <Head>
        <title>Game – Mind Racing</title>
        <meta
          name='description'
          content='A proof of concept frontend for the Mind Racing BCI application.'
        />
      </Head>
      <main className='h-screen text-white bg-black'>
        {gameIsRunning ? (
          <CountupTimer />
        ) : (
          <CountdownTimer
            time={5000}
            onComplete={countdownTimerOnCompleteHandler}
          />
        )}
        <GameScene />
      </main>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()
