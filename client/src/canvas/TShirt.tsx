// 3d T-Shirt

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const TShirt = () => {
  return (
    <section className="h-[500px] w-full">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight color="white" position={[0, 0, 5]} />

        <PerspectiveCamera position={[0, 0, 10]} makeDefault />

        <OrbitControls />

        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </section>
  );
};

export default TShirt;
