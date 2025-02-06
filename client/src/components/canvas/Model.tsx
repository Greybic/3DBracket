import { useGLTF } from "@react-three/drei";
import { useConfigurator } from "@/store/configurator";
import * as THREE from "three";
import { ThreeBSP } from "three-js-csg";

export default function Model() {
  const { baseWidth, height, depth, surfaceTreatment } = useConfigurator();

  // Extract numeric width value from baseWidth string (e.g., "4\" (10.2 cm)" -> 4)
  const width = parseFloat(baseWidth.split('"')[0]);

  // Create geometry for bracket
  const createBracketGeometry = () => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial(getMaterialProperties());

    // Vertical plate
    const verticalGeometry = new THREE.BoxGeometry(0.25, height, depth);
    const verticalMesh = new THREE.Mesh(verticalGeometry, material);
    verticalMesh.position.x = -width/2 + 0.125;

    // Horizontal plate
    const horizontalGeometry = new THREE.BoxGeometry(width, 0.25, depth);
    const horizontalMesh = new THREE.Mesh(horizontalGeometry, material);
    horizontalMesh.position.y = -height/2 + 0.125;

    // Reinforcement rib (diagonal support)
    const ribHeight = Math.sqrt(Math.pow(width/2, 2) + Math.pow(height/2, 2));
    const angle = Math.atan2(height, width);
    const reinforcementRib = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, ribHeight, depth),
      material
    );
    reinforcementRib.position.x = -width/4;
    reinforcementRib.position.y = -height/4;
    reinforcementRib.rotation.z = angle;

    group.add(verticalMesh);
    group.add(horizontalMesh);
    group.add(reinforcementRib);
    return group;
  };

  // Define material properties based on surface treatment
  const getMaterialProperties = () => {
    let color = '#CCCCCC';
    let metalness = 0.8;
    let roughness = 0.2;

    switch (surfaceTreatment) {
      case 'Black Powder Coat (+$15.00)':
        color = '#1A1A1A';
        metalness = 0.3;
        roughness = 0.7;
        break;
      case 'White Powder Coat (+$15.00)':
        color = '#FFFFFF';
        metalness = 0.3;
        roughness = 0.7;
        break;
      case 'Clear Powder Coat (+$15.00)':
        roughness = 0.4;
        break;
      case 'Primer (+$10.00)':
        color = '#808080';
        metalness = 0.4;
        roughness = 0.6;
        break;
    }

    return { color, metalness, roughness };
  };

  const bracketGeometry = createBracketGeometry();

  return (
    <primitive object={bracketGeometry} castShadow receiveShadow />
  );
}