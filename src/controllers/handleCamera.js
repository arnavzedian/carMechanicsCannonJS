import CameraController from "./CameraController";

export default function handleCamera() {
  let car = this.player;
  let playerPos = car.frame.position;
  var lookTargetPos = new THREE.Vector3();
  car.lookTarget.getWorldPosition(lookTargetPos);
  var relativeCameraOffset = new THREE.Vector3(20, 5, 0);
  var cameraOffset = relativeCameraOffset.applyMatrix4(car.frame.matrixWorld);
  this.camera.position.x = cameraOffset.x;
  this.camera.position.y = cameraOffset.y;
  this.camera.position.z = cameraOffset.z;
  this.camera.lookAt(lookTargetPos.x, lookTargetPos.y + 1, lookTargetPos.z);
}
