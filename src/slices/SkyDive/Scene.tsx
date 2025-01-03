"use client";

import FloatingCan from "@/components/FloatingCan";
import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type SkyDiveProps = {
    sentence: string | null;
    flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
}

export default function Scene({flavor, sentence}: SkyDiveProps) {

    const groupRef = useRef<THREE.Group>(null);
    const canRef = useRef<THREE.Group>(null);
    const cloud1Ref = useRef<THREE.Group>(null);
    const cloud2Ref = useRef<THREE.Group>(null);
    const cloudsRef = useRef<THREE.Group>(null);
    const wordsRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
        <group
            rotation={[0, 0, 0.5]}
        >
            <FloatingCan
                ref={canRef}
                flavor={flavor}
            >
            </FloatingCan>
        </group>


        {/* Clouds elements */}
        <Clouds 
            ref={cloudsRef}
        >
            <Cloud
                ref={cloud1Ref}
                bounds={[10, 10, 2]}
            />
            <Cloud
                ref={cloud2Ref}
                bounds={[10, 10, 2]}
            />
        </Clouds>


        {/* Text */}

        <OrbitControls />


        {/* 3d's Lights and Environments */}
        <ambientLight intensity={2} color="#9ddefa" />
        <Environment 
            files="/hdr/field.hdr"
            environmentIntensity={1.5}
        />
    </group>
  )
}