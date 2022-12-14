import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function setupScene() {
  this.scene = new THREE.Scene();
  this.scene.background = new THREE.Color(0, 0, 0);
  this.camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  this.camera.position.set(0, 15, -50);
  this.camera.lookAt(new THREE.Vector3(0, 0, 0));

  this.renderer = new THREE.WebGLRenderer({ antialias: true });
  this.renderer.outputEncoding = THREE.sRGBEncoding;
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  this.renderer.autoClear = false;
  document.body.appendChild(this.renderer.domElement);
  this.defaultPixelRatio = this.renderer.getPixelRatio();

  if (this.enableDebugger) {
    const axesHelper = new THREE.AxesHelper(8);
    this.scene.add(axesHelper);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  setupCannon.call(this);
  addLights.call(this);
}

function setupCannon() {
  this.physicsUpdate = physicsUpdate.bind(this);

  const physicsWorld = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
  });

  this.physicsWorld = physicsWorld;
  this.fixedTimeStep = 1.0 / 60.0;
  this.damping = 0.01;

  physicsWorld.broadphase = new CANNON.NaiveBroadphase();

  const groundShape = new CANNON.Plane();
  const groundBoxShape = new CANNON.Box(new CANNON.Vec3(25, 0.2, 25));
  const groundMaterial = new CANNON.Material();
  this.groundMaterial = groundMaterial;
  const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
  // groundBody.quaternion.setFromAxisAngle(
  //   new CANNON.Vec3(1, 0, 0),
  //   -Math.PI / 2
  // );
  groundBody.addShape(groundBoxShape);
  physicsWorld.addBody(groundBody);

  // this.addVisualToCannonBody(groundBody, "ground", false, true);

  if (this.enableDebugger) {
    const cannonDebugger = new CannonDebugger(this.scene, physicsWorld);
    this.cannonDebugger = cannonDebugger;
  }
}

function physicsUpdate() {
  this.physicsWorld.fixedStep();

  this.physicsWorld.step(this.fixedTimeStep);

  updateBodies(this.physicsWorld);

  if (this.enableDebugger) {
    this.cannonDebugger.update();
  }
}

function updateBodies(world) {
  world.bodies.forEach(function (body) {
    if (body.threeMesh != undefined) {
      body.threeMesh.position.copy(body.position);
      body.threeMesh.quaternion.copy(body.quaternion);
    }
  });
}

function addLights() {
  this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  const ambient = new THREE.AmbientLight(0xaaaaaa, 0.1);
  this.scene.add(ambient);

  let hemiLight = new THREE.HemisphereLight(0xffc6b5, 0xffc6b5, 0.5);
  this.scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xaaaaaa, 2);
  dirLight.position.set(30, 100, 40);
  dirLight.target.position.set(0, 0, 0);

  dirLight.castShadow = true;

  const lightSize = 30;
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 500;
  dirLight.shadow.camera.left = dirLight.shadow.camera.bottom = -lightSize;
  dirLight.shadow.camera.right = dirLight.shadow.camera.top = lightSize;

  dirLight.shadow.bias = 0.0039;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;

  // this.sun = dirLight;
  // this.scene.add(dirLight);

  let pointLight = new THREE.SpotLight(0xffc6b5, 0.1);
  pointLight.position.set(-50, 50, 50);
  pointLight.castShadow = true;
  this.scene.add(pointLight);

  // pointLight.shadow.bias = -0.0001;
  // pointLight.shadow.mapSize.width = 1024 * 4;
  // pointLight.shadow.mapSize.height = 1024 * 4;
}
