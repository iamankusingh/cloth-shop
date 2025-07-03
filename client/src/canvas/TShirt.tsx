// 3d T-Shirt

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
import useClothConfigStore from "../store/clothConfigStore";

const TShirt: React.FC = () => {
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const { hexColor } = useClothConfigStore();

  // set color
  useFrame((_, delta) =>
    easing.dampC(
      (materials.lambert1 as THREE.MeshStandardMaterial).color,
      hexColor,
      0.25,
      delta
    )
  );

  return (
    <>
      <mesh
        castShadow
        geometry={(nodes.T_Shirt_male as THREE.Mesh).geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      ></mesh>
    </>
  );
};

export default TShirt;
