export default function configureWheel(wheel, position, BusSide) {
  wheel.name = "wheel";
  wheel.componentOf = "car";

  BusSide === "port"
    ? (wheel.rotation.x = Math.PI / 2)
    : (wheel.rotation.x = -Math.PI / 2);
  wheel.position.set(position.x, position.y, position.z);
  wheel.setDamping(0.5, 0.5);
  wheel.castShadow = true;
  this.scene.add(wheel);
}
