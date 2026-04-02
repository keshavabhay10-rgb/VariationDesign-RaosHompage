'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import styles from './section4.module.css';

type MenuCategory =
    | 'starters'
    | 'tandoori_grill'
    | 'curries'
    | 'biryani_rice'
    | 'vegetarian'
    | 'indo_chinese'
    | 'breads'
    | 'desserts'
    | 'cocktails_drinks';

interface HorizontalNavProps {
    activeSection: MenuCategory;
    scrollProgress: MotionValue<number>;
}

const TABS: { id: MenuCategory; label: string }[] = [
    { id: 'starters',         label: 'Starters' },
    { id: 'tandoori_grill',   label: 'Tandoori & Grill' },
    { id: 'curries',          label: 'Curries' },
    { id: 'biryani_rice',     label: 'Biryani & Rice' },
    { id: 'vegetarian',       label: 'Vegetarian' },
    { id: 'indo_chinese',     label: 'Indo Chinese' },
    { id: 'breads',           label: 'Breads' },
    { id: 'desserts',         label: 'Desserts' },
    { id: 'cocktails_drinks', label: 'Cocktails & Drinks' },
];

export function TimeOfDayTimeline({ activeSection, scrollProgress }: HorizontalNavProps) {
    // Gold progress bar tracks overall section scroll 0→100%
    const barWidth = useTransform(scrollProgress, [0, 1], ['0%', '100%']);

    return (
        <div className={styles.categoryNav}>
            <div className={styles.categoryNavScroll}>
                {TABS.map((tab) => (
                    <span
                        key={tab.id}
                        className={`${styles.categoryTab} ${activeSection === tab.id ? styles.categoryTabActive : ''}`}
                    >
                        {tab.label}
                    </span>
                ))}
            </div>
            <div className={styles.progressBarTrack}>
                <motion.div className={styles.progressBar} style={{ width: barWidth }} />
            </div>
        </div>
    );
}
