import { Canvas } from "@react-three/fiber";
import TShirt from "./TShirt";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const CanvasModel: React.FC = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={1} />
      <directionalLight color="white" position={[0, 0, 5]} />

      <PerspectiveCamera position={[0, 0.3, 1]} makeDefault />

      <OrbitControls />

      <TShirt />
    </Canvas>
  );
};

export default CanvasModel;
