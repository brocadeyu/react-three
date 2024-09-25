/**
 * @date 2024-09-25
 */
import * as THREE from 'three'
import SceneBase from './scenes/SceneBase'
export default class SceneManager {
  container: null
  scene: THREE.Scene
  renderer: null
  scenes = {}
  activeScene: SceneBase = null
  constructor(container: HTMLElement) {
    this.container = container
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container.appendChild(this.renderer.domElement)
  }
  addScene(name, scene) {
    this.scenes[name] = scene
  }
  switchScene(name) {
    if (this.activeScene) {
      this.activeScene.onExit()
    }

    this.activeScene = this.scenes[name]

    if (this.activeScene) {
      this.activeScene.onEnter()
    }
  }
  update() {
    if (this.activeScene) {
      this.activeScene.update()
      this.activeScene.render()
    }
  }
}
