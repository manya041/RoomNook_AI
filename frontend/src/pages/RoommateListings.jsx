import React, { useState, useEffect } from 'react'
import { MapPin, CalendarDays, Users, Search, Filter } from 'lucide-react'
import Slider from '../components/Slider'

const RoommateListings = () => {
  const [filters, setFilters] = useState({
    location: '',
    gender: 'All',
    ageRange: [18, 40],
    budgetRange: [3000, 15000],
    occupation: ''
  })

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }))
  }

  const handleGenderChange = (gender) => {
    setFilters(prevFilters => ({ ...prevFilters, gender }))
  }

  const handleAgeRangeChange = (newRange) => {
    setFilters(prevFilters => ({ ...prevFilters, ageRange: newRange }))
  }

  const handleBudgetRangeChange = (newRange) => {
    setFilters(prevFilters => ({ ...prevFilters, budgetRange: newRange }))
  }

  const handleResetFilters = () => {
    setFilters({
      location: '',
      gender: 'All',
      ageRange: [18, 40],
      budgetRange: [3000, 15000],
      occupation: ''
    })
  }

  // Sample roommate data matching the image design
  const sampleRoommates = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 24,
      gender: "Female",
      occupation: "Software Engineer",
      description: "Looking for a clean and quiet PG or flatshare. I work at a tech company and have regular 9-5 hours. I enjoy reading and occasional weekend outings.",
      preferences: ["Non-smoker", "Vegetarian friendly", "Pet friendly"],
      location: "Koramangala, Bangalore",
      availableFrom: "2023-10-15",
      price: 10000,
      profilePic: "https://images.unsplash.com/photo-1494790108377-be9c29b29329?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rahul Verma",
      age: 26,
      gender: "Male",
      occupation: "Marketing Professional",
      description: "Looking for roommates to share an apartment. I am clean, sociable and respect privacy. I work in digital marketing and enjoy cooking and fitness.",
      preferences: ["Non-smoker", "Gym enthusiast", "Early riser"],
      location: "Indiranagar, Bangalore",
      availableFrom: "2023-11-01",
      price: 12000,
      profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Anjali Singh",
      age: 22,
      gender: "Female",
      occupation: "Student",
      description: "Friendly and organized student looking for a shared apartment. Enjoy cooking and movie nights with roommates.",
      preferences: ["Non-smoker", "Early riser", "Study focused"],
      location: "Jayanagar, Bangalore",
      availableFrom: "2023-10-20",
      price: 9500,
      profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Amit Kumar",
      age: 28,
      gender: "Male",
      occupation: "Software Developer",
      description: "Quiet and focused professional. Looking for a peaceful environment. Enjoy coding and occasional gaming sessions.",
      preferences: ["Non-smoker", "Night owl", "Tech enthusiast"],
      location: "HSR Layout, Bangalore",
      availableFrom: "2023-11-15",
      price: 11000,
      profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Sneha Reddy",
      age: 25,
      gender: "Female",
      occupation: "Graphic Designer",
      description: "Creative and outgoing. Love exploring new cafes and art galleries. Looking for a roommate who enjoys a vibrant social life.",
      preferences: ["Pet friendly", "Vegetarian friendly", "Art lover"],
      location: "Koramangala, Bangalore",
      availableFrom: "2023-10-25",
      price: 10500,
      profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Vikram Gupta",
      age: 27,
      gender: "Male",
      occupation: "Data Analyst",
      description: "Analytical and organized. Prefer a clean and quiet living space. Enjoy fitness and weekend adventures.",
      preferences: ["Non-smoker", "Fitness enthusiast", "Organized"],
      location: "Marathahalli, Bangalore",
      availableFrom: "2023-11-10",
      price: 13000,
      profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ]

  // Filtered roommates
  const filteredRoommates = sampleRoommates.filter(roommate => {
    return (
      (filters.location === '' || roommate.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.gender === 'All' || roommate.gender === filters.gender) &&
      (roommate.age >= filters.ageRange[0] && roommate.age <= filters.ageRange[1]) &&
      (roommate.price >= filters.budgetRange[0] && roommate.price <= filters.budgetRange[1]) &&
      (filters.occupation === '' || roommate.occupation.toLowerCase().includes(filters.occupation.toLowerCase()))
    )
  })

  // Range Slider Component
  const RangeSlider = ({ label, min, max, value, onChange, prefix = '', suffix = '' }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{prefix}{value[0]}{suffix}</span>
        <span>{prefix}{value[1]}{suffix}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500 absolute top-0"
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-900">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Any Location"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleGenderChange('All')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.gender === 'All' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => handleGenderChange('Male')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.gender === 'Male' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => handleGenderChange('Female')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.gender === 'Female' 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <RangeSlider
                label="Age Range"
                min={18}
                max={60}
                value={filters.ageRange}
                onChange={handleAgeRangeChange}
                suffix=" years"
              />

              <RangeSlider
                label="Budget Range"
                min={1000}
                max={30000}
                value={filters.budgetRange}
                onChange={handleBudgetRangeChange}
                prefix="₹"
              />

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={filters.occupation}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Any Occupation"
                />
              </div>

              <button
                onClick={handleResetFilters}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Banner */}
            <div className="bg-teal-500 text-white p-6 rounded-lg shadow-lg mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-1">Looking for a roommate?</h1>
                <p className="text-lg">Create your profile and let others find you!</p>
              </div>
              <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Create Profile
              </button>
            </div>

            <p className="text-gray-400 mb-6">Showing {filteredRoommates.length} potential roommates</p>

            {/* Roommate Listings Slider */}
            <Slider
              title=""
              subtitle=""
              itemsPerView={{ mobile: 1, tablet: 1, desktop: 2 }}
              showNavigation={true}
              className="bg-transparent shadow-none p-0"
            >
              {filteredRoommates.map((roommate) => (
                <div key={roommate.id} className="bg-white text-gray-900 p-6 rounded-lg shadow-md relative h-full flex flex-col">
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 text-xl font-bold text-green-600">
                    ₹{roommate.price.toLocaleString()}/month
                  </div>
                  
                  {/* Profile Section */}
                  <div className="flex items-center mb-4">
                    <img
                      src={roommate.profilePic}
                      alt={roommate.name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold">{roommate.name}</h3>
                      <p className="text-gray-600 text-sm">{roommate.age} years • {roommate.gender} • {roommate.occupation}</p>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-700 mb-4 flex-grow">{roommate.description}</p>
                  
                  {/* Preferences */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {roommate.preferences.map((pref, index) => (
                      <span key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                        {pref}
                      </span>
                    ))}
                  </div>
                  
                  {/* Location and Availability */}
                  <div className="text-gray-600 text-sm mb-4">
                    <div className="flex items-center mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{roommate.location}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>Available from {roommate.availableFrom}</span>
                    </div>
                  </div>
                  
                  {/* Connect Button */}
                  <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors w-full">
                    Connect
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoommateListings
