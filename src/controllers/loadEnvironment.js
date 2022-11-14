import * as THREE from "three";
import * as CANNON from "cannon-es";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function loadEnvironment(callback) {
  const game = this;
  const loader = new FBXLoader();

  game.car = {};

  let ball = addCollidableBody.call(game, true, null, 3);

  ball.addEventListener("collide", function (e) {
    if (e.contact.bj) {
      if (e.contact.bj.threeMesh) {
        let name = e.contact.bj.threeMesh.name;

        if (name == "goal1") {
          console.log("Player 2 won");
          document.querySelector("#gameUI").style.display = "flex";
          document.querySelector("#messageUI").innerText = "Player 2 won!";
        } else if (name == "goal2") {
          console.log("Player 1 won");
          document.querySelector("#gameUI").style.display = "flex";
          document.querySelector("#messageUI").innerText = "Player 1 won!";
        }
      }
    }
  });

  loader.load(
    "./assets/gameNatureAssets.fbx",
    function (object) {
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      addDestroyables.call(game, object);
      addColliders.call(game, object);
      addGoalPosts.call(game, object);
      // addCollidableBody.call(game);
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

function addDestroyables(assets) {
  const world = this.physicsWorld;
  let the = this;
  assets.children.forEach((child) => {
    if (child.isMesh && child.name.includes("Collidable")) {
      // child.visible = false;
      addCollidableBody.call(the, false, child);
    }
  });
}

function addCollidableBody(sphere = false, visualMesh, overrideMass = 1) {
  let sphereShape = new CANNON.Sphere(1.5);
  let boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));

  // if (visualMesh) {
  //   boxShape = new CANNON.Box(
  //     new CANNON.Vec3(
  //       visualMesh.scale.x,
  //       visualMesh.scale.y,
  //       visualMesh.scale.z
  //     )
  //   );
  // }

  const world = this.physicsWorld;

  const material = new CANNON.Material();
  const body = new CANNON.Body({ mass: overrideMass, material: material });
  if (sphere) {
    body.addShape(sphereShape);
  } else {
    body.addShape(boxShape);
  }

  const x = Math.random() * 0.3 + 1;
  body.position.set(sphere ? -x : x, 5, 0);
  body.linearDamping = this.damping;
  world.addBody(body);

  if (visualMesh) {
    body.threeMesh = visualMesh;
    body.position.copy(visualMesh.position);
    body.quaternion.copy(visualMesh.quaternion);
  } else {
    this.addVisualToCannonBody(body, sphere ? "sphere" : "box", true, false);
  }

  // Create contact material behaviour
  const material_ground = new CANNON.ContactMaterial(
    this.groundMaterial,
    material,
    { friction: 0.4, restitution: sphere ? 0.9 : 0.3 }
  );

  world.addContactMaterial(material_ground);

  return body;
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
      body.name = child.name;
      body.addShape(box);
      body.position.copy(child.position);
      body.quaternion.copy(child.quaternion);
      world.addBody(body);
    }
  });
}

function addGoalPosts(assets) {
  const world = this.physicsWorld;
  const scaleAdjust = 0.9;
  const divisor = 2 / scaleAdjust;
  assets.children.forEach(function (child) {
    if (child.isMesh && child.name.includes("goal")) {
      child.visible = false;
      const halfExtents = new CANNON.Vec3(
        child.scale.x / divisor,
        child.scale.y / divisor,
        child.scale.z / divisor
      );

      const box = new CANNON.Box(halfExtents);
      const body = new CANNON.Body({ mass: 0 });
      body.threeMesh = child;
      body.addShape(box);
      body.name = child.name;
      body.position.copy(child.position);
      body.quaternion.copy(child.quaternion);
      child.add;
      world.addBody(body);
    }
  });
}
