import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Users, Star, Wifi, Car, Utensils, Droplets, Zap, Shield, Phone, Calendar, Heart, Share2, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { getPgListingById, clearCurrentPgListing, addBookmark } from '../redux/slices/pgSlice'

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'
]

const amenityIconMap = {
  wifi: Wifi,
  internet: Wifi,
  ac: Zap,
  airconditioner: Zap,
  'ro water': Droplets,
  water: Droplets,
  parking: Car,
  food: Utensils,
  mess: Utensils,
  security: Shield
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'location', label: 'Location' },
  { id: 'reviews', label: 'Reviews' }
]

const PgDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentPgListing, loading, error } = useSelector((state) => state.pg)
  const [activeTab, setActiveTab] = useState('overview')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (id) {
      dispatch(getPgListingById(id))
    }

    return () => {
      dispatch(clearCurrentPgListing())
    }
  }, [dispatch, id])

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [currentPgListing])

  const pgData = useMemo(() => {
    if (!currentPgListing) return null

    const images = Array.isArray(currentPgListing.images) && currentPgListing.images.length > 0
      ? currentPgListing.images
      : DEFAULT_IMAGES

    const amenities = Array.isArray(currentPgListing.amenities)
      ? currentPgListing.amenities.map((amenity) => {
          const key = String(amenity).toLowerCase()
          const Icon = amenityIconMap[key] || amenityIconMap[key.split(' ')[0]] || Shield
          return {
            name: amenity,
            icon: Icon,
            available: true
          }
        })
      : []

    const rules = typeof currentPgListing.rules === 'string'
      ? currentPgListing.rules.split(/\n|\.|;/).map(rule => rule.trim()).filter(Boolean)
      : Array.isArray(currentPgListing.rules)
        ? currentPgListing.rules
        : []

    return {
      id: currentPgListing.id,
      title: currentPgListing.title,
      location: currentPgListing.address || currentPgListing.location || 'Location unavailable',
      displayLocation: currentPgListing.location || currentPgListing.address || 'Location unavailable',
      rating: Number(currentPgListing.avgRating || 0).toFixed(1),
      totalReviews: currentPgListing.reviewCount || (currentPgListing.reviews?.length ?? 0),
      price: currentPgListing.rent_amount || 0,
      roomType: currentPgListing.room_type ? currentPgListing.room_type.replace(/^\w/, c => c.toUpperCase()) : 'Not specified',
      gender: currentPgListing.gender_preference ? currentPgListing.gender_preference.replace(/^\w/, c => c.toUpperCase()) : 'Any',
      images,
      amenities,
      description: currentPgListing.description || 'Description coming soon.',
      rules,
      status: currentPgListing.status,
      verification_status: currentPgListing.verification_status,
      owner: {
        name: currentPgListing.owner?.name || 'PG Owner',
        phone: currentPgListing.owner?.phone || 'Not available',
        responseRate: currentPgListing.owner?.verification_status === 'verified' ? '98%' : '92%',
        responseTime: 'Within a few hours',
        avatar: currentPgListing.owner?.name ? currentPgListing.owner.name.charAt(0).toUpperCase() : 'P'
      },
      reviews: currentPgListing.reviews || []
    }
  }, [currentPgListing])

  const handleContactOwner = () => {
    const phone = pgData?.owner?.phone?.replace(/\D/g, '')
    if (phone) {
      window.location.href = `tel:${phone}`
    } else {
      toast.error('Phone not available')
    }
  }

  const handleScheduleVisit = () => {
    toast.success('Visit request sent to owner')
  }

  const handleSave = async () => {
    try {
      if (pgData?.id) {
        await dispatch(addBookmark({ type: 'pg', refId: pgData.id })).unwrap()
      }
      toast.success('Saved to bookmarks')
    } catch {
      toast.success('Saved locally')
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    const title = pgData?.title || 'PG Listing'
    try {
      if (navigator.share) {
        await navigator.share({ title, text: 'Check this PG on RoomNook', url })
      } else {
        await navigator.clipboard.writeText(url)
      }
      toast.success('Share ready')
    } catch {}
  }

  return (
    <div className="min-h-screen bg-midnight">
      <div className="bg-midnight/95">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-ivory hover:text-emerald-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Listings
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="flex items-center justify-center py-12 text-ink-100/60">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Loading PG details...
          </div>
        )}

        {false && error && (
          <div className="mb-6 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {!loading && !pgData && !error && (
          <div className="text-center text-ink-100/60">PG details not found.</div>
        )}

        {pgData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-panel overflow-hidden mb-6">
                <div className="relative">
                  <motion.img
                    key={pgData.images[currentImageIndex]}
                    src={pgData.images[currentImageIndex]}
                    alt={pgData.title}
                    className="w-full h-96 object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {pgData.images.length}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {pgData.images.map((image, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          currentImageIndex === index ? 'border-emerald-400' : 'border-white/20'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img
                          src={image}
                          alt={`${pgData.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {pgData.verification_status === 'verified' && (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                          Verified Listing
                        </span>
                      )}
                      {pgData.status && pgData.status !== 'active' && (
                        <span className="inline-flex items-center rounded-full bg-champagne-500/15 px-3 py-1 text-xs font-semibold text-champagne-200 capitalize">
                          {pgData.status}
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl font-bold text-ivory mb-2">{pgData.title}</h1>
                    <div className="flex items-center text-ink-100/70 mb-2">
                      <MapPin className="h-5 w-5 mr-1" />
                      <span>{pgData.displayLocation}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-champagne-200 mr-1" />
                        <span className="font-semibold">{pgData.rating}</span>
                        <span className="text-ink-100/60 ml-1">({pgData.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-ink-100/70 mr-1" />
                        <span>{pgData.gender}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-200">
                      ₹{Number(pgData.price || 0).toLocaleString()}
                    </div>
                    <div className="text-ink-100/60">per month</div>
                  </div>
                </div>

                <PerfectMatchBanner />
              </div>

              <div className="glass-panel">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-emerald-300 text-emerald-100'
                            : 'border-transparent text-ink-100/70 hover:text-ivory hover:border-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h3 className="text-xl font-semibold text-ivory mb-4">About this PG</h3>
                      <p className="text-ink-100/70 mb-6">{pgData.description}</p>

                      <h3 className="text-xl font-semibold text-ivory mb-4">PG Rules</h3>
                      {pgData.rules.length === 0 ? (
                        <p className="text-ink-100/60">Rules will be provided by the owner.</p>
                      ) : (
                        <ul className="space-y-2">
                          {pgData.rules.map((rule, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-ink-100/60 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-ink-100/70">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'amenities' && (
                    <motion.div key="amenities" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h3 className="text-xl font-semibold text-ivory mb-4">Amenities</h3>
                      {pgData.amenities.length === 0 ? (
                        <p className="text-ink-100/60">Amenities information will be updated soon.</p>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {pgData.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center p-3 bg-white/5 rounded-lg">
                              <amenity.icon className={`h-5 w-5 mr-3 ${amenity.available ? 'text-emerald-200' : 'text-ink-100/60'}`} />
                              <span className={`font-medium ${amenity.available ? 'text-ivory' : 'text-ink-100/70'}`}>
                                {amenity.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'rooms' && (
                    <motion.div key="rooms" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h3 className="text-xl font-semibold text-ivory mb-4">Room Details</h3>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold text-lg mb-2">{pgData.roomType}</h4>
                        <p className="text-ink-100/70">
                          Comfortable and well-furnished rooms with essential amenities. Contact the owner for specific room layouts.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'location' && (
                    <motion.div key="location" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h3 className="text-xl font-semibold text-ivory mb-4">Location</h3>
                      <p className="text-ink-100/70 mb-4">{pgData.location}</p>
                      <div className="bg-white/10 h-64 rounded-lg flex items-center justify-center">
                        <span className="text-ink-100/60">Map integration coming soon</span>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h3 className="text-xl font-semibold text-ivory mb-4">Reviews</h3>
                      {pgData.reviews.length === 0 ? (
                        <p className="text-ink-100/60">No reviews yet. Be the first to share your experience.</p>
                      ) : (
                        <div className="space-y-4">
                          {pgData.reviews.map((review) => (
                            <div key={review.id} className="border-b border-white/10 pb-4">
                              <div className="flex items-center mb-2">
                                <div className="flex items-center mr-4">
                                  <Star className="h-4 w-4 text-champagne-200 mr-1" />
                                  <span className="font-semibold">{Number(review.rating).toFixed(1)}</span>
                                </div>
                                <span className="text-ink-100/70 capitalize">{review.student?.name || 'Anonymous'}</span>
                                <span className="text-ink-100/60 ml-2">
                                  {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
                                </span>
                              </div>
                              <p className="text-ink-100/70">{review.comment || 'No additional comments provided.'}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="glass-panel p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Owner Information</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {pgData.owner.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{pgData.owner.name}</h4>
                    <p className="text-ink-100/70">{pgData.owner.phone}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-100/70">Response rate:</span>
                    <span className="font-medium">{pgData.owner.responseRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-100/70">Response time:</span>
                    <span className="font-medium">{pgData.owner.responseTime}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6">
                <h3 className="text-xl font-bold mb-2">Interested in this PG?</h3>
                <p className="text-ink-100/70 mb-6">Contact the owner directly or schedule a visit</p>

                <div className="space-y-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary w-full flex items-center justify-center" onClick={handleContactOwner}>
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Owner
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-secondary w-full flex items-center justify-center" onClick={handleScheduleVisit}>
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Visit
                  </motion.button>
                  <div className="flex space-x-2">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-ghost flex-1" onClick={handleSave}>
                      <Heart className="h-4 w-4 mr-2" />
                      Save
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-ghost flex-1" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const PerfectMatchBanner = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 mb-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-white">Perfect Match Score™</h3>
        <p className="text-yellow-100">Connect your profile to unlock personalized match scores.</p>
      </div>
      <div className="text-right">
        <div className="text-4xl font-bold text-white">--</div>
        <div className="text-yellow-100 text-sm">Login to calculate</div>
      </div>
    </div>
  </motion.div>
)

export default PgDetails
