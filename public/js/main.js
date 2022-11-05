/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controllers/CameraController.js":
/*!*********************************************!*\
  !*** ./src/controllers/CameraController.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CameraController)\n/* harmony export */ });\nclass CameraController {\r\n  constructor(params) {\r\n    this._params = params;\r\n    this._camera = params.camera;\r\n\r\n    this._currentPosition = new THREE.Vector3();\r\n    this._currentLookat = new THREE.Vector3();\r\n  }\r\n\r\n  _CalculateIdealOffset() {\r\n    const idealOffset = new THREE.Vector3(-15, 20, -30);\r\n    idealOffset.applyQuaternion(this._params.target.rotation);\r\n    idealOffset.add(this._params.target.position);\r\n    return idealOffset;\r\n  }\r\n\r\n  _CalculateIdealLookat() {\r\n    const idealLookat = new THREE.Vector3(0, 10, 50);\r\n    idealLookat.applyQuaternion(this._params.target.rotation);\r\n    idealLookat.add(this._params.target.position);\r\n    return idealLookat;\r\n  }\r\n\r\n  Update(timeElapsed) {\r\n    const idealOffset = this._CalculateIdealOffset();\r\n    const idealLookat = this._CalculateIdealLookat();\r\n\r\n    // const t = 0.05;\r\n    // const t = 4.0 * timeElapsed;\r\n    const t = 1.0 - Math.pow(0.001, timeElapsed);\r\n\r\n    this._currentPosition.lerp(idealOffset, t);\r\n    this._currentLookat.lerp(idealLookat, t);\r\n\r\n    this._camera.position.copy(this._currentPosition);\r\n    this._camera.lookAt(this._currentLookat);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/CameraController.js?");

/***/ }),

