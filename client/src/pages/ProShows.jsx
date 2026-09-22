import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Imports for desktop landscape grid and mobile portrait version
import ProShowGrid from '/proshow/proshowgrid.webp'
import ProShowMobile from '/proshow/proshow.webp'

const artistName = 'Shaan Rahman'

// ---------------------------------------------------------------------------
// Dhvani poster: where each cutout sits inside the poster frame.
// Every number is a % of the FRAME (not the screen), and the frame keeps a
// fixed 3240:1350 shape, so the layout stays identical on every screen size.
//   left   = where the cutout's horizontal CENTRE is (0% = frame's left edge)
//   width  = how wide the cutout is
//   bottom = a NEGATIVE number pushes the cutout DOWN past the frame's bottom
//            edge. The frame has overflow-hidden, so that overhang is cut off
//            and the hard bottom edge of the PNG is never visible.
// If a lady looks a little off, nudge these numbers (e.g. bottom -22.5% ->
// -24% moves her lower, left 38.3% -> 37% moves her left).
// ---------------------------------------------------------------------------
const POSTER_LAYERS = {
 dhvani3: { left: '58%', width: '35%', bottom: '-22.5%' }, // left lady
 dhvani2: { left: '78%', width: '26.6%', bottom: '-15%' }, // right lady
 dhvani1: { left: '50%', width: '43.5%', bottom: '-30%' }, // centre lady
}

const faqs = [
 {
  q: 'How do I obtain entry passes for the ProShow?',
  a: 'ProShow passes can be booked online via the official registration link or collected from the Drishti Registration Desk on campus. Passes are linked to your Drishti ID.',
 },
 {
  q: 'Can non-CETians attend the ProShow?',
  a: 'Yes! The ProShow is open to students from all colleges with a valid college ID card and an official Drishti ProShow pass.',
 },
 {
  q: 'What items are prohibited inside the concert venue?',
  a: 'Prohibited items include professional cameras, tripods, glass bottles, food items, sharp objects, laser pointers, alcohol and other intoxicating substances. Standard bags are subject to security search.',
 },
]

