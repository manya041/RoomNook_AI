import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../redux/slices/authSlice'
import { Eye, EyeOff, User, Lock } from 'lucide-react'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(formData)).unwrap()
      navigate('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-hero-radiance opacity-30 blur-3xl"></div>
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="glass-panel border-white/10 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-champagne-500 rounded-2xl flex items-center justify-center mb-4 shadow-glow">
              <User className="h-8 w-8 text-ivory" />
            </div>
            <h2 className="text-3xl font-display font-bold text-ivory mb-2">
              Welcome Back
            </h2>
            <p className="text-ink-100/70">
              Sign in to your RoomNook AI account
            </p>
          </div>
        
          <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label className="block text-sm font-medium text-ink-100/80 mb-2 uppercase tracking-[0.2em]">
                I am a
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={formData.userType === 'student'}
                    onChange={handleChange}
                    className="mr-2 accent-emerald-400"
                  />
                  <span className="text-ink-100/70">Student</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="owner"
                    checked={formData.userType === 'owner'}
                    onChange={handleChange}
                    className="mr-2 accent-emerald-400"
                  />
                  <span className="text-ink-100/70">PG Owner</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={formData.userType === 'admin'}
                    onChange={handleChange}
                    className="mr-2 accent-emerald-400"
                  />
                  <span className="text-ink-100/70">Admin</span>
                </label>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-ink-300" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-ink-300" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-ink-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-ink-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="border border-red-400/40 bg-red-500/10 text-red-200 px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full cursor-pointer relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-ink-100/70">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-emerald-200 hover:text-emerald-100 transition-colors">
                  Create one now
                </Link>
              </p>
              <a href="#" className="text-sm text-ink-100/50 hover:text-ink-100/70 mt-2 block">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
