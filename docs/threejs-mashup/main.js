import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05070d);
scene.fog = new THREE.Fog(0x05070d, 12, 28);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 4.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

document.body.appendChild(renderer.domElement);

const overlay = document.createElement('div');
overlay.textContent = 'Click to start the music & animation';
overlay.style.position = 'absolute';
overlay.style.inset = '0';
overlay.style.display = 'grid';
overlay.style.placeItems = 'center';
overlay.style.backdropFilter = 'blur(6px)';
overlay.style.background = 'rgba(6, 7, 13, 0.62)';
overlay.style.letterSpacing = '0.08em';
overlay.style.fontSize = 'clamp(1.2rem, 2vw + 0.5rem, 2rem)';
overlay.style.fontWeight = '600';
overlay.style.textTransform = 'uppercase';
overlay.style.cursor = 'pointer';
overlay.style.zIndex = '2';
document.body.appendChild(overlay);

document.body.style.height = '100vh';
document.body.style.position = 'relative';
renderer.domElement.style.display = 'block';
renderer.domElement.style.width = '100vw';
renderer.domElement.style.height = '100vh';
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.inset = '0';

const hemiLight = new THREE.HemisphereLight(0x8fd2ff, 0x1f2333, 0.8);
hemiLight.position.set(0, 4, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xfff3c0, 1.1);
dirLight.position.set(3, 5, 4);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(1024, 1024);
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 20;
scene.add(dirLight);

const ambient = new THREE.AmbientLight(0x22304a, 0.35);
scene.add(ambient);

const floorGeometry = new THREE.PlaneGeometry(40, 40);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x0d111f,
  roughness: 0.9,
  metalness: 0.1
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.5;
floor.receiveShadow = true;
scene.add(floor);

const grid = new THREE.GridHelper(40, 40, 0x2e3b61, 0x10162a);
grid.position.y = -0.499;
grid.material.transparent = true;
grid.material.opacity = 0.4;
scene.add(grid);

const cubeGeometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);
const cubeMaterial = new THREE.MeshPhongMaterial({
  color: 0x6c9ff0,
  shininess: 80,
  emissive: 0x122d52,
  specular: 0x95c4ff
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-1.3, 0.15, 0);
cube.castShadow = true;
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(0.55, 64, 64);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: 0xff8c42,
  shininess: 60,
  emissive: 0x271408,
  specular: 0xffb783
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(1.35, 0.2, 0);
sphere.castShadow = true;
scene.add(sphere);

const torusGeometry = new THREE.TorusKnotGeometry(0.45, 0.15, 128, 32, 2, 5);
const torusMaterial = new THREE.MeshStandardMaterial({
  color: 0x9c6dff,
  metalness: 0.7,
  roughness: 0.2,
  emissive: 0x1d1133,
  emissiveIntensity: 0.4
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 0.35, -1.5);
torus.castShadow = true;
scene.add(torus);

let duck;
const loader = new GLTFLoader();
loader.load(
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf',
  (gltf) => {
    duck = gltf.scene;
    duck.scale.setScalar(0.012);
    duck.position.set(0, 0.1, 0);
    duck.rotation.y = Math.PI / 8;
    duck.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material && child.material.map) {
          child.material.map.anisotropy = 8;
        }
      }
    });
    scene.add(duck);
  },
  undefined,
  (error) => {
    console.error('Failed to load duck model:', error);
  }
);

let audioContext;
let analyser;
let frequencyData;
let audioElement;
let audioVolume = 0;
let audioActive = false;

const startAudio = async () => {
  if (audioActive) {
    return;
  }

  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  const bufferLength = analyser.frequencyBinCount;
  frequencyData = new Uint8Array(bufferLength);

  audioElement = new Audio('https://file-examples.com/storage/fe1e464fde545fff837b/2017/11/file_example_MP3_1MG.mp3');
  audioElement.crossOrigin = 'anonymous';
  audioElement.loop = true;
  audioElement.volume = 0.65;

  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  try {
    await audioContext.resume();
    await audioElement.play();
    audioActive = true;
    overlay.remove();
    updateAudioData();
  } catch (err) {
    console.error('Unable to start audio playback:', err);
  }
};

const updateAudioData = () => {
  if (!audioActive) {
    return;
  }
  analyser.getByteFrequencyData(frequencyData);
  let sum = 0;
  for (let i = 0; i < frequencyData.length; i += 1) {
    sum += frequencyData[i];
  }
  const average = sum / frequencyData.length;
  audioVolume = average / 255;
  requestAnimationFrame(updateAudioData);
};

const activateOnGesture = () => {
  startAudio();
  window.removeEventListener('pointerdown', activateOnGesture);
  window.removeEventListener('keydown', activateOnGesture);
};

window.addEventListener('pointerdown', activateOnGesture);
window.addEventListener('keydown', activateOnGesture);

const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  cube.rotation.x += 0.01 + audioVolume * 0.04;
  cube.rotation.y += 0.015 + audioVolume * 0.05;

  const cubeScale = 0.9 + audioVolume * 1.6;
  cube.scale.set(cubeScale, cubeScale, cubeScale);

  const baseSphere = 0.75 + Math.sin(elapsed * 2.4) * 0.05;
  const sphereScale = baseSphere + audioVolume * 1.2;
  sphere.scale.setScalar(sphereScale);
  sphere.material.emissiveIntensity = 0.2 + audioVolume * 1.6;

  torus.rotation.x += 0.004 + audioVolume * 0.02;
  torus.rotation.y -= 0.006 + audioVolume * 0.025;
  torus.material.emissiveIntensity = 0.3 + audioVolume * 1.4;

  if (duck) {
    duck.rotation.y += 0.005 + audioVolume * 0.03;
    duck.position.y = 0.1 + Math.sin(elapsed * 2) * (0.1 + audioVolume * 0.3);
    duck.position.x = Math.sin(elapsed * 0.9) * 0.25;
  }

  renderer.render(scene, camera);
};

animate();

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onWindowResize);
