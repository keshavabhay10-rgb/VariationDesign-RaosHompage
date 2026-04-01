'use client';

import React from 'react';
import styles from './section4.module.css';
import { cn } from '@/lib/cn';

type TimePeriod = 'afternoon' | 'evening' | 'night';

interface TimelineProps {
    activeSection: TimePeriod;
}

const SunIcon = ({ active }: { active: boolean }) => (
    <img
        src="/icons/sun-transparent.png"
        alt="Afternoon"
        className={cn(styles.timelineIcon, active && styles.timelineIconActive)}
    />
);

const SunMoonIcon = ({ active }: { active: boolean }) => (
    <img
        src="/icons/dusk-transparent.png"
        alt="Evening"
        className={cn(styles.timelineIcon, active && styles.timelineIconActive)}
    />
);

const MoonIcon = ({ active }: { active: boolean }) => (
    <img
        src="/icons/moon-transparent.png"
        alt="Night"
        className={cn(styles.timelineIcon, active && styles.timelineIconActive)}
    />
);

export function TimeOfDayTimeline({ activeSection }: TimelineProps) {
    return (
        <div className={styles.timeline}>
            <div className={styles.timelineTrack}>
                <div className={styles.timelineNode}>
                    <SunIcon active={activeSection === 'afternoon'} />
                    <span className={cn(styles.label, activeSection === 'afternoon' && styles.labelActive)}>
                        Afternoon
                    </span>
                </div>
                <div className={cn(styles.timelineLine, activeSection === 'afternoon' && styles.lineActive)} />
                <div className={styles.timelineNode}>
                    <SunMoonIcon active={activeSection === 'evening'} />
                    <span className={cn(styles.label, activeSection === 'evening' && styles.labelActive)}>
                        Evening
                    </span>
                </div>
                <div className={cn(styles.timelineLine, activeSection === 'evening' && styles.lineActive)} />
                <div className={styles.timelineNode}>
                    <MoonIcon active={activeSection === 'night'} />
                    <span className={cn(styles.label, activeSection === 'night' && styles.labelActive)}>
                        Night
                    </span>
                </div>
            </div>
        </div>
    );
}
