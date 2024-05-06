import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import GLobe from '@/assets/globe.jpg'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
function Home() {
  const containerRef = useRef(null)
  let scene, camera, renderer, controls

  useEffect(() => {
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }
    // 创建一个场景
    scene = new THREE.Scene()

    // 创建一个摄像机
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 10

    // 创建一个渲染器，将其大小设置为窗口大小，并将其添加到页面的 div 元素中
    renderer = new THREE.WebGLRenderer({ alpha: true })
    controls = new OrbitControls(camera, renderer.domElement)
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // 创建一个立方体
    // const geometry = new THREE.BoxGeometry()
    // const radius = 3

    // const detail = 2

    // const geometry = new THREE.DodecahedronGeometry(radius, detail)
    // const material = new THREE.MeshPhongMaterial({
    //   color: 'red',
    //   shininess: 150
    // })
    // cube = new THREE.Mesh(geometry, material)
    // const color1 = 0xffffff // white
    // const near = 5
    // const far = 12
    // scene.fog = new THREE.Fog(color1, near, far)
    // scene.add(cube)
    // const color = 0xffffff
    // const intensity = 3
    // const light = new THREE.DirectionalLight(color, intensity)
    // light.position.set(-1, 2, 4)
    // scene.add(light)
    const loader = new THREE.TextureLoader()
    loader.load(
      // 地球纹理贴图的路径
      GLobe,

      // 加载完成后的回调函数
      function (texture) {
        // 创建一个球体
        const geometry = new THREE.SphereGeometry(5, 40, 40)
        const material = new THREE.MeshBasicMaterial({ map: texture }) // 将贴图应用到材质上
        const earth = new THREE.Mesh(geometry, material)

        const haloMaterial = new THREE.ShaderMaterial({
          transparent: true,
          blending: THREE.AdditiveBlending,
          vertexShader: `    varying vec2 vUv;
          void main() {
              vUv = uv;
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_Position = projectionMatrix * mvPosition;
          }`,
          fragmentShader: `   uniform sampler2D texture1;
          varying vec2 vUv;
          void main() {
              vec4 texColor = texture2D(texture1, vUv);
              gl_FragColor =  vec4(1.0, 0.0, 0.0, 0.5); // 设置光晕透明度
          }`,
          uniforms: {
            texture1: { value: texture }
          }
        })
        const halo = new THREE.Mesh(geometry.clone(), haloMaterial)
        halo.scale.multiplyScalar(1.1)
        scene.add(halo)

        scene.add(earth)

        // 渲染场景
        function animate() {
          requestAnimationFrame(animate)

          // 旋转地球
          earth.rotation.y += 0.005

          // 渲染场景
          renderer.render(scene, camera)
          controls.update()
        }
        animate()
      },

      // 加载进度回调函数（可选）
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },

      // 加载出错回调函数（可选）
      function (error) {
        console.error('An error happened:', error)
      }
    )

    // 渲染场景
    // animate()

    // 清除函数
    return () => {
      // 释放资源
      renderer.dispose()
    }
  }, [])

  // 监听窗口大小变化事件
  useEffect(() => {
    const handleResize = () => {
      // 更新摄像机的纵横比例
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      // 更新渲染器的大小
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // 清除函数
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [camera, renderer])

  // 渲染场景
  // function animate() {
  //   requestAnimationFrame(animate)

  //   // 旋转立方体
  //   // cube.rotation.x += 0.01
  //   // cube.rotation.y += 0.01

  //   // 渲染场景
  //   renderer.render(scene, camera)
  // }

  return <div ref={containerRef} />
}

export default Home
