/* ============================================
   SECTION 3: QH 3D CARD GALLERY — GSAP
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

function initQHGallery() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    initMobileGallery();
    return;
  }

  const cards = gsap.utils.toArray('.qh-card');
  const totalCards = cards.length; // 5

  // ---- CARD DATA (for metadata row) ----
  const cardData = [
    {
      name: 'The Menu',
      type: 'Indian Fusion Cuisine',
      highlights: 'Tandoori, Biryani, Craft Cocktails',
      experience: 'Dine-in \u00b7 Private Events \u00b7 Takeaway',
      year: 'EST. 2022'
    },
    {
      name: 'Cocktail Bar',
      type: 'Mixology & Spirits',
      highlights: 'Signature Blends, Indian-Inspired',
      experience: 'Walk-in \u00b7 Late Night \u00b7 Groups',
      year: 'DALSTON'
    },
    {
      name: 'Private Dining',
      type: 'Bespoke Experiences',
      highlights: 'Set Menus, Dedicated Space',
      experience: 'Birthdays \u00b7 Corporate \u00b7 Weddings',
      year: '6\u201330 GUESTS'
    },
    {
      name: 'Events',
      type: 'Celebrations & Gatherings',
      highlights: 'Seasonal, Cultural, Corporate',
      experience: 'Custom Packages \u00b7 Full Service',
      year: 'ENQUIRE'
    },
    {
      name: 'Our Story',
      type: 'Dalston Since 2022',
      highlights: 'Locally Sourced, Sustainably Minded',
      experience: 'Tradition Meets Innovation',
      year: 'HACKNEY'
    }
  ];

  // ---- DEFINE THE 5 POSITIONS IN 3D SPACE ----
  const positions = {
    farLeft: {
      x: -1100, z: -500, rotateY: 35, rotateX: 2,
      scale: 0.5, opacity: 0.15, brightness: 0.35
    },
    left: {
      x: -620, z: -300, rotateY: 22, rotateX: 2,
      scale: 0.7, opacity: 0.6, brightness: 0.55
    },
    center: {
      x: -30, z: 0, rotateY: -5, rotateX: 1.5,
      scale: 1, opacity: 1, brightness: 1
    },
    right: {
      x: 550, z: -350, rotateY: -25, rotateX: 2.5,
      scale: 0.65, opacity: 0.55, brightness: 0.45
    },
    farRight: {
      x: 1100, z: -550, rotateY: -40, rotateX: 3,
      scale: 0.45, opacity: 0.1, brightness: 0.3
    }
  };

  // Position order array for easy lookup by offset
  const posOrder = ['farLeft', 'left', 'center', 'right', 'farRight'];

  // ---- HELPER: Get position for card at a given active index ----
  function getPositionForCard(activeIndex, cardIndex) {
    const diff = cardIndex - activeIndex;
    if (diff <= -2) return positions.farLeft;
    if (diff === -1) return positions.left;
    if (diff === 0) return positions.center;
    if (diff === 1) return positions.right;
    if (diff >= 2) return positions.farRight;
  }

  // ---- SET INITIAL STATE: Card 0 is centered ----
  cards.forEach((card, i) => {
    const pos = getPositionForCard(0, i);
    gsap.set(card, {
      x: pos.x,
      z: pos.z,
      rotateY: pos.rotateY,
      rotateX: pos.rotateX,
      scale: pos.scale,
      opacity: pos.opacity,
      filter: `brightness(${pos.brightness})`,
      transformPerspective: 1200
    });
  });

  // ---- TRACK CURRENT ACTIVE INDEX for metadata ----
  let currentActiveIndex = 0;

  // ---- UPDATE METADATA ----
  function updateMeta(index) {
    if (index === currentActiveIndex) return;
    currentActiveIndex = index;

    const data = cardData[index];
    const meta = document.getElementById('qhMeta');
    const targets = meta.querySelectorAll('.qh-meta-value, .qh-meta-name, .qh-meta-year');

    // Quick fade out
    gsap.to(targets, {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        // Swap text
        document.querySelector('#qhMetaTitle .qh-meta-name').textContent = data.name;
        document.getElementById('qhMetaType').textContent = data.type;
        document.getElementById('qhMetaHighlights').textContent = data.highlights;
        document.getElementById('qhMetaExperience').textContent = data.experience;
        document.getElementById('qhMetaYear').textContent = data.year;

        // Fade back in
        gsap.to(targets, {
          opacity: 1,
          duration: 0.2
        });
      }
    });
  }

  // ---- MAIN SCROLL TIMELINE ----
  const stepDuration = 1 / (totalCards - 1); // 0.25 for 5 cards

  const qhTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.qh-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,          // 1.5s catch-up for smooth, heavy feel
      pin: '#qhSection',
      pinSpacing: false,
      onUpdate: (self) => {
        // Determine which card should be active based on scroll progress
        const progress = self.progress; // 0 to 1
        const activeIndex = Math.min(
          totalCards - 1,
          Math.floor(progress * totalCards)
        );
        updateMeta(activeIndex);
      }
    }
  });

  // ---- BUILD TIMELINE: Transition between each active card ----
  for (let step = 0; step < totalCards - 1; step++) {
    const startTime = step * stepDuration;

    cards.forEach((card, cardIndex) => {
      const fromPos = getPositionForCard(step, cardIndex);
      const toPos = getPositionForCard(step + 1, cardIndex);

      qhTl.fromTo(card, {
        x: fromPos.x,
        z: fromPos.z,
        rotateY: fromPos.rotateY,
        rotateX: fromPos.rotateX,
        scale: fromPos.scale,
        opacity: fromPos.opacity,
        filter: `brightness(${fromPos.brightness})`,
        transformPerspective: 1200
      }, {
        x: toPos.x,
        z: toPos.z,
        rotateY: toPos.rotateY,
        rotateX: toPos.rotateX,
        scale: toPos.scale,
        opacity: toPos.opacity,
        filter: `brightness(${toPos.brightness})`,
        transformPerspective: 1200,
        duration: stepDuration,
        ease: 'none'           // Linear — scroll controls the easing
      }, startTime);
    });
  }
}

/* ============================================
   MOBILE: Horizontal scroll-snap fallback
   ============================================ */
