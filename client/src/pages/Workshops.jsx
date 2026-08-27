import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Competitions from './Competitions.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

gsap.registerPlugin(ScrollTrigger)

const workshops = [
  {
    id: 1,
    title: 'AI & Machine Learning',
    description:
      'Dive deep into the world of artificial intelligence and machine learning. Learn to build intelligent systems, train neural networks, and deploy ML models in real-world applications.',
    image: '/workshops/ai-ml.jpg',
    registerUrl: '#',
  },
  {
    id: 2,
    title: 'Web Development',
    description:
      'Master modern web technologies from frontend frameworks to backend architecture. Build responsive, performant web applications using the latest tools and best practices.',
    image: '/workshops/web-dev.jpg',
    registerUrl: '#',
  },
  {
    id: 3,
    title: 'Cloud Computing',
    description:
      'Explore cloud infrastructure, deployment strategies, and DevOps practices. Learn to architect scalable applications on AWS, Azure, or Google Cloud platforms.',
    image: '/workshops/cloud.jpg',
    registerUrl: '#',
  },
  {
    id: 4,
    title: 'Cybersecurity',
    description:
      'Understand ethical hacking, penetration testing, and security auditing. Protect systems from threats and vulnerabilities with hands-on security techniques.',
    image: '/workshops/cyber.jpg',
    registerUrl: '#',
  },
  {
    id: 5,
    title: 'Blockchain & Web3',
    description:
      'Explore decentralized applications, smart contracts, and the future of the internet. Build on Ethereum and understand the fundamentals of blockchain technology.',
    image: '/workshops/blockchain.jpg',
    registerUrl: '#',
  },
]

const TOTAL = workshops.length

// Every card shares the same transform-origin (near its bottom-left corner),
// so animating `rotate` alone makes the whole set pivot open/closed like a
// hand of cards, with each layer's far edge peeking further up-and-right as
// its angle increases. This one pivot is what produces the fan in every
// per-card state below (closed / open / resting stack). The *whole deck*
// additionally carries its own group-level tilt during the intro (see
// DECK_TILT_DEG below) to match the diagonal composition in the reference.
const CARD_PIVOT = '18% 100%'
const DECK_TILT_DEG = -18

// Resting deck: the tight, mostly-closed stack the cards live in once
// they've settled into their final layout spot (and between scroll steps).
function getStackTransform(stackPosition) {
  return {
    y: stackPosition * 6,
    z: stackPosition * -50,
    rotate: stackPosition * 6,
    scale: 1 - stackPosition * 0.04,
    opacity: 1 - stackPosition * 0.14,
    zIndex: TOTAL - stackPosition,
  }
}

// Fully closed: every card exactly stacked, no fan yet. Starting pose.
function getClosedTransform(stackPosition) {
  return {
    y: 0,
    z: stackPosition * -8,
    rotate: 0,
    scale: 1 - stackPosition * 0.01,
    opacity: 1,
    zIndex: TOTAL - stackPosition,
  }
}

// Fully open: wide fan, used only for the center-of-screen intro moment.
function getFanOpenTransform(stackPosition) {
  return {
    y: stackPosition * 2,
    z: stackPosition * -20,
    rotate: stackPosition * 30,
    scale: 1 - stackPosition * 0.02,
    opacity: 1 - stackPosition * 0.05,
    zIndex: TOTAL - stackPosition,
  }
}

