export function handleKeyDown(keyEvent) {
  console.log(keyEvent.keyCode);

  switch (keyEvent.keyCode) {
    // BUS 1
    // pivots wheels for steering
    case 65: // "a" key or left arrow key (turn left)
      steer.call(this, 1, 0);
      break;
    case 68: // "d" key  or right arrow key (turn right)
      steer.call(this, -1, 0);
      break;
    // rotates wheels for propulsion
    case 87: // "w" key or up arrow key (forward)
      goForward.call(this, -1, 0);
      break;
    case 83: // "s" key or down arrow key (backward)
      goForward.call(this, 1, 0);
      break;
    case 100: // "a" key or left arrow key (turn left)
      steer.call(this, 1, 1);
      break;
    case 102: // "d" key  or right arrow key (turn right)
      steer.call(this, -1, 1);
      break;
    // rotates wheels for propulsion
    case 104: // "w" key or up arrow key (forward)
      goForward.call(this, -1, 1);
      break;
    case 101: // "s" key or down arrow key (backward)
      goForward.call(this, 1, 1);
      break;
  }
}

export function handleKeyUp(keyEvent) {
  switch (keyEvent.keyCode) {
    // BUS 1
    // pivots wheels for steering
    case 65: // "a" key or left arrow key (turn left)
      steer.call(this, 0, 0);
      break;
    case 68: // "d" key  or right arrow key (turn right)
      steer.call(this, 0, 0);
      break;
    // rotates wheels for propulsion
    case 87: // "w" key or up arrow key (forward)
      goForward.call(this, 0, 0);
      break;
    case 83: // "s" key or down arrow key (backward)
      goForward.call(this, 0, 0);
      break;
    case 100: // "a" key or left arrow key (turn left)
      steer.call(this, 0, 1);
      break;
    case 102: // "d" key  or right arrow key (turn right)
      steer.call(this, 0, 1);
      break;
    // rotates wheels for propulsion
    case 104: // "w" key or up arrow key (forward)
      goForward.call(this, 0, 1);
      break;
    case 101: // "s" key or down arrow key (backward)
      goForward.call(this, 0, 1);
      break;
  }
}

function goForward(forward, index) {
  const maxForce = 400;
  const brakeForce = 5;

  let vehicle = this.cars[index];
  const force = maxForce * forward;

  if (forward != 0) {
    vehicle.setBrake(0, 0);
    vehicle.setBrake(0, 1);
    vehicle.setBrake(0, 2);
    vehicle.setBrake(0, 3);

    vehicle.applyEngineForce(force, 0);
    vehicle.applyEngineForce(force, 1);
  } else {
    vehicle.setBrake(brakeForce, 0);
    vehicle.setBrake(brakeForce, 1);
    vehicle.setBrake(brakeForce, 2);
    vehicle.setBrake(brakeForce, 3);
  }
}

function steer(turn, index) {
  const maxSteerVal = 0.5;

  let vehicle = this.cars[index];
  const steer = maxSteerVal * turn;

  vehicle.setSteeringValue(steer, 2);
  vehicle.setSteeringValue(steer, 3);
}
