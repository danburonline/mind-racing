import { Physics } from '@react-three/cannon'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import Floor from '../Floor/Floor'
import Labyrinth from '../Labyrinth/Labyrinth'
import Lighting from '../Lighting/Lighting'
import Player from '../Player/Player'

export default function GameScene(): JSX.Element {
  return (
    <>
      <Canvas camera={{ position: [0, 20, 0] }}>
        <Suspense fallback={null}>
          <Physics>
            <Floor />
            <Labyrinth />
            <Player />
          </Physics>
        </Suspense>
        <Lighting />
      </Canvas>
      <Loader />
    </>
  )
}
