import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function loadCar(callback) {
  const game = this;
  const loader = new FBXLoader();

  game.car = {};

  loader.load(
    "./assets/toyCar.fbx",
    function (object) {
      object.traverse(function (child) {
        let receiveShadow = true;
        console.log(child, child.name.includes("wheel"));
        if (child.isMesh) {
          if (child.name == "carBody") {
            game.car.carBody = child;

            child.castShadow = true;
            receiveShadow = false;
          } else if (child.name.includes("wheel")) {
            game.car.wheel = child;

            // child.parent = game.scene;
            child.visible = true;
            child.castShadow = true;
            receiveShadow = false;
          }

          child.receiveShadow = receiveShadow;
        }
      });

      game.scene.add(game.car.wheel);
      game.scene.add(game.car.carBody);

      if (callback) callback();
    },
    null,
    function (error) {
      console.error(error);
    }
  );
}
