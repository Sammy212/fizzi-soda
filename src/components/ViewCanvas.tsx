"use client";

import { Canvas } from "@react-three/fiber";

type Props = {};

export default function ViewCanvas({}: Props) {
  return (
    <Canvas>
        <mesh>
            <boxGeometry/>
            <meshStandardMaterial/>
        </mesh>
    </Canvas>
  );
}