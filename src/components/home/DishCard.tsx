'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from './section4.module.css';

interface DishCardProps {
    name: string;
    description: string;
    image?: string;
    price: string;
    isChefsPick?: boolean;
    dietary?: string[];
    contains?: string;
    index: number;
    scrollProgress: MotionValue<number>;
    fadeRange?: [number, number];
}

export function DishCard({
    name,
    description,
    image,
    price,
    isChefsPick,
    dietary,
    contains,
    scrollProgress,
    fadeRange,
}: DishCardProps) {
    const effectiveRange: [number, number] = fadeRange || [0, 0.001];
    const effectiveOutput: [number, number] = fadeRange ? [0, 1] : [1, 1];
    const opacity = useTransform(scrollProgress, effectiveRange, effectiveOutput);

    return (
        <motion.div className={styles.dishCard} style={{ opacity }}>
            {image && (
                <div className={styles.imageContainer}>
                    <img src={image} alt={name} className={styles.image} loading="lazy" />
                </div>
            )}
            <div className={styles.cardContent}>
                <div className={styles.priceRow}>
                    <div className={styles.nameGroup}>
                        <span className={styles.cardName}>{name}</span>
                        {isChefsPick && (
                            <span className={styles.chefPickBadge}>Chef&apos;s Pick</span>
                        )}
                    </div>
                    <span className={styles.dishPrice}>{price}</span>
                </div>
                <p className={styles.cardDescription}>{description}</p>
                {(dietary?.length || contains) && (
                    <div className={styles.cardFooter}>
                        <div className={styles.dietaryTags}>
                            {dietary?.map((tag) => (
                                <span key={tag} className={styles.dietaryTag}>{tag}</span>
                            ))}
                        </div>
                        {contains && (
                            <span className={styles.containsText}>Contains: {contains}</span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
