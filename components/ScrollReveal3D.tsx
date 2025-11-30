import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, Variants } from 'framer-motion';

interface ScrollReveal3DProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'fadeUp' | 'zoomIn' | 'rotate3D' | 'slideLeft' | 'slideRight';
    delay?: number;
    duration?: number;
    threshold?: number;
}

const variants: Record<string, Variants> = {
    fadeUp: {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -50, scale: 0.95 }
    },
    zoomIn: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.1 }
    },
    rotate3D: {
        hidden: { opacity: 0, rotateX: 45, y: 50 },
        visible: { opacity: 1, rotateX: 0, y: 0 },
        exit: { opacity: 0, rotateX: -45, y: -50 }
    },
    slideLeft: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 }
    },
    slideRight: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    }
};

export const ScrollReveal3D: React.FC<ScrollReveal3DProps> = ({
    children,
    className = "",
    variant = 'fadeUp',
    delay = 0,
    duration = 0.6,
    threshold = 0.2
}) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: threshold, margin: "-10% 0px -10% 0px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            variants={variants[variant]}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal3D;
