import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default function loadCar(callback, assetName, wheelConfig) {
  const game = this;
  const loader = new FBXLoader();

  if (!game.carMeshes) game.carMeshes = [];
  let index = game.carMeshes.length;

  game.carMeshes[index] = {};

  loader.load(
    `./assets/${assetName}.fbx`,
    function (object) {
      object.traverse(function (child) {
        // let receiveShadow = true;
        child.frustumCulled = false;

        console.log(child, child.name.includes("wheel"));
        if (child.isMesh) {
          if (child.name == "carBody") {
            game.carMeshes[index].carBody = child;

            child.castShadow = true;
          } else if (child.name.includes("wheel")) {
            game.carMeshes[index].wheel = child;

            // child.parent = game.scene;
            child.visible = true;
            child.castShadow = true;
          }

          child.receiveShadow = true;
        }
      });

      game.scene.add(game.carMeshes[index].wheel);
      game.scene.add(game.carMeshes[index].carBody);

      if (callback) callback(game.carMeshes[index], wheelConfig);
    },
    null,
    function (error) {
      console.error(error);
    }
  );
}
