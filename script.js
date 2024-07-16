import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x262626);

// Create a camera and positions it
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// adds the renderer to the html document
const container = document.querySelector("#container");
container.append(renderer.domElement);
// tells the renderer to support shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Create a directional light
const directionalLight = new THREE.SpotLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 100;
scene.add(directionalLight);

// adds helper to see the light source position
const helper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(helper);

// camera controller
let cameraControls = new OrbitControls(camera, container);
cameraControls.addEventListener("mousemove", renderer);
cameraControls.autoRotate = true;

// soft white light to view all objects
const light = new THREE.AmbientLight(0x404040);
scene.add(light);

// Loads textures
const textureLoader = new THREE.TextureLoader();
const texture1 = textureLoader.load("./minions1.jpg");
const texture2 = textureLoader.load("./minions2.jpg");
const texture3 = textureLoader.load("./star1.jpg");
const texture4 = textureLoader.load("./ducks.jpg");

// materials for the face of the cube
const cubeMaterials = [
  new THREE.MeshBasicMaterial({ map: texture2 }),
  new THREE.MeshBasicMaterial({ map: texture3 }),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
  new THREE.MeshBasicMaterial({ map: texture1 }),
  new THREE.MeshBasicMaterial({ map: texture4 }),
];

//Creates a simple box geometry
const cubeGeometry = new THREE.BoxGeometry(5, 3, 5);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);

// makes cube to support shadow
cube.castShadow = true;
cube.receiveShadow = true;

// adds cube to the scene
scene.add(cube);

// positioning camera
camera.position.z = 8;

// creating a plane
const planeGeometry = new THREE.BoxGeometry(10, 0.2, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xdedede });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -4;

// adds plane support for shadow
plane.receiveShadow = true;
scene.add(plane);

// Rendering animation loop
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  cameraControls.update();
  renderer.render(scene, camera);
}

animate();
