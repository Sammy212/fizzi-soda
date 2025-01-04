"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative text-sky-950"
    >
      <div>
        <div className="grid relative">
          {/* View goes here */}
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene/>
          </View>

          {
            slice.primary.text_group.map((item, index) => (
              <div key={asText(item.heading)}
                className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
              >
                <div
                  className={index % 2 === 0 ? "col-start-1" : "md:col-start-2"} // Alternate the text alignment
                >
                  <h2 className="text-balance text-6xl font-bold">
                    <PrismicText field={item.heading} />
                  </h2>
                  <div className="mt-4 text-xl">
                    <PrismicRichText field={item.body} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