/***/ "./src/controllers/addCar.js":
/*!***********************************!*\
  !*** ./src/controllers/addCar.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ addCar)\n/* harmony export */ });\nfunction addCar() {\r\n  var car = {};\r\n  car.score = 0;\r\n\r\n  ///frame\r\n  var bodyPosition = { x: 10, y: 3, z: 0 }; //car frame position\r\n  var carFrameGeometry = new THREE.BoxGeometry(2, 0.3, 0.3);\r\n  var carFrameMesh = new THREE.MeshStandardMaterial({ color: 0x333333 });\r\n  var carFrameMaterial = Physijs.createMaterial(carFrameMesh, 0.9, 0.9);\r\n  car.frame = new Physijs.BoxMesh(carFrameGeometry, carFrameMaterial, 100);\r\n  car.frame.name = \"frame\";\r\n  car.frame.componentOf = \"car\";\r\n  car.frame.position.set(bodyPosition.x, bodyPosition.y, bodyPosition.z);\r\n  car.frame.castShadow = true;\r\n\r\n  // ///interior (provides mass to body for collisions)\r\n  // var carInteriorGeometry = new THREE.BoxGeometry(33, 7, 11);\r\n  // var carInteriorMesh = new THREE.MeshStandardMaterial({ color: 0x777777 });\r\n  // var carInteriorMaterial = Physijs.createMaterial(carInteriorMesh, 50, 50);\r\n  // car.interior = new Physijs.BoxMesh(\r\n  //   carInteriorGeometry,\r\n  //   carInteriorMaterial,\r\n  //   5000\r\n  // );\r\n  // car.interior.name = \"interior\";\r\n  // car.interior.visible = true; //(if visible, edges stick out from rounded frame)\r\n  // car.interior.componentOf = \"car\";\r\n  // car.interior.position.set(0, 5.5, 0);\r\n  // car.frame.add(car.interior);\r\n\r\n  //Camera look at object\r\n\r\n  let sphereGeometry1 = new THREE.SphereGeometry(0.3, 30, 30);\r\n\r\n  // Sphere Material 1\r\n  let sphereMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });\r\n  // Sphere Mesh 1\r\n  let sphereMesh1 = new THREE.Mesh(sphereGeometry1, sphereMaterial1);\r\n  sphereMesh1.receiveShadow = true;\r\n  sphereMesh1.position.set(\r\n    bodyPosition.x - 11,\r\n    bodyPosition.y - 3,\r\n    bodyPosition.z\r\n  );\r\n\r\n  car.lookTarget = sphereMesh1;\r\n  car.frame.add(sphereMesh1);\r\n\r\n  //adds all static car parts to the scene as a single physical object\r\n  this.scene.add(car.frame);\r\n\r\n  ///wheels\r\n  var fr = 0.2; //wheel front radius\r\n  var br = 0.2; //wheel back radius\r\n  var wi = 0.2; //wheel width\r\n  var segments = 50; //wheel cylinder segments (pie slices)\r\n  var carWheelMaterialsArray = [];\r\n  var carWheelImage = \"./textures/ground.jpg\";\r\n  var carWheelGeometry = new THREE.CylinderGeometry(fr, br, wi, segments);\r\n\r\n  //wheel side & back material (color only, no image)\r\n  var carWheelColorBaseMaterial = new THREE.MeshLambertMaterial({\r\n    color: 0x000000,\r\n  });\r\n  var carWheelColorMaterial = Physijs.createMaterial(\r\n    carWheelColorBaseMaterial,\r\n    this.bwf,\r\n    this.bwr\r\n  );\r\n  carWheelMaterialsArray.push(carWheelColorMaterial); //(.materialindex = 0)\r\n\r\n  //wheel front material (wheel image)\r\n  var carWheelImageLoader = new THREE.TextureLoader();\r\n\r\n  carWheelImageLoader.load(carWheelImage, (texture) => {\r\n    var carWheelImageMaterial = Physijs.createMaterial(\r\n      new THREE.MeshBasicMaterial({ map: texture }),\r\n      this.bwf,\r\n      this.bwr\r\n    );\r\n    carWheelMaterialsArray.push(carWheelImageMaterial); //(.materialindex = 1)\r\n  });\r\n\r\n  //assigns each of the wheel's faces to a .materialindex\r\n  var carWheelFaceCount = carWheelGeometry.faces.length;\r\n  for (let i = 0; i < carWheelFaceCount; i++) {\r\n    //first set of faces makes up the wheel's tread\r\n    if (i < segments * 2) {\r\n      carWheelGeometry.faces[i].materialIndex = 0; //assigns color material index\r\n      //second set of faces makes up the wheel's outside\r\n    } else if (i < segments * 3) {\r\n      carWheelGeometry.faces[i].materialIndex = 1; //assigns image material index\r\n      //third set of faces makes up the wheel's inside\r\n    } else {\r\n      carWheelGeometry.faces[i].materialIndex = 0; //assigns color material index\r\n    }\r\n  }\r\n\r\n  //wheel creation & configuration as four physi.js objects\r\n  car.wheel_fl = new Physijs.CylinderMesh(\r\n    carWheelGeometry,\r\n    carWheelMaterialsArray,\r\n    300\r\n  );\r\n  car.wheel_fr = new Physijs.CylinderMesh(\r\n    carWheelGeometry,\r\n    carWheelMaterialsArray,\r\n    300\r\n  );\r\n  car.wheel_bl = new Physijs.CylinderMesh(\r\n    carWheelGeometry,\r\n    carWheelMaterialsArray,\r\n    300\r\n  );\r\n  car.wheel_br = new Physijs.CylinderMesh(\r\n    carWheelGeometry,\r\n    carWheelMaterialsArray,\r\n    300\r\n  );\r\n\r\n  var frontX, backX;\r\n\r\n  frontX = bodyPosition.x - 0.5;\r\n  backX = bodyPosition.x + 0.5;\r\n\r\n  this.configureWheel(\r\n    car.wheel_fl,\r\n    { x: frontX, y: 2.8, z: bodyPosition.z + 0.3 },\r\n    \"port\"\r\n  );\r\n  this.configureWheel(\r\n    car.wheel_fr,\r\n    { x: frontX, y: 2.8, z: bodyPosition.z - 0.3 },\r\n    \"starboard\"\r\n  );\r\n  this.configureWheel(\r\n    car.wheel_bl,\r\n    { x: backX, y: 2.8, z: bodyPosition.z + 0.3 },\r\n    \"port\"\r\n  );\r\n  this.configureWheel(\r\n    car.wheel_br,\r\n    { x: backX, y: 2.8, z: bodyPosition.z - 0.3 },\r\n    \"starboard\"\r\n  );\r\n\r\n  ///wheel constraints\r\n  var wheel_fl_constraint = new Physijs.DOFConstraint(\r\n    car.wheel_fl,\r\n    car.frame,\r\n    car.wheel_fl.position\r\n  );\r\n  var wheel_fr_constraint = new Physijs.DOFConstraint(\r\n    car.wheel_fr,\r\n    car.frame,\r\n    car.wheel_fr.position\r\n  );\r\n  var wheel_bl_constraint = new Physijs.DOFConstraint(\r\n    car.wheel_bl,\r\n    car.frame,\r\n    car.wheel_bl.position\r\n  );\r\n  var wheel_br_constraint = new Physijs.DOFConstraint(\r\n    car.wheel_br,\r\n    car.frame,\r\n    car.wheel_br.position\r\n  );\r\n\r\n  car.wheel_fl_constraint = this.configureWheelConstraints(wheel_fl_constraint);\r\n  car.wheel_fr_constraint = this.configureWheelConstraints(wheel_fr_constraint);\r\n  car.wheel_bl_constraint = this.configureWheelConstraints(wheel_bl_constraint);\r\n  car.wheel_br_constraint = this.configureWheelConstraints(wheel_br_constraint);\r\n  return car;\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/addCar.js?");

/***/ }),

/***/ "./src/controllers/configureWheel.js":
/*!*******************************************!*\
  !*** ./src/controllers/configureWheel.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ configureWheel)\n/* harmony export */ });\nfunction configureWheel(wheel, position, BusSide) {\r\n  wheel.name = \"wheel\";\r\n  wheel.componentOf = \"car\";\r\n\r\n  BusSide === \"port\"\r\n    ? (wheel.rotation.x = Math.PI / 2)\r\n    : (wheel.rotation.x = -Math.PI / 2);\r\n  wheel.position.set(position.x, position.y, position.z);\r\n  wheel.setDamping(0.5, 0.5);\r\n  wheel.castShadow = true;\r\n  this.scene.add(wheel);\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/configureWheel.js?");

/***/ }),

/***/ "./src/controllers/configureWheelConstraints.js":
/*!******************************************************!*\
  !*** ./src/controllers/configureWheelConstraints.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ configureWheelConstraints)\n/* harmony export */ });\nfunction configureWheelConstraints(constraint) {\r\n  this.scene.addConstraint(constraint);\r\n  constraint.setAngularLowerLimit({ x: 0, y: 0, z: 1 });\r\n  constraint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });\r\n  return constraint;\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/configureWheelConstraints.js?");

/***/ }),

/***/ "./src/controllers/handleCamera.js":
/*!*****************************************!*\
  !*** ./src/controllers/handleCamera.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handleCamera)\n/* harmony export */ });\n/* harmony import */ var _CameraController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CameraController */ \"./src/controllers/CameraController.js\");\n\r\n\r\nfunction handleCamera() {\r\n  let car = this.player;\r\n  let playerPos = car.frame.position;\r\n  var lookTargetPos = new THREE.Vector3();\r\n  car.lookTarget.getWorldPosition(lookTargetPos);\r\n  var relativeCameraOffset = new THREE.Vector3(20, 5, 0);\r\n  var cameraOffset = relativeCameraOffset.applyMatrix4(car.frame.matrixWorld);\r\n  this.camera.position.x = cameraOffset.x;\r\n  this.camera.position.y = cameraOffset.y;\r\n  this.camera.position.z = cameraOffset.z;\r\n  this.camera.lookAt(lookTargetPos.x, lookTargetPos.y + 1, lookTargetPos.z);\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/handleCamera.js?");

