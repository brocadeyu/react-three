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
    this.acc = 0.01
    this.sunElevation = 2.0
    this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement)
    this.orbitControl.enableDamping = true
    this.camera.position.set(-13.49, 14.19, -58.28)

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 0.12
    this.objectManager = new ObjectManager(this.scene)

    const sky = new Sky()
    sky.scale.setScalar(450000)
    this.scene.add(sky)
    this.sky = sky
    this.sun = new THREE.Vector3()
    this.effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      // elevation: 2,
      azimuth: 180,
      exposure: this.renderer.toneMappingExposure
    }
    if (window.guiInstance) {
      window.guiInstance.destroy()
    }
    window.guiInstance = new dat.GUI()
    const gui = window.guiInstance

    const guiChanged = () => {
      const uniforms = this.sky.material.uniforms
      uniforms['turbidity'].value = this.effectController.turbidity
      uniforms['rayleigh'].value = this.effectController.rayleigh
      uniforms['mieCoefficient'].value = this.effectController.mieCoefficient
      uniforms['mieDirectionalG'].value = this.effectController.mieDirectionalG

      const phi = THREE.MathUtils.degToRad(90 - this.sunElevation)
      const theta = THREE.MathUtils.degToRad(this.effectController.azimuth)

      this.sun.setFromSphericalCoords(1, phi, theta)

      uniforms['sunPosition'].value.copy(this.sun)

      this.renderer.toneMappingExposure = this.effectController.exposure
      this.render()
    }
    gui
      .add(this.effectController, 'turbidity', 0.0, 20.0, 0.1)
      .onChange(guiChanged)
    gui
      .add(this.effectController, 'rayleigh', 0.0, 4, 0.001)
      .onChange(guiChanged)
    gui
      .add(this.effectController, 'mieCoefficient', 0.0, 0.1, 0.001)
      .onChange(guiChanged)
    gui
      .add(this.effectController, 'mieDirectionalG', 0.0, 1, 0.001)
      .onChange(guiChanged)
    // gui.add(effectController, 'elevation', 0, 90, 0.1).onChange(guiChanged)
    gui
      .add(this.effectController, 'azimuth', -180, 180, 0.1)
      .onChange(guiChanged)
    gui
      .add(this.effectController, 'exposure', 0, 1, 0.0001)
      .onChange(guiChanged)

    guiChanged()
  }
  update() {
    // console.log('111')
    this.sunElevation += this.acc
    const uniforms = this.sky.material.uniforms
    const phi = THREE.MathUtils.degToRad(90 - this.sunElevation)
    const theta = THREE.MathUtils.degToRad(this.effectController.azimuth)
    this.sun.setFromSphericalCoords(1, phi, theta)
    uniforms['sunPosition'].value.copy(this.sun)
    if (this.sunElevation > 180) {
      this.sunElevation = -10
    }
    if (this.sunElevation > 30 && this.acc === 0.01) {
      this.acc = 0.1
    }
    if (this.sunElevation > 150 && this.acc === 0.1) {
      this.acc = 0.01
    }
  }
  render() {
    this.orbitControl.update()
    this.renderer.render(this.scene, this.camera)
  }
}
