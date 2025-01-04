"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FLAVORS } from "@/utils/data";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { useState } from "react";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {

  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);

  function changeFlavor(index: number) {
    const nextIndex = (currentFlavorIndex + index) % FLAVORS.length;

    setCurrentFlavorIndex(nextIndex);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div 
        className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" 
      />
      <h2 className="relative text-center text-5xl font-bold">
        <PrismicRichText field={slice.primary.heading} />
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* left | Prev*/}

        {/* can - Product */}
        <View
          className="aspect-square h-[70vmin] min-h-40"
        >
          <Center 
            position={[0, 0, 1.5]} // positions the can in front of the camera
          >
            <FloatingCan
              floatIntensity={.3}
              rotationIntensity={1}
            />
          </Center>

          {/* Scene lighting and textures */}
          <Environment 
            files="hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight
            intensity={6}
            position={[0, 1, 1]}
          />
        </View>
        {/* end Can - Product */}

        {/* right | next*/}
      </div>

      {/* <PrismicRichText field={slice.primary.price_copy} /> */}
    </section>
  );
};

export default Carousel;
