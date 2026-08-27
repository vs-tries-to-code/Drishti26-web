import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'

const teamMembers = [
  { id: 1, name: 'Ananya', role: 'President' },
  { id: 2, name: 'Rahul', role: 'Vice President' },
  { id: 3, name: 'Priya', role: 'Secretary' },
  { id: 4, name: 'Arjun', role: 'Treasurer' },
  { id: 5, name: 'Sneha', role: 'Technical Head' },
  { id: 6, name: 'Vikram', role: 'Design Head' },
  { id: 7, name: 'Meera', role: 'Marketing Head' },
]

const webTeamMembers = [
  { id: 1, name: 'Member 1', role: 'Web Team' },
  { id: 2, name: 'Member 2', role: 'Web Team' },
  { id: 3, name: 'Member 3', role: 'Web Team' },
  { id: 4, name: 'Member 4', role: 'Web Team' },
  { id: 5, name: 'Member 5', role: 'Web Team' },
  { id: 6, name: 'Member 6', role: 'Web Team' },
  { id: 7, name: 'Member 7', role: 'Web Team' },
]

const TOTAL = teamMembers.length

function shortestDiff(from, to) {
  let d = to - from
  if (d > TOTAL / 2) d -= TOTAL
  if (d < -TOTAL / 2) d += TOTAL
  return d
}

function Team({ embedded = false }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeGroup, setActiveGroup] = useState('committee')
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const navRef = useRef(false)
  const touchStart = useRef({ x: 0, y: 0 })
  const members = activeGroup === 'committee' ? teamMembers : webTeamMembers

  const navigate = useCallback((dir) => {
    if (navRef.current) return
    navRef.current = true
    setTimeout(() => { navRef.current = false }, 500)
    setActiveIndex((prev) => (prev + dir + TOTAL) % TOTAL)
  }, [])

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const text = el.textContent
    el.textContent = ''
    const fragment = document.createDocumentFragment()
    text.split('').forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.className = 'text-gold-gradient'
      fragment.appendChild(span)
    })
    el.appendChild(fragment)

    const chars = el.querySelectorAll('span')
    gsap.from(chars, {
      y: 60,
      opacity: 0,
      rotateX: -90,
      stagger: 0.04,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 0.2,
    })
  }, [])

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.card-inner')
    if (!cards || cards.length === 0) return

    gsap.set(cards, { opacity: 0, y: 60, scale: 0.85 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.3)',
      delay: 0.6,
    })
  }, [])

  useEffect(() => {
    const imgs = containerRef.current?.querySelectorAll('.card-img')
    if (!imgs) return

    gsap.set(imgs, { opacity: 1 })

    const timer = setTimeout(() => {
      imgs.forEach((img, i) => {
        if (members[i].id !== members[activeIndex].id) {
          gsap.to(img, { opacity: 0.85, duration: 0.4, ease: 'power2.out' })
        }
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [activeGroup, activeIndex, members])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const isInView = () => {
      const rect = el.getBoundingClientRect()
      return rect.top < window.innerHeight && rect.bottom > 0
    }

    const handleWheel = (e) => {
      if (!isInView()) return
      e.preventDefault()
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      if (delta > 0) navigate(1)
      else if (delta < 0) navigate(-1)
    }

    const handleTouchStart = (e) => {
      if (!isInView()) return
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const handleTouchEnd = (e) => {
      if (!isInView()) return
      const dx = e.changedTouches[0].clientX - touchStart.current.x
      const dy = e.changedTouches[0].clientY - touchStart.current.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
        navigate(dx < 0 ? 1 : -1)
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

  const getCardTransform = useCallback((index) => {
    const diff = shortestDiff(activeIndex, index)
    const absDiff = Math.abs(diff)
    const sign = diff === 0 ? 0 : diff > 0 ? 1 : -1

    if (absDiff === 0) {
      return {
        transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
        zIndex: 10,
        opacity: 1,
      }
    }

    if (absDiff > 2) {
      return {
        transform: `translateX(${sign * 9999}px) scale(0)`,
        zIndex: 0,
        opacity: 0,
        pointerEvents: 'none',
      }
    }

    const angle = diff * 55
    const translateZ = 350
    const opacity = absDiff === 0 ? 1 : 0.7
    const scale = absDiff === 0 ? 1 : 0.85
    const zIndex = 10 - absDiff

    return {
      transform: `rotateY(${angle}deg) translateZ(${translateZ}px) scale(${scale})`,
      zIndex,
      opacity,
    }
  }, [activeIndex])

  return (
    <div className={`relative min-h-svh w-full overflow-hidden ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
      {!embedded && <Backdrop />}
      {!embedded && <Navbar activeSection="team" />}

      <header className="px-[clamp(16px,4vw,40px)] pb-4 pt-[clamp(32px,6vw,64px)] text-center">
        <h1
          ref={titleRef}
          className="text-[clamp(32px,8vw,120px)] font-bold leading-none tracking-tight text-gold-gradient"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          Meet The Team
        </h1>

        <div className="mt-8 inline-flex overflow-hidden rounded-full border border-gold/60" role="group" aria-label="Team selection">
          {[
            { id: 'committee', label: 'Committee' },
            { id: 'web', label: 'Web Team' },
          ].map((group) => {
            const isSelected = activeGroup === group.id
            return (
              <button
                key={group.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveGroup(group.id)}
                className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-[2px] transition-colors duration-300 md:px-8 ${
                  isSelected
                    ? 'bg-gold-gradient text-black'
                    : 'bg-black text-gold hover:bg-gold/10'
                }`}
              >
                {group.label}
              </button>
            )
          })}
        </div>
      </header>

      <div
        ref={containerRef}
        className="relative flex h-[70vh] items-center justify-center overflow-hidden touch-none"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {members.map((member, index) => (
            <div
              key={member.id}
              className="absolute cursor-pointer"
              style={{
                ...getCardTransform(index),
                transition: 'transform 0.5s ease-out, opacity 0.5s ease-out, z-index 0s',
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className="card-inner relative flex items-center justify-center overflow-hidden rounded-md"
                style={{
                  height: '420px',
                  width: '300px',
                  background: index === activeIndex ? '#111' : '#1a1a1a',
                  border: index === activeIndex ? '1px solid rgba(225,157,0,0.4)' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: index === activeIndex
                    ? '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(225,157,0,0.1)'
                    : '0 10px 30px rgba(0,0,0,0.4)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/10" />
                <div className="absolute top-0 right-4 flex h-full items-center">
                  <span
                    className="text-3xl font-bold uppercase tracking-wider text-white/15"
                    style={{ writingMode: 'vertical-lr', textOrientation: 'mixed', fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {member.name}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5">
                  <p className="text-[10px] uppercase tracking-[3px] text-gold/80">{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 pb-12">
        {members.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to team member ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-xs uppercase tracking-[4px] text-white/30">
        Scroll or swipe to explore
      </p>
    </div>
  )
}

export default Team
