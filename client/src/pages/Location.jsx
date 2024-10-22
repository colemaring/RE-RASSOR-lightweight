import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import MyNavbar from "../components/MyNavbar";
import * as THREE from "three";
import rover from "../assets/rover.stl";
import terrain from "../assets/Apollo_16.stl";

// STL Model Loader Component
const STLModel = ({ url }) => {
  const geometry = useLoader(STLLoader, url);
  if (geometry) {
    // Recompute normals to fix lighting issues
    geometry.computeVertexNormals();
  }
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2;
      meshRef.current.position.y = 15;
      // Enable casting and receiving shadows
      meshRef.current.receiveShadow = true;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#d1d1d1" side={THREE.DoubleSide} />
    </mesh>
  );
};

const STLModel2 = ({ url }) => {
  const geometry = useLoader(STLLoader, url);
  if (geometry) {
    // Recompute normals to fix lighting issues
    geometry.computeVertexNormals();
  }
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2;
      meshRef.current.position.y = 24;
      meshRef.current.position.x = -20;
      // Enable casting and receiving shadows
      meshRef.current.receiveShadow = true;
      meshRef.current.scale.set(0.04, 0.04, 0.04); // Adjust the scale values as needed
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#377039" side={THREE.DoubleSide} />
    </mesh>
  );
};

const Location = () => {
  return (
    <>
      <MyNavbar />
      <Canvas
        shadows
        style={{ height: "93vh" }}
        camera={{ position: [-100, 100, 150] }}
      >
        {/* Ambient Light */}
        <ambientLight intensity={0.4} />

        {/* Directional Light with shadow */}
        <directionalLight
          position={[100, 5, 200]}
          castShadow
          intensity={2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={500}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />
        <STLModel url={terrain} />
        <STLModel2 url={rover} />
        <OrbitControls maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </>
  );
};

export default Location;
