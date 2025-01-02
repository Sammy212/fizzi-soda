"use client";

import { forwardRef, ReactNode } from "react";
import { Float } from "@react-three/drei"
import { SodaCan, SodaCanProps } from "./SodaCan"
import { Group } from "three";


type FloatingCanProps = {
    flavor?: SodaCanProps["flavor"];
    floatSpeed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
    floatingRange?: [number, number];
    children?: ReactNode;
}

const FloatingCan = forwardRef<Group, FloatingCanProps>(({
        flavor = "blackCherry",
        floatSpeed = 1.5,
        rotationIntensity = 1,
        floatIntensity = 1,
        floatingRange = [-0.2, 0.2],
        children,
        ...props
      },
      ref,
) => {
    return (
        <group ref={ref} {...props}>
            <Float
                speed={floatSpeed} // Speed of the floating animation
                rotationIntensity={rotationIntensity} // XYZ rotation intensity
                floatIntensity={floatIntensity} // How much it floats from the center
                floatingRange={floatingRange} // Range of floating
            >
                {children}
                <SodaCan flavor={flavor}/>
            </Float>
        </group>
    )
})

FloatingCan.displayName = "FloatingCan"

export default FloatingCan;