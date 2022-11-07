export function handleKeyDown(keyEvent) {
  let car = this.player;

  switch (keyEvent.keyCode) {
    // BUS 1
    // pivots wheels for steering
    case 65:
    case 37: // "a" key or left arrow key (turn left)
      steer.call(this, 1);
      break;
    case 68:
    case 39: // "d" key  or right arrow key (turn right)
      steer.call(this, -1);
      break;
    // rotates wheels for propulsion
    case 87:
    case 38: // "w" key or up arrow key (forward)
      goForward.call(this, -1);
      break;
    case 83:
    case 40: // "s" key or down arrow key (backward)
      goForward.call(this, 1);
      break;
  }
}

export function handleKeyUp(keyEvent) {
  switch (keyEvent.keyCode) {
    // BUS 1
    // pivots wheels for steering
    case 65:
    case 37: // "a" key or left arrow key (turn left)
      steer.call(this, 0);
      break;
    case 68:
    case 39: // "d" key  or right arrow key (turn right)
      steer.call(this, 0);
      break;
    // rotates wheels for propulsion
    case 87:
    case 38: // "w" key or up arrow key (forward)
      goForward.call(this, 0);
      break;
    case 83:
    case 40: // "s" key or down arrow key (backward)
      goForward.call(this, 0);
      break;
  }
}

function goForward(forward) {
  const maxForce = 500;
  const brakeForce = 10;

  const force = maxForce * forward;

  if (forward != 0) {
    this.vehicle.setBrake(0, 0);
    this.vehicle.setBrake(0, 1);
    this.vehicle.setBrake(0, 2);
    this.vehicle.setBrake(0, 3);

    this.vehicle.applyEngineForce(force, 0);
    this.vehicle.applyEngineForce(force, 1);
  } else {
    this.vehicle.setBrake(brakeForce, 0);
    this.vehicle.setBrake(brakeForce, 1);
    this.vehicle.setBrake(brakeForce, 2);
    this.vehicle.setBrake(brakeForce, 3);
  }
}

function steer(turn) {
  const maxSteerVal = 0.6;

  const steer = maxSteerVal * turn;

  this.vehicle.setSteeringValue(steer, 2);
  this.vehicle.setSteeringValue(steer, 3);
}
