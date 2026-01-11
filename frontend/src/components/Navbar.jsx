import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import {
  Home,
  User,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Building2,
  Sparkles,
  Users,
  Compass
} from 'lucide-react'

const navLinks = [
  { href: '/pg-listings', label: 'Residences', icon: Building2 },
  { href: '/mess-listings', label: 'Curated Messes' },
  { href: '/roommate-finder', label: 'Roommate Lab', icon: Users },
  { href: '/compatibility-tester', label: 'Match Studio', icon: Sparkles }
]

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setProfileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  const renderLink = (link) => {
    const Icon = link.icon
    return (
      <Link
        key={link.href}
        to={link.href}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ease-club ${
          isActive(link.href)
            ? 'text-emerald-200 bg-white/10 border border-white/15 shadow-soft'
            : 'text-ink-100/70 hover:text-emerald-100 hover:bg-white/5'
        }`}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span className="text-sm font-semibold tracking-[0.18em] uppercase">{link.label}</span>
        {isActive(link.href) && <span className="absolute inset-x-6 -bottom-1 h-px gradient-divider" />}
      </Link>
    )
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-club ${
        scrolled ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-100'
      }`}
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div
        className={`mx-auto mt-4 w-[94%] max-w-6xl rounded-[2.5rem] border border-white/[0.08] bg-white/[0.04] backdrop-blur-[22px] shadow-elegant transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        <div className="px-5">
          <div className="flex items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-3 text-ivory">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-emerald-500/35 blur-md"></div>
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-plum-500 shadow-glow">
                  <Home className="h-5 w-5 text-ivory" />
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm uppercase tracking-[0.55em] text-emerald-200/80">RoomNook</span>
                <span className="font-display text-xl text-ivory">The Habitat Atelier</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-3">
              {navLinks.map(renderLink)}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link to="/perfect-match-score" className="btn btn-ghost hidden xl:inline-flex">
                Vision
              </Link>

              {isAuthenticated ? (
                <div className="relative" onMouseLeave={() => setProfileOpen(false)}>
                  <button
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-left transition-all duration-300 hover:bg-white/10"
                    aria-haspopup="true"
                    onMouseEnter={() => setProfileOpen(true)}
                    onClick={() => setProfileOpen((p) => !p)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-champagne-400/60 to-emerald-400/40 text-midnight font-semibold shadow-soft">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col text-xs uppercase tracking-[0.38em] text-emerald-100">
                      <span>{user?.name || 'Resident'}</span>
                      <span className="text-emerald-300/70">{user?.role || 'Member'}</span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        key="profile-dropdown"
                        initial={{ opacity: 0, scale: 0.95, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -6 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                        className="absolute right-0 mt-3 min-w-[240px] origin-top-right rounded-3xl border border-white/10 bg-midnight/95 p-3 backdrop-blur-xl shadow-elegant"
                      >
                        <div className="flex flex-col gap-2 text-sm text-ink-100/80">
                          <Link
                            to="/dashboard"
                            className="rounded-2xl px-3 py-2 hover:bg-white/8 transition-colors flex items-center justify-between"
                            onClick={() => setProfileOpen(false)}
                          >
                            Dashboard <Compass className="h-4 w-4 text-emerald-200" />
                          </Link>
                          <Link
                            to="/profile"
                            className="rounded-2xl px-3 py-2 hover:bg-white/8 transition-colors flex items-center justify-between"
                            onClick={() => setProfileOpen(false)}
                          >
                            Profile <User className="h-4 w-4 text-emerald-200" />
                          </Link>
                          <Link
                            to="/chat"
                            className="rounded-2xl px-3 py-2 hover:bg-white/8 transition-colors flex items-center justify-between"
                            onClick={() => setProfileOpen(false)}
                          >
                            AI Atelier <MessageSquare className="h-4 w-4 text-emerald-200" />
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout()
                              setProfileOpen(false)
                            }}
                            className="rounded-2xl px-3 py-2 text-left text-champagne-200 hover:bg-white/5 transition-colors flex items-center justify-between"
                          >
                            Sign Out <LogOut className="h-4 w-4 text-champagne-200" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost inline-flex">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary inline-flex">
                    Register
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-ivory transition-all duration-300 hover:bg-white/10 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mt-4 px-5 lg:hidden">
            <div className="glass-panel overflow-hidden">
              <div className="flex flex-col gap-3 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm tracking-[0.38em] uppercase ${
                      isActive(link.href)
                        ? 'bg-white/10 text-emerald-100'
                        : 'text-ink-100/70 hover:bg-white/5'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.icon && <link.icon className="h-4 w-4 text-emerald-200" />}
                  </Link>
                ))}

                <div className="gradient-divider"></div>

                {isAuthenticated ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm tracking-[0.38em] uppercase text-emerald-100 bg-white/5"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/chat"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm tracking-[0.38em] uppercase text-emerald-100 bg-white/5"
                    >
                      AI Atelier
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="rounded-2xl px-4 py-3 text-sm tracking-[0.38em] uppercase text-champagne-200 bg-white/5"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-ghost"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-primary"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}

export default Navbar
