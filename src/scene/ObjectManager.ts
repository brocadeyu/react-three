/**
 * @date 2024-09-25
 */
import * as THREE from 'three'
export default class ObjectManager {
  scene: THREE.Scene
  store = new Map()
  constructor(scene) {
    this.scene = scene
    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
    this.store.set('cube', cube)
  }
}
