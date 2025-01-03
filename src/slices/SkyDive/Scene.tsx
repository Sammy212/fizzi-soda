"use client";

import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment, OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SkyDiveProps = {
    sentence: string | null;
    flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
}

export default function Scene({ sentence, flavor }: SkyDiveProps) {

    const groupRef = useRef<THREE.Group>(null);
    const canRef = useRef<THREE.Group>(null);
    const cloud1Ref = useRef<THREE.Group>(null);
    const cloud2Ref = useRef<THREE.Group>(null);
    const cloudsRef = useRef<THREE.Group>(null);
    const wordsRef = useRef<THREE.Group>(null);

    // Words Angle
    const wordsAngle = 75 * (Math.PI / 180);

    const getXPosition = (distance: number) => distance * Math.cos(wordsAngle);
    const getYPosition = (distance: number) => distance * Math.sin(wordsAngle);
    
    const getXYPosition = (distance: number) => ({
        x: getXPosition(distance),
        y: getYPosition(-1 * distance)
    });


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
        <group ref={wordsRef}>
            {
                sentence && <ThreeText 
                    sentence={sentence}
                    color="#f97315"
                />
            }
        </group>

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

function ThreeText({ sentence, color="white"}: {
    sentence: string;
    color?: string;
}){
    const words = sentence.toUpperCase().split(" ");
    const material = new THREE.MeshStandardMaterial();
    // size of the text based on screen size
    const isDesktop = useMediaQuery("(min-width: 950px)", true);

    return words.map((word: string, wordIndex: number) => (
        <Text
            key={`${wordIndex}-${word}`}
            scale={isDesktop ? 1 : 0.5}
            color={color}
            material={material}
            font="/fonts/Alpino-Variable.woff"
            anchorX={"center"}
            anchorY={"middle"}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,-?"
        >
            {word}
        </Text>
    ))
}