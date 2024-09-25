import * as THREE from 'three'
export default class Checkerboard extends THREE.Mesh {
  constructor(options = {}) {
    const { planeSize = 40 } = options

    const loader = new THREE.TextureLoader()
    const texture = loader.load('textures/checker.png')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.magFilter = THREE.NearestFilter
    texture.colorSpace = THREE.SRGBColorSpace
    const repeats = planeSize / 2
    texture.repeat.set(repeats, repeats)

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide
    })
    super(planeGeo, planeMat)
    this.rotation.x = Math.PI * -0.5
  }
}
