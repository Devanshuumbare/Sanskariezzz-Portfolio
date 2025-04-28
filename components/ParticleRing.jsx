import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./utils";

const ParticleRing = () => {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
          fov: 45,
        }}
        style={{ height: "100vh" }}
        className="bg-transparent"
        dpr={[1, 2]} // Optimize performance by setting device pixel ratio
      >
        <OrbitControls
          maxDistance={20}
          minDistance={10}
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <directionalLight intensity={0.5} />
        <ambientLight intensity={0.2} />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({ position, color }) => {
  // Add subtle animation to each point
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Create subtle floating effect
      const time = clock.getElapsedTime();
      const offset = position[0] + position[1] + position[2];
      meshRef.current.position.x = position[0] + Math.sin(time * 0.5 + offset) * 0.05;
      meshRef.current.position.y = position[1] + Math.cos(time * 0.5 + offset) * 0.05;
      meshRef.current.position.z = position[2] + Math.sin(time * 0.3 + offset) * 0.05;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={1.2}
        roughness={0.2}
        metalness={0.8}
        color={color}
        toneMapped={false} // Makes colors more vibrant
      />
    </Sphere>
  );
};

export default ParticleRing;
