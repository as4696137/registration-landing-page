import { motion, type HTMLMotionProps } from "framer-motion";

import {
  sectionContainerVariants,
  sectionItemVariants,
  sectionViewport,
} from "../../utils/motionPresets";

export const MotionSection = (props: HTMLMotionProps<"section">) => (
  <motion.section
    initial="hidden"
    variants={sectionContainerVariants}
    viewport={sectionViewport}
    whileInView="show"
    {...props}
  />
);

export const MotionGroup = (props: HTMLMotionProps<"div">) => (
  <motion.div variants={sectionContainerVariants} {...props} />
);

export const MotionItem = (props: HTMLMotionProps<"div">) => (
  <motion.div variants={sectionItemVariants} {...props} />
);
