import { motion } from "framer-motion";

// Floating geometric shapes for background ambiance
export default function FloatingShapes() {
  const shapes = [
    { size: 300, left: "10%", top: "20%", delay: 0, duration: 20 },
    { size: 200, left: "80%", top: "60%", delay: 2, duration: 25 },
    { size: 150, left: "70%", top: "10%", delay: 4, duration: 18 },
    { size: 250, left: "20%", top: "70%", delay: 1, duration: 22 },
    { size: 180, left: "50%", top: "40%", delay: 3, duration: 19 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
            top: shape.top,
            background: `radial-gradient(circle, 
              hsl(var(--accent)) 0%, 
              transparent 70%)`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

