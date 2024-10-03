/**
 * @file  scene
 * @date 2024-09-25
 */
import SceneManager from '@/scene/SceneManager'
import SceneSunDynamic from '@/scene/scenes/SceneSunDynamic'
import SceneSunset from '@/scene/scenes/SceneSunset'
import React, { useRef, useEffect, useState } from 'react'
const Scene = () => {
  const containerRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sceneManager, setSceneManager] = useState(null)
  useEffect(() => {
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }
    const s = new SceneManager(containerRef.current)
    console.log('sceneManager', s)
    const sunsetScene = new SceneSunset(s.renderer)
    const sunDynamicScene = new SceneSunDynamic(s.renderer)
    s.addScene('sunset', sunsetScene)
    s.addScene('sunDynamic', sunDynamicScene)
    s.switchScene('sunDynamic')
    setTimeout(() => {
      // s.switchScene('sunset')
      // console.log('switch')
    }, 3000)
    setSceneManager(s)
    function animate() {
      s.update()
      requestAnimationFrame(animate)
    }

    animate()
  }, [])
  return <div ref={containerRef}></div>
}

export default Scene
