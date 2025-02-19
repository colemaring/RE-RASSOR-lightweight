import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three";
import rover from "../assets/rover.stl";
import terrain from "../assets/Apollo_16.stl";

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
          if (self.material) self.material.depthTest = false;
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
          if (self.material) self.material.depthTest = false;
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
          if (self.material) self.material.depthTest = false;
        }}
      />
    </>
  );
};

const STLModel = ({ url }) => {
  const geometry = useLoader(STLLoader, url);
  if (geometry) geometry.computeVertexNormals();
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2;
      meshRef.current.position.y = 15;
      meshRef.current.receiveShadow = true;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color="#d1d1d1" side={THREE.DoubleSide} />
    </mesh>
  );
};

const STLModel2 = ({ url, text, ws }) => {
  // Internal ref for the mesh and target quaternion.
  const meshRef = useRef();
  const targetQuaternion = useRef(new THREE.Quaternion());

  const geometry = useLoader(STLLoader, url);
  if (geometry) geometry.computeVertexNormals();

  // Initialize model transform
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2;
      meshRef.current.position.set(-33, 26, 20);
      meshRef.current.receiveShadow = true;
      meshRef.current.scale.set(0.06, 0.06, 0.06);
      // Initialize target quaternion to current
      targetQuaternion.current.copy(meshRef.current.quaternion);
    }
  }, [geometry]);

  // interpolate quaternion
  useFrame((state, delta) => {
    if (meshRef.current) {
      // slower is smoother
      const smoothFactor = 3 * delta;
      meshRef.current.quaternion.slerp(targetQuaternion.current, smoothFactor);
    }
  });

  useEffect(() => {
    if (!ws) return;

    const handleIMUMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "IMU") {
          // Convert from degrees to radians.
          const pitch = THREE.MathUtils.degToRad(data.pitch);
          const roll = THREE.MathUtils.degToRad(-data.roll - 90);
          const yaw = THREE.MathUtils.degToRad(-data.yaw);
          const euler = new THREE.Euler(roll, pitch, 0, "XYZ");
          // Compute target quaternion from Euler angles.
          targetQuaternion.current.setFromEuler(euler);
        }
      } catch (err) {
        console.error("Error parsing IMU message:", err);
      }
    };

    ws.addEventListener("message", handleIMUMessage);
    return () => {
      ws.removeEventListener("message", handleIMUMessage);
    };
  }, [ws]);

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

const Rover = ({ connected, ws }) => {
  return (
    <>
      <Canvas shadows camera={{ position: [-130, 110, 100], fov: 20 }}>
        <ambientLight intensity={0.4} />
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
          <STLModel2 ws={ws} url={rover} text={connected} />
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
