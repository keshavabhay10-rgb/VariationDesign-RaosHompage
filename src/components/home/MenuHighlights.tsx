'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion';
import styles from './section4.module.css';
import { TimeOfDayTimeline } from './TimeOfDayTimeline';
import { JourneySubsection } from './JourneySubsection';

const AFTERNOON_DISHES = [
    { name: 'Hyderabadi Biryani',  description: 'Slow-cooked dum, saffron-kissed layers',                  image: '/menu/HyderabadiDumBiryani.png' },
    { name: 'Vegetable Pulao',     description: 'Fragrant basmati with seasonal garden vegetables',          image: '/menu/VegPulao.png' },
    { name: 'Egg Fried Rice',      description: 'Wok-tossed with egg, spring onion, soy',                  image: '/menu/EggFriedRice.png' },
    { name: 'Curd Rice',           description: 'Cool, tempered yogurt rice with mustard seeds',            image: '/menu/CurdRice.png' },
    { name: 'Chana Masala',        description: 'A complete meal — dal, sabzi, rice, roti, sides',          image: '/menu/ChannaMasala.png' },
    { name: 'Lemon Rice',          description: 'Tangy, turmeric-tempered South Indian rice',               image: '/menu/LemonRice.png' },
];

const EVENING_DISHES = [
    { name: 'Onion Pakora',        description: 'Crisp-fried, spiced, golden',                              image: '/menu/PakoraPlatter.png' },
    { name: 'Veg Samosa',          description: 'Flaky pastry, spiced potato-pea filling',                  image: '/menu/VegSamosa.png' },
    { name: 'Palak Paneer',        description: 'Creamy spinach, soft paneer, fragrant spices',             image: '/menu/PalakPaneer.png' },
    { name: 'Masala Chai',         description: 'Cardamom, ginger, simmered milk',                          image: '/menu/MasalaChai.jpeg' },
    { name: 'Gobi Manchurian',     description: 'Crispy cauliflower, tangy Indo-Chinese glaze',             image: '/menu/GobiManchurian.png' },
    { name: 'Paneer 65',           description: 'Spice-crusted, golden-fried, fiery',                       image: '/menu/Paneer65.png' },
];

const NIGHT_DISHES = [
    { name: 'Dal Makhani',         description: 'Overnight-simmered black lentils, cream finish',           image: '/menu/DalMakhni.png' },
    { name: 'Tandoori Roti',       description: 'Whole wheat, smoky clay-oven blistered',                   image: '/menu/TandooriRoti.png' },
    { name: 'Butter Chicken',      description: 'Tender tikka in velvety tomato-cream sauce',               image: '/menu/PaneerButterMasala.png' },
    { name: 'Kadai Paneer',        description: 'Smoky bell pepper, crumbled spice, wok-charred',           image: '/menu/KadaiPaneer.png' },
    { name: 'Butter Naan',         description: 'Soft, buttery, fresh from the tandoor',                    image: '/menu/ButterNaan.png' },
];

export default function MenuHighlights() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activePeriod, setActivePeriod] = useState<'afternoon' | 'evening' | 'night'>('afternoon');

    // Manual scroll tracking — bypasses Framer Motion's layout-time measurement,
    // which is distorted by the preceding GSAP pinSpacing:false sections.
    // getBoundingClientRect() at scroll time always reads the live position.
    const scrollYProgress = useMotionValue(0);

    useEffect(() => {
        const updateProgress = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Progress 0: section top at viewport top
            // Progress 1: section bottom at viewport bottom
            const scrolled = -rect.top;
            const scrollable = sectionHeight - viewportHeight;

            if (scrollable <= 0) return;

            const progress = Math.min(1, Math.max(0, scrolled / scrollable));
            scrollYProgress.set(progress);
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        // Run once immediately to set initial state
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, [scrollYProgress]);

    // Period tracking from the live MotionValue
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (latest < 0.44)       setActivePeriod('afternoon');
        else if (latest < 0.72)  setActivePeriod('evening');
        else                     setActivePeriod('night');
    });

    // Derived opacity/position values — all driven by the manually-set MotionValue
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
    const headerOpacity  = useTransform(scrollYProgress, [0, 0.05, 0.10, 0.15], [0, 1, 1, 0]);
    const headerY        = useTransform(scrollYProgress, [0, 0.05, 0.10, 0.15], [20, 0, 0, -20]);

    return (
        <section
            ref={sectionRef}
            id="menu-highlights"
            data-section-name="time-of-day"
            className={styles.sectionWrapper}
            style={{ height: '1200vh' }}
        >
            <div className={styles.stickyViewport}>
                <motion.div
                    style={{
                        opacity: sectionOpacity,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}
                >
                    <TimeOfDayTimeline activeSection={activePeriod} />

                    <div className={styles.contentArea}>
                        <motion.div
                            className={styles.mainHeader}
                            style={{
                                opacity: headerOpacity,
                                y: headerY,
                                top: '40%',
                                position: 'absolute',
                                left: 120,
                                right: 120,
                            }}
                        >
                            <h2>Taste the Map of India — From Afternoon to Starlight</h2>
                        </motion.div>

                        <JourneySubsection
                            title="Afternoon Feasts"
                            description="Biryani, pulao, thalis — made for sharing, built for hunger."
                            dishes={AFTERNOON_DISHES}
                            scrollProgress={scrollYProgress}
                            visibilityRange={[0.12, 0.16, 0.40, 0.44]}
                            cardScrollRange={[0.16, 0.36]}
                        />

                        <JourneySubsection
                            title="Evening Snacks"
                            description="Pakoras, samosas, chai — slow down, savor the moment."
                            dishes={EVENING_DISHES}
                            scrollProgress={scrollYProgress}
                            visibilityRange={[0.44, 0.48, 0.68, 0.72]}
                            cardScrollRange={[0.48, 0.65]}
                        />

                        <JourneySubsection
                            title="Night Traditions"
                            description="Naan, curries, tandoor — linger over flavors that travel generations."
                            dishes={NIGHT_DISHES}
                            scrollProgress={scrollYProgress}
                            visibilityRange={[0.72, 0.76, 0.95, 0.98]}
                            cardScrollRange={[0.76, 0.92]}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
