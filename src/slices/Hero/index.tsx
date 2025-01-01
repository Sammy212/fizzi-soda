"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
"@prismicio/client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";

gsap.registerPlugin(useGSAP);


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  useGSAP(() => {
    const introTl = gsap.timeline();

    introTl
      .set(
        ".hero",
        {opacity: 1,}
      )
      .from(".hero-header-word", {
        scale: 3,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 1,
      })
      .from(".hero-subheading", {
        opacity: 0,
        y: 30,
        ease: "power4.in",
      }, "+=.8")
      .from(".hero-body", {
        opacity: 0,
        y: 10,
      })
      .from(".hero-button", {
        opacity: 0,
        y: 10,
        duration: 0.6,
      });
  });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header lg:text-[13rem] text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem]">
              <TextSplitter 
                text={asText(slice.primary.heading)}
                wordDisplayStyle="block"
                className="hero-header-word"
              />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <PrismicRichText field={slice.primary.subheading} />
            </div>

            <div className="hero-body text-2xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.body} />
            </div>
            
            <Button
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-12"
            />
          </div>
        </div>

        <div className="grid text-side relative z-[80] h-screen items-center gap-4 md:grid-cols-2">
          <PrismicNextImage 
            field={slice.primary.cans_image} 
            className="w-full md:hidden"
          />

          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-6xl ">
              <TextSplitter 
                text={asText(slice.primary.second_heading)}
              />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              <PrismicRichText field={slice.primary.second_body} />
              {/* <PrismicRichText field={slice.primary.second_body} /> */}
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
