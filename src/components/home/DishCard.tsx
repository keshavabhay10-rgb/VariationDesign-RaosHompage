'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from './section4.module.css';

interface DishCardProps {
    name: string;
    description: string;
    image: string;
    index: number;
    scrollProgress: MotionValue<number>;
    fadeRange?: [number, number];
}

export function DishCard({ name, description, image, scrollProgress, fadeRange }: DishCardProps) {
    const effectiveRange: [number, number] = fadeRange || [0, 0.001];
    const effectiveOutput: [number, number] = fadeRange ? [0, 1] : [1, 1];
    const opacity = useTransform(scrollProgress, effectiveRange, effectiveOutput);

    return (
        <motion.div className={styles.dishCard} style={{ opacity }}>
            <div className={styles.imageContainer}>
                <img src={image} alt={name} className={styles.image} loading="lazy" />
            </div>
            <div className={styles.cardContent}>
                <h4 className={styles.cardName}>{name}</h4>
                <p className={styles.cardDescription}>{description}</p>
            </div>
        </motion.div>
    );
}
