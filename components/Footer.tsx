"use client";

import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import ProfileCard from "./ProfileCard";


const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <div className="relative w-full h-full">
          <Image
            src="/footer-grid.svg"
            alt="grid"
            fill
            className="object-cover opacity-50"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center md:items-start md:gap-4">
        <h1 className="heading lg:max-w-[45vw] text-center md:text-left">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-2 my-5 text-center md:text-left">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>

        <div className="mt-4 flex justify-center md:justify-start w-full md:w-auto">
          <a href="mailto:rijalulfikri437@gmail.com">
            <MagicButton
              title="Let's get in touch"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>

      {/* Profile card inside contact section (visible on md+) */}
      <div className="absolute right-6 -top-10 z-30 hidden md:block">
        <ProfileCard
          name="Rijalul Fikri"
          title="Frontend Developer"
          bio="Saya membangun antarmuka yang cepat dan elegan."
          avatarUrl="/p1.svgmm"
          miniAvatarUrl="/profile.svg"
          showUserInfo={true}
          enableTilt={true}
        />
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2026 Rijalul Fikri
        </p>

        <div className="flex items-center gap-6 md:gap-3 justify-center w-full">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Image src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
