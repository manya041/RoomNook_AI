import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Home, Users, MessageCircle, Bookmark, Search, Star, MapPin, Clock, TrendingUp } from 'lucide-react'
import { getPgListings, getBookmarks } from '../redux/slices/pgSlice'
import { getMessListings } from '../redux/slices/messSlice'
import Slider from '../components/Slider'

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { pgListings, bookmarks } = useSelector((state) => state.pg)
  const { messListings } = useSelector((state) => state.mess)
  const dispatch = useDispatch()

  useEffect(() => {
    // Load initial data
    dispatch(getPgListings({ limit: 6 }))
    dispatch(getBookmarks())
    dispatch(getMessListings({ limit: 3 }))
  }, [dispatch])

  const quickStats = [
    { label: 'Bookmarked PGs', value: bookmarks.filter(b => b.bookmark_type === 'pg').length, icon: Bookmark, color: 'blue' },
    { label: 'Saved Mess', value: bookmarks.filter(b => b.bookmark_type === 'mess').length, icon: Home, color: 'green' },
    { label: 'Perfect Matches', value: '12', icon: Star, color: 'yellow' },
    { label: 'AI Queries', value: '8', icon: MessageCircle, color: 'purple' }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 text-lg">Find your perfect living situation with AI-powered recommendations</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <Home className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8" initial="hidden" animate="show" variants={containerVariants}>
        {quickStats.map((stat, index) => (
          <motion.div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200" variants={itemVariants}>
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/pg-listings" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <Search className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Search PGs</h3>
          <p className="text-gray-600 text-sm">Find verified PG accommodations near your campus</p>
        </Link>
        
        <Link to="/chat" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
            <MessageCircle className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">AI Assistant</h3>
          <p className="text-gray-600 text-sm">Get personalized recommendations using Perfect Match Score™</p>
        </Link>
        
        <Link to="/mess-listings" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
            <Home className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Find Mess</h3>
          <p className="text-gray-600 text-sm">Discover mess services with good ratings and reviews</p>
        </Link>
        
        <Link to="/roommate-listings" className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">Find Roommates</h3>
          <p className="text-gray-600 text-sm">Connect with compatible roommates based on lifestyle</p>
        </Link>
      </div>

      {/* Featured PGs Slider */}
      <Slider
        title="Featured PGs"
        subtitle="Top-rated PG accommodations in your area"
        viewAllLink="/pg-listings"
        viewAllText="View All PGs"
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        autoSlide={true}
        autoSlideInterval={4000}
        className="mb-8"
      >
        {pgListings.slice(0, 6).map((pg) => (
          <div key={pg.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-xl flex items-center justify-center">
                <Home className="h-16 w-16 text-white" />
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{pg.avgRating || '4.5'}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{pg.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-sm truncate">{pg.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">₹{pg.rent_amount?.toLocaleString()}</span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Top Mess Services Slider */}
      <Slider
        title="Top Mess Services"
        subtitle="Best-rated mess services near you"
        viewAllLink="/mess-listings"
        viewAllText="View All Mess"
        itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        autoSlide={true}
        autoSlideInterval={5000}
        className="mb-8"
      >
        {messListings.slice(0, 6).map((mess) => (
          <div key={mess.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="relative">
              <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500 rounded-t-xl flex items-center justify-center">
                <Home className="h-16 w-16 text-white" />
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{mess.rating || '4.2'}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{mess.name}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="text-sm truncate">{mess.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">₹{mess.monthly_cost?.toLocaleString()}</span>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Perfect Match Score Banner */}
      <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Perfect Match Score™</h3>
            <p className="text-yellow-100">Find your ideal PG based on compatibility scoring algorithm</p>
          </div>
          <Link to="/perfect-match-score" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
            Calculate Score
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