/***/ }),

/***/ "./src/controllers/handleKeyDown.js":
/*!******************************************!*\
  !*** ./src/controllers/handleKeyDown.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handleKeyDown)\n/* harmony export */ });\nfunction handleKeyDown(keyEvent) {\r\n  let car = this.player;\r\n\r\n  switch (keyEvent.keyCode) {\r\n    // BUS 1\r\n    // pivots wheels for steering\r\n    case 65:\r\n    case 37: // \"a\" key or left arrow key (turn left)\r\n      car.wheel_fr_constraint.configureAngularMotor(\r\n        1,\r\n        -Math.PI / 4,\r\n        Math.PI / 4,\r\n        10,\r\n        200\r\n      );\r\n      car.wheel_fr_constraint.enableAngularMotor(1);\r\n      car.wheel_fl_constraint.configureAngularMotor(\r\n        1,\r\n        -Math.PI / 4,\r\n        Math.PI / 4,\r\n        10,\r\n        200\r\n      );\r\n      car.wheel_fl_constraint.enableAngularMotor(1);\r\n      break;\r\n    case 68:\r\n    case 39: // \"d\" key  or right arrow key (turn right)\r\n      car.wheel_fr_constraint.configureAngularMotor(\r\n        1,\r\n        -Math.PI / 4,\r\n        Math.PI / 4,\r\n        -10,\r\n        200\r\n      );\r\n      car.wheel_fr_constraint.enableAngularMotor(1);\r\n      car.wheel_fl_constraint.configureAngularMotor(\r\n        1,\r\n        -Math.PI / 4,\r\n        Math.PI / 4,\r\n        -10,\r\n        200\r\n      );\r\n      car.wheel_fl_constraint.enableAngularMotor(1);\r\n      break;\r\n    // rotates wheels for propulsion\r\n    case 87:\r\n    case 38: // \"w\" key or up arrow key (forward)\r\n      car.wheel_bl_constraint.configureAngularMotor(2, 1, 0, 30, 5000000);\r\n      car.wheel_bl_constraint.enableAngularMotor(2);\r\n      car.wheel_br_constraint.configureAngularMotor(2, 1, 0, 30, 5000000);\r\n      car.wheel_br_constraint.enableAngularMotor(2);\r\n      break;\r\n    case 83:\r\n    case 40: // \"s\" key or down arrow key (backward)\r\n      car.wheel_bl_constraint.configureAngularMotor(2, 1, 0, -20, 3500);\r\n      car.wheel_bl_constraint.enableAngularMotor(2);\r\n      car.wheel_br_constraint.configureAngularMotor(2, 1, 0, -20, 3500);\r\n      car.wheel_br_constraint.enableAngularMotor(2);\r\n      break;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/handleKeyDown.js?");

/***/ }),

/***/ "./src/controllers/handleKeyUp.js":
/*!****************************************!*\
  !*** ./src/controllers/handleKeyUp.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handleKeyUp)\n/* harmony export */ });\nfunction handleKeyUp(keyEvent) {\r\n  let car = this.player;\r\n\r\n  console.log(\"keyup\");\r\n  switch (keyEvent.keyCode) {\r\n    // BUS 1\r\n    //sets front wheels straight again\r\n    case 65:\r\n    case 68:\r\n    case 37:\r\n    case 39:\r\n      car.wheel_fr_constraint.configureAngularMotor(1, 0, 0, 10, 200);\r\n      car.wheel_fr_constraint.enableAngularMotor(1);\r\n      car.wheel_fl_constraint.configureAngularMotor(1, 0, 0, 10, 200);\r\n      car.wheel_fl_constraint.enableAngularMotor(1);\r\n      break;\r\n    //stops back wheel rotation\r\n    case 87:\r\n    case 83:\r\n    case 38:\r\n    case 40:\r\n      car.wheel_bl_constraint.configureAngularMotor(2, 0, 0, 0, 2000);\r\n      car.wheel_bl_constraint.enableAngularMotor(2);\r\n      car.wheel_br_constraint.configureAngularMotor(2, 0, 0, 0, 2000);\r\n      car.wheel_br_constraint.enableAngularMotor(2);\r\n      break;\r\n    // BUS 2\r\n    //sets front wheels straight again\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/handleKeyUp.js?");

/***/ }),