function ProShowsPage({ embedded = false }) {
 const [openFaq, setOpenFaq] = useState(null)

 const pinWrapperRef = useRef(null)
 const headerRef = useRef(null)
 const h1Ref = useRef(null)
 const artistRef = useRef(null)
 const stageAreaRef = useRef(null)
 const cardWrapperRef = useRef(null)
 const cardInnerRef = useRef(null)
 const shadowRef = useRef(null)
 const glowRef = useRef(null)
 const particlesRef = useRef([])
 const artistRevealRef = useRef(null)
 const revealBaseRef = useRef(null)
 const revealLayer1Ref = useRef(null)
 const revealLayer2Ref = useRef(null)
 const revealLayer3Ref = useRef(null)
 const faqSectionRef = useRef(null)

 useEffect(() => {
  if (h1Ref.current) applyLetterGradient(h1Ref.current)
  if (artistRef.current) applyLetterGradient(artistRef.current)
 }, [])

 useEffect(() => {
  const ctx = gsap.context(() => {
   // Set Initial States
   gsap.set([headerRef.current, artistRef.current, faqSectionRef.current], {
    opacity: 0,
    y: 20,
   })

   gsap.set(cardWrapperRef.current, {
    rotationX: 90,
    rotationY: 0,
    rotationZ: 0,
    x: 0,
    y: 60,
    z: -100,
    scale: 0.75,
    opacity: 1,
   })

   gsap.set(cardInnerRef.current, { rotationY: 0 })
   gsap.set(shadowRef.current, { opacity: 0.8, scale: 0.7, x: 0 })
   gsap.set(glowRef.current, { opacity: 0.3, scale: 0.6 })

   particlesRef.current.forEach((particle) => {
    if (!particle) return
    gsap.set(particle, {
     x: (Math.random() - 0.5) * 500,
     y: gsap.utils.random(-150, 150),
     scale: gsap.utils.random(0.3, 1.2),
     opacity: gsap.utils.random(0.4, 0.95),
    })
   })

   const scrollTl = gsap.timeline({
    scrollTrigger: {
     trigger: pinWrapperRef.current,
     start: 'top -5%',
     end: '+=110%',
     pin: true,
     scrub: 0.5,
     anticipatePin: 1,
    },
   })

   scrollTl.to(
    particlesRef.current,
    {
     y: '-=100',
     stagger: 0.02,
     duration: 1,
    },
    0
   )

   scrollTl.to(
    cardWrapperRef.current,
    {
     x: 0,
     y: 0,
     z: 0,
     rotationX: 0,
     rotationY: 0,
     rotationZ: 0,
     scale: 1,
     duration: 1.8,
     ease: 'sine.inOut',
    },
    0
   )

   scrollTl.to(
    shadowRef.current,
    {
     opacity: 0,
     scale: 0.2,
     duration: 1.1,
     ease: 'sine.inOut',
    },
    0.9
   )

   scrollTl.to(
    cardInnerRef.current,
    {
     rotationY: 180,
     duration: 1.9,
     ease: 'sine.inOut',
    },
    '>'
   )

   scrollTl.to(
    glowRef.current,
    {
     opacity: 1,
     scale: 1.2,
     duration: 0.7,
     ease: 'sine.out',
    },
    '<=0.9'
   )

   scrollTl
    .to(
     headerRef.current,
     {
      opacity: 1,
      y: 0,
      duration: 1.5,
     },
     '<=1'
    )
    .to(
     artistRef.current,
     {
      opacity: 1,
      y: 0,
      duration: 1.5,
     },
     '<+0.2'
    )
    .to(
     faqSectionRef.current,
     {
      opacity: 1,
      y: 0,
      duration: 1.5,
     },
     '<+0.2'
    )

   ScrollTrigger.sort()
   ScrollTrigger.refresh()
  }, pinWrapperRef)

  // Layered artist reveal: hidden until the user scrolls this section into
  // view, then a quick one-shot cascade (dhvani1 leads, dhvani2 + dhvani3
  // follow right on its heels) plays in real time — not scroll-scrubbed, so
  // it doesn't demand any extra scrolling once triggered. A light depth
  // parallax continues while the section is in view. The background sits
  // static behind all three, visible from the moment the section is reached.
  const revealCtx = gsap.context(() => {
   if (
    !artistRevealRef.current ||
    !revealLayer1Ref.current ||
    !revealLayer2Ref.current ||
    !revealLayer3Ref.current
   ) {
    return
   }

   // xPercent: -50 is the centering offset (matches each layer's `left: X%`
   // being the horizontal CENTER, not the left edge). It has to be restated
   // in every gsap call below — GSAP owns the whole `transform` property on
   // an element it animates, so any tween that omits xPercent here would
   // reset the layer back to being left-aligned instead of centered.
   gsap.set(revealLayer1Ref.current, {
    autoAlpha: 0,
    xPercent: -50,
    y: 36,
    scale: 1.04,
    transformOrigin: 'bottom center',
   })
   gsap.set(revealLayer2Ref.current, {
    autoAlpha: 0,
    xPercent: -50,
    y: 28,
    scale: 1.04,
    transformOrigin: 'bottom center',
   })
   gsap.set(revealLayer3Ref.current, {
    autoAlpha: 0,
    xPercent: -50,
    y: 28,
    scale: 1.04,
    transformOrigin: 'bottom center',
   })

   // This section is scrolled to (not part of the initial hero view): only
   // the background should be visible until the user scrolls it into range,
   // at which point the three layers cascade in on their own, in real time,
   // without needing any further scrolling. toggleActions: 'play none none
   // reverse' fires the timeline once on entry (and reverses it if the user
   // scrolls back up past the start line) — it does NOT scrub with scroll
   // distance, so the whole cascade plays out over ~0.8s regardless of how
   // fast or slow the user scrolls.
   const revealTl = gsap.timeline({
    scrollTrigger: {
     trigger: artistRevealRef.current,
     start: 'top 98%',
     toggleActions: 'play none none reverse',
    },
   })

   revealTl
    .to(revealLayer1Ref.current, { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, ease: 'power2.out' })
    .to(revealLayer2Ref.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.28')
    .to(revealLayer3Ref.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }, '-=0.3')

   // Depth parallax while scrolling through the section.
   // The drift is small and goes equally UP and DOWN around the resting
   // position (from +N to -N), so:
   //  - when the poster is in the middle of the screen the ladies sit exactly
   //    where POSTER_LAYERS puts them (matching the Figma reference), and
   //  - they never lift far enough to show the bottom edge of their PNG.
   // xPercent: -50 is repeated for the same reason as above.
   gsap.fromTo(
    revealLayer1Ref.current,
    { xPercent: -50, yPercent: 2 },
    {
     xPercent: -50,
     yPercent: -2,
     ease: 'none',
     scrollTrigger: {
      trigger: artistRevealRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
     },
    }
   )

   gsap.fromTo(
    [revealLayer2Ref.current, revealLayer3Ref.current],
    { xPercent: -50, yPercent: 1.5 },
    {
     xPercent: -50,
     yPercent: -1.5,
     ease: 'none',
     scrollTrigger: {
      trigger: artistRevealRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
     },
    }
   )

   // Layout can shift slightly once the (large) background photo finishes
   // loading, which can throw off the trigger math computed beforehand —
   // refresh once it's actually in.
   const bgImg = revealBaseRef.current?.querySelector('img')
   if (bgImg && !bgImg.complete) {
    bgImg.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
   }
  }, artistRevealRef)

  const refreshRaf = requestAnimationFrame(() => {
   ScrollTrigger.sort()
   ScrollTrigger.refresh()
  })

  return () => {
   cancelAnimationFrame(refreshRaf)
   revealCtx.revert()
   ctx.revert()
  }
 }, [])

 return (
  <div className={`relative min-h-svh w-full text-white ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
   {!embedded && <Backdrop />}
   {!embedded && <Navbar activeSection="proshows" />}

   {/* Pinned Scroll Section with explicit Navbar clearance */}
  <div ref={pinWrapperRef} className="relative w-full min-h-screen flex flex-col items-center pt-28 lg:pt-32 pb-6 overflow-hidden">

    {/* Page Header (Cleared from Navbar overlap) */}
    <header ref={headerRef} className="z-10 px-[clamp(16px,4vw,40px)] text-center opacity-0">
     <h1
      ref={h1Ref}
      style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
      className="text-[clamp(40px,7vw,78px)] font-bold uppercase leading-[0.95] tracking-tight"
     >
      Pro Show
     </h1>
    </header>

    {/* 3D Stage Area */}
    <main ref={stageAreaRef} className="relative w-full max-w-[1200px] px-4 mt-6 lg:mt-8 flex flex-col items-center justify-center">

     {/* Ambient Glow */}
     <div
      ref={glowRef}
      className="pointer-events-none absolute h-[400px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35)_0%,rgba(0,0,0,0)_70%)] blur-3xl"
     />

     {/* Ground Shadow */}
     <div
      ref={shadowRef}
      className="pointer-events-none absolute bottom-2 h-[50px] w-[300px] lg:w-[550px] rounded-[100%] bg-black/95 blur-xl"
     />

     {/* Golden Spangles */}
     <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {Array.from({ length: 16 }).map((_, i) => (
       <div
        key={i}
        ref={(el) => { particlesRef.current[i] = el }}
        className="absolute h-1.5 w-1.5 rounded-full bg-gold-gradient"
       />
      ))}
     </div>

     {/* 3D Stage Perspective Wrapper: Scaled down slightly for laptop viewports */}
     <div className="perspective-[1400px] z-10 w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[780px]">
      <div
       ref={cardWrapperRef}
       className="transform-style-3d relative w-full rounded-2xl"
      >
       {/* Flip Container */}
       <div
        ref={cardInnerRef}
        className="transform-style-3d relative w-full h-[460px] sm:h-[500px] lg:h-auto lg:aspect-[16/9] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
        style={{ transformStyle: 'preserve-3d' }}
       >
        {/* BACK OF CARD: Metallic Gold */}
        <div
         className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#d4af37] via-[#2a2208] to-[#080808] border border-gold/40 shadow-2xl"
         style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(0deg) translateZ(1px)',
          willChange: 'transform'
         }}
        />

        {/* FRONT OF CARD: Revealed Responsive Image */}
        <div
         className="absolute inset-0 rounded-2xl overflow-hidden bg-[#080808] border border-gold/30"
         style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg) translateZ(1px)',
          willChange: 'transform'
         }}
        >
         <picture>
          <source media="(min-width: 1024px)" srcSet={ProShowGrid} />
          <img
           src={ProShowMobile}
           alt="Shaan Rahman Live in Concert"
           loading="lazy"
           decoding="async"
           className="h-full w-full object-cover rounded-2xl relative z-10"
          />
         </picture>
        </div>
       </div>
      </div>
     </div>
    </main>

    {/* Artist Name */}
    {/* Artist Name */}
    {/*
    <div
     ref={artistRef}
     className="z-10 text-center opacity-0"
    >
     <h2
      style={{ fontFamily: "'Clash Display', sans-serif" }}
      className="text-[clamp(24px,4vw,44px)] font-bold uppercase tracking-wider text-gold-gradient"
     >
      {artistName}
     </h2>
    </div>
    */}
   </div>

   <section ref={artistRevealRef} className="relative w-full bg-black px-3 py-10 sm:px-6 sm:py-14 lg:py-20">
    {/*
     Poster frame: locked to the real Figma canvas ratio (3240x1350) so the
     background photo, the baked-in DHVANI wordmark/PERFORMING LIVE text/logos,
     and the three artist cutouts always scale together as one composition —
     on any screen width — instead of being cropped by a mismatched container.
    */}
    <div
     className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-lg sm:rounded-2xl"
     style={{ aspectRatio: '3240 / 1350' }}
    >
     {/* Background: crowd photo with DHVANI wordmark, PERFORMING LIVE and logos already baked in */}
     <div ref={revealBaseRef} className="absolute inset-0 z-0">
      <img
       src="/proshow/Screenshot%202026-09-21%20150303.png"
       alt="Dhvani performing live — Drishti '26"
       className="h-full w-full object-cover"
      />
     </div>

     {/*
      Note: these three layers are centered via GSAP's xPercent (set in the
      reveal effect below), NOT a CSS translateX. gsap.set/.to fully replace
      the `transform` property, so any translateX baked in here as inline
      style or a Tailwind class would get silently wiped the instant GSAP
      touches y/scale/yPercent on the same element — which is what was
      pushing dhvani2 off-canvas and burying dhvani3 under dhvani1.
     */}

     {/* Back layer: dhvani3 (viewer's left) + dhvani2 (viewer's right), same depth.
         Positions come from POSTER_LAYERS at the top of this file. */}
     <div
      ref={revealLayer3Ref}
      className="absolute z-10"
      style={POSTER_LAYERS.dhvani3}
     >
      <img
       src="/proshow/dhvani3.png"
       alt=""
       className="h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.15)]"
      />
     </div>
     <div
      ref={revealLayer2Ref}
      className="absolute z-10"
      style={POSTER_LAYERS.dhvani2}
     >
      <img
       src="/proshow/dhvani2.png"
       alt=""
       className="h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(212,175,55,0.16)]"
      />
     </div>

     {/* Front layer: dhvani1, centered, in front of everything else */}
     <div
      ref={revealLayer1Ref}
      className="absolute z-50"
      style={POSTER_LAYERS.dhvani1}
     >
      <img
       src="/proshow/dhvani1.png"
       alt="Dhvani"
       className="h-auto w-full object-contain drop-shadow-[0_0_48px_rgba(212,175,55,0.18)]"
      />
     </div>
    </div>
   </section>

   {/* FAQ Section */}
    <section ref={faqSectionRef} className="mx-auto max-w-[900px] lg:max-w-[1200px] px-[clamp(16px,4vw,40px)] py-20 opacity-0">
    <h2
     style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
     className="text-center text-3xl font-bold uppercase tracking-tight text-gold-gradient"
    >
     ProShow Guidelines & FAQ
    </h2>
    <div className="mt-10 grid grid-cols-1 items-start gap-4">
     {faqs.map((faq, i) => {
      const isOpen = openFaq === i;
      return (
       <div
        key={i}
        className={`overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-400 ease-out ${isOpen
         ? 'border-[#D4AF37]/60 bg-black/75 '
         : 'border-gold/20 bg-black/40 hover:border-gold/40 hover:bg-black/55'
         }`}
       >
        <button
         type="button"
         onClick={() => setOpenFaq(isOpen ? null : i)}
         className="flex w-full items-center justify-between p-5 md:p-6 text-left cursor-pointer transition-colors duration-300 select-none"
         aria-expanded={isOpen}
        >
         <span
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          className={`text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${isOpen ? 'text-[#D4AF37]' : 'text-white'
           }`}
         >
          {faq.q}
         </span>
         <span
          className={`ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
           ? 'rotate-45 border-[#D4AF37] bg-gold/20 text-[#D4AF37] '
           : 'rotate-0 border-gold/30 bg-black/30 text-gold-gradient hover:border-gold/60'
           }`}
         >
          <svg
           xmlns="http://www.w3.org/2000/svg"
           width="14"
           height="14"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           strokeWidth="2.5"
           strokeLinecap="round"
           strokeLinejoin="round"
          >
           <line x1="12" y1="5" x2="12" y2="19"></line>
           <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
         </span>
        </button>
        <div
         className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
         <div className="overflow-hidden">
          <div className="border-t border-gold/10 px-5 pb-5 pt-3 md:px-6 md:pb-6 md:pt-3 text-xs md:text-sm leading-relaxed text-white/70">
           {faq.a}
          </div>
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </section>
  </div>
 )
}

export default ProShowsPage