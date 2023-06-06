import { motion } from "framer-motion";

const blackBox = {
  initial: {
    height: "100vh",
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      when: "afterChildren",
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.25,
      when: "afterChildren",
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const InitialTransition = () => {
  return (
    <div style={{ position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}>
      <motion.div
        style={{ position: "relative", zIndex: 100000, width: "100%", background: "#000" }}
        initial="initial"
        animate="animate"
        variants={blackBox}
      >
        <motion.svg variants={textContainer} style={{ position: "absolute", zIndex: 100000, display: "flex" }}>
          <pattern id="pattern" patternUnits="userSpaceOnUse" width={750} height={800} style={{ fill: "currentcolor" }}>
            <rect style={{ width: "100%", height: "100%", fill: "currentcolor" }} />
            <motion.rect variants={text} style={{ width: "100%", height: "100%", fill: "#757575" }} />
          </pattern>
          <text
            textAnchor="middle"
            x="50%"
            y="50%"
            style={{ fill: "url(#pattern)", fontSize: "2.25", lineHeight: "2.5", fontWeight: "bold" }}
          >
            NCL
          </text>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default InitialTransition;
