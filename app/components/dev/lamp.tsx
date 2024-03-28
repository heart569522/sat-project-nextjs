'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/app/lib/cn';
import { TextGenerateEffect } from './text-generate-effect';
import { SparklesCore } from './sparkles';

export function LampPage() {
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showText4, setShowText4] = useState(false);

  const [showMockText1, setShowMockText1] = useState(true);
  const [showMockText2, setShowMockText2] = useState(true);
  const [showMockText4, setShowMockText4] = useState(true);
  const [showMockText3, setShowMockText3] = useState(true);

  useEffect(() => {
    // Use setTimeout to delay showing the TextGenerateEffect components individually
    const timeout1 = setTimeout(() => {
      setShowText1(true);
      setShowMockText1(false);
    }, 800); // Delay for the first TextGenerateEffect

    const timeout2 = setTimeout(() => {
      setShowText2(true);
      setShowMockText2(false);
    }, 1600); // Delay for the second TextGenerateEffect

    const timeout3 = setTimeout(() => {
      setShowText3(true);
      setShowMockText3(false);
    }, 2400); // Delay for the third TextGenerateEffect

    const timeout4 = setTimeout(() => {
      setShowText4(true);
      setShowMockText4(false);
    }, 3200); // Delay for the fourth TextGenerateEffect

    // Cleanup function to clear timeouts
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
    };
  }, []);

  return (
    <LampContainer>
      <>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0,
            duration: 1,
            ease: 'easeInOut',
          }}
          className="mt-0 bg-gradient-to-br from-slate-100 to-amber-200 bg-clip-text py-4 text-center text-4xl font-semibold tracking-tight text-transparent xl:text-7xl"
        >
          Developers
        </motion.h1>
        {showText1 && (
          <TextGenerateEffect words={`6401260021 Wirunrom Wankasemsan`} />
        )}
        {showMockText1 && (
          <div className="invisible pt-2 leading-normal tracking-wide text-white transition sm:text-xl md:text-2xl xl:text-4xl">
            <p>6401260021 Wirunrom Wankasemsan</p>
          </div>
        )}
        {showText2 && (
          <TextGenerateEffect words={`6401260069 Chayanont Saimonkol`} />
        )}
        {showMockText2 && (
          <div className="invisible pt-2 leading-normal tracking-wide text-white transition sm:text-xl md:text-2xl xl:text-4xl">
            <p>6401260069 Chayanont Saimonkol</p>
          </div>
        )}
        {showText3 && <TextGenerateEffect words={`Software Engineering`} />}
        {showMockText3 && (
          <div className="invisible pt-2 leading-normal tracking-wide text-white transition sm:text-xl md:text-2xl xl:text-4xl">
            <p>Software Engineering</p>
          </div>
        )}
        {showText4 && <TextGenerateEffect words={`Payap University`} />}
        {showMockText4 && (
          <div className="invisible pt-2 leading-normal tracking-wide text-white transition sm:text-xl md:text-2xl xl:text-4xl">
            <p>Payap University</p>
          </div>
        )}
      </>
    </LampContainer>
  );
}

export default function LampContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative z-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950 md:h-full',
        className,
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0,
            duration: 1,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-amber-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  bottom-0 left-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  bottom-0 left-0 z-20 h-[100%]  w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0,
            duration: 1,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-amber-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  bottom-0 right-0 z-20 h-[100%]  w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  bottom-0 right-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-amber-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0,
            duration: 1,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-30 h-52 w-64 -translate-y-[6rem] rounded-full bg-amber-300 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '30rem' }}
          transition={{
            delay: 0,
            duration: 1,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-amber-200 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
