// main canvas component to manage scene and model

import { Canvas } from "@react-three/fiber";
import TShirt from "./TShirt";
import {
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

const CameraWithLight = () => {
  return (
    <PerspectiveCamera makeDefault position={[0, 0, 1]}>
      <directionalLight color="white" intensity={2} />
    </PerspectiveCamera>
  );
};

const CanvasModel: React.FC = () => {
  return (
    <section className="h-[50dvh] lg:h-screen lg:w-[50vw] lg:absolute lg:top-0 lg:right-0">
      <Canvas
        shadows
        camera={{ position: [0, 0, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        fallback={<div>Sorry!! Your browser doesn't provide 3D support</div>}
        className="w-full max-w-full h-full transition-all ease-in"
      >
        {/* lights and camera */}
        <ambientLight intensity={0.5} />
        <CameraWithLight />

        {/* action */}
        <OrbitControls enableZoom={true} minDistance={0.5} maxDistance={3} maxPolarAngle={Math.PI / 2} />

        {/* 3D model */}
        <TShirt />

        {/* surface */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.4, 0]}
          receiveShadow
        >
          <circleGeometry args={[0.4, 70]} />
          <MeshReflectorMaterial color="silver" />
        </mesh>
      </Canvas>
    </section>
  );
};

export default CanvasModel;
