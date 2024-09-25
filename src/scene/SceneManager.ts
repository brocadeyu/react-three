/**
 * @date 2024-09-25
 */
import * as THREE from 'three'
import CameraManager from './CameraManager'
import ObjectManager from './ObjectManager'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
export default class SceneManager {
  container: null
  scene: THREE.Scene
  cameraManager: CameraManager
  objectManager: ObjectManager
  orbitControl: OrbitControls
  renderer: null
  constructor(container: HTMLElement) {
    this.container = container
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.CubeTextureLoader()
      .setPath('textures/sky/sunset/')
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

    // this.scene.background = new THREE.CubeTextureLoader()
    //   .setPath('textures/sky/space-dark/')
    //   .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

    // this.scene.background = new THREE.CubeTextureLoader()
    //   .setPath('textures/sky/space-green/')
    //   .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

    this.cameraManager = new CameraManager()
    this.objectManager = new ObjectManager(this.scene)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.orbitControl = new OrbitControls(
      this.cameraManager.camera,
      this.renderer.domElement
    )
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.renderer.domElement)
    this.animate()
  }
  animate() {
    requestAnimationFrame(() => this.animate())

    // this.objectManager.store.forEach((_) => {
    //   _.rotation.x += 0.01
    //   _.rotation.y += 0.01
    // })

    // 渲染场景
    this.orbitControl.update()
    this.renderer.render(this.scene, this.cameraManager.camera)
  }
}
