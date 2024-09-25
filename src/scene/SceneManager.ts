/**
 * @date 2024-09-25
 */
import * as THREE from 'three'
import CameraManager from './CameraManager'
import ObjectManager from './ObjectManager'
export default class SceneManager {
  container: null
  scene: THREE.Scene
  cameraManager: CameraManager
  objectManager: ObjectManager
  renderer: null
  constructor(container: HTMLElement) {
    this.container = container
    this.scene = new THREE.Scene()
    this.cameraManager = new CameraManager()
    this.objectManager = new ObjectManager(this.scene)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.renderer.domElement)
    this.animate()
  }
  animate() {
    requestAnimationFrame(() => this.animate())

    // 让所有的物体都旋转 (测试用，可以修改为自己的动画逻辑)
    // this.objects.forEach((obj) => {
    //   obj.rotation.x += 0.01
    //   obj.rotation.y += 0.01
    // })
    this.objectManager.store.forEach((_) => {
      _.rotation.x += 0.01
      _.rotation.y += 0.01
    })

    // 渲染场景
    this.renderer.render(this.scene, this.cameraManager.camera)
  }
}
