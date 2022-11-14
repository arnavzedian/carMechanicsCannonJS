import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";

import addCar from "./controllers/addCar";
import handleCamera from "./controllers/handleCamera";

import render from "./controllers/render";
import setupCity from "./controllers/setupCity";
import setupScene from "./controllers/setupScene";
import addVisualToCannonBody from "./controllers/addVisualToCannonBody";
import cannonShapeToThreeMesh from "./controllers/cannonShapeToThreeMesh";
import loadCar from "./controllers/loadCar";
import { handleKeyDown, handleKeyUp } from "./controllers/handleKeys";
import loadEnvironment from "./controllers/loadEnvironment";
import addGrass from "./controllers/addGrass";
import addSky from "./controllers/addSky";

class Game {
  constructor() {
    this.scene = null;
    this.environment = null;
    this.camera = null;
    // this.enableDebugger = true;
    this.disableFollowCam = true;

    this.setupScene = setupScene.bind(this);
    this.setupCity = setupCity.bind(this);

    this.render = render.bind(this);

    this.addCar = addCar.bind(this);

    this.handleKeyDown = handleKeyDown.bind(this);
    this.handleKeyUp = handleKeyUp.bind(this);

    this.addVisualToCannonBody = addVisualToCannonBody.bind(this);
    this.cannonShapeToThreeMesh = cannonShapeToThreeMesh.bind(this);

    document.onkeydown = this.handleKeyDown;
    document.onkeyup = this.handleKeyUp;

    this.loadEnvironment = loadEnvironment.bind(this);

    this.handleCamera = handleCamera.bind(this);

    this.setupScene();
    this.loadCar = loadCar.bind(this);

    this.setupCity();

    this.addBody = this.addBody.bind(this);

    let wheelConfig1 = [-1.2, -1.2, 1, 1];

    // this.loadCar(this.addCar, "yellowCar", wheelConfig1);
    this.loadCar(this.addCar, "lowPolyCar1", wheelConfig1);
    // this.loadCar(this.addCar, "lowPolyCar2", wheelConfig1);
    this.loadCar(this.addCar, "lowPolyCar3", wheelConfig1);

    this.loadEnvironment();

    this.addGrass = addGrass.bind(this);

    this.addGrass();

    window.game = this;

    this.addSky = addSky.bind(this);

    window.addEventListener("resize", onWindowResize.bind(this), false);

    this.addSky();

    this.render();
  }

  addBody(type = "box") {
    let typeVsShape = {
      sphere: new CANNON.Sphere(0.5),
      box: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
    };

    let shape = typeVsShape[type];

    const material = new CANNON.Material();
    const body = new CANNON.Body({ mass: 5, material: material });

    body.addShape(shape);

    const x = Math.random() * 0.3 + 1;
    body.position.set(x, 5, 0);
    body.linearDamping = this.damping;
    this.physicsWorld.addBody(body);

    this.addVisualToCannonBody(body, type, true, false);

    const material_ground = new CANNON.ContactMaterial(
      this.groundMaterial,
      material,
      { friction: 0.5, restitution: 0.5, contactEquationStiffness: 1000 }
    );

    this.physicsWorld.addContactMaterial(material_ground);
  }
}

new Game();

function onWindowResize() {
  let w = window.innerWidth;
  let h = window.innerHeight;
  // if (!isInFullscreen()) {
  //   this.renderer.setPixelRatio(window.devicePixelRatio);
  //   h = w / 1.6;
  // } else {
  //   //Reduce resolution at full screen for better performance
  //   renderer.setPixelRatio(this.defaultPixelRatio);
  // }
  this.camera.aspect = w / h;
  this.renderer.setSize(w, h, false);
  this.backgroundMaterial.uniforms.resolution.value = new THREE.Vector2(
    canvas.width,
    canvas.height
  );
  this.camera.updateProjectionMatrix();
}