function initMobileGallery() {
  const track = document.getElementById('qhTrack');
  const cards = document.querySelectorAll('.qh-card');
  const cardData = [
    { name: 'The Menu', type: 'Indian Fusion Cuisine', highlights: 'Tandoori, Biryani, Craft Cocktails', experience: 'Dine-in \u00b7 Private Events \u00b7 Takeaway', year: 'EST. 2022' },
    { name: 'Cocktail Bar', type: 'Mixology & Spirits', highlights: 'Signature Blends, Indian-Inspired', experience: 'Walk-in \u00b7 Late Night \u00b7 Groups', year: 'DALSTON' },
    { name: 'Private Dining', type: 'Bespoke Experiences', highlights: 'Set Menus, Dedicated Space', experience: 'Birthdays \u00b7 Corporate \u00b7 Weddings', year: '6\u201330 GUESTS' },
    { name: 'Events', type: 'Celebrations & Gatherings', highlights: 'Seasonal, Cultural, Corporate', experience: 'Custom Packages \u00b7 Full Service', year: 'ENQUIRE' },
    { name: 'Our Story', type: 'Dalston Since 2022', highlights: 'Locally Sourced, Sustainably Minded', experience: 'Tradition Meets Innovation', year: 'HACKNEY' }
  ];

  // Use IntersectionObserver to detect which card is snapped to center
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const index = parseInt(entry.target.dataset.index, 10);
        const data = cardData[index];
        document.querySelector('#qhMetaTitle .qh-meta-name').textContent = data.name;
        document.getElementById('qhMetaType').textContent = data.type;
        document.getElementById('qhMetaHighlights').textContent = data.highlights;
        document.getElementById('qhMetaExperience').textContent = data.experience;
        document.getElementById('qhMetaYear').textContent = data.year;
      }
    });
  }, {
    root: track.parentElement,
    threshold: 0.5
  });

  cards.forEach(card => observer.observe(card));
}

