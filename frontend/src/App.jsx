import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Home as HomeIcon, Utensils, Users as UsersIcon } from 'lucide-react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ChatBot from './components/ChatBot'

// Pages (code-split)
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'))
const OwnerDashboard = lazy(() => import('./pages/OwnerDashboard'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const PgListings = lazy(() => import('./pages/PgListings'))
const PgDetails = lazy(() => import('./pages/PgDetails'))
const MessListings = lazy(() => import('./pages/MessListings'))
const RoommateListings = lazy(() => import('./pages/RoommateListings'))
const RoommateFinder = lazy(() => import('./pages/RoommateFinder'))
const CompatibilityTester = lazy(() => import('./pages/CompatibilityTester'))
const PerfectMatchScore = lazy(() => import('./pages/PerfectMatchScore'))
const ChatAssistant = lazy(() => import('./pages/ChatAssistant'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const location = useLocation()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-midnight">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[100] grid place-items-center bg-midnight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-hero-radiance opacity-50 blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/2 to-transparent mix-blend-overlay"></div>
            <motion.div
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 0.45 }}
              transition={{ duration: 1.2 }}
              className="pointer-events-none absolute -top-20 -left-28 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/40 to-plum-400/30"
              style={{ filter: 'blur(60px)' }}
            />
            <motion.div
              initial={{ x: 40, y: 30, opacity: 0.25 }}
              animate={{ x: -20, y: 0, opacity: 0.35 }}
              transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse' }}
              className="pointer-events-none absolute bottom-[-60px] right-[-80px] h-80 w-80 rounded-full bg-gradient-to-tr from-champagne-300/35 to-emerald-300/25"
              style={{ filter: 'blur(70px)' }}
            />
            <motion.div
              initial={{ rotate: 0, opacity: 0.2 }}
              animate={{ rotate: 12, opacity: 0.3 }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: 'reverse' }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent"
              style={{ filter: 'blur(50px)' }}
            />
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative"
              >
                <div className="absolute -inset-3 rounded-[2rem] bg-emerald-400/25 blur-2xl"></div>
                <motion.div
                  className="relative h-36 w-36"
                  initial={{ x: -8, y: -6, rotate: 0 }}
                  animate={{ x: [-8, 10, 14, -12, -8], y: [-6, 10, -8, 12, -6], rotate: [0, 2, -1.5, 1, 0] }}
                  transition={{ duration: 5.2, ease: 'easeInOut', repeat: Infinity }}
                >
                  <motion.div
                    initial={{ scale: 0.92, rotate: -2 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full border border-white/20 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md shadow-glow"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-2 rounded-full bg-gradient-to-b from-emerald-300/15 to-transparent"
                  />
                  <motion.div
                    initial={{ rotate: -40, y: 26, x: 58 }}
                    animate={{ rotate: -40, y: 26, x: 58 }}
                    className="absolute h-2 w-20 rounded-full bg-gradient-to-r from-emerald-300/60 to-champagne-300/60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -6], scale: [0.9, 1, 1, 0.95] }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.3, ease: 'easeInOut' }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8"
                    >
                      <HomeIcon className="h-7 w-7 text-emerald-200" />
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -6], scale: [0.9, 1, 1, 0.95] }}
                      transition={{ delay: 0.6, duration: 1.8, repeat: Infinity, repeatDelay: 0.3, ease: 'easeInOut' }}
                      className="absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8"
                    >
                      <Utensils className="h-7 w-7 text-champagne-200" />
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -6], scale: [0.9, 1, 1, 0.95] }}
                      transition={{ delay: 1.2, duration: 1.8, repeat: Infinity, repeatDelay: 0.3, ease: 'easeInOut' }}
                      className="absolute flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8"
                    >
                      <UsersIcon className="h-7 w-7 text-emerald-200" />
                    </motion.span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.35, scale: 1.2 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-3xl border border-white/20"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 0.2, scale: 1.8 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-emerald-300/20 to-transparent"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 text-sm uppercase tracking-[0.5em] text-emerald-200"
              >
                RoomNook Atelier
              </motion.div>
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                width="220"
                height="22"
                viewBox="0 0 220 22"
                className="mt-2"
              >
                <motion.path
                  d="M4 18 C 40 6, 120 6, 216 18"
                  fill="transparent"
                  stroke="url(#grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 0.9, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="grad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#98f5e1" />
                    <stop offset="50%" stopColor="#f7e6b7" />
                    <stop offset="100%" stopColor="#98f5e1" />
                  </linearGradient>
                </defs>
              </motion.svg>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-2 text-ink-100/70"
              >
                Living, by design
              </motion.div>
              <div className="mt-8 w-56">
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-champagne-300"
                  />
                </div>
              </div>
              <motion.div
                initial={{ x: '-30%', opacity: 0 }}
                animate={{ x: '130%', opacity: 0.6 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="pointer-events-none absolute top-1/2 h-24 w-72 -translate-y-1/2 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent blur-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          <Navbar />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 16, scale: 0.995, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative flex-1 pt-32 md:pt-36"
            >
              <Suspense fallback={<div className="container py-24 text-center text-ink-700">Loading…</div>}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/pg-listings" element={<PgListings />} />
                  <Route path="/pg-details/:id" element={<PgDetails />} />
                  <Route path="/mess-listings" element={<MessListings />} />
                  <Route path="/roommate-listings" element={<RoommateListings />} />
                  <Route path="/roommate-finder" element={<RoommateFinder />} />
                  <Route path="/compatibility-tester" element={<CompatibilityTester />} />
                  <Route path="/perfect-match-score" element={<PerfectMatchScore />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      {user?.role === 'student' ? <StudentDashboard /> : 
                       user?.role === 'owner' ? <OwnerDashboard /> : 
                       user?.role === 'admin' ? <AdminDashboard /> : <Home />}
                    </ProtectedRoute>
                  } />
                  <Route path="/chat" element={
                    <ProtectedRoute>
                      <ChatAssistant />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Suspense>
            </motion.main>
          </AnimatePresence>
          <Footer />
          <ChatBot />
        </>
      )}
    </div>
  )
}

export default App
