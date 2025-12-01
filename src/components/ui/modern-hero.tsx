import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { useRef } from "react";

export const SmoothScrollHero = () => {
  return (
    <div className="bg-white relative">
      {/* Light Orange Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />
      <Hero />
      <Schedule />
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-white/0 to-white" />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );

  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          "url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Premium letterheads printing"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Executive diaries and notebooks"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1561070791-36c11767b26a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Business cards printing"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3"
        alt="Custom notebooks and stationery"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

interface ParallaxImgProps {
  className: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}

const ParallaxImg = ({ className, alt, src, start, end }: ParallaxImgProps) => {
  const ref = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="our-services"
      className="mx-auto max-w-5xl px-4 py-48 text-gray-900 relative z-10"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase bg-gradient-to-r from-gray-900 via-orange-600 to-orange-500 bg-clip-text text-transparent"
      >
        Our Services
      </motion.h1>
      <ScheduleItem title="Business Cards" date="Premium Quality" location="Custom Designs" />
      <ScheduleItem title="Letterheads" date="Corporate Branding" location="Multiple Finishes" />
      <ScheduleItem title="Visiting Cards" date="Express Delivery" location="Bulk Orders" />
      <ScheduleItem title="Executive Diaries" date="Leather Bound" location="Customizable" />
      <ScheduleItem title="Notebooks" date="Quality Binding" location="Branded Covers" />
      <ScheduleItem title="File Covers" date="Durable Material" location="Multiple Sizes" />
      <ScheduleItem title="Packaging" date="Eco-Friendly" location="Custom Printing" />
    </section>
  );
};

interface ScheduleItemProps {
  title: string;
  date: string;
  location: string;
}

const ScheduleItem = ({ title, date, location }: ScheduleItemProps) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-orange-200 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-gray-900 font-semibold">{title}</p>
        <p className="text-sm uppercase text-orange-600 font-medium">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-gray-600">
        <p>{location}</p>
        <MapPin className="w-4 h-4 text-orange-500" />
      </div>
    </motion.div>
  );
};

