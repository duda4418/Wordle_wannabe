import React from 'react';
import { motion } from 'framer-motion';

const LetterBox = ({ letter, color }: any) => {
  
  
  const getColorClassName = (color: string) => {
    switch (color) {
      case 'gray':
        return 'bg-gray-200';
      case 'yellow':
        return 'bg-yellow-400';
      case 'green':
        return 'bg-lime-400';
      case 'outline':
        return 'bg-stone-300 border-black border-4 card-bordered';
      default:
        return 'bg-gray-200';
    }
  };
      
  const boxVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: 'spring' } }
  };

  return (
    <motion.div
      className={`card ${getColorClassName(color)} w-16 h-16 flex items-center justify-center`}
      key={`${letter}-${color}`}
      initial="hidden"
      animate="visible"
      variants={boxVariants}
    >
      <div className="card-body flex items-center justify-center">
        <h1 className='text-4xl font-extrabold'>{letter}</h1>
      </div>
    </motion.div>
  );
};


export default LetterBox;
