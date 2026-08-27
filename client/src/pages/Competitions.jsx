import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import { applyLetterGradient } from '../utils/letterGradient.js'

const competitions = [
  {
    id: 1,
    title: 'Robo Wars',
    image: '/competitions/robo-wars.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Dis in sapien tortor nullam morbi sed ac dui. Purus commodo a id senectus egestas posuere pellentesque. Aliquet quis sem molestie viverra platea eget porttitor erat. Sed et magna pulvinar amet amet et ipsum. Id pellentesque netus eget porttitor. Bibendum sagittis odio non platea quis. Eget accumsan ut nulla fringilla. Ipsum tempus ut arcu quam molestie nec. Sed turpis odio neque massa pretium. Fringilla quis sapien in commodo et pretium tempor consequat lacus.',
    registerUrl: '#',
  },
  {
    id: 2,
    title: 'Hackathon',
    image: '/competitions/hackathon.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Dis in sapien tortor nullam morbi sed ac dui. Purus commodo a id senectus egestas posuere pellentesque. Aliquet quis sem molestie viverra platea eget porttitor erat. Sed et magna pulvinar amet amet et ipsum.',
    registerUrl: '#',
  },
  {
    id: 3,
    title: 'Paper Presentation',
    image: '/competitions/paper.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur. Dis in sapien tortor nullam morbi sed ac dui. Purus commodo a id senectus egestas posuere pellentesque. Aliquet quis sem molestie viverra platea.',
    registerUrl: '#',
  },
]

function Competitions({ embedded = false }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = competitions[activeIndex]
  const carouselRef = useRef(null)
  const pageRef = useRef(null)
  const detailRef = useRef(null)
  const activeRef = useRef(activeIndex)
  const navRef = useRef(false)

  // Letter-gradient refs
  const h1Ref = useRef(null)
  const h2Ref = useRef(null)

  // Apply letter gradient to static h1 once on mount
  useEffect(() => {
    if (!h1Ref.current) return
    // The h1 contains a <span> with the text and a sparkle child span.
    // We only split the text node (first child text content), not the sparkle.
    const textSpan = h1Ref.current.querySelector('.competitions-text')
    if (textSpan) applyLetterGradient(textSpan)
  }, [])

  // Re-apply letter gradient to h2 whenever activeIndex changes
  useEffect(() => {
    if (!h2Ref.current) return
    // Reset and re-apply on each index change
    h2Ref.current.textContent = competitions[activeIndex].title
    applyLetterGradient(h2Ref.current)
  }, [activeIndex])

  const navigate = useCallback((dir) => {
    if (navRef.current) return
    navRef.current = true
    setTimeout(() => { navRef.current = false }, 600)

    setActiveIndex((prev) => {
      const next = prev + dir
      if (next < 0) return 0
      if (next >= competitions.length) return competitions.length - 1
      return next
    })
  }, [])

  useEffect(() => {
    activeRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const el = pageRef.current
    if (!el) return

    const isInView = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const handleWheel = (e) => {
      if (!isInView()) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (delta > 0 && activeRef.current < competitions.length - 1) {
        e.preventDefault()
        navigate(1)
      } else if (delta < 0 && activeRef.current > 0) {
        e.preventDefault()
        navigate(-1)
      }
    }

    const handleTouchStart = (e) => {
      if (!isInView()) return
      el._touchY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (!isInView()) return
      const dy = e.changedTouches[0].clientY - el._touchY
      if (Math.abs(dy) > 30) {
        navigate(dy < 0 ? 1 : -1)
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [navigate])

  useEffect(() => {
    if (!detailRef.current) return
    gsap.fromTo(
      detailRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 }
    )
  }, [activeIndex])

  return (
    <div ref={pageRef} className={`relative min-h-svh w-full touch-none ${embedded ? 'bg-transparent' : ''}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="competitions" />}

      <div className="mx-auto flex min-h-[calc(100vh-60px)] max-w-[1400px] flex-col gap-6 px-[clamp(16px,4vw,40px)] py-8 md:flex-row md:gap-12 md:py-10">
        <aside
          ref={carouselRef}
          className="flex w-full flex-col gap-3 md:w-[35%] md:gap-4"
        >
          {competitions.map((comp, i) => (
            <div
              key={comp.id}
              className="w-full"
            >
              <div
                className={`group flex h-[70px] w-full items-stretch text-left transition-all duration-300 md:h-[180px] ${
                  i === activeIndex ? 'border-gold' : 'border-transparent opacity-40'
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <div
                  className={`w-1 flex-shrink-0 transition-all duration-300 ${
                    i === activeIndex ? 'bg-gold' : 'bg-white/10'
                  }`}
                />
                <div
                  className={`flex-1 overflow-hidden border border-l-0 transition-all duration-300 ${
                    i === activeIndex
                      ? 'border-gold/40 bg-[#11111180]'
                      : 'border-white/5 bg-[#0a0a0a60]'
                  }`}
                >
                  <div className={`flex h-full w-full items-center justify-center transition-colors duration-300 px-4 ${
                    i === activeIndex ? 'bg-[#1a1a1a60]' : 'bg-[#11111140]'
                  }`}>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 md:text-sm ${
                        i === activeIndex ? 'text-gold' : 'text-white/30'
                      }`}
                      style={{
                        writingMode: 'horizontal-tb',
                        fontFamily: "'Clash Display', sans-serif",
                      }}
                    >
                      {comp.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </aside>

        <section className="flex flex-1 flex-col justify-center md:pl-4">
          <div className="relative mb-2">
            <h1
              ref={h1Ref}
              className="text-[clamp(36px,8vw,110px)] font-bold leading-none tracking-tight md:text-[clamp(56px,9vw,110px)]"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              <span className="relative inline-block">
                    <span className="relative z-10 competitions-text">Competitions</span>
                    <img
                      src="/workshops/shine.svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-[8%] -top-[18%] z-0 w-[clamp(54px,10vw,120px)] max-w-none"
                    />
              </span>
            </h1>
          </div>

          <div ref={detailRef} className="mt-4 border-l-2 border-gold/30 pl-4 md:mt-6 md:pl-6">
            <h2
              ref={h2Ref}
              className="text-[clamp(24px,5vw,44px)] font-bold"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {active.title}
            </h2>

            <p className="mt-4 max-w-[550px] text-sm leading-relaxed text-white/60 md:mt-5 md:text-[15px]">
              {active.description}
            </p>

            <a
              href={active.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 border border-gold bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:bg-transparent hover:text-gold hover:shadow-[0_0_25px_rgba(225,157,0,0.3)] md:mt-8 md:px-8 md:py-3.5 md:text-sm"
              style={{ borderRadius: '50px' }}
            >
              Register
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Competitions
