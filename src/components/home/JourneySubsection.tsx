'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from './section4.module.css';
import { DishCard } from './DishCard';

interface Dish {
    name: string;
    description: string;
    image?: string;
    price: string;
    isChefsPick?: boolean;
    dietary?: string[];
    contains?: string;
}

interface JourneySubsectionProps {
    title: string;
    description: string;
    dishes: Dish[];
    scrollProgress: MotionValue<number>;
    visibilityRange: [number, number, number, number];
    cardScrollRange: [number, number];
    stayVisible?: boolean;
}

export function JourneySubsection({
    title,
    description,
    dishes,
    scrollProgress,
    visibilityRange,
    cardScrollRange,
    stayVisible,
}: JourneySubsectionProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [trackWidth, setTrackWidth] = useState(0);

    useEffect(() => {
        if (!trackRef.current) return;
        const updateWidth = () => {
            if (trackRef.current) {
                const wrapperWidth = trackRef.current.offsetWidth;
                const contentWidth = trackRef.current.scrollWidth;
                if (contentWidth > 0) setTrackWidth(contentWidth - wrapperWidth);
            }
        };
        const observer = new ResizeObserver(() => requestAnimationFrame(updateWidth));
        observer.observe(trackRef.current);
        updateWidth();
        return () => observer.disconnect();
    }, []);

    // stayVisible: push fade-out keyframes far beyond 1.0 so the section never disappears
    const fadeOutStart = stayVisible ? 2.0 : visibilityRange[2];
    const fadeOutEnd   = stayVisible ? 2.0 : visibilityRange[3];
    const opacity = useTransform(
        scrollProgress,
        [visibilityRange[0], visibilityRange[1], fadeOutStart, fadeOutEnd],
        [0, 1, 1, 0]
    );

    const display = useTransform(scrollProgress, v => {
        if (stayVisible) {
            return v >= visibilityRange[0] - 0.05 ? 'flex' : 'none';
        }
        return (v >= visibilityRange[0] - 0.05 && v <= visibilityRange[3] + 0.05) ? 'flex' : 'none';
    });

    const rangeStart    = cardScrollRange[0];
    const rangeEnd      = cardScrollRange[1];
    const rangeDuration = rangeEnd - rangeStart;

    const scrollBegin  = rangeStart + rangeDuration * 0.20;
    const scrollFinish = rangeStart + rangeDuration * 0.75;
    const dwellEnd     = rangeStart + rangeDuration * 0.90;

    const x = useTransform(
        scrollProgress,
        [rangeStart, scrollBegin, scrollFinish, dwellEnd, rangeEnd],
        [0, 0, -trackWidth, -trackWidth, -trackWidth]
    );

    const fadeStart = rangeStart + rangeDuration * 0.08;
    const fadeDishRanges: [number, number][] = [
        [fadeStart,                              fadeStart + rangeDuration * 0.04],
        [fadeStart + rangeDuration * 0.04,       fadeStart + rangeDuration * 0.08],
        [fadeStart + rangeDuration * 0.08,       fadeStart + rangeDuration * 0.12],
    ];

    const actionsOpacity = useTransform(
        scrollProgress,
        [cardScrollRange[1] - 0.05, cardScrollRange[1]],
        [0, 1]
    );

    return (
        <motion.div className={styles.subsectionWrapper} style={{ opacity, display }}>
            <div className={styles.textHeader}>
                <motion.h3>{title}</motion.h3>
                <motion.p>{description}</motion.p>
            </div>
            <div className={styles.cardTrackWrapper} ref={trackRef}>
                <motion.div className={styles.cardTrack} style={{ x }}>
                    {dishes.map((dish, i) => (
                        <DishCard
                            key={i}
                            index={i}
                            name={dish.name}
                            description={dish.description}
                            image={dish.image}
                            price={dish.price}
                            isChefsPick={dish.isChefsPick}
                            dietary={dish.dietary}
                            contains={dish.contains}
                            scrollProgress={scrollProgress}
                            fadeRange={i >= 3 ? fadeDishRanges[i - 3] : undefined}
                        />
                    ))}
                </motion.div>
            </div>
            <motion.div className={styles.actions} style={{ opacity: actionsOpacity }}>
                <button className={styles.browseMore}>Browse More &rarr;</button>
            </motion.div>
        </motion.div>
    );
}
