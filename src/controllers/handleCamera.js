import * as THREE from "three";
import * as CANNON from "cannon-es";

export default function handleCamera() {
  if (this.enableDebugger) {
    this.controls.update();
    return;
  }

  if (this.followCam === undefined) return;
  const pos = this.car.carBody.position.clone();
  pos.y += 0.3;
  this.camera.position.lerp(
    this.followCam.getWorldPosition(new THREE.Vector3()),
    0.05
  );
  if (this.camera.position.y < 1) this.camera.position.y = 1;
  this.camera.lookAt(pos);
}
