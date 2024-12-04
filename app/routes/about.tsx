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
      className={'grid grid-cols-3 gap-6 h-3/4 m-6'}
    >
      <motion.div
        variants={gridItemVariants}
        className={
          'bg-green-100 flex justify-center items-center aspect-square gap-6 rounded-lg shadow-md'
        }
      >
        <motion.div
          initial={{opacity: 0, y: 50}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, ease: 'easeOut', delay: 0.2}}
          className={'w-24 h-24 bg-blue-900 rounded-sm'}
        ></motion.div>
        <motion.div
          initial={{opacity: 0, y: -50}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, ease: 'easeOut', delay: 0.4}}
          className={'w-24 h-24 bg-blue-900 rounded-full'}
        ></motion.div>
      </motion.div>
      <motion.div
        variants={gridItemVariants}
        className={
          'bg-green-100 flex justify-center items-center aspect-square gap-6 rounded-lg'
        }
      >
        <motion.div
          animate={{
            scale: [1, 2, 2, 1],
            rotate: [0, 90, 90, 0],
            borderRadius: ['10%', '10%', '50%', '10%'],
          }}
          transition={{
            duration: 5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className={'bg-red-400 h-24 w-24'}
        ></motion.div>
      </motion.div>
      <motion.div
        variants={gridItemVariants}
        className={
          'bg-green-100 flex justify-center items-center aspect-square gap-6 rounded-lg'
        }
      ></motion.div>
      <motion.div
        variants={gridItemVariants}
        className={
          'bg-green-100 flex justify-center items-center aspect-square gap-6 rounded-lg'
        }
      ></motion.div>
      <motion.div
        variants={gridItemVariants}
        className={
          'bg-green-100 flex justify-center items-center aspect-square gap-6 rounded-lg'
        }
      >
        <motion.div
          className={
            'h-48 w-48 bg-gray-200 rounded-lg shadow-lg overflow-hidden'
          }
        >
          <motion.div
            className={'w-full bg-green-400 h-full origin-bottom'}
            style={{scaleY: completionProgress}}
          ></motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={gridItemVariants}
        className={
          'bg-green-100 flex justify-center items-center aspect-square gap-6 rounded-lg'
        }
      ></motion.div>
    </motion.div>
  );
}