/***/ "./src/controllers/render.js":
/*!***********************************!*\
  !*** ./src/controllers/render.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ render)\n/* harmony export */ });\nfunction render() {\r\n  // if (this.roundActive === true) {\r\n  //   checkForMatchCompletion();\r\n  // }\r\n  this.scene.simulate();\r\n\r\n  this.handleCamera();\r\n  //camera.lookAt( busArray[0].frame.position );\r\n  this.camera.updateProjectionMatrix();\r\n  this.renderer.render(this.scene, this.camera);\r\n  requestAnimationFrame(this.render);\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/render.js?");

/***/ }),

/***/ "./src/controllers/setupNightCity":
/*!****************************************!*\
  !*** ./src/controllers/setupNightCity ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction setupNightCity() {\r\n  var scene = this.scene;\r\n  var city = new THREE.Object3D();\r\n  var smoke = new THREE.Object3D();\r\n  var town = new THREE.Object3D();\r\n\r\n  //----------------------------------------------------------------- FOG background\r\n\r\n  var setcolor = 0xf02050;\r\n  //var setcolor = 0xF2F111;\r\n  //var setcolor = 0xFF6347;\r\n\r\n  scene.background = new THREE.Color(setcolor);\r\n  // scene.fog = new THREE.Fog(setcolor, 10, 16);\r\n\r\n  //----------------------------------------------------------------- RANDOM Function\r\n  function mathRandom(num = 8) {\r\n    var numValue = -Math.random() * num + Math.random() * num;\r\n    return numValue;\r\n  }\r\n  //----------------------------------------------------------------- CHANGE bluilding colors\r\n  var setTintNum = true;\r\n  function setTintColor() {\r\n    if (setTintNum) {\r\n      setTintNum = false;\r\n      var setColor = 0x000000;\r\n    } else {\r\n      setTintNum = true;\r\n      var setColor = 0x000000;\r\n    }\r\n    //setColor = 0x222222;\r\n    return setColor;\r\n  }\r\n\r\n  //----------------------------------------------------------------- CREATE City\r\n\r\n  function init() {\r\n    var segments = 2;\r\n    for (var i = 1; i < 100; i++) {\r\n      var geometry = new THREE.CubeGeometry(\r\n        1,\r\n        0,\r\n        0,\r\n        segments,\r\n        segments,\r\n        segments\r\n      );\r\n      var material = new THREE.MeshStandardMaterial({\r\n        color: setTintColor(),\r\n        wireframe: false,\r\n        //opacity:0.9,\r\n        //transparent:true,\r\n        //roughness: 0.3,\r\n        //metalness: 1,\r\n        shading: THREE.SmoothShading,\r\n        //shading:THREE.FlatShading,\r\n        side: THREE.DoubleSide,\r\n      });\r\n      var wmaterial = new THREE.MeshLambertMaterial({\r\n        color: 0xffffff,\r\n        wireframe: true,\r\n        transparent: true,\r\n        opacity: 0.03,\r\n        side: THREE.DoubleSide /*,\r\n      shading:THREE.FlatShading*/,\r\n      });\r\n\r\n      var cube = new THREE.Mesh(geometry, material);\r\n      var wire = new THREE.Mesh(geometry, wmaterial);\r\n      var floor = new THREE.Mesh(geometry, material);\r\n      var wfloor = new THREE.Mesh(geometry, wmaterial);\r\n\r\n      cube.add(wfloor);\r\n      cube.castShadow = true;\r\n      cube.receiveShadow = true;\r\n      cube.rotationValue = 0.1 + Math.abs(mathRandom(8));\r\n\r\n      //floor.scale.x = floor.scale.z = 1+mathRandom(0.33);\r\n      floor.scale.y = 0.05; //+mathRandom(0.5);\r\n      cube.scale.y = 0.1 + Math.abs(mathRandom(8));\r\n      //TweenMax.to(cube.scale, 1, {y:cube.rotationValue, repeat:-1, yoyo:true, delay:i*0.005, ease:Power1.easeInOut});\r\n      /*cube.setScale = 0.1+Math.abs(mathRandom());\r\n    \r\n    TweenMax.to(cube.scale, 4, {y:cube.setScale, ease:Elastic.easeInOut, delay:0.2*i, yoyo:true, repeat:-1});\r\n    TweenMax.to(cube.position, 4, {y:cube.setScale / 2, ease:Elastic.easeInOut, delay:0.2*i, yoyo:true, repeat:-1});*/\r\n\r\n      var cubeWidth = 0.9;\r\n      cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);\r\n      //cube.position.y = cube.scale.y / 2;\r\n      cube.position.x = Math.round(mathRandom());\r\n      cube.position.z = Math.round(mathRandom());\r\n\r\n      floor.position.set(\r\n        cube.position.x,\r\n        0 /*floor.scale.y / 2*/,\r\n        cube.position.z\r\n      );\r\n\r\n      town.add(floor);\r\n      town.add(cube);\r\n    }\r\n    //----------------------------------------------------------------- Particular\r\n\r\n    var gmaterial = new THREE.MeshToonMaterial({\r\n      color: 0xffff00,\r\n      side: THREE.DoubleSide,\r\n    });\r\n    var gparticular = new THREE.CircleGeometry(0.01, 3);\r\n    var aparticular = 5;\r\n\r\n    for (var h = 1; h < 300; h++) {\r\n      var particular = new THREE.Mesh(gparticular, gmaterial);\r\n      particular.position.set(\r\n        mathRandom(aparticular),\r\n        mathRandom(aparticular),\r\n        mathRandom(aparticular)\r\n      );\r\n      particular.rotation.set(mathRandom(), mathRandom(), mathRandom());\r\n      smoke.add(particular);\r\n    }\r\n\r\n    var pmaterial = new THREE.MeshPhongMaterial({\r\n      color: 0x000000,\r\n      side: THREE.DoubleSide,\r\n      roughness: 10,\r\n      metalness: 0.6,\r\n      opacity: 0.9,\r\n      transparent: true,\r\n    });\r\n\r\n    var pgeometry = new THREE.PlaneGeometry(60, 60);\r\n    var pelement = new Physijs.BoxMesh(pgeometry, pmaterial);\r\n    pelement.rotation.x = (-90 * Math.PI) / 180;\r\n    pelement.position.y = -0.001;\r\n    pelement.receiveShadow = true;\r\n    //pelement.material.emissive.setHex(0xFFFFFF + Math.random() * 100000);\r\n\r\n    scene.add(pelement);\r\n  }\r\n\r\n  //----------------------------------------------------------------- Lights\r\n  var ambientLight = new THREE.AmbientLight(0xffffff, 4);\r\n  var lightFront = new THREE.SpotLight(0xffffff, 20, 10);\r\n  var lightBack = new THREE.PointLight(0xffffff, 0.5);\r\n\r\n  var spotLightHelper = new THREE.SpotLightHelper(lightFront);\r\n  //scene.add( spotLightHelper );\r\n\r\n  lightFront.rotation.x = (45 * Math.PI) / 180;\r\n  lightFront.rotation.z = (-45 * Math.PI) / 180;\r\n  lightFront.position.set(5, 5, 5);\r\n  lightFront.castShadow = true;\r\n  lightFront.shadow.mapSize.width = 6000;\r\n  lightFront.shadow.mapSize.height = lightFront.shadow.mapSize.width;\r\n  lightFront.penumbra = 0.1;\r\n  lightBack.position.set(0, 6, 0);\r\n\r\n  smoke.position.y = 2;\r\n\r\n  scene.add(ambientLight);\r\n  city.add(lightFront);\r\n  scene.add(lightBack);\r\n  scene.add(city);\r\n  city.add(smoke);\r\n  city.add(town);\r\n\r\n  //----------------------------------------------------------------- GRID Helper\r\n  var gridHelper = new THREE.GridHelper(60, 120, 0xff0000, 0x000000);\r\n  city.add(gridHelper);\r\n\r\n  //----------------------------------------------------------------- LINES world\r\n\r\n  init();\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupNightCity);\r\n\n\n//# sourceURL=webpack://y/./src/controllers/setupNightCity?");

