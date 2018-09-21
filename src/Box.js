import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  BasicShadowMap,
  AmbientLight,
  PointLight,
  Group
} from "three";

export const Box = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = BasicShadowMap;

  document.body.appendChild(renderer.domElement);

  const material = new MeshPhongMaterial({ color: 0x3333ff });
  const ambientLight = new AmbientLight(0xffffff, 0.4);
  const light = new PointLight(0xffffff, 1.2, 25);

  const group = new Group();

  light.position.set(-3, 6, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;

  let cubeArr = [];

  for (let i = 0; i < 10; i++) {
    let geometry = new BoxGeometry(1, 1, 1);
    cubeArr.push(new Mesh(geometry, material));
  }

  for (let i = 0; i < cubeArr.length; i++) {
    cubeArr[i].position.set(i, 0, i);
    group.add(cubeArr[i]);
  }

  scene.add(group);
  scene.add(ambientLight);
  scene.add(light);

  camera.position.z = 30;

  const animate = () => {
    requestAnimationFrame(animate);
    for (let i = 0; i < group.children.length; i++) {
      group.children[i].rotation.x += 0.02;
      group.children[i].rotation.y += 0.02;
    }
    renderer.render(scene, camera);
  };

  animate();
};
