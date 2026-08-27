import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '5000+', label: 'Attendees' },
  { number: '50+', label: 'Colleges' },
  { number: '30+', label: 'Events' },
  { number: '10+', label: 'Years' },
]

const values = [
  {
    title: 'Innovation',
    description: 'We push boundaries and challenge conventions. Every idea has the potential to change the world.',
    icon: '◆',
  },
  {
    title: 'Community',
    description: 'Building bridges between students, industry leaders, and visionaries. Together we grow.',
    icon: '◈',
  },
  {
    title: 'Excellence',
    description: 'We set the bar high and continuously strive to exceed expectations in everything we do.',
    icon: '◇',
  },
]

const timeline = [
  { year: '2016', event: 'Drishti was born with a vision to bridge the gap between academia and industry.' },
  { year: '2018', event: 'Expanded to include hackathons, workshops, and international speakers.' },
  { year: '2020', event: 'Went virtual during the pandemic, reaching audiences across 20+ countries.' },
  { year: '2023', event: 'Returned bigger than ever with 5000+ attendees and 30+ events.' },
  { year: '2026', event: 'Drishti 2026 — the biggest edition yet. Are you ready?' },
]

function About({ embedded = false }) {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const valuesRef = useRef(null)
  const timelineRef = useRef(null)

  // Refs for letter-gradient targets
  const h1Ref = useRef(null)
  const subheadRef = useRef(null)
  const numbersHeadRef = useRef(null)
  const valuesHeadRef = useRef(null)
  const journeyHeadRef = useRef(null)
  const ctaHeadRef = useRef(null)
  const statRefs = useRef([])
  const valueH3Refs = useRef([])
  const timelineYearRefs = useRef([])

  // Apply letter-wise gradient to all static gradient text
  useEffect(() => {
    const els = [
      h1Ref.current,
      subheadRef.current,
      numbersHeadRef.current,
      valuesHeadRef.current,
      journeyHeadRef.current,
      ctaHeadRef.current,
      ...statRefs.current.filter(Boolean),
      ...valueH3Refs.current.filter(Boolean),
      ...timelineYearRefs.current.filter(Boolean),
    ]
    els.forEach(applyLetterGradient)
  }, [])

  useEffect(() => {
    const sections = [statsRef, valuesRef, timelineRef]

    sections.forEach((ref) => {
      if (!ref.current) return
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <div className={`relative min-h-svh w-full overflow-hidden ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="about" />}

      <header
        ref={heroRef}
        className="px-[clamp(16px,4vw,40px)] pt-[clamp(40px,8vw,80px)] text-center"
      >
        <p className="text-[11px] uppercase tracking-[6px] text-gold/60">About Us</p>
        <h1
          ref={h1Ref}
          className="text-[clamp(32px,8vw,120px)] font-bold uppercase leading-none tracking-tight"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Drishti
        </h1>
        <p
          ref={subheadRef}
          className="mt-2 text-[clamp(18px,3vw,28px)] uppercase tracking-[4px]"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Technical Festival
        </p>
      </header>

      <section className="mx-auto max-w-[900px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)] text-center">
        <p className="text-[clamp(16px,2vw,20px)] leading-relaxed text-white/60">
          Drishti is the annual technical festival of KSIT, bringing together the brightest minds
          from across the country. For over a decade, we have been a platform for innovation,
          creativity, and collaboration — where ideas take flight and dreams become reality.
        </p>
      </section>

      <div className="border-t border-gold/20" />

      <section className="mx-auto max-w-[1100px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <h2
          ref={numbersHeadRef}
          className="text-center text-[clamp(28px,5vw,48px)] font-bold uppercase tracking-tight"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Our Numbers
        </h2>
        <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <p
                ref={(el) => { statRefs.current[i] = el }}
                className="text-[clamp(36px,6vw,64px)] font-bold"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {stat.number}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[3px] text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gold/20" />

      <section className="mx-auto max-w-[1100px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <h2
          ref={valuesHeadRef}
          className="text-center text-[clamp(28px,5vw,48px)] font-bold uppercase tracking-tight"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          What We Stand For
        </h2>
        <div ref={valuesRef} className="mt-12 grid gap-8 md:grid-cols-3">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="border border-gold/20 bg-[#0a0a0a] p-8 transition-all duration-300 hover:border-gold/40 hover:bg-[#111]"
            >
              <span className="text-3xl text-gold">{value.icon}</span>
              <h3
                ref={(el) => { valueH3Refs.current[i] = el }}
                className="mt-4 text-xl font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {value.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/50">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gold/20" />

      <section className="mx-auto max-w-[800px] px-[clamp(16px,4vw,40px)] py-[clamp(40px,6vw,80px)]">
        <h2
          ref={journeyHeadRef}
          className="text-center text-[clamp(28px,5vw,48px)] font-bold uppercase tracking-tight"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Our Journey
        </h2>
        <div ref={timelineRef} className="relative mt-12">
          <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-gold/20 md:left-1/2" />
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`relative mb-12 flex items-start gap-6 md:gap-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <p
                  ref={(el) => { timelineYearRefs.current[i] = el }}
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Clash Display', sans-serif" }}
                >
                  {item.year}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.event}</p>
              </div>
              <div className="relative z-10 mt-1 h-3 w-3 flex-shrink-0 rounded-full border-2 border-gold bg-black md:mx-auto" />
              <div className="hidden flex-1 md:block" />
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gold/20" />

      <section className="px-[clamp(16px,4vw,40px)] py-[clamp(40px,8vw,100px)] text-center">
        <h2
          ref={ctaHeadRef}
          className="text-[clamp(28px,5vw,48px)] font-bold uppercase tracking-tight"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Ready to be part of something extraordinary?
        </h2>
        <a
          href="/daksha"
          className="mt-8 inline-flex items-center gap-3 border border-gold bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-transparent hover:text-gold hover:shadow-[0_0_25px_rgba(225,157,0,0.3)]"
          style={{ borderRadius: '50px' }}
        >
          Explore Events
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </section>
    </div>
  )
}

export default About
