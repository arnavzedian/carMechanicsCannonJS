export default function setupScene() {
  ///physi.js scene
  this.scene = new Physijs.Scene();
  this.scene.setGravity(new THREE.Vector3(0, -50, 0));

  ///background
  this.renderer.setClearColor(this.backgroundColor, 1);

  ///camera
  this.camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  this.camera.position.set(0, 20, 60);
  this.camera.zoom = 3;
  this.scene.add(this.camera);

  ///lighting & shadows
  var lightA1 = new THREE.AmbientLight(0xffffff, 0.85);
  this.scene.add(lightA1);
  var lightD1 = new THREE.DirectionalLight(0xffffff, 0.3);
  lightD1.position.set(-20, 100, 20);
  lightD1.castShadow = true;
  lightD1.shadow.camera.left = -100;
  lightD1.shadow.camera.top = -100;
  lightD1.shadow.camera.right = 100;
  lightD1.shadow.camera.bottom = 100;
  lightD1.shadow.camera.near = 1;
  lightD1.shadow.camera.far = 130;
  lightD1.shadow.mapSize.height = lightD1.shadow.mapSize.width = 1000;
  this.scene.add(lightD1);
  this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  ///platform
  var platform;
  var platformDiameter = 170;
  var platformRadiusTop = platformDiameter * 0.5;
  var platformRadiusBottom = platformDiameter * 0.5 + 0.2;
  var platformHeight = 1;
  var platformSegments = 85;

  var platformGeometry = new THREE.CylinderGeometry(
    platformRadiusTop,
    platformRadiusBottom,
    platformHeight,
    platformSegments
  );

  //physi.js platform (invisible; provides structure) (separating three.js & physi.js improves peformance)
  var physiPlatformMaterial = Physijs.createMaterial(
    new THREE.MeshLambertMaterial(),
    this.pf,
    this.pr
  );
  var physiPlatform = new Physijs.CylinderMesh(
    platformGeometry,
    physiPlatformMaterial,
    0
  );
  physiPlatform.name = "physicalPlatform";
  physiPlatform.position.set(0, -0.5, 0);
  physiPlatform.visible = true;
  this.scene.add(physiPlatform);
}
