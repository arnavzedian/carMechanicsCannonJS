export default function configureWheelConstraints(constraint) {
  this.scene.addConstraint(constraint);
  constraint.setAngularLowerLimit({ x: 0, y: 0, z: 1 });
  constraint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });
  return constraint;
}
