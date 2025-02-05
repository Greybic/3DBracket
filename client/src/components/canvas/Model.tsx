import { useGLTF } from "@react-three/drei";
import { useConfigurator } from "@/store/configurator";
import * as THREE from "three";

export default function Model({ color }: { color: string }) {
  const { width, height, depth } = useConfigurator();
  
  // Create a basic bracket geometry
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color(color),
    metalness: 0.8,
    roughness: 0.2
  });

  return (
    <mesh geometry={geometry} material={material} castShadow receiveShadow>
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}
