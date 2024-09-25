import SceneBase from './SceneBase'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import ObjectManager from '../ObjectManager'
import * as dat from 'dat.gui'
import { Sky } from 'three/examples/jsm/Addons.js'
/**
 * @date 2024-09-25
 */
export default class SceneSunDynamic extends SceneBase {
  init() {
    this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement)
    this.camera.position.set(-13.49, 14.19, -58.28)

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 0.12
    this.objectManager = new ObjectManager(this.scene)

    const sky = new Sky()
    sky.scale.setScalar(450000)
    this.scene.add(sky)
    const sun = new THREE.Vector3()
    const effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 2,
      azimuth: 180,
      exposure: this.renderer.toneMappingExposure
    }
    if (window.guiInstance) {
      window.guiInstance.destroy()
    }
    window.guiInstance = new dat.GUI()
    const gui = window.guiInstance

    const guiChanged = () => {
      const uniforms = sky.material.uniforms
      uniforms['turbidity'].value = effectController.turbidity
      uniforms['rayleigh'].value = effectController.rayleigh
      uniforms['mieCoefficient'].value = effectController.mieCoefficient
      uniforms['mieDirectionalG'].value = effectController.mieDirectionalG

      const phi = THREE.MathUtils.degToRad(90 - effectController.elevation)
      const theta = THREE.MathUtils.degToRad(effectController.azimuth)

      sun.setFromSphericalCoords(1, phi, theta)

      uniforms['sunPosition'].value.copy(sun)

      this.renderer.toneMappingExposure = effectController.exposure
      this.render()
    }
    gui.add(effectController, 'turbidity', 0.0, 20.0, 0.1).onChange(guiChanged)
    gui.add(effectController, 'rayleigh', 0.0, 4, 0.001).onChange(guiChanged)
    gui
      .add(effectController, 'mieCoefficient', 0.0, 0.1, 0.001)
      .onChange(guiChanged)
    gui
      .add(effectController, 'mieDirectionalG', 0.0, 1, 0.001)
      .onChange(guiChanged)
    gui.add(effectController, 'elevation', 0, 90, 0.1).onChange(guiChanged)
    gui.add(effectController, 'azimuth', -180, 180, 0.1).onChange(guiChanged)
    gui.add(effectController, 'exposure', 0, 1, 0.0001).onChange(guiChanged)

    guiChanged()
  }
  render() {
    this.orbitControl.update()
    this.renderer.render(this.scene, this.camera)
  }
}
