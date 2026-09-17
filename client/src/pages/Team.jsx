import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'

const teamMembers = [
 { id: 4, name: 'Gautam', role: 'Convenor', image: '/team/DRISHTI%20CORE/gaut.png' },
 { id: 2, name: 'Aiveen', role: 'Co-Convenor', image: '/team/DRISHTI%20CORE/aiv.png' },
 { id: 5, name: 'Maram', role: 'Co-Convenor', image: '/team/DRISHTI%20CORE/mar.png' },
 { id: 8, name: 'Nikhil', role: 'Coordinator', image: '/team/DRISHTI%20CORE/nikh.png' },
 { id: 7, name: 'Ephraim', role: 'Coordinator', image: '/team/DRISHTI%20CORE/eph.png' },
 { id: 11, name: 'Yamin', role: 'Coordinator', image: '/team/DRISHTI%20CORE/yamin.png' },
 { id: 12, name: 'Daris', role: 'Coordinator', image: '/team/DRISHTI%20CORE/daris.png' },
 { id: 10, name: 'Sidharth', role: 'Coordinator', image: '/team/DRISHTI%20CORE/sidhth.png' },
 { id: 13, name: 'Abhira', role: 'Execom', image: '/team/DRISHTI%20CORE/abhira.webp' },
 { id: 14, name: 'Alvin', role: 'Execom', image: '/team/DRISHTI%20CORE/alvin.webp' },
 { id: 9, name: 'Shebin', role: 'Coordinator', image: '/team/DRISHTI%20CORE/sheb.png' },
 { id: 6, name: 'Noel', role: 'Co-Convenor', image: '/team/DRISHTI%20CORE/noel.png' },
 { id: 3, name: 'Devan', role: 'Co-Convenor', image: '/team/DRISHTI%20CORE/dev.png' },
 { id: 1, name: 'Abhimanyu', role: 'Co-Convenor', image: '/team/DRISHTI%20CORE/abhi.png' }
]

const dakshaTeamMembers = [
 { id: 5, name: 'Noel', role: 'Convenor', image: '/team/DAKSHA%20CORE/puli.png' },
 { id: 7, name: 'Sayoojya', role: 'Convenor', image: '/team/DAKSHA%20CORE/say.png' },
 { id: 1, name: 'Afnan', role: 'Co-Convenor', image: '/team/DAKSHA%20CORE/afn.png' },
 { id: 4, name: 'Keerthana', role: 'Co-Convenor', image: '/team/DAKSHA%20CORE/kt.png' },
 { id: 2, name: 'Aslam', role: 'Coordinator', image: '/team/DAKSHA%20CORE/aslm.png' },
 { id: 9, name: 'Abhinav', role: 'Coordinator', image: '/team/DAKSHA%20CORE/abhi.png' },
 { id: 3, name: 'Avneesh', role: 'Coordinator', image: '/team/DAKSHA%20CORE/avnsh.png' },
 { id: 6, name: 'Sahla', role: 'Co-Convenor', image: '/team/DAKSHA%20CORE/sahla.png' },
 { id: 8, name: 'Yashok', role: 'Co-Convenor', image: '/team/DAKSHA%20CORE/ysh.png' },
]

const webTeamMembers = [
 { id: 7, name: 'Sidharth', role: 'Head', image: '/team/WEB/sid.png' },
 { id: 6, name: 'Sharon', role: 'Co-Head', image: '/team/WEB/sharn.png' },
  { id: 8, name: 'Vishnusree', role: 'Developer', image: '/team/WEB/vishnu.png' },
 { id: 2, name: 'Joseph', role: 'Developer', image: '/team/WEB/jo.png' },
 { id: 1, name: 'George', role: 'Developer', image: '/team/WEB/geo.png' },
 { id: 5, name: 'Rohit', role: 'Developer', image: '/team/WEB/roht.png' },
 { id: 4, name: 'Rohan', role: 'Developer', image: '/team/WEB/rohn.png' },
  { id: 3, name: 'Kasinath', role: 'Co-Head', image: '/team/WEB/kasi.png' },

]

function shortestDiff(from, to, total) {
 let d = to - from
 if (d > total / 2) d -= total
 if (d < -total / 2) d += total
 return d
}

