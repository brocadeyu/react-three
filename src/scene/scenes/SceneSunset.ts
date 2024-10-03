import SceneBase from './SceneBase'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import ObjectManager from '../ObjectManager'
/**
 * @date 2024-09-25
 */
export default class SceneSunset extends SceneBase {
  init() {
    this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement)
    this.scene.background = new THREE.CubeTextureLoader()
      .setPath('textures/sky/sunset/')
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
    this.camera.position.set(-13.49, 14.19, -58.28)
    this.objectManager = new ObjectManager(this.scene)
    // this.scene.background = new THREE.CubeTextureLoader()
    //   .setPath('textures/sky/space-dark/')
    //   .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

    // this.scene.background = new THREE.CubeTextureLoader()
    //   .setPath('textures/sky/space-green/')
    //   .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
  }
  render() {
    // console.log('66')

    this.orbitControl.update()
    this.renderer.render(this.scene, this.camera)
  }
}
