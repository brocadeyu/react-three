/**
 * @date 2024-09-25
 */
import * as THREE from 'three'
import Checkerboard from './objects/CheckerBoard'
export default class ObjectManager {
  scene: THREE.Scene
  store = new Map()
  constructor(scene) {
    this.scene = scene
    const boxWidth = 10
    const boxHeight = 10
    const boxDepth = 10
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0, 6, 0)
    this.scene.add(cube)
    this.store.set('cube', cube)
    this.scene.add(new Checkerboard())
    const ambientLight = new THREE.AmbientLight(0xffffff) // 环境光
    this.scene.add(ambientLight)
  }
}
