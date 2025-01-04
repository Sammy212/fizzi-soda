"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { FLAVORS } from "@/utils/data";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import clsx from "clsx";
import { dir } from "console";

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
      <div className="relative text-center text-5xl font-bold">
        <PrismicRichText field={slice.primary.heading} />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* left | Prev*/}
        <ArrowButton
            onClick={() => changeFlavor(currentFlavorIndex + 1)}
            direction="left"
            label="Previous Flavor"
        />


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
              flavor={FLAVORS[currentFlavorIndex].flavor}
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
        <ArrowButton
            onClick={() => changeFlavor(currentFlavorIndex - 1)}
            direction="right"
            label="Next Flavor"
        />
      </div>

      {/* Price n product information */}
      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>

        <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({ direction="right", onClick, label }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon
        className={clsx(direction === "right" && "-scale-x-100")}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
}
