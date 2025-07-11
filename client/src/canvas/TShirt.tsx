// 3d T-Shirt

import { Decal, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as THREE from "three";
import useClothConfigStore from "../store/clothConfigStore";
import { useMemo } from "react";

const TShirt: React.FC = () => {
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const {
    hexColor,
    logoPath,
    imageSize,
    positionY,
    clothText,
    designImgPath,
    designScale,
  } = useClothConfigStore();

  // set color
  useFrame((_, delta) =>
    easing.dampC(
      (materials.lambert1 as THREE.MeshStandardMaterial).color,
      hexColor,
      0.25,
      delta
    )
  );

  // Create a texture from text using canvas
  const textTexture = useMemo(() => {
    if (!clothText) return null;

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 64px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(clothText, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
  }, [clothText]);

  return (
    <>
      <mesh
        castShadow
        geometry={(nodes.T_Shirt_male as THREE.Mesh).geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {logoPath && (
          <Decal
            position={[0, positionY / 100, 0.15]}
            rotation={[0, 0, 0]}
            scale={imageSize / 100}
            map={new THREE.TextureLoader().load(logoPath)}
          />
        )}

        {clothText && textTexture && (
          <Decal
            position={[0, 0.12, 0.15]} // Adjust position for best fit
            rotation={[0, 0, 0]}
            scale={[0.25, 0.08, 0.25]} // Adjust scale for text aspect ratio
            map={textTexture}
            depthTest={true}
          />
        )}

        {designImgPath && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={designScale / 100}
            map={new THREE.TextureLoader().load(designImgPath)}
          />
        )}
      </mesh>
    </>
  );
};

export default TShirt;
