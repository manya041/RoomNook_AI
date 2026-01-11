import React, { useState } from 'react'
import { Star, MapPin, Users, Home, TrendingUp, Award, Target, CheckCircle } from 'lucide-react'

const PerfectMatchScore = () => {
  const [userPreferences, setUserPreferences] = useState({
    location: '',
    budget: [3000, 10000],
    roomType: 'double',
    facilities: [],
    lifestyle: {
      smoking: false,
      pets: false,
      noiseLevel: 'moderate',
      cleanliness: 'high'
    }
  })

  const [matchResults, setMatchResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Sample PG data with compatibility scores
  const samplePgs = [
    {
      id: 1,
      title: "Modern PG Clement Town",
      location: "Clement Town, Dehradun",
      price: 5500,
      roomType: "Double",
      facilities: ["WiFi", "AC", "RO Water", "Parking", "Food", "Security"],
      perfectMatchScore: 87,
      breakdown: {
        location: 90,
        budget: 85,
        facilities: 88,
        lifestyle: 85
      },
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Comfort Zone PG",
      location: "Rajpur Road, Dehradun",
      price: 7500,
      roomType: "Single",
      facilities: ["WiFi", "AC", "RO Water", "Parking", "Food"],
      perfectMatchScore: 72,
      breakdown: {
        location: 75,
        budget: 60,
        facilities: 80,
        lifestyle: 75
      },
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Student Hub PG",
      location: "Dharampur, Dehradun",
      price: 4000,
      roomType: "Triple",
      facilities: ["WiFi", "RO Water", "Food", "Security"],
      perfectMatchScore: 95,
      breakdown: {
        location: 95,
        budget: 100,
        facilities: 90,
        lifestyle: 95
      },
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
    }
  ]

  const calculateMatchScore = () => {
    // Simulate match score calculation based on user preferences
    const results = samplePgs.map(pg => {
      let score = 0
      let breakdown = {
        location: 0,
        budget: 0,
        facilities: 0,
        lifestyle: 0
      }

      // Location score (simplified)
      if (userPreferences.location && pg.location.toLowerCase().includes(userPreferences.location.toLowerCase())) {
        breakdown.location = 90
      } else {
        breakdown.location = 70
      }

      // Budget score
      if (pg.price >= userPreferences.budget[0] && pg.price <= userPreferences.budget[1]) {
        breakdown.budget = 100
      } else if (pg.price < userPreferences.budget[0]) {
        breakdown.budget = 80
      } else {
        breakdown.budget = 60
      }

      // Facilities score
      const facilityMatch = userPreferences.facilities.filter(facility => 
        pg.facilities.includes(facility)
      ).length
      breakdown.facilities = (facilityMatch / Math.max(userPreferences.facilities.length, 1)) * 100

      // Lifestyle score (simplified)
      breakdown.lifestyle = 85

      // Calculate overall score
      score = Math.round(
        (breakdown.location * 0.3) +
        (breakdown.budget * 0.3) +
        (breakdown.facilities * 0.25) +
        (breakdown.lifestyle * 0.15)
      )

      return {
        ...pg,
        perfectMatchScore: score,
        breakdown
      }
    }).sort((a, b) => b.perfectMatchScore - a.perfectMatchScore)

    setMatchResults(results)
    setShowResults(true)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-200 bg-emerald-400/15 border border-emerald-300/40'
    if (score >= 80) return 'text-champagne-200 bg-champagne-400/15 border border-champagne-300/40'
    if (score >= 70) return 'text-yellow-200 bg-yellow-400/15 border border-yellow-300/40'
    return 'text-red-200 bg-red-400/15 border border-red-300/40'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent Match'
    if (score >= 80) return 'Great Match'
    if (score >= 70) return 'Good Match'
    return 'Fair Match'
  }

  return (
    <div className="relative min-h-screen pb-24">
      <div className="absolute inset-0 bg-hero-radiance opacity-30 blur-3xl"></div>
      <div className="container relative z-10 flex flex-col gap-12 pt-10 md:pt-16">
        <div className="animate-fade-in-up">
          <span className="pill mb-5 flex items-center gap-2">
            <Star className="h-3 w-3" />
            Perfect Match Score™
          </span>
          <h1 className="font-display text-4xl text-ivory md:text-5xl">Perfect Match Score™</h1>
          <p className="mt-4 max-w-3xl text-sm text-ink-100/70 md:text-base">Find your ideal PG based on compatibility scoring</p>
        </div>

      {!showResults ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
          {/* Preferences Form */}
          <div className="glass-panel border-white/10 p-8">
            <h2 className="text-2xl font-display font-semibold text-ivory mb-6">Your Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-ink-100/80 mb-2 uppercase tracking-[0.2em]">Preferred Location</label>
                <input
                  type="text"
                  value={userPreferences.location}
                  onChange={(e) => setUserPreferences({...userPreferences, location: e.target.value})}
                  className="input"
                  placeholder="Enter location (e.g., Clement Town)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-100/80 mb-2 uppercase tracking-[0.2em]">Budget Range</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    value={userPreferences.budget[0]}
                    onChange={(e) => setUserPreferences({
                      ...userPreferences, 
                      budget: [parseInt(e.target.value), userPreferences.budget[1]]
                    })}
                    className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="text-sm text-ink-100/70 min-w-[100px] text-center">
                    ₹{userPreferences.budget[0].toLocaleString()} - ₹{userPreferences.budget[1].toLocaleString()}
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="15000"
                    value={userPreferences.budget[1]}
                    onChange={(e) => setUserPreferences({
                      ...userPreferences, 
                      budget: [userPreferences.budget[0], parseInt(e.target.value)]
                    })}
                    className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-100/80 mb-2 uppercase tracking-[0.2em]">Room Type</label>
                <select
                  value={userPreferences.roomType}
                  onChange={(e) => setUserPreferences({...userPreferences, roomType: e.target.value})}
                  className="input"
                >
                  <option value="single">Single Room</option>
                  <option value="double">Double Sharing</option>
                  <option value="triple">Triple Sharing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-100/80 mb-2 uppercase tracking-[0.2em]">Required Facilities</label>
                <div className="grid grid-cols-2 gap-2">
                  {['WiFi', 'AC', 'RO Water', 'Parking', 'Food', 'Security'].map((facility) => (
                    <label key={facility} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={userPreferences.facilities.includes(facility)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserPreferences({
                              ...userPreferences,
                              facilities: [...userPreferences.facilities, facility]
                            })
                          } else {
                            setUserPreferences({
                              ...userPreferences,
                              facilities: userPreferences.facilities.filter(f => f !== facility)
                            })
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{facility}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={calculateMatchScore}
              className="btn btn-primary w-full mt-8 cursor-pointer relative z-10"
              type="button"
            >
              Calculate Perfect Match Score
            </button>
          </div>

          {/* How it Works */}
          <div className="glass-panel border-white/10 p-8">
            <h2 className="text-2xl font-display font-semibold text-ivory mb-6">How Perfect Match Score™ Works</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-emerald-400/15 p-2 rounded-lg mr-4 border border-emerald-300/30">
                  <Target className="h-6 w-6 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-ivory">Location Compatibility</h3>
                  <p className="text-ink-100/70 text-sm">Proximity to your preferred area and connectivity</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-champagne-400/15 p-2 rounded-lg mr-4 border border-champagne-300/30">
                  <TrendingUp className="h-6 w-6 text-champagne-200" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-ivory">Budget Alignment</h3>
                  <p className="text-ink-100/70 text-sm">How well the price fits your budget range</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-emerald-400/15 p-2 rounded-lg mr-4 border border-emerald-300/30">
                  <CheckCircle className="h-6 w-6 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-ivory">Facility Match</h3>
                  <p className="text-ink-100/70 text-sm">Availability of your required amenities</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-champagne-400/15 p-2 rounded-lg mr-4 border border-champagne-300/30">
                  <Users className="h-6 w-6 text-champagne-200" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-ivory">Lifestyle Compatibility</h3>
                  <p className="text-ink-100/70 text-sm">Rules, environment, and living conditions</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-400/20 to-champagne-400/20 rounded-lg border border-emerald-300/30">
              <div className="flex items-center">
                <Award className="h-6 w-6 mr-2 text-champagne-200" />
                <div>
                  <h3 className="font-semibold text-ivory">Perfect Match Algorithm</h3>
                  <p className="text-sm text-ink-100/70">Our proprietary scoring system analyzes multiple factors to find your ideal match</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in-up">
          {/* Results Header */}
          <div className="glass-panel border-white/10 p-8 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-semibold text-ivory">Your Perfect Matches</h2>
                <p className="text-ink-100/70">Based on your preferences and compatibility analysis</p>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="btn btn-secondary cursor-pointer relative z-10"
                type="button"
              >
                Modify Preferences
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {matchResults.map((pg, index) => (
              <div key={pg.id} className="floating-card group animate-fade-in-up overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start">
                      <img
                        src={pg.image}
                        alt={pg.title}
                        className="w-24 h-24 rounded-lg object-cover mr-4 border border-white/10"
                      />
                      <div>
                        <h3 className="text-xl font-display font-semibold text-ivory mb-1">{pg.title}</h3>
                        <div className="flex items-center text-ink-100/70 mb-2">
                          <MapPin className="h-4 w-4 mr-1 text-emerald-200" />
                          <span>{pg.location}</span>
                        </div>
                        <div className="flex items-center text-ink-100/70 mb-2">
                          <Users className="h-4 w-4 mr-1 text-champagne-200" />
                          <span>{pg.roomType} • ₹{pg.price.toLocaleString()}/month</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {pg.facilities.slice(0, 4).map((facility, idx) => (
                            <span key={idx} className="badge badge-emerald">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        pg.perfectMatchScore >= 90 ? 'bg-emerald-400/15 text-emerald-200 border border-emerald-300/40' :
                        pg.perfectMatchScore >= 80 ? 'bg-champagne-400/15 text-champagne-200 border border-champagne-300/40' :
                        pg.perfectMatchScore >= 70 ? 'bg-yellow-400/15 text-yellow-200 border border-yellow-300/40' :
                        'bg-red-400/15 text-red-200 border border-red-300/40'
                      }`}>
                        <Star className="h-4 w-4 mr-1" />
                        {pg.perfectMatchScore}%
                      </div>
                      <p className="text-sm text-ink-100/60 mt-1">{getScoreLabel(pg.perfectMatchScore)}</p>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-lg font-semibold text-ivory">{pg.breakdown.location}%</div>
                      <div className="text-xs text-ink-100/60">Location</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-lg font-semibold text-ivory">{pg.breakdown.budget}%</div>
                      <div className="text-xs text-ink-100/60">Budget</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-lg font-semibold text-ivory">{pg.breakdown.facilities}%</div>
                      <div className="text-xs text-ink-100/60">Facilities</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-lg font-semibold text-ivory">{pg.breakdown.lifestyle}%</div>
                      <div className="text-xs text-ink-100/60">Lifestyle</div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      className="btn btn-primary cursor-pointer relative z-10"
                      type="button"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default PerfectMatchScore
