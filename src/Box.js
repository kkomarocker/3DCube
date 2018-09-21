import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  BasicShadowMap,
  AmbientLight,
  PointLight
} from "three";

export const Box = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = BasicShadowMap;

  document.body.appendChild(renderer.domElement);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshPhongMaterial({ color: 0x3333ff });
  const cube = new Mesh(geometry, material);

  scene.add(cube);

  const ambientLight = new AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  const light = new PointLight(0xffffff, 0.8, 18);
  light.position.set(-3, 6, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  scene.add(light);

  camera.position.z = 5;

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();
};