/***/ }),

/***/ "./src/controllers/setupScene.js":
/*!***************************************!*\
  !*** ./src/controllers/setupScene.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setupScene)\n/* harmony export */ });\nfunction setupScene() {\r\n  ///physi.js scene\r\n  this.scene = new Physijs.Scene();\r\n  this.scene.setGravity(new THREE.Vector3(0, -50, 0));\r\n\r\n  ///background\r\n  this.renderer.setClearColor(this.backgroundColor, 1);\r\n\r\n  ///camera\r\n  this.camera = new THREE.PerspectiveCamera(\r\n    35,\r\n    window.innerWidth / window.innerHeight,\r\n    1,\r\n    10000\r\n  );\r\n  this.camera.position.set(0, 20, 60);\r\n  this.camera.zoom = 3;\r\n  this.scene.add(this.camera);\r\n\r\n  ///lighting & shadows\r\n  var lightA1 = new THREE.AmbientLight(0xffffff, 0.85);\r\n  this.scene.add(lightA1);\r\n  var lightD1 = new THREE.DirectionalLight(0xffffff, 0.3);\r\n  lightD1.position.set(-20, 100, 20);\r\n  lightD1.castShadow = true;\r\n  lightD1.shadow.camera.left = -100;\r\n  lightD1.shadow.camera.top = -100;\r\n  lightD1.shadow.camera.right = 100;\r\n  lightD1.shadow.camera.bottom = 100;\r\n  lightD1.shadow.camera.near = 1;\r\n  lightD1.shadow.camera.far = 130;\r\n  lightD1.shadow.mapSize.height = lightD1.shadow.mapSize.width = 1000;\r\n  this.scene.add(lightD1);\r\n  this.renderer.shadowMap.enabled = true;\r\n  this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;\r\n\r\n  ///platform\r\n  var platform;\r\n  var platformDiameter = 170;\r\n  var platformRadiusTop = platformDiameter * 0.5;\r\n  var platformRadiusBottom = platformDiameter * 0.5 + 0.2;\r\n  var platformHeight = 1;\r\n  var platformSegments = 85;\r\n\r\n  var platformGeometry = new THREE.CylinderGeometry(\r\n    platformRadiusTop,\r\n    platformRadiusBottom,\r\n    platformHeight,\r\n    platformSegments\r\n  );\r\n\r\n  //physi.js platform (invisible; provides structure) (separating three.js & physi.js improves peformance)\r\n  var physiPlatformMaterial = Physijs.createMaterial(\r\n    new THREE.MeshLambertMaterial(),\r\n    this.pf,\r\n    this.pr\r\n  );\r\n  var physiPlatform = new Physijs.CylinderMesh(\r\n    platformGeometry,\r\n    physiPlatformMaterial,\r\n    0\r\n  );\r\n  physiPlatform.name = \"physicalPlatform\";\r\n  physiPlatform.position.set(0, -0.5, 0);\r\n  physiPlatform.visible = true;\r\n  this.scene.add(physiPlatform);\r\n}\r\n\n\n//# sourceURL=webpack://y/./src/controllers/setupScene.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_addCar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/addCar */ \"./src/controllers/addCar.js\");\n/* harmony import */ var _controllers_configureWheel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/configureWheel */ \"./src/controllers/configureWheel.js\");\n/* harmony import */ var _controllers_configureWheelConstraints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/configureWheelConstraints */ \"./src/controllers/configureWheelConstraints.js\");\n/* harmony import */ var _controllers_handleCamera__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controllers/handleCamera */ \"./src/controllers/handleCamera.js\");\n/* harmony import */ var _controllers_handleKeyDown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controllers/handleKeyDown */ \"./src/controllers/handleKeyDown.js\");\n/* harmony import */ var _controllers_handleKeyUp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controllers/handleKeyUp */ \"./src/controllers/handleKeyUp.js\");\n/* harmony import */ var _controllers_render__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controllers/render */ \"./src/controllers/render.js\");\n/* harmony import */ var _controllers_setupNightCity__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controllers/setupNightCity */ \"./src/controllers/setupNightCity\");\n/* harmony import */ var _controllers_setupScene__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controllers/setupScene */ \"./src/controllers/setupScene.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Game {\r\n  constructor() {\r\n    Physijs.scripts.worker = \"/js/physijs_worker.js\";\r\n    Physijs.scripts.ammo = \"/js/ammo.js\";\r\n\r\n    /////---Settings---/////\r\n    this.bwf = 3.5; //bus wheel friction\r\n    this.bwr = 0; //bus wheel restitution\r\n    this.pf = 4.2; //platform friction\r\n    this.pr = 0; //platform restitution\r\n    this.backgroundColor = 0xcdd3d6;\r\n\r\n    /////---Initiation---/////\r\n    this.busArray = [];\r\n    this.Player1 = { name: \"gretchen\", score: 0 };\r\n    this.Player2 = { name: \"bertha\", score: 0 };\r\n    this.roundActive = false;\r\n    this.scene = null;\r\n    this.environment = null;\r\n    this.camera = null;\r\n    ///Renderer\r\n    this.renderer = new THREE.WebGLRenderer({ antialias: true });\r\n    this.renderer.setSize(window.innerWidth, window.innerHeight);\r\n    document.body.appendChild(this.renderer.domElement);\r\n\r\n    this.setupScene = _controllers_setupScene__WEBPACK_IMPORTED_MODULE_8__[\"default\"].bind(this);\r\n    this.setupNightCity = _controllers_setupNightCity__WEBPACK_IMPORTED_MODULE_7__[\"default\"].bind(this);\r\n    this.configureWheel = _controllers_configureWheel__WEBPACK_IMPORTED_MODULE_1__[\"default\"].bind(this);\r\n    this.configureWheelConstraints = _controllers_configureWheelConstraints__WEBPACK_IMPORTED_MODULE_2__[\"default\"].bind(this);\r\n    this.render = _controllers_render__WEBPACK_IMPORTED_MODULE_6__[\"default\"].bind(this);\r\n    this.addCar = _controllers_addCar__WEBPACK_IMPORTED_MODULE_0__[\"default\"].bind(this);\r\n    this.handleKeyDown = _controllers_handleKeyDown__WEBPACK_IMPORTED_MODULE_4__[\"default\"].bind(this);\r\n    this.handleKeyUp = _controllers_handleKeyUp__WEBPACK_IMPORTED_MODULE_5__[\"default\"].bind(this);\r\n\r\n    document.onkeydown = this.handleKeyDown;\r\n    document.onkeyup = this.handleKeyUp;\r\n\r\n    this.handleCamera = _controllers_handleCamera__WEBPACK_IMPORTED_MODULE_3__[\"default\"].bind(this);\r\n\r\n    this.setupScene();\r\n    this.setupNightCity();\r\n    this.player = this.addCar();\r\n    this.render();\r\n  }\r\n}\r\n\r\nnew Game();\r\n\n\n//# sourceURL=webpack://y/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;