// main canvas component to manage scene and model

import { Canvas } from "@react-three/fiber";
import TShirt from "./TShirt";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const CameraWithLight = () => {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0.3, 1]}
    >
      <directionalLight color="white" intensity={2} />
    </PerspectiveCamera>
  );
};

const CanvasModel: React.FC = () => {
  return (
    <section className="h-[40vh] lg:h-screen lg:w-[50vw] lg:absolute lg:top-0 lg:right-0">
      <Canvas
        shadows
        camera={{ position: [0, 0, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full max-w-full h-full transition-all ease-in "
      >
        {/* lights and camera */}
        <ambientLight intensity={0.5} />
        <CameraWithLight />

        {/* action */}
        <OrbitControls enableZoom={false} />

        {/* 3D model */}
        <TShirt />
      </Canvas>
    </section>
  );
};

export default CanvasModel;
