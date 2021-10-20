import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'
import useSound from 'use-sound'

import PlayerControls from '../src/Buttons/PlayerControls'
import RestartButton from '../src/Buttons/RestartButton'
import EndScreen from '../src/EndScreen/EndScreen'
import CountdownTimer from '../src/Timers/CountdownTimer'
import CountupTimer from '../src/Timers/CountupTimer'
import useStore, { GameStateEnum } from '../src/store/useStore'

const GameScene = dynamic(() => import('../src/GameScene/GameScene'), {
  ssr: false
})

export default function Home(): JSX.Element {
  const [gameIsRunning, setGameIsRunning] = useState(false)
  const { gameState, setGameStartState } = useStore()
  const [play, { stop }] = useSound('music/game-music.mp3')

  const countdownTimerOnCompleteHandler = () => {
    setGameStartState()
    setGameIsRunning(true)
    play()
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
      <main className='h-screen text-white bg-main'>
        {gameIsRunning ? (
          <CountupTimer />
        ) : (
          <CountdownTimer
            time={5000}
            onComplete={countdownTimerOnCompleteHandler}
          />
        )}
        {gameState === GameStateEnum.FINISHED && (
          <>
            {stop()}
            <EndScreen />
          </>
        )}
        {gameState === GameStateEnum.RUNNING && (
          <div className='absolute z-10 top-4 left-4'>
            <RestartButton />
          </div>
        )}
        <PlayerControls />
        <GameScene />
      </main>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()
