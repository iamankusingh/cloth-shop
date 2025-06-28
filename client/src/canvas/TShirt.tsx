// 3d T-Shirt

import { useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
// import { useState } from "react";
import { easing } from "maath";

const TShirt: React.FC = () => {
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  // const [color, setColor] = useState<string>("red");

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, "aqua", 0.25, delta)
  );

  return (
    <>
      {/* <Canvas className="bg-gray-700 rounded-lg"> */}
      <ambientLight intensity={1} />
      <directionalLight color="white" position={[0, 0, 5]} />

      <PerspectiveCamera position={[0, 0.3, 1]} makeDefault />

      <OrbitControls />

      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      ></mesh>
      {/* </Canvas> */}
    </>
  );
};

export default TShirt;
