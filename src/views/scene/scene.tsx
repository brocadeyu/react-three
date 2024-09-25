/**
 * @file  scene
 * @date 2024-09-25
 */
import SceneManager from '@/scene/SceneManager'
import React, { useRef, useEffect, useState } from 'react'
const Scene = () => {
  const containerRef = useRef(null)
  const [sceneManager, setSceneManager] = useState(null)
  useEffect(() => {
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }
    const s = new SceneManager(containerRef.current)
    console.log('sceneManager', s)
    setSceneManager(s)
  }, [])
  return <div ref={containerRef}></div>
}

export default Scene