function Workshops() {
  const [activeIndex, setActiveIndex] = useState(0)
  const location = useLocation()
  const wrapperRef = useRef(null)
  const sectionRef = useRef(null)
  const textColRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const btnRef = useRef(null)
  const deckRef = useRef(null)
  const cardRefs = useRef([])
  const dotsRef = useRef([])
  const activeIndexRef = useRef(0)
  const busyRef = useRef(false)
  const competitionsSectionRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  // Keep the title DOM-owned so React does not replace its letter spans.
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = workshops[activeIndex].title
      applyLetterGradient(titleRef.current)
    }
  }, [activeIndex])

  useEffect(() => {
    if (location.hash === '#competitions-section') {
      const el = document.getElementById('competitions-section')
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      }
    }
  }, [location])

  // ---- Deck intro --------------------------------------------------------
  // tilted + closed (exact viewport center, no text)
  //   -> fan open, still tilted, still centered, still no text
  //   -> fan closes back into a resting stack, still tilted + centered
  //   -> deck straightens (tilt -> 0) while it slides to its laid-out spot
  //   -> text fades in
  //
  // The deck is temporarily pulled into `position: fixed` so it can be
  // placed at the *exact* center of the viewport regardless of the grid
  // layout, then handed back to normal flow once it arrives at its natural
  // spot. Its wrapper keeps the grid cell's footprint the whole time so
  // nothing else in the layout reflows while the deck is detached.
  useLayoutEffect(() => {
    const cards = cardRefs.current
    const deck = deckRef.current
    const textCol = textColRef.current
    if (!cards.length || !deck || !textCol) return

    // Natural (laid-out) position/size, captured before we detach the deck.
    const rect = deck.getBoundingClientRect()
    const natural = { top: rect.top, left: rect.left, width: rect.width, height: rect.height }

    document.body.style.overflow = 'hidden'
    gsap.set(textCol, { opacity: 0 })

    // Freeze the deck exactly where it is, then switch it to fixed
    // positioning so it can be moved to the true viewport center.
    gsap.set(deck, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: natural.width,
      height: natural.height,
      x: natural.left,
      y: natural.top,
      rotate: 0,
    })

    const centerX = window.innerWidth / 2 - natural.width / 2
    const centerY = window.innerHeight / 2 - natural.height / 2

    gsap.set(deck, { x: centerX, y: centerY, rotate: DECK_TILT_DEG })
    gsap.set(cards, (i) => ({ ...getClosedTransform(i), x: 0 }))

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        // Hand the deck back to normal flow, exactly at its natural spot.
        gsap.set(deck, { clearProps: 'position,top,left,width,height,x,y,rotate' })
        document.body.style.overflow = ''
        setupScroll()
        ScrollTrigger.refresh()
      },
    })

    // Fan open about the shared pivot — centered + tilted, no text yet
    tl.to(cards, {
      y: (i) => getFanOpenTransform(i).y,
      z: (i) => getFanOpenTransform(i).z,
      rotate: (i) => getFanOpenTransform(i).rotate,
      scale: (i) => getFanOpenTransform(i).scale,
      opacity: (i) => getFanOpenTransform(i).opacity,
      duration: 0.7,
      stagger: 0.05,
    })

    // Fan closed back into the resting stack — still centered + tilted
    tl.to(
      cards,
      {
        y: (i) => getStackTransform(i).y,
        z: (i) => getStackTransform(i).z,
        rotate: (i) => getStackTransform(i).rotate,
        scale: (i) => getStackTransform(i).scale,
        opacity: (i) => getStackTransform(i).opacity,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power2.inOut',
      },
      '+=0.1'
    )

    // Now it reads as one deck: straighten the tilt and slide to the
    // natural, laid-out spot in the same motion.
    tl.to(deck, {
      x: natural.left,
      y: natural.top,
      rotate: 0,
      duration: 0.8,
      ease: 'power3.inOut',
    })

    // Only once the deck has arrived does the workshop text appear
    tl.to(
      textCol,
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---- Competitions section parallax reveal (unchanged) ----
  useEffect(() => {
    const competitionsSection = competitionsSectionRef.current
    if (!wrapperRef.current) return

    const ctx = gsap.context(() => {
      if (competitionsSection) {
        gsap.fromTo(
          competitionsSection,
          { y: '100vh' },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top top',
              end: () => `+=${window.innerHeight}`,
              scrub: true,
              pin: false,
            },
          }
        )
      }
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  // ---- Card-cycle ScrollTrigger, wired up once the intro finishes ----
  function setupScroll() {
    const section = sectionRef.current
    if (!section || scrollTriggerRef.current) return

    const scrollPerCard = 400

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${(TOTAL - 1) * scrollPerCard}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const progress = self.progress
        const newIndex = Math.min(TOTAL - 1, Math.round(progress * (TOTAL - 1)))
        if (newIndex !== activeIndexRef.current) {
          transitionTo(newIndex)
        }
      },
    })
  }

  useEffect(() => {
    return () => {
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill()
    }
  }, [])

  // Cycles the deck to `newIndex`: the outgoing front card fans back to the
  // rear of the pile (about the same pivot), every other card steps one
  // place closer to front.
  function transitionTo(newIndex) {
    if (busyRef.current || newIndex === activeIndexRef.current) return
    busyRef.current = true
    const prevIndex = activeIndexRef.current
    activeIndexRef.current = newIndex
    const ws = workshops[newIndex]

    workshops.forEach((_, i) => {
      const stackPosition = (i - newIndex + TOTAL) % TOTAL
      const target = getStackTransform(stackPosition)
      const el = cardRefs.current[i]
      if (!el) return

      // zIndex jumps immediately so the newly-promoted front card renders
      // above the one fanning back behind it right from the start of the move.
      gsap.set(el, { zIndex: target.zIndex })
      gsap.to(el, {
        y: target.y,
        z: target.z,
        rotate: target.rotate,
        scale: target.scale,
        opacity: target.opacity,
        duration: i === prevIndex ? 0.55 : 0.45,
        ease: i === prevIndex ? 'power2.inOut' : 'power2.out',
        delay: i === prevIndex ? 0 : 0.06,
      })
    })

    gsap.to(titleRef.current, { opacity: 0, y: -15, duration: 0.2 })
    gsap.to(descRef.current, { opacity: 0, y: 15, duration: 0.2 })
    gsap.to(btnRef.current, { opacity: 0, duration: 0.2 })

    setTimeout(() => {
      setActiveIndex(newIndex)

      descRef.current.textContent = ws.description
      btnRef.current.href = ws.registerUrl

      gsap.fromTo(titleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3 })
      gsap.fromTo(descRef.current, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.05 })
      gsap.fromTo(btnRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.1 })

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        if (i === newIndex) {
          dot.classList.add('w-10', 'bg-gold', 'shadow-[0_0_12px_rgba(225,157,0,0.6)]')
          dot.classList.remove('w-3', 'bg-gold/30')
        } else {
          dot.classList.remove('w-10', 'bg-gold', 'shadow-[0_0_12px_rgba(225,157,0,0.6)]')
          dot.classList.add('w-3', 'bg-gold/30')
        }
      })

      busyRef.current = false
    }, 200)
  }

  const active = workshops[activeIndex]

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Backdrop />
      <Navbar activeSection="workshops" />

      <section
        ref={sectionRef}
        className="relative flex h-svh w-full items-center overflow-hidden px-[clamp(16px,4vw,40px)]"
      >
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Text content: hidden until the intro finishes, then below the
              deck on mobile / left of it on desktop */}
          <div
            ref={textColRef}
            className="order-2 flex flex-col gap-6 text-center md:order-1 md:text-left"
          >
            <p className="text-[11px] uppercase tracking-[5px] text-gold/60">Drishti 2026</p>

            <h1
              ref={titleRef}
              className="text-[clamp(36px,6vw,64px)] font-bold uppercase leading-[0.95] tracking-tight font-display drop-shadow-[0_0_25px_rgba(225,157,0,0.35)]"
            >
            </h1>

            <p
              ref={descRef}
              className="text-[clamp(14px,1.6vw,17px)] leading-[1.7] text-white/70"
            >
              {active.description}
            </p>

            <div className="flex justify-center md:justify-start">
              <a
                ref={btnRef}
                href={active.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-gold bg-gold/10 px-10 py-3 text-xs font-semibold uppercase tracking-[3px] text-gold transition-all duration-300 hover:bg-gold hover:text-black hover:shadow-[0_0_30px_rgba(225,157,0,0.5)]"
              >
                Register Now
              </a>
            </div>

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-3 md:justify-start">
              {workshops.map((ws, i) => (
                <button
                  key={ws.id}
                  ref={(el) => { dotsRef.current[i] = el }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === 0
                      ? 'w-10 bg-gold shadow-[0_0_12px_rgba(225,157,0,0.6)]'
                      : 'w-3 bg-gold/30'
                  }`}
                  aria-label={`Go to workshop ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right/top: the card deck. Sizing lives on this wrapper (not on
              deckRef) so the grid cell keeps its footprint even while
              deckRef is temporarily `position: fixed` during the intro. */}
          <div className="order-1 flex items-center justify-center md:order-2">
            <div className="relative aspect-[4/5] w-full max-w-[250px] md:max-w-[360px]">
              <div ref={deckRef} className="absolute inset-0" style={{ perspective: '1600px' }}>
                {workshops.map((ws, i) => (
                  <div
                    key={ws.id}
                    ref={(el) => { cardRefs.current[i] = el }}
                    className="absolute inset-0 overflow-hidden rounded-3xl border-2 border-white/15 bg-black/60 p-2 backdrop-blur-md will-change-transform"
                    style={{ transformOrigin: CARD_PIVOT }}
                  >
                    <img
                      src={ws.image}
                      alt={ws.title}
                      className="block h-full w-full rounded-2xl object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div ref={competitionsSectionRef} id="competitions-section" className="relative w-full min-h-svh">
        <Competitions embedded />
      </div>
    </div>
  )
}

export default Workshops