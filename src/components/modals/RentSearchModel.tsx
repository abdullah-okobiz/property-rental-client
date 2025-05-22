import React from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, y: -30 },
};

const RentSearchModel = ({ onClose }: { onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 right-0 w-full h-screen bg-[#262626]/20 z-50"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <div
          className="flex justify-center  w-full h-full"
          onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
        >
          <motion.div
            className="bg-[#fff] w-[600px] h-[400px] rounded shadow relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="p-1 rounded-full border absolute top-4 left-4 text-[#262626]/60 cursor-pointer"
              onClick={onClose}
            >
              <HiMiniXMark className="text-xl" />
            </div>
            <div className="flex items-center justify-center">
              <h2>Here add function when api ready</h2>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RentSearchModel;
