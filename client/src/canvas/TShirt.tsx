// 3d T-Shirt

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const TShirt: React.FC = () => {
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  // set color
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, "aqua", 0.25, delta)
  );

  return (
    <>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      ></mesh>
    </>
  );
};

export default TShirt;