function Team({ embedded = false }) {
 const [activeIndex, setActiveIndex] = useState(0)
 const [activeGroup, setActiveGroup] = useState('committee')
 const containerRef = useRef(null)
 const titleRef = useRef(null)
 const navRef = useRef(false)
 const touchStart = useRef({ x: 0, y: 0 })
 const activeIndexRef = useRef(0)
 const members =
 activeGroup === 'committee'
 ? teamMembers
 : activeGroup === 'web'
 ? webTeamMembers
 : dakshaTeamMembers
 const total = members.length

 const navigate = useCallback((dir) => {
 if (navRef.current) return
 navRef.current = true
 setTimeout(() => { navRef.current = false }, 500)
 setActiveIndex((prev) => {
 const next = prev + dir
 return (next + total) % total
 })
 }, [total])

 useEffect(() => {
 activeIndexRef.current = activeIndex
 }, [activeIndex])

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
 const el = containerRef.current
 if (!el) return

 const isInView = () => {
 const rect = el.getBoundingClientRect()
 return rect.top < window.innerHeight && rect.bottom > 0
 }

 const handleWheel = (e) => {
 if (!isInView()) return
 const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
 if (delta > 0) {
 e.preventDefault()
 navigate(1)
 } else if (delta < 0) {
 e.preventDefault()
 navigate(-1)
 }
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
 if (dx < 0) {
 navigate(1)
 } else if (dx > 0) {
 navigate(-1)
 }
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
 }, [navigate, total])

 const getCardTransform = useCallback((index) => {
 const diff = shortestDiff(activeIndex, index, total)
 const absDiff = Math.abs(diff)
 const sign = diff === 0 ? 0 : diff > 0 ? 1 : -1

 if (absDiff === 0) {
 return {
 transform: 'translateX(0px) translateY(0px) translateZ(80px) rotateY(0deg) rotateX(0deg) scale(1)',
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

 // Precise 3D concave bend angle matching target reference image
 const translateX = sign === 1 ? (absDiff === 1 ? 300 : 560) : (absDiff === 1 ? -300 : -560)
 const translateY = absDiff === 1 ? 16 : 40
 const translateZ = absDiff === 1 ? -50 : -140
 const rotateY = sign === 1 ? (absDiff === 1 ? -38 : -54) : (absDiff === 1 ? 38 : 54)
 const rotateX = 6
 const rotateZ = sign === 1 ? (absDiff === 1 ? 2 : 4) : (absDiff === 1 ? -2 : -4)
 const scale = absDiff === 1 ? 0.96 : 0.88
 const zIndex = 10 - absDiff

 return {
 transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
 zIndex,
 opacity: 1,
 }
 }, [activeIndex, total])

 return (
 <>
 <div className={`relative h-svh max-h-svh w-full overflow-hidden flex flex-col justify-between pt-16 pb-6 select-none touch-none ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
 {!embedded && <Backdrop />}
 {!embedded && <Navbar activeSection="team" />}

 {/* Header matching other page titles with metallic gold toggle */}
 <header className="px-[clamp(16px,4vw,40px)] pt-3 pb-1 text-center z-10 flex flex-col items-center">
 <h1
 ref={titleRef}
 className="text-[clamp(32px,6vw,72px)] font-bold uppercase leading-none tracking-tight text-gold-gradient"
 style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
 >
 MEET THE TEAM
 </h1>

 {/* Metallic Gold Pill Switch Toggle */}
 <div
 className="mt-3 relative inline-flex items-center rounded-full border border-gold/50 bg-black/80 p-1 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-md"
 role="group"
 aria-label="Team category selection"
 >
 {[
 { id: 'committee', label: 'CORE TEAM' },
 { id: 'web', label: 'WEB TEAM' },
 { id: 'daksha', label: 'DAKSHA TEAM' },
 ].map((group) => {
 const isSelected = activeGroup === group.id
 return (
 <button
 key={group.id}
 type="button"
 aria-pressed={isSelected}
 onClick={() => {
 setActiveGroup(group.id)
 setActiveIndex(0)
 }}
 className={`relative z-10 cursor-pointer rounded-full px-3.5 sm:px-7 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[1.5px] sm:tracking-[2.5px] transition-all duration-300 ${
 isSelected
 ? 'bg-gold-gradient text-black '
 : 'text-gold/75 hover:text-gold-gradient'
 }`}
 style={{ fontFamily: "'Space Grotesk', sans-serif" }}
 >
 {group.label}
 </button>
 )
 })}
 </div>
 </header>

 {/* 3D Stage Container */}
 <div
 ref={containerRef}
 className="relative flex flex-1 items-center justify-center overflow-hidden touch-none my-auto w-full"
 style={{ perspective: '800px' }}
 >
 {/* Curved 3D Stage Horizon Floor */}
 <div className="pointer-events-none absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[180%] max-w-[1700px] h-[260px] rounded-[100%] bg-gradient-to-b from-[#2a2a30] via-[#141416] to-[#050505] border-t border-white/10 shadow-[0_-30px_80px_rgba(0,0,0,0.95)]" />

 {/* 3D Card Stack */}
 <div
 className="relative flex items-center justify-center"
 style={{ transformStyle: 'preserve-3d' }}
 >
 {members.map((member, index) => {
 const diff = shortestDiff(activeIndex, index, total)
 const isCenter = diff === 0

 return (
 <div
 key={member.id}
 className="absolute cursor-pointer will-change-transform select-none"
 style={{
 ...getCardTransform(index),
 transition: 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease-out, z-index 0s',
 }}
 onClick={() => setActiveIndex(index)}
 >
 <div
 className={`card-inner relative flex flex-col justify-between overflow-hidden rounded-[20px] transition-all duration-300 ${
 isCenter
 ? 'bg-[#D6D9DE] border border-white/40 '
 : 'bg-[#D6D9DE] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
 }`}
 style={{
 height: '420px',
 width: '290px',
 }}
 >
 {member.image && (
 <img
 src={member.image}
 alt={member.name}
 loading={isCenter ? "eager" : "lazy"}
 decoding="async"
 className={`absolute inset-0 h-full w-full object-cover grayscale contrast-115 select-none ${
 isCenter ? '' : 'brightness-75'
 }`}
 />
 )}

 {/* Active Center Card with Portrait Photo and Gold Role Badge */}
 {isCenter ? (
 <>

 {/* Bottom Role Banner in Metallic Gold */}
 <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent pt-16 pb-6 px-3">
 <p
 className="text-center text-sm sm:text-base font-black uppercase tracking-[3px] text-[#D4AF37] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
 style={{ fontFamily: "'Space Grotesk', sans-serif" }}
 >
 {member.role}
 </p>
 </div>
 </>
 ) : (
 <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
 )}
 </div>
 </div>
 )
 })}
 </div>
 </div>
 </div>
 {!embedded && <Footer />}
 </>
 )
}

export default Team
