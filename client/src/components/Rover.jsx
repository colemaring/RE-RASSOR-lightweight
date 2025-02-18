import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import rover from "../assets/rover.stl";
import { Html } from "@react-three/drei";
import terrain from "../assets/Apollo_16.stl";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

import { Line } from "@react-three/drei";

const AxisLines = () => {
  return (
    <>
      <Line
        points={[
          [0, 0, 0],
          [8, 0, 0],
        ]}
        color="red"
        lineWidth={2}
        onUpdate={(self) => {
          if (self.material) {
            self.material.depthTest = false;
          }
        }}
      />
      <Line
        points={[
          [0, 0, 0],
          [0, 8, 0],
        ]}
        color="green"
        lineWidth={2}
        onUpdate={(self) => {
          if (self.material) {
            self.material.depthTest = false;
          }
        }}
      />
      <Line
        points={[
          [0, 0, 0],
          [0, 0, 8],
        ]}
        color="blue"
        lineWidth={2}
        onUpdate={(self) => {
          if (self.material) {
            self.material.depthTest = false;
          }
        }}
      />
    </>
  );
};

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

const STLModel2 = ({ url, text }) => {
  const geometry = useLoader(STLLoader, url);
  if (geometry) {
    // Recompute normals to fix lighting issues
    geometry.computeVertexNormals();
  }
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2;
      meshRef.current.position.y = 26;
      meshRef.current.position.x = -33;
      meshRef.current.position.z = 20;
      // Enable casting and receiving shadows
      meshRef.current.receiveShadow = true;
      meshRef.current.scale.set(0.06, 0.06, 0.06); // Adjust the scale values as needed
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#377039" side={THREE.DoubleSide} />
      <Html>
        <div style={{ color: "white" }}>
          {text ? text : "rover disconnected"}
        </div>
      </Html>
    </mesh>
  );
};

const Rover = ({ connected }) => {
  return (
    <>
      <Canvas shadows camera={{ position: [-130, 110, 100], fov: 20 }}>
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
        <group>
          <STLModel2 url={rover} text={connected} />
          <group position={[-31, 30, 20]}>
            <AxisLines />
          </group>
        </group>
        <OrbitControls maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </>
  );
};

export default Rover;
