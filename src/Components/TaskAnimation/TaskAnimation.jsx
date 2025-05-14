import React from 'react';
import { motion } from 'framer-motion';

const TaskAnimation = (props) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className=" w-[90%] md:h-fit max-h-[95%] mt-5  p-3 bg-whiteColor rounded-xl overflow-y-scroll"
    >
      {props.children}
    </motion.div>
  );
};

export default TaskAnimation;
