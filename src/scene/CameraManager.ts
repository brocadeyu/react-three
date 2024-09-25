/**
 * @date 2024-09-25
 */
import * as THREE from 'three'
export default class CameraManager {
  camera: THREE.Camera
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    )
    this.camera.position.set(-13.49, 14.19, -58.28)
  }
}
