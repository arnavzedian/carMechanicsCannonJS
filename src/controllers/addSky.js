import { Sky } from "three/addons/objects/Sky.js";
import * as THREE from "three";

export default function addSky() {
  // Add Sky
  let sky = new Sky();
  sky.scale.setScalar(450000);
  this.scene.add(sky);

  let sun = new THREE.Vector3();

  /// GUI

  const effectController = {
    turbidity: 10,
    rayleigh: 0.5,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 25,
    azimuth: 180,
    exposure: this.renderer.toneMappingExposure,
  };

  const uniforms = sky.material.uniforms;
  uniforms["turbidity"].value = effectController.turbidity;
  uniforms["rayleigh"].value = effectController.rayleigh;
  uniforms["mieCoefficient"].value = effectController.mieCoefficient;
  uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

  const phi = THREE.MathUtils.degToRad(90 - effectController.elevation);
  const theta = THREE.MathUtils.degToRad(effectController.azimuth);

  sun.setFromSphericalCoords(1, phi, theta);

  uniforms["sunPosition"].value.copy(sun);

  this.renderer.toneMappingExposure = effectController.exposure;
  //   renderer.render(scene, camera);
}
