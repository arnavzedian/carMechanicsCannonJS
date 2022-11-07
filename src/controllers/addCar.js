import * as THREE from "three";
import * as CANNON from "cannon-es";

export default function addCar() {
  const mass = 150;
  const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
  const chassisBody = new CANNON.Body({ mass: mass });
  const pos = this.car.carBody.position.clone();
  pos.y += 1;
  let game = this;

  chassisBody.addShape(chassisShape);
  chassisBody.position.copy(pos);
  chassisBody.angularVelocity.set(0, 0, 0);
  chassisBody.threeMesh = this.car.carBody;

  const options = {
    radius: 0.3,
    directionLocal: new CANNON.Vec3(0, -1, 0),
    suspensionStiffness: 45,
    suspensionRestLength: 0.4,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.5,
    maxSuspensionForce: 200000,
    rollInfluence: 0.01,
    axleLocal: new CANNON.Vec3(-1, 0, 0),
    chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
    maxSuspensionTravel: 0.25,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  // Create the vehicle
  const vehicle = new CANNON.RaycastVehicle({
    chassisBody: chassisBody,
    indexRightAxis: 0,
    indexUpAxis: 1,
    indexForwardAxis: 2,
  });

  const axlewidth = 0.8;
  options.chassisConnectionPointLocal.set(axlewidth, 0, -1);
  vehicle.addWheel(options);

  options.chassisConnectionPointLocal.set(-axlewidth, 0, -1);
  vehicle.addWheel(options);

  options.chassisConnectionPointLocal.set(axlewidth, 0, 1);
  vehicle.addWheel(options);

  options.chassisConnectionPointLocal.set(-axlewidth, 0, 1);
  vehicle.addWheel(options);

  vehicle.addToWorld(this.physicsWorld);

  const wheelBodies = [];
  let index = 0;
  const wheels = [this.car.wheel];
  for (let i = 0; i < 3; i++) {
    let wheel = this.car.wheel.clone();
    this.scene.add(wheel);
    wheels.push(wheel);
  }

  console.log(vehicle.wheelInfos);

  vehicle.wheelInfos.forEach(function (wheel) {
    const cylinderShape = new CANNON.Cylinder(
      wheel.radius,
      wheel.radius,
      wheel.radius / 2,
      20
    );
    const wheelBody = new CANNON.Body({ mass: 1 });
    const q = new CANNON.Quaternion();
    q.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
    wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
    wheelBodies.push(wheelBody);
    wheelBody.threeMesh = wheels[index++];
  });

  this.physicsWorld.addEventListener("postStep", function () {
    let index = 0;
    game.vehicle.wheelInfos.forEach(function (wheel) {
      game.vehicle.updateWheelTransform(index);
      const t = wheel.worldTransform;
      wheelBodies[index].threeMesh.position.copy(t.position);
      wheelBodies[index].threeMesh.quaternion.copy(t.quaternion);
      index++;
    });
  });

  game.vehicle = vehicle;

  game.car.wheels = wheelBodies;

  this.followCam = new THREE.Object3D();
  this.followCam.position.copy(this.camera.position);
  this.scene.add(this.followCam);
  this.followCam.parent = chassisBody.threeMesh;
}
