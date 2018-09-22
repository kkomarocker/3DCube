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
    90,
    window.innerWidth / window.innerHeight,
    10,
    2000
  );
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = BasicShadowMap;

  document.body.appendChild(renderer.domElement);

  const ambientLight = new AmbientLight(0xffffff, 0.4);
  const light = new PointLight(0xffffff, 2.5, 40);

  const group = new Group();

  light.position.set(-3, 6, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;

  let cubeArrOne = [];
  let cubeArrTwo = [];
  let cubeArrThree = [];
  let cubeArrFour = [];

  camera.position.z = 20;

  for (let i = 0; i < 7; i++) {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhongMaterial({ color: 0x5555ff });
    cubeArrOne.push(new Mesh(geometry, material));
    cubeArrTwo.push(new Mesh(geometry, material));
    cubeArrThree.push(new Mesh(geometry, material));
    cubeArrFour.push(new Mesh(geometry, material));
  }

  for (let i = 0; i < cubeArrOne.length; i++) {
    cubeArrOne[i].position.x = i;
    cubeArrOne[i].position.y = i + 0.3;
    cubeArrOne[i].position.z = i + 3;
    group.add(cubeArrOne[i]);
  }

  for (let i = 1; i < cubeArrTwo.length; i++) {
    cubeArrTwo[i].position.x = i;
    cubeArrTwo[i].position.y = -i + 0.3;
    cubeArrTwo[i].position.z = i + 3;

    cubeArrThree[i].position.x = -i;
    cubeArrThree[i].position.y = -i;
    cubeArrThree[i].position.z = i + 3;

    cubeArrFour[i].position.x = -i;
    cubeArrFour[i].position.y = i + 0.3;
    cubeArrFour[i].position.z = i + 3;

    group.add(cubeArrTwo[i]);
    group.add(cubeArrThree[i]);
    group.add(cubeArrFour[i]);
  }

  scene.background = "white";

  scene.add(group);
  scene.add(ambientLight);
  scene.add(light);

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
