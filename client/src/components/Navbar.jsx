import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Workshops', to: '/workshops' },
  { label: 'Competitions', to: '/competitions', scrollTo: 'competitions-section' },
  { label: 'Daksha', to: '/daksha' },
  { label: 'Team', to: '/team', scrollTo: 'team-section' },
  { label: 'About', to: '/about', scrollTo: 'about-section' },
]

function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (link) => {
    if (activeSection) {
      return activeSection === link.label.toLowerCase()
    }
    return location.pathname === link.to
  }

  const handleClick = (link, e) => {
    if (link.scrollTo) {
      e.preventDefault()
      setMenuOpen(false)
      if (location.pathname === link.to) {
        setTimeout(() => {
          const el = document.getElementById(link.scrollTo)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        navigate(`${link.to}#${link.scrollTo}`)
      }
    } else if (link.label === 'Daksha' && location.pathname === '/daksha') {
      e.preventDefault()
      setMenuOpen(false)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between bg-black/80 px-[clamp(16px,4vw,40px)] py-3.5 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <img className="block h-10 w-auto" src="/daksha/drishti-logo.png" alt="Drishti logo" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleClick(link, e)}
              className={`text-[13px] uppercase tracking-[2px] transition-colors duration-200 ${
                isActive(link)
                  ? 'text-gold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="flex flex-col gap-[5px] md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block h-[2px] w-6 transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45 bg-white' : 'bg-gold'}`} />
          <span className={`block h-[2px] w-6 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'bg-gold'}`} />
          <span className={`block h-[2px] w-6 transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45 bg-white' : 'bg-gold'}`} />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={(e) => handleClick(link, e)}
              className={`text-2xl uppercase tracking-[4px] transition-colors duration-200 ${
                isActive(link)
                  ? 'text-gold'
                  : 'text-white/60 hover:text-white'
              }`}
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Navbar
