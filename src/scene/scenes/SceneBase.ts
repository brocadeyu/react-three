import * as THREE from 'three'
/**
 * @date 2024-09-25
 */
export default class SceneBase {
  constructor(renderer) {
    // this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer = renderer
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000000
    )
    this.camera.position.z = 5
    this.init()
  }
  init() {
    //子类实现具体内容
  }
  update() {
    //更新场景
  }
  render() {
    this.renderer.render(this.scene, this.camera)
  }
  onEnter() {}
  onExit() {}
}
