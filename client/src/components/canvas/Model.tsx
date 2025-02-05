import { useGLTF } from "@react-three/drei";
import { useConfigurator } from "@/store/configurator";
import * as THREE from "three";

export default function Model() {
  const { width, height, depth, material: materialType, finish } = useConfigurator();

  // Create a basic bracket geometry
  const geometry = new THREE.BoxGeometry(width, height, depth);

  // Define material properties based on finish and material type
  const getMaterialProperties = () => {
    // Base properties
    let color = '#CCCCCC';
    let metalness = 0.8;
    let roughness = 0.2;

    // Adjust for material type
    if (materialType === 'Aluminum') {
      color = '#E8E8E8';
      metalness = 0.6;
    }

    // Adjust for finish
    switch (finish) {
      case 'Black Powder Coat':
        color = '#1A1A1A';
        metalness = 0.3;
        roughness = 0.7;
        break;
      case 'White Powder Coat':
        color = '#FFFFFF';
        metalness = 0.3;
        roughness = 0.7;
        break;
      case 'Clear Powder Coat':
        roughness = 0.4;
        break;
      // Raw finish uses default values
    }

    return { color, metalness, roughness };
  };

  const materialProps = getMaterialProperties();
  const bracketMaterial = new THREE.MeshStandardMaterial(materialProps);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial {...materialProps} />
    </mesh>
  );
}