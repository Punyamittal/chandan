import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef, forwardRef } from 'react';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='sticky font-semibold top-0 h-screen bg-gradient-to-t to-orange-50 from-white flex flex-col items-center justify-center text-black'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <h1 className='2xl:text-7xl text-5xl md:text-6xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
        Exclusive Bulk Deals <br /> Scroll to Explore 👇
      </h1>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t to-orange-100 from-orange-50 text-gray-900'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <article className='container mx-auto relative z-10 px-6 py-20'>
        <h1 className='text-4xl md:text-6xl leading-[100%] py-10 font-semibold tracking-tight'>
          Premium Printing Products <br /> For Your Business Needs
        </h1>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <img
            src='https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&h=800&fit=crop&auto=format'
            alt='Business Cards'
            className='object-cover w-full rounded-md h-full'
          />
          <img
            src='https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&h=800&fit=crop&auto=format'
            alt='Letterheads'
            className='object-cover w-full rounded-md'
          />
          <img
            src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&h=800&fit=crop&auto=format'
            alt='Diaries'
            className='object-cover w-full rounded-md h-full'
          />
          <img
            src='https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&h=800&fit=crop&auto=format'
            alt='Notebooks'
            className='object-cover w-full rounded-md h-full'
          />
        </div>
      </article>
    </motion.section>
  );
};

interface HeroScrollAnimationProps {
  className?: string;
}

const HeroScrollAnimation = forwardRef<HTMLElement, HeroScrollAnimationProps>(({ className }, ref) => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container} className={`relative h-[200vh] bg-white ${className || ''}`}>
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
      <footer className='group bg-orange-50'>
        <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent transition-all ease-linear'>
          Bulk Deals
        </h1>
        <div className='bg-white text-gray-900 h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
      </footer>
    </main>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;

