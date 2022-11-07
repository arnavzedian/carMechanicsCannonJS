import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function loadEnvironment(callback) {
  const game = this;
  const loader = new FBXLoader();

  game.car = {};

  loader.load(
    "./assets/dayCity.fbx",
    function (object) {
      addColliders.call(game, object);
      game.environment = object;
      game.scene.add(object);

      if (callback) callback();
    },
    null,
    function (error) {
      console.error(error);
    }
  );
}

function addColliders(assets) {
  const world = this.physicsWorld;
  const scaleAdjust = 0.9;
  const divisor = 2 / scaleAdjust;
  assets.children.forEach(function (child) {
    if (child.isMesh && child.name.includes("Collider")) {
      child.visible = false;
      const halfExtents = new CANNON.Vec3(
        child.scale.x / divisor,
        child.scale.y / divisor,
        child.scale.z / divisor
      );
      const box = new CANNON.Box(halfExtents);
      const body = new CANNON.Body({ mass: 0 });
      body.addShape(box);
      body.position.copy(child.position);
      body.quaternion.copy(child.quaternion);
      world.add(body);
    }
  });
}
