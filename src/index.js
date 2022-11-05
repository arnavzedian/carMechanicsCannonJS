import addCar from "./controllers/addCar";
import configureWheel from "./controllers/configureWheel";
import configureWheelConstraints from "./controllers/configureWheelConstraints";
import handleCamera from "./controllers/handleCamera";
import handleKeyDown from "./controllers/handleKeyDown";
import handleKeyUp from "./controllers/handleKeyUp";
import render from "./controllers/render";
import setupNightCity from "./controllers/setupNightCity";
import setupScene from "./controllers/setupScene";

class Game {
  constructor() {
    Physijs.scripts.worker = "/js/physijs_worker.js";
    Physijs.scripts.ammo = "/js/ammo.js";

    /////---Settings---/////
    this.bwf = 3.5; //bus wheel friction
    this.bwr = 0; //bus wheel restitution
    this.pf = 4.2; //platform friction
    this.pr = 0; //platform restitution
    this.backgroundColor = 0xcdd3d6;

    /////---Initiation---/////
    this.busArray = [];
    this.Player1 = { name: "gretchen", score: 0 };
    this.Player2 = { name: "bertha", score: 0 };
    this.roundActive = false;
    this.scene = null;
    this.environment = null;
    this.camera = null;
    ///Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.setupScene = setupScene.bind(this);
    this.setupNightCity = setupNightCity.bind(this);
    this.configureWheel = configureWheel.bind(this);
    this.configureWheelConstraints = configureWheelConstraints.bind(this);
    this.render = render.bind(this);
    this.addCar = addCar.bind(this);
    this.handleKeyDown = handleKeyDown.bind(this);
    this.handleKeyUp = handleKeyUp.bind(this);

    document.onkeydown = this.handleKeyDown;
    document.onkeyup = this.handleKeyUp;

    this.handleCamera = handleCamera.bind(this);

    this.setupScene();
    this.setupNightCity();
    this.player = this.addCar();
    this.render();
  }
}

new Game();
