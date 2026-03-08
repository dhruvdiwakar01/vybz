import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import FaceExpression from '../../expressions/components/FaceExpressions'
import Player from '../components/Player'
import { useSong } from '../hooks/useSongs'
import './Home.scss'

const navLinks = [
  { label: 'Discover',        icon: DiscoverIcon,  section: 'discovery' },
  { label: 'Trends',          icon: TrendsIcon,    section: 'discovery' },
  { label: 'Library',         icon: LibraryIcon,   section: 'discovery' },
  { label: 'Mood Mixes',      icon: MoodIcon,      section: 'playlists' },
  { label: 'Favorites',       icon: FavIcon,       section: 'playlists' },
  { label: 'Recently Played', icon: HistoryIcon,   section: 'playlists' },
]

// ── SVG Icons ────────────────────────────────
function WavesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/>
    </svg>
  )
}
function DiscoverIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  )
}
function TrendsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  )
}
function LibraryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  )
}
function MoodIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  )
}
function FavIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}
function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"/>
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}
function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  )
}
function FaceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3"/>
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3"/>
    </svg>
  )
}
function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
  )
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}

// ── Home Component ────────────────────────────
const Home = () => {
  const { handleGetSong } = useSong()
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('Discover')
  const [currentMood, setCurrentMood] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Playground refs
  const canvasRef = useRef(null)
  const playgroundRef = useRef(null)
  const animFrameRef = useRef(null)
  const trailsRef = useRef([])
  const mouseRef = useRef({ x: -999, y: -999 })

  // Generate background stars only once
  const bgStars = useMemo(() =>
    Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${(Math.random() * 3).toFixed(2)}s`,
      duration: `${(1.5 + Math.random() * 2.5).toFixed(2)}s`,
      size: `${(1 + Math.random() * 2).toFixed(1)}px`,
    })), []
  )

  // Close sidebar on resize to tablet+
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Shooting star trail canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const playground = playgroundRef.current
    if (!canvas || !playground) return

    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = playground.offsetWidth
      canvas.height = playground.offsetHeight
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(playground)

    const handleMouseMove = (e) => {
      const rect = playground.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseRef.current = { x, y }

      for (let i = 0; i < 3; i++) {
        trailsRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1.5,
          alpha: 1,
          color: Math.random() > 0.4 ? '255,255,255' : '136,236,136',
          tailLength: Math.random() * 18 + 10,
          angle: Math.atan2(
            y - (trailsRef.current[trailsRef.current.length - 4]?.y ?? y),
            x - (trailsRef.current[trailsRef.current.length - 4]?.x ?? x)
          ),
        })
      }

      if (trailsRef.current.length > 180) {
        trailsRef.current = trailsRef.current.slice(-180)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      trailsRef.current = trailsRef.current.filter(p => p.alpha > 0.02)

      trailsRef.current.forEach(p => {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5)
        gradient.addColorStop(0, `rgba(${p.color}, ${p.alpha})`)
        gradient.addColorStop(1, `rgba(${p.color}, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        const tailX = p.x - Math.cos(p.angle) * p.tailLength
        const tailY = p.y - Math.sin(p.angle) * p.tailLength

        const tailGrad = ctx.createLinearGradient(p.x, p.y, tailX, tailY)
        tailGrad.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.8})`)
        tailGrad.addColorStop(1, `rgba(${p.color}, 0)`)

        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(tailX, tailY)
        ctx.strokeStyle = tailGrad
        ctx.lineWidth = p.size * 0.9
        ctx.lineCap = 'round'
        ctx.stroke()

        p.alpha -= 0.032
        p.x += p.vx
        p.y += p.vy
      })

      animFrameRef.current = requestAnimationFrame(animate)
    }

    playground.addEventListener('mousemove', handleMouseMove)
    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      playground.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
      resizeObserver.disconnect()
    }
  }, [])

  const handleMoodDetected = (mood) => {
    setCurrentMood(mood)
    handleGetSong({ mood })
  }

  const handleDetectClick = () => {
    const hiddenBtn = document.getElementById('face-detect-trigger')
    if (hiddenBtn) hiddenBtn.click()
  }

  const closeSidebar = () => setSidebarOpen(false)

  // ── Logout ───────────────────────────────────
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      })
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setIsLoggingOut(false)
      navigate('/login')
    }
  }

  return (
    <div className="vybz-home">

      {/* ── Sidebar overlay (mobile/tablet) ── */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* ── Sidebar ──────────────────────── */}
      <aside className={`sidebar${sidebarOpen ? ' is-open' : ''}`}>
        <div className="sidebar__logo">
          <div className="logo-icon"><WavesIcon /></div>
          <h1>VYBZ</h1>
        </div>

        <nav className="sidebar__nav">
          <p className="nav-label">Discovery</p>
          {navLinks.filter(l => l.section === 'discovery').map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-link${activeNav === label ? ' active' : ''}`}
              onClick={() => { setActiveNav(label); closeSidebar() }}
            >
              <Icon />
              {label}
            </button>
          ))}

          <p className="nav-label">Your Playlists</p>
          {navLinks.filter(l => l.section === 'playlists').map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-link${activeNav === label ? ' active' : ''}`}
              onClick={() => { setActiveNav(label); closeSidebar() }}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        {/* ── User card with logout ── */}
        <div className="sidebar__user">
          <div className="user-card">
            <div className="avatar">
              <img src="https://www.pngitem.com/pimgs/m/130-1300253_female-user-icon-png-download-user-image-color.png" alt="User" />
            </div>
            <div className="user-info">
              <span className="name">userXYZ</span>
              <span className="role">Premium Member+</span>
            </div>
            <button
              className={`logout-btn${isLoggingOut ? ' loading' : ''}`}
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Logout"
            >
              <LogoutIcon />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main ─────────────────────────── */}
      <main className="main">

        {/* Topbar */}
        <header className="topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </button>

          <div className="search-box">
            <SearchIcon />
            <input type="text" placeholder="Search artists, tracks, or vibes..." />
          </div>
          <div className="topbar-right">
            <button className="icon-btn"><BellIcon /></button>
          </div>
        </header>

        {/* Page Body */}
        <div className="page-body">

          {/* Mood Section */}
          <section className="mood-section">
            <div className="mood-text">
              <span className="tag">AI Mood Analysis</span>
              <h2>Sync your music<br />to your soul.</h2>
              <p>
                Our AI analyzes your facial expression to curate the
                perfect playlist for your current vibe.
              </p>

              <div className="mood-actions">
                <button className="detect-btn" onClick={handleDetectClick}>
                  <FaceIcon />
                  Detect My Mood
                </button>

                <div className="divider" />

                <div className="current-mood">
                  <span className="mood-label">Current Mood</span>
                  <div className={`mood-value${currentMood ? ' detected' : ''}`}>
                    {currentMood || '—'}
                  </div>
                </div>
              </div>
            </div>

            <div className="camera-wrap">
              <FaceExpression onMoodDetected={handleMoodDetected} />
              {!currentMood && (
                <div className="camera-idle">
                  <CameraIcon />
                  <p>Click "Detect My Mood" to start</p>
                </div>
              )}
              <div className="live-badge">
                <span className="dot" />
                Live Feed Analysis
              </div>
            </div>
          </section>

          {/* 🌠 Playground Section */}
          <section className="playground-section" ref={playgroundRef}>
            <canvas ref={canvasRef} className="playground-canvas" />

            <div className="stars">
              {bgStars.map(s => (
                <div key={s.id} className="star" style={{
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                }} />
              ))}
            </div>

            <div className="moon" />
            <div className="cloud cloud--1" />
            <div className="cloud cloud--2" />

            <div className="playground-label">
              <span className="playground-tag">Chill Zone</span>
              <h3>Move your cursor around</h3>
              <p>Shooting stars follow your vibe 🌠</p>
            </div>
          </section>

        </div>

        {/* Sticky Player */}
        <Player />
      </main>
    </div>
  )
}

export default Home