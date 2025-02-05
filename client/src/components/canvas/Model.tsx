import { useGLTF } from "@react-three/drei";
import { useConfigurator } from "@/store/configurator";
import * as THREE from "three";

export default function Model() {
  const { width, height, depth, material: materialType, finish, type, thickness } = useConfigurator();

  // Create geometry based on bracket type
  const createBracketGeometry = () => {
    switch (type) {
      case 'L Bracket':
        return createLBracket();
      case 'Corner Bracket':
        return createCornerBracket();
      case 'Floating Shelf Bracket':
        return createFloatingShelfBracket();
      case 'Heavy Duty Bracket':
        return createHeavyDutyBracket();
      default:
        return createLBracket();
    }
  };

  const createLBracket = () => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial(getMaterialProperties());

    // Vertical plate
    const verticalGeometry = new THREE.BoxGeometry(thickness, height, depth);
    const verticalMesh = new THREE.Mesh(verticalGeometry, material);
    verticalMesh.position.x = -width/2 + thickness/2;

    // Horizontal plate
    const horizontalGeometry = new THREE.BoxGeometry(width, thickness, depth);
    const horizontalMesh = new THREE.Mesh(horizontalGeometry, material);
    horizontalMesh.position.y = -height/2 + thickness/2;

    group.add(verticalMesh);
    group.add(horizontalMesh);
    return group;
  };

  const createCornerBracket = () => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial(getMaterialProperties());

    // Back plate
    const backGeometry = new THREE.BoxGeometry(thickness, height, depth);
    const backMesh = new THREE.Mesh(backGeometry, material);
    backMesh.position.x = -width/2 + thickness/2;

    // Bottom plate
    const bottomGeometry = new THREE.BoxGeometry(width, thickness, depth);
    const bottomMesh = new THREE.Mesh(bottomGeometry, material);
    bottomMesh.position.y = -height/2 + thickness/2;

    // Side plate
    const sideGeometry = new THREE.BoxGeometry(width, height, thickness);
    const sideMesh = new THREE.Mesh(sideGeometry, material);
    sideMesh.position.z = -depth/2 + thickness/2;

    group.add(backMesh);
    group.add(bottomMesh);
    group.add(sideMesh);
    return group;
  };

  const createFloatingShelfBracket = () => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial(getMaterialProperties());

    // Main vertical support
    const mainSupport = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, height, depth),
      material
    );
    mainSupport.position.x = -width/2 + thickness/2;

    // Top horizontal support
    const topSupport = new THREE.Mesh(
      new THREE.BoxGeometry(width, thickness, depth),
      material
    );
    topSupport.position.y = height/2 - thickness/2;

    // Diagonal support
    const diagonalHeight = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const angle = Math.atan2(height, width);
    const diagonalSupport = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, diagonalHeight, depth),
      material
    );
    diagonalSupport.position.x = -width/4;
    diagonalSupport.position.y = -height/4;
    diagonalSupport.rotation.z = angle;

    group.add(mainSupport);
    group.add(topSupport);
    group.add(diagonalSupport);
    return group;
  };

  const createHeavyDutyBracket = () => {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial(getMaterialProperties());
    const thickerDimension = thickness * 1.5;

    // Vertical plate
    const verticalGeometry = new THREE.BoxGeometry(thickerDimension, height, depth);
    const verticalMesh = new THREE.Mesh(verticalGeometry, material);
    verticalMesh.position.x = -width/2 + thickerDimension/2;

    // Horizontal plate
    const horizontalGeometry = new THREE.BoxGeometry(width, thickerDimension, depth);
    const horizontalMesh = new THREE.Mesh(horizontalGeometry, material);
    horizontalMesh.position.y = -height/2 + thickerDimension/2;

    // Reinforcement rib
    const ribHeight = Math.sqrt(Math.pow(width/2, 2) + Math.pow(height/2, 2));
    const angle = Math.atan2(height, width);
    const reinforcementRib = new THREE.Mesh(
      new THREE.BoxGeometry(thickness, ribHeight, depth),
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

  // Define material properties based on finish and material type
  const getMaterialProperties = () => {
    let color = '#CCCCCC';
    let metalness = 0.8;
    let roughness = 0.2;

    if (materialType === 'Aluminum') {
      color = '#E8E8E8';
      metalness = 0.6;
    }

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
    }

    return { color, metalness, roughness };
  };

  const bracketGeometry = createBracketGeometry();

  return (
    <primitive object={bracketGeometry} castShadow receiveShadow />
  );
}