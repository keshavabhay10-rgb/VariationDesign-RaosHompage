'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion';
import styles from './section4.module.css';
import { TimeOfDayTimeline } from './TimeOfDayTimeline';
import { JourneySubsection } from './JourneySubsection';

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

// ─── MENU DATA ────────────────────────────────────────────────────────────

const STARTERS = [
    { name: 'Hot and Sour Veg Soup', price: '£5.50',  description: 'A tangy and spicy soup with fresh vegetables and mushrooms.',                    dietary: ['V', 'GF'], contains: 'Celery, Soy' },
    { name: 'Hot and Sour Chicken',  price: '£6.50',  description: 'A flavourful mix of chicken, vegetables, and spices with a tangy kick.',         dietary: ['GF'],      contains: 'Celery, Soy' },
    { name: 'Lamb Seekh Kebab',      price: '£8.95',  description: 'Minced lamb infused with fresh herbs and spices, cooked in our tandoor.',        dietary: ['GF'],      isChefsPick: true },
];

const TANDOORI_GRILL = [
    { name: 'Paneer Tikka',     price: '£11.95', description: 'Marinated cottage cheese grilled in our clay tandoor, served with mint chutney.',                         dietary: ['V', 'GF'], contains: 'Dairy',       isChefsPick: true },
    { name: 'Tandoori Chicken', price: '£13.95', description: 'Half chicken marinated for 24 hours in yoghurt and house spices, charred in our tandoor.',                dietary: ['GF'],      contains: 'Dairy' },
    { name: 'Lamb Chops',       price: '£16.95', description: 'Tender rack of lamb, marinated in Kashmiri chilli and garam masala, finished in the tandoor.',            dietary: ['GF'],      contains: 'Dairy',       isChefsPick: true },
];

const CURRIES = [
    { name: 'Butter Chicken',  price: '£14.95', description: 'Tender chicken in a rich, creamy tomato sauce with aromatic spices and a touch of fenugreek.', image: '/menu/PaneerButterMasala.png', dietary: ['GF'], contains: 'Dairy, Nuts', isChefsPick: true },
    { name: 'Lamb Rogan Josh', price: '£15.95', description: 'Slow-braised lamb in a rich Kashmiri sauce of tomatoes, yoghurt, and aromatic spices.',                    dietary: ['GF'], contains: 'Dairy' },
    { name: 'Prawn Masala',    price: '£16.95', description: 'King prawns in a fragrant masala sauce with fresh tomatoes, ginger, and curry leaves.',                     dietary: ['GF'], contains: 'Shellfish' },
    { name: 'Chicken Saag',    price: '£13.95', description: 'Tender chicken cooked with fresh spinach, garlic, and green chillies.',                                     dietary: ['GF'], contains: 'Dairy' },
];

const BIRYANI_RICE = [
    { name: 'Lamb Dum Biryani', price: '£16.95', description: 'Slow-cooked lamb layered with fragrant basmati, saffron, and caramelised onions sealed in dough.', image: '/menu/HyderabadiDumBiryani.png', dietary: ['GF'], contains: 'Dairy, Gluten', isChefsPick: true },
    { name: 'Chicken Biryani',  price: '£14.95', description: 'Aromatic basmati rice layered with spiced chicken, mint, and saffron.',                                   dietary: ['GF'], contains: 'Dairy' },
    { name: 'Vegetable Pulao',  price: '£10.95', description: 'Fragrant basmati with seasonal garden vegetables and whole spices.',                   image: '/menu/VegPulao.png', dietary: ['V', 'GF'] },
];

const VEGETARIAN = [
    { name: 'Palak Paneer',  price: '£11.95', description: 'Fresh cottage cheese cubes in a vibrant spinach and green chilli sauce.',      image: '/menu/PalakPaneer.png', dietary: ['V', 'GF'], contains: 'Dairy' },
    { name: 'Dal Makhani',   price: '£10.95', description: 'Black lentils slow-cooked overnight with butter, cream, and warming spices.',  image: '/menu/DalMakhni.png',   dietary: ['V', 'GF'], contains: 'Dairy' },
    { name: 'Chilli Paneer', price: '£11.95', description: 'Crispy paneer tossed with peppers, onions, soy, and fiery chillies.',          image: '/menu/KadaiPaneer.png', dietary: ['V'],        contains: 'Dairy, Soy, Gluten' },
];

const INDO_CHINESE = [
    { name: 'Chilli Chicken',  price: '£12.95', description: 'Crispy chicken pieces wok-tossed with spring onions, peppers, and a fiery soy-chilli glaze.',           contains: 'Soy, Gluten' },
    { name: 'Gobi Manchurian', price: '£11.95', description: 'Crispy cauliflower, tangy Indo-Chinese glaze, spring onion garnish.',   image: '/menu/GobiManchurian.png', dietary: ['V'], contains: 'Soy, Gluten' },
    { name: 'Hakka Noodles',   price: '£10.95', description: 'Stir-fried noodles with vegetables and Indo-Chinese sauces.',                                            dietary: ['V'], contains: 'Gluten, Soy' },
];

