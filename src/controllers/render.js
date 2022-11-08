export default function render() {
  // if (this.roundActive === true) {
  //   checkForMatchCompletion();
  // }

  this.handleCamera();
  //camera.lookAt( busArray[0].frame.position );
  this.camera.updateProjectionMatrix();
  this.renderer.clear();

  this.renderer.render(this.scene, this.camera);
  // this.renderer.render(this.background, this.camera);

  requestAnimationFrame(this.render);

  this.physicsUpdate();
}