/* ============================================
   SECTION 4: JOBY PHILOSOPHY — v4
   Scroll-linked opacity crossfade via ScrollTrigger onUpdate
   ============================================ */

function initJobySection() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) return;

  var slides = document.querySelectorAll('.joby-panel');
  var images = document.querySelectorAll('.joby-img');  // base + layers (all 4)
  var dots = document.querySelectorAll('.joby-dot');

  // Transition zones: progress ranges where crossfades happen
  var transitions = [
    { start: 0.220, end: 0.280, from: 0, to: 1 },
    { start: 0.470, end: 0.530, from: 1, to: 2 },
    { start: 0.720, end: 0.780, from: 2, to: 3 }
  ];

  // Smoothstep easing for transition progress
  function smoothstep(t) {
    return t * t * (3 - 2 * t);
  }

  // Update all slide opacities + dots based on scroll progress
  function updateSlide(progress) {
    var activeSlide = 0;
    var isTransitioning = false;
    var fromSlide = 0, toSlide = 0;
    var t = 0;

    for (var i = 0; i < transitions.length; i++) {
      var tr = transitions[i];
      if (progress >= tr.start && progress <= tr.end) {
        isTransitioning = true;
        fromSlide = tr.from;
        toSlide = tr.to;
        t = smoothstep((progress - tr.start) / (tr.end - tr.start));
        break;
      }
      if (progress > tr.end) {
        activeSlide = tr.to;
      }
    }

    // Apply opacity to all slide panels + images simultaneously
    for (var j = 0; j < slides.length; j++) {
      var op;
      if (isTransitioning) {
        if (j === fromSlide) op = 1 - t;
        else if (j === toSlide) op = t;
        else op = 0;
      } else {
        op = (j === activeSlide) ? 1 : 0;
      }
      slides[j].style.opacity = op;
      if (images[j]) images[j].style.opacity = op;
    }

    // Update dots
    var current = isTransitioning && t > 0.5 ? toSlide : (isTransitioning ? fromSlide : activeSlide);
    for (var k = 0; k < dots.length; k++) {
      dots[k].classList.toggle('active', k === current);
    }
  }

  // Intro animations (line + category + first slide) — run once on pin start
  var introPlayed = false;

  ScrollTrigger.create({
    trigger: '.joby-scroll-spacer',
    start: 'top top',
    end: 'bottom bottom',
    pin: '#jobyPinned',
    pinSpacing: false,
    scrub: 1,
    onUpdate: function(self) {
      updateSlide(self.progress);

      // Play intro stagger once when section enters
      if (!introPlayed && self.progress > 0) {
        introPlayed = true;
        gsap.to('.joby-vert-line', { scaleY: 1, duration: 0.6, ease: 'power1.out' });
        gsap.to('.joby-category', { opacity: 1, duration: 0.4, delay: 0.2 });
        gsap.to('.joby-dots', { opacity: 1, duration: 0.3, delay: 0.35 });
      }
    },
    onLeaveBack: function() {
      // Reset intro so it replays if user scrolls back up past the section
      introPlayed = false;
      gsap.set('.joby-vert-line', { scaleY: 0 });
      gsap.set('.joby-category', { opacity: 0 });
      gsap.set('.joby-dots', { opacity: 0 });
    }
  });

  // Set initial state: slide 0 fully visible, rest hidden
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.opacity = (i === 0) ? 1 : 0;
    if (images[i]) images[i].style.opacity = (i === 0) ? 1 : 0;
  }
}

/* ============================================
   INIT
   ============================================ */
function initAnimations() {
  initQHGallery();
  initJobySection();
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', initAnimations);
