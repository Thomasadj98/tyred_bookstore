import {MetaFunction} from '@remix-run/react';
import {motion, useScroll} from 'framer-motion';

export const meta: MetaFunction = () => {
  return [{title: 'About Us'}];
};

const gridContainerVariants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const gridItemVariants = {
  hidden: {opacity: 0},
  show: {opacity: 1},
};

export default function AboutPage() {
  const {scrollYProgress: completionProgress} = useScroll();

  return (
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="show"
      className={'about-container'}
    >
      <motion.div variants={gridItemVariants} className="about-item">
        <motion.div
          initial={{opacity: 0, y: 50}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, ease: 'easeOut', delay: 0.2}}
          className="about-item-square"
        ></motion.div>
        <motion.div
          initial={{opacity: 0, y: -50}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, ease: 'easeOut', delay: 0.4}}
          className="about-item-circle"
        ></motion.div>
      </motion.div>
      <motion.div
        variants={gridItemVariants}
        className="about-item"
      >
        <motion.div
          animate={{
            scale: [1, 2, 2, 1],
            rotate: [0, 90, 90, 0],
            borderRadius: ['10%', '10%', '50%', '10%'],
          }}
          transition={{duration: 5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1}}
          className="about-item-big-square"></motion.div>
      </motion.div>
      <motion.div
        variants={gridItemVariants}
        className="about-item"
      ></motion.div>
      <motion.div
        variants={gridItemVariants}
        className="about-item"
      ></motion.div>
      <motion.div
        variants={gridItemVariants}
        className="about-item"
      >
        <motion.div className="about-item-big-square">
          <motion.div className={"about-item-big-square_child"} style={{ scaleY: completionProgress }}></motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={gridItemVariants}
        className="about-item"
      ></motion.div>
    </motion.div>
  );
}
