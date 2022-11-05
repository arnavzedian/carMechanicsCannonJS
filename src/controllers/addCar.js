export default function addCar() {
  var car = {};
  car.score = 0;

  ///frame
  var bodyPosition = { x: 10, y: 3, z: 0 }; //car frame position
  var carFrameGeometry = new THREE.BoxGeometry(2, 0.3, 0.3);
  var carFrameMesh = new THREE.MeshStandardMaterial({ color: 0x333333 });
  var carFrameMaterial = Physijs.createMaterial(carFrameMesh, 0.9, 0.9);
  car.frame = new Physijs.BoxMesh(carFrameGeometry, carFrameMaterial, 100);
  car.frame.name = "frame";
  car.frame.componentOf = "car";
  car.frame.position.set(bodyPosition.x, bodyPosition.y, bodyPosition.z);
  car.frame.castShadow = true;

  // ///interior (provides mass to body for collisions)
  // var carInteriorGeometry = new THREE.BoxGeometry(33, 7, 11);
  // var carInteriorMesh = new THREE.MeshStandardMaterial({ color: 0x777777 });
  // var carInteriorMaterial = Physijs.createMaterial(carInteriorMesh, 50, 50);
  // car.interior = new Physijs.BoxMesh(
  //   carInteriorGeometry,
  //   carInteriorMaterial,
  //   5000
  // );
  // car.interior.name = "interior";
  // car.interior.visible = true; //(if visible, edges stick out from rounded frame)
  // car.interior.componentOf = "car";
  // car.interior.position.set(0, 5.5, 0);
  // car.frame.add(car.interior);

  //Camera look at object

  let sphereGeometry1 = new THREE.SphereGeometry(0.3, 30, 30);

  // Sphere Material 1
  let sphereMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  // Sphere Mesh 1
  let sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);
  sphereMesh1.receiveShadow = true;
  sphereMesh1.position.set(
    bodyPosition.x - 11,
    bodyPosition.y - 3,
    bodyPosition.z
  );

  car.lookTarget = sphereMesh1;
  car.frame.add(sphereMesh1);

  //adds all static car parts to the scene as a single physical object
  this.scene.add(car.frame);

  ///wheels
  var fr = 0.2; //wheel front radius
  var br = 0.2; //wheel back radius
  var wi = 0.2; //wheel width
  var segments = 50; //wheel cylinder segments (pie slices)
  var carWheelMaterialsArray = [];
  var carWheelImage = "./textures/ground.jpg";
  var carWheelGeometry = new THREE.CylinderGeometry(fr, br, wi, segments);

  //wheel side & back material (color only, no image)
  var carWheelColorBaseMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000,
  });
  var carWheelColorMaterial = Physijs.createMaterial(
    carWheelColorBaseMaterial,
    this.bwf,
    this.bwr
  );
  carWheelMaterialsArray.push(carWheelColorMaterial); //(.materialindex = 0)

  //wheel front material (wheel image)
  var carWheelImageLoader = new THREE.TextureLoader();

  carWheelImageLoader.load(carWheelImage, (texture) => {
    var carWheelImageMaterial = Physijs.createMaterial(
      new THREE.MeshBasicMaterial({ map: texture }),
      this.bwf,
      this.bwr
    );
    carWheelMaterialsArray.push(carWheelImageMaterial); //(.materialindex = 1)
  });

  //assigns each of the wheel's faces to a .materialindex
  var carWheelFaceCount = carWheelGeometry.faces.length;
  for (let i = 0; i < carWheelFaceCount; i++) {
    //first set of faces makes up the wheel's tread
    if (i < segments * 2) {
      carWheelGeometry.faces[i].materialIndex = 0; //assigns color material index
      //second set of faces makes up the wheel's outside
    } else if (i < segments * 3) {
      carWheelGeometry.faces[i].materialIndex = 1; //assigns image material index
      //third set of faces makes up the wheel's inside
    } else {
      carWheelGeometry.faces[i].materialIndex = 0; //assigns color material index
    }
  }

  //wheel creation & configuration as four physi.js objects
  car.wheel_fl = new Physijs.CylinderMesh(
    carWheelGeometry,
    carWheelMaterialsArray,
    300
  );
  car.wheel_fr = new Physijs.CylinderMesh(
    carWheelGeometry,
    carWheelMaterialsArray,
    300
  );
  car.wheel_bl = new Physijs.CylinderMesh(
    carWheelGeometry,
    carWheelMaterialsArray,
    300
  );
  car.wheel_br = new Physijs.CylinderMesh(
    carWheelGeometry,
    carWheelMaterialsArray,
    300
  );

  var frontX, backX;

  frontX = bodyPosition.x - 0.5;
  backX = bodyPosition.x + 0.5;

  this.configureWheel(
    car.wheel_fl,
    { x: frontX, y: 2.8, z: bodyPosition.z + 0.3 },
    "port"
  );
  this.configureWheel(
    car.wheel_fr,
    { x: frontX, y: 2.8, z: bodyPosition.z - 0.3 },
    "starboard"
  );
  this.configureWheel(
    car.wheel_bl,
    { x: backX, y: 2.8, z: bodyPosition.z + 0.3 },
    "port"
  );
  this.configureWheel(
    car.wheel_br,
    { x: backX, y: 2.8, z: bodyPosition.z - 0.3 },
    "starboard"
  );

  ///wheel constraints
  var wheel_fl_constraint = new Physijs.DOFConstraint(
    car.wheel_fl,
    car.frame,
    car.wheel_fl.position
  );
  var wheel_fr_constraint = new Physijs.DOFConstraint(
    car.wheel_fr,
    car.frame,
    car.wheel_fr.position
  );
  var wheel_bl_constraint = new Physijs.DOFConstraint(
    car.wheel_bl,
    car.frame,
    car.wheel_bl.position
  );
  var wheel_br_constraint = new Physijs.DOFConstraint(
    car.wheel_br,
    car.frame,
    car.wheel_br.position
  );

  car.wheel_fl_constraint = this.configureWheelConstraints(wheel_fl_constraint);
  car.wheel_fr_constraint = this.configureWheelConstraints(wheel_fr_constraint);
  car.wheel_bl_constraint = this.configureWheelConstraints(wheel_bl_constraint);
  car.wheel_br_constraint = this.configureWheelConstraints(wheel_br_constraint);
  return car;
}
