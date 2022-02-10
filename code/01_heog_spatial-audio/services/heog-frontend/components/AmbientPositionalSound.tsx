import { Key, Suspense, createRef, useMemo } from 'react'
import type { PositionalAudio } from 'three'

import SoundObject from './SoundObject'

export type SoundObject = {
  id: number
  x: number
  y: number
  z: number
  position: number[]
  filePath: string
  name: string
  rotation: number
  rolloffFactor: number
  coneOuterGain: number
  innerAngle: number
  outerAngle: number
  volume: number
}

export type AmbientPositionalSoundProps = {
  soundObjects: SoundObject[]
}

export default function AmbientPositionalSound(
  props: AmbientPositionalSoundProps
): JSX.Element {
  const audioRefs = useMemo(
    () =>
      Array(props.soundObjects.length)
        .fill(0)
        .map(() => createRef<PositionalAudio>()),
    [props.soundObjects.length]
  )

  const PositionalSoundObject = props.soundObjects.map(
    (
      soundObject: {
        id: Key | undefined
        x: number
        y: number
        z: number
        rotation: number
        volume: number
        rolloffFactor: number
        filePath: string
        coneOuterGain: number
        innerAngle: number
        outerAngle: number
      },
      index: string | number
    ) => {
      return (
        <mesh
          key={soundObject.id}
          position={[soundObject.x, soundObject.y, soundObject.z]}
          rotation={[0, soundObject.rotation, 0]}
        >
          <sphereGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='red' wireframe={true} />
          <SoundObject
            refs={audioRefs[index as number]}
            volume={soundObject.volume}
            rolloffFactor={soundObject.rolloffFactor}
            url={soundObject.filePath}
            key={soundObject.id}
            coneOuterGain={soundObject.coneOuterGain}
            innerAngle={soundObject.innerAngle}
            outerAngle={soundObject.outerAngle}
          />
        </mesh>
      )
    }
  )
  return <Suspense fallback={null}>{PositionalSoundObject}</Suspense>
}
