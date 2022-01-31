import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

import usePlayerControls from '../hooks/usePlayerControls'

export default function Player({ PlayerSpeed = 3 }) {
  const [ref, api] = useSphere(() => ({
    args: [0.5],
    mass: 1,
    type: 'Dynamic',
    position: [0, 1.75, 0]
  }))

  const directionVector = new Vector3()
  const frontVector = new Vector3()
  const sideVector = new Vector3()

  const { forward, backward, left, right } = usePlayerControls(api)
  const { camera } = useThree()
  const velocity = useRef([0, 0, 0])

  useEffect(
    () =>
      api.velocity.subscribe(
        subscribedVelocity => (velocity.current = subscribedVelocity)
      ),
    [api.velocity]
  )
  useFrame(() => {
    ref.current && camera.position.copy(ref.current.position)
    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)
    directionVector
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(PlayerSpeed)
      .applyEuler(camera.rotation)
    api.velocity.set(directionVector.x, velocity.current[1], directionVector.z)
  })

  return <mesh ref={ref} />
}