const BREADS = [
    { name: 'Garlic Naan',   price: '£3.50', description: 'Soft leavened bread topped with garlic and fresh coriander, baked in tandoor.', image: '/menu/ButterNaan.png',    dietary: ['V'], contains: 'Gluten, Dairy' },
    { name: 'Butter Naan',   price: '£3.00', description: 'Classic tandoor-baked naan, brushed with butter.',                               image: '/menu/ButterNaan.png',    dietary: ['V'], contains: 'Gluten, Dairy' },
    { name: 'Peshwari Naan', price: '£3.95', description: 'Sweet naan stuffed with coconut, almonds, and sultanas.',                                         dietary: ['V'], contains: 'Gluten, Dairy, Nuts' },
    { name: 'Tandoori Roti', price: '£2.50', description: 'Whole wheat, smoky clay-oven blistered.',                                        image: '/menu/TandooriRoti.png', dietary: ['V'], contains: 'Gluten' },
];

const DESSERTS = [
    { name: 'Gulab Jamun', price: '£5.95', description: 'Golden milk dumplings soaked in rose-scented sugar syrup, served warm.',  image: '/menu/GulabJamun.jpeg',      dietary: ['V'],        contains: 'Dairy, Gluten', isChefsPick: true },
    { name: 'Mango Kulfi', price: '£5.50', description: 'Traditional Indian frozen dessert with Alphonso mango and cardamom.',                                           dietary: ['V', 'GF'], contains: 'Dairy' },
    { name: 'Rasmalai',    price: '£5.95', description: 'Soft paneer dumplings in sweetened saffron milk.',                           image: '/menu/Rasmalai.jpeg',        dietary: ['V', 'GF'], contains: 'Dairy' },
    { name: 'Jalebi',      price: '£4.95', description: 'Crisp saffron spirals, syrup-soaked with Rabri — irresistible.',             image: '/menu/JalebiwithRabri.jpeg', dietary: ['V'],        contains: 'Gluten, Dairy' },
];

const COCKTAILS_DRINKS = [
    { name: 'Bombay Sunset',         price: '£12.50', description: 'Mango, turmeric-infused vodka, passion fruit, lime, and a chilli rim.' },
    { name: 'Spiced Old Fashioned',  price: '£13.00', description: 'Bourbon, cardamom syrup, Angostura bitters, flamed cinnamon.' },
    { name: 'Rose & Lychee Martini', price: '£12.00', description: 'Gin, rose water, lychee liqueur, lime, and edible petals.' },
    { name: 'Mango Lassi',           price: '£4.50',  description: 'Thick, creamy, saffron-topped.',   image: '/menu/MangoLassi.png',  dietary: ['V', 'GF'], contains: 'Dairy' },
    { name: 'Masala Chai',           price: '£3.50',  description: 'Cardamom, ginger, simmered milk.',  image: '/menu/MasalaChai.jpeg', dietary: ['V'],        contains: 'Dairy' },
];

// ─── CATEGORY CONFIG ──────────────────────────────────────────────────────

const CATEGORY_CONFIG = [
    { id: 'starters'         as MenuCategory, title: 'Starters',           description: 'Begin your journey with bold first bites.',                              dishes: STARTERS,         visibilityRange: [0.08, 0.10, 0.14, 0.16] as [number,number,number,number], cardScrollRange: [0.11, 0.14] as [number,number] },
    { id: 'tandoori_grill'   as MenuCategory, title: 'Tandoori & Grill',   description: 'Clay oven mastery, charred to perfection.',                              dishes: TANDOORI_GRILL,   visibilityRange: [0.16, 0.18, 0.25, 0.27] as [number,number,number,number], cardScrollRange: [0.19, 0.25] as [number,number] },
    { id: 'curries'          as MenuCategory, title: 'Curries',             description: 'Rich, aromatic sauces built on generations of craft.',                   dishes: CURRIES,          visibilityRange: [0.27, 0.29, 0.36, 0.38] as [number,number,number,number], cardScrollRange: [0.30, 0.36] as [number,number] },
    { id: 'biryani_rice'     as MenuCategory, title: 'Biryani & Rice',     description: 'Slow-layered, saffron-kissed, impossibly fragrant.',                     dishes: BIRYANI_RICE,     visibilityRange: [0.38, 0.40, 0.47, 0.49] as [number,number,number,number], cardScrollRange: [0.41, 0.47] as [number,number] },
    { id: 'vegetarian'       as MenuCategory, title: 'Vegetarian',          description: 'Vegetables treated with the same reverence as any protein.',             dishes: VEGETARIAN,       visibilityRange: [0.49, 0.51, 0.58, 0.60] as [number,number,number,number], cardScrollRange: [0.52, 0.58] as [number,number] },
    { id: 'indo_chinese'     as MenuCategory, title: 'Indo Chinese',        description: 'Two great cuisines collide — fiery, wok-tossed, electric.',              dishes: INDO_CHINESE,     visibilityRange: [0.60, 0.62, 0.69, 0.71] as [number,number,number,number], cardScrollRange: [0.63, 0.69] as [number,number] },
    { id: 'breads'           as MenuCategory, title: 'Breads',              description: 'Fresh from the tandoor, pillowy and perfectly charred.',                 dishes: BREADS,           visibilityRange: [0.71, 0.73, 0.78, 0.80] as [number,number,number,number], cardScrollRange: [0.74, 0.78] as [number,number] },
    { id: 'desserts'         as MenuCategory, title: 'Desserts',            description: 'The sweetest traditions, served with pride.',                            dishes: DESSERTS,         visibilityRange: [0.80, 0.82, 0.88, 0.90] as [number,number,number,number], cardScrollRange: [0.83, 0.88] as [number,number] },
    { id: 'cocktails_drinks' as MenuCategory, title: 'Cocktails & Drinks', description: "Spirits as complex as our spices. Cocktails you won't forget.",          dishes: COCKTAILS_DRINKS, visibilityRange: [0.90, 0.92, 1.0, 1.0]   as [number,number,number,number], cardScrollRange: [0.93, 0.98] as [number,number], stayVisible: true },
];

// ─── NAV WRAPPER (hides nav while intro header is visible) ───────────────

function NavWrapper({ scrollYProgress, children }: { scrollYProgress: ReturnType<typeof useMotionValue<number>>, children: React.ReactNode }) {
    const navOpacity = useTransform(scrollYProgress, [0.05, 0.08], [0, 1]);
    return (
        <motion.div style={{ opacity: navOpacity }}>
            {children}
        </motion.div>
    );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────

export default function MenuHighlights() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeCategory, setActiveCategory] = useState<MenuCategory>('starters');

    // Manual scroll progress — bypasses GSAP interference with Framer Motion's
    // layout-time element measurement. getBoundingClientRect() at scroll time
    // always reads the live position regardless of GSAP pin spacers.
    const scrollYProgress = useMotionValue(0);

    useEffect(() => {
        const updateProgress = () => {
            const section = sectionRef.current;
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollable = sectionHeight - viewportHeight;
            if (scrollable <= 0) return;
            const scrolled = -rect.top;
            const progress = Math.min(1, Math.max(0, scrolled / scrollable));
            scrollYProgress.set(progress);
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
        return () => window.removeEventListener('scroll', updateProgress);
    }, [scrollYProgress]);

    // Track active category from scroll progress
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if      (latest < 0.16) setActiveCategory('starters');
        else if (latest < 0.27) setActiveCategory('tandoori_grill');
        else if (latest < 0.38) setActiveCategory('curries');
        else if (latest < 0.49) setActiveCategory('biryani_rice');
        else if (latest < 0.60) setActiveCategory('vegetarian');
        else if (latest < 0.71) setActiveCategory('indo_chinese');
        else if (latest < 0.80) setActiveCategory('breads');
        else if (latest < 0.90) setActiveCategory('desserts');
        else                    setActiveCategory('cocktails_drinks');
    });

    // Section fade-in on entry
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

    // Intro header fades in then out before Starters begin
    const headerOpacity = useTransform(scrollYProgress, [0, 0.02, 0.04, 0.06], [0, 1, 1, 0]);
    const headerY       = useTransform(scrollYProgress, [0, 0.02, 0.04, 0.06], [30, 0, 0, -30]);

    return (
        <section
            ref={sectionRef}
            id="menu-highlights"
            data-section-name="menu-highlights"
            className={styles.sectionWrapper}
            style={{ height: '2000vh' }}
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
                    {/* Horizontal category nav — hidden while intro header is visible */}
                    <NavWrapper scrollYProgress={scrollYProgress}>
                        <TimeOfDayTimeline
                            activeSection={activeCategory}
                            scrollProgress={scrollYProgress}
                        />
                    </NavWrapper>

                    <div className={styles.contentArea}>

                        {/* Intro header */}
                        <motion.div
                            className={styles.mainHeader}
                            style={{
                                opacity: headerOpacity,
                                y: headerY,
                                position: 'absolute',
                                top: '42%',
                                left: 0,
                                right: 0,
                            }}
                        >
                            <span className={styles.mainHeaderLabel}>Our Menu</span>
                            <h2 className={styles.mainHeaderTitle}>Curated for Every Palate</h2>
                            <p className={styles.mainHeaderSubtitle}>
                                Bold flavours rooted in tradition, reimagined with modern flair.
                                Every dish crafted with locally sourced ingredients.
                            </p>
                            <div className={styles.mainHeaderDivider} />
                        </motion.div>

                        {/* Nine category subsections */}
                        {CATEGORY_CONFIG.map((cat) => (
                            <JourneySubsection
                                key={cat.id}
                                title={cat.title}
                                description={cat.description}
                                dishes={cat.dishes}
                                scrollProgress={scrollYProgress}
                                visibilityRange={cat.visibilityRange}
                                cardScrollRange={cat.cardScrollRange}
                                stayVisible={cat.stayVisible}
                            />
                        ))}

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
