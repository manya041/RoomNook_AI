import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../redux/slices/authSlice'
import { Eye, EyeOff, User, Lock, Mail, Phone, GraduationCap } from 'lucide-react'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    university: '',
    course: '',
    year_of_study: '',
    budget_min: '',
    budget_max: '',
    preferred_location: '',
    food_preference: 'both',
    cleanliness_level: 'moderate',
    lifestyle: 'flexible',
    smoking_preference: 'non_smoker',
    userType: 'student'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const { confirmPassword, userType, ...userData } = formData
      
      // Clean up the userData - remove empty strings and convert to appropriate types
      const cleanUserData = {}
      Object.keys(userData).forEach(key => {
        const value = userData[key]
        if (value !== '' && value !== null && value !== undefined) {
          // Convert numeric fields
          if (['year_of_study', 'budget_min', 'budget_max'].includes(key)) {
            cleanUserData[key] = parseInt(value)
          } else {
            cleanUserData[key] = value
          }
        }
      })
      
      console.log('Sending registration data:', { userData: cleanUserData, userType })
      await dispatch(register({ userData: cleanUserData, userType })).unwrap()
      navigate('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-hero-radiance opacity-30 blur-3xl"></div>
      <div className="max-w-2xl w-full space-y-8 relative z-10">
        <div className="glass-panel border-white/10 p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-ivory">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-ink-100/70">
              Or{' '}
              <Link to="/login" className="font-medium text-emerald-200 hover:text-emerald-100 transition-colors">
                sign in to your existing account
              </Link>
            </p>
          </div>
        
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-ink-300" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-ink-300" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input pl-10 pr-10"
                    placeholder="Create a password"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-ink-300" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input pl-10 pr-10"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-ink-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-ink-300" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-ink-300" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {formData.userType === 'student' && (
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                    University
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <GraduationCap className="h-5 w-5 text-ink-300" />
                    </div>
                    <input
                      id="university"
                      name="university"
                      type="text"
                      value={formData.university}
                      onChange={handleChange}
                      className="input pl-10"
                      placeholder="Enter your university"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Student-specific fields */}
            {formData.userType === 'student' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                      Course
                    </label>
                    <input
                      id="course"
                      name="course"
                      type="text"
                      value={formData.course}
                      onChange={handleChange}
                      className="input"
                      placeholder="e.g., Computer Science"
                    />
                  </div>

                  <div>
                    <label htmlFor="year_of_study" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                      Year of Study
                    </label>
                    <select
                      id="year_of_study"
                      name="year_of_study"
                      value={formData.year_of_study}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="5">5th Year</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget_min" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                      Minimum Budget (₹)
                    </label>
                    <input
                      id="budget_min"
                      name="budget_min"
                      type="number"
                      value={formData.budget_min}
                      onChange={handleChange}
                      className="input"
                      placeholder="3000"
                    />
                  </div>

                  <div>
                    <label htmlFor="budget_max" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                      Maximum Budget (₹)
                    </label>
                    <input
                      id="budget_max"
                      name="budget_max"
                      type="number"
                      value={formData.budget_max}
                      onChange={handleChange}
                      className="input"
                      placeholder="10000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="preferred_location" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                    Preferred Location
                  </label>
                  <input
                    id="preferred_location"
                    name="preferred_location"
                    type="text"
                    value={formData.preferred_location}
                    onChange={handleChange}
                    className="input"
                    placeholder="e.g., Clement Town"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="food_preference" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                      Food Preference
                    </label>
                    <select
                      id="food_preference"
                      name="food_preference"
                      value={formData.food_preference}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="both">Both</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cleanliness_level" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                      Cleanliness Level
                    </label>
                    <select
                      id="cleanliness_level"
                      name="cleanliness_level"
                      value={formData.cleanliness_level}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="very_clean">Very Clean</option>
                      <option value="moderate">Moderate</option>
                      <option value="casual">Casual</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="lifestyle" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                      Lifestyle
                    </label>
                    <select
                      id="lifestyle"
                      name="lifestyle"
                      value={formData.lifestyle}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="early_bird">Early Bird</option>
                      <option value="night_owl">Night Owl</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="smoking_preference" className="block text-sm font-medium text-ink-100/80 mb-1 uppercase tracking-[0.2em]">
                      Smoking Preference
                    </label>
                    <select
                      id="smoking_preference"
                      name="smoking_preference"
                      value={formData.smoking_preference}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="non_smoker">Non-Smoker</option>
                      <option value="smoker">Smoker</option>
                      <option value="okay_with_smoking">Okay with Smoking</option>
                    </select>
                  </div>
                </div>
              </>
            )}
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
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
