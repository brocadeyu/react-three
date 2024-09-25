/**
 * @date 2024-09-25
 */
import * as THREE from 'three'
export default class CameraManager {
  camera: THREE.Camera
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(-0.7, 1.8, -4.5)
  }
}
