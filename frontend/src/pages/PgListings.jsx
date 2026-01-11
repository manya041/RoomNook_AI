import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Home, MapPin, Users, Star, Search, Filter, Wifi, Car, Utensils, Droplets, Zap, Shield, Loader2 } from 'lucide-react'
import Slider from '../components/Slider'
import { getPgListings } from '../redux/slices/pgSlice'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop'

const PgListings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { pgListings, loading, error, pagination } = useSelector((state) => state.pg)
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    priceRange: [
      Number(searchParams.get('minPrice')) || 3000,
      Number(searchParams.get('maxPrice')) || 15000
    ],
    roomType: searchParams.get('roomType') || '',
    facilities: []
  })
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [sort, setSort] = useState(searchParams.get('sort') || 'recent')
  const [displayPgs, setDisplayPgs] = useState([])

  useEffect(() => {
    dispatch(getPgListings({ page, sort }))
  }, [dispatch, page, sort])

  const transformedPgs = useMemo(() => {
    if (!Array.isArray(pgListings)) return []

    return pgListings.map((pg) => ({
      id: pg.id || pg._id,
      title: pg.title,
      location: `${pg.location || 'Unknown location'}`,
      roomType: pg.room_type ? pg.room_type.replace(/^\w/, c => c.toUpperCase()) : 'N/A',
      price: pg.rent_amount || 0,
      rating: Number(pg.avgRating || pg.rating || 0).toFixed(1),
      image: Array.isArray(pg.images) && pg.images.length > 0 ? pg.images[0] : DEFAULT_IMAGE,
      facilities: Array.isArray(pg.amenities) ? pg.amenities : [],
      verification_status: pg.verification_status,
      status: pg.status,
      avgRating: pg.avgRating || 0,
      reviewCount: pg.reviewCount || 0
    }))
  }, [pgListings])

  // Update displayed PGs based on filters
  useEffect(() => {
    const filtered = transformedPgs.filter(pg => {
      const matchesLocation = !filters.location || 
        pg.location.toLowerCase().includes(filters.location.toLowerCase())
      
      const matchesPrice = pg.price >= filters.priceRange[0] && 
        pg.price <= filters.priceRange[1]
      
      const matchesRoomType = !filters.roomType || 
        pg.roomType.toLowerCase().includes(filters.roomType.toLowerCase())
      
      const matchesFacilities = filters.facilities.length === 0 || 
        filters.facilities.every(facility => pg.facilities.includes(facility))
      
      return matchesLocation && matchesPrice && matchesRoomType && matchesFacilities
    })

    setDisplayPgs(filtered)
  }, [filters, transformedPgs])

  const handleSearch = () => {
    const params = {
      location: filters.location || undefined,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      roomType: filters.roomType || undefined,
      page
    }
    const next = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') next.set(k, String(v))
    })
    setSearchParams(next)
    dispatch(getPgListings(params))
  }

  useEffect(() => {
    const t = setTimeout(() => {
      const params = {
        location: filters.location || undefined,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        roomType: filters.roomType || undefined,
        page,
        sort
      }
      const next = new URLSearchParams()
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== '') next.set(k, String(v))
      })
      setSearchParams(next)
      dispatch(getPgListings(params))
    }, 350)
    return () => clearTimeout(t)
  }, [filters, page, sort, dispatch, setSearchParams])

  const handlePriceRangeChange = (newRange) => {
    setFilters({...filters, priceRange: newRange})
  }

  const handleFacilityToggle = (facility) => {
    setFilters(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }))
  }

  const handleViewDetails = (pgId) => {
    navigate(`/pg-details/${pgId}`)
  }

  const featuredPgs = useMemo(() => {
    if (displayPgs.length > 0) {
      return displayPgs.slice(0, Math.min(displayPgs.length, 6))
    }
    // fallback sample if API empty
    return sampleFallback
  }, [displayPgs])

  const facilityOptions = [
    { id: 'WiFi', name: 'WiFi', icon: Wifi },
    { id: 'AC', name: 'AC', icon: Zap },
    { id: 'RO Water', name: 'RO Water', icon: Droplets },
    { id: 'Parking', name: 'Parking', icon: Car },
    { id: 'Food', name: 'Food', icon: Utensils },
    { id: 'Security', name: 'Security', icon: Shield }
  ]

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
}

const PgCard = ({ pg }) => (
    <motion.div className="floating-card group animate-fade-in-up h-full overflow-hidden border border-white/10" variants={itemVariants} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={pg.image}
          alt={pg.title}
          loading="lazy"
          decoding="async"
          className="h-56 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-emerald-100 backdrop-blur-xl">
          <Star className="h-3.5 w-3.5 text-champagne-200" />
          {pg.rating}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="badge badge-emerald uppercase">{pg.verification_status === 'verified' ? 'Verified' : pg.verification_status}</span>
          {pg.status !== 'active' && <span className="badge badge-champagne uppercase">{pg.status}</span>}
        </div>
        <h3 className="font-display text-xl text-ivory line-clamp-1">{pg.title}</h3>
        <div className="flex items-center gap-2 text-sm text-ink-100/70">
          <MapPin className="h-4 w-4 text-emerald-200" />
          <span className="truncate">{pg.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-100/70">
          <Users className="h-4 w-4 text-champagne-200" />
          <span>{pg.roomType}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs uppercase tracking-[0.25em] text-ink-100/60">
          {pg.facilities.slice(0, 4).map((facility, index) => (
            <span key={index} className="rounded-full border border-white/10 px-3 py-1">
              {facility}
            </span>
          ))}
          {pg.facilities.length > 4 && (
            <span className="rounded-full border border-white/10 px-3 py-1">
              +{pg.facilities.length - 4}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-2xl text-emerald-200">
            ₹{Number(pg.price || 0).toLocaleString()}<span className="ml-1 text-sm font-sans text-ink-100/60">/month</span>
          </span>
          <button 
            onClick={() => handleViewDetails(pg.id)} 
            className="btn btn-secondary cursor-pointer relative z-10"
            type="button"
          >
            View habitat
          </button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="relative min-h-screen pb-24">
      <div className="absolute inset-0 bg-hero-radiance opacity-30 blur-3xl"></div>
      <div className="container relative z-10 flex flex-col gap-12 pt-10 md:pt-16">
        <div className="animate-fade-in-up">
          <span className="pill mb-5 flex items-center gap-2">
            <Home className="h-3 w-3" />
            Residence atelier
          </span>
          <h1 className="font-display text-4xl text-ivory md:text-5xl">
            Residences curated for focus, collaboration, and calm.
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-ink-100/70 md:text-base">
            Filter RoomNook’s signature residences by location, vibe, and amenities. Every listing carries provenance,
            community insights, and our Perfect Match Score™ to help you live intentionally.
          </p>
        </div>

        {/* Filters */}
        <div className="glass-panel animate-fade-in-up border-white/10 p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h3 className="font-display text-2xl text-ivory">Refine your living palette</h3>
            <div className="flex gap-3">
              <button
                aria-label="Reset PG filters"
                className="btn btn-secondary"
                onClick={() => {
                  setFilters({ location: '', priceRange: [3000, 15000], roomType: '', facilities: [] })
                  handleSearch()
                }}
              >
                Reset filters
              </button>
              <button aria-label="Search PG listings" className="btn btn-primary flex items-center gap-2" onClick={handleSearch}>
                <Search className="h-4 w-4" />
                Curate stays
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <label className="text-sm uppercase tracking-[0.3em] text-ink-100/60">
              Locale
              <input
                type="text"
                className="input mt-2"
                placeholder="Clement Town, Rajpur Road..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </label>
            <label className="text-sm uppercase tracking-[0.3em] text-ink-100/60">
              Living arrangement
              <select
                className="input mt-2"
                value={filters.roomType}
                onChange={(e) => setFilters({ ...filters, roomType: e.target.value })}
              >
                <option value="">All ateliers</option>
                <option value="single">Single Suite</option>
                <option value="double">Double Collective</option>
                <option value="triple">Triple Residency</option>
              </select>
            </label>
            <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.3em] text-ink-100/60">
              Investment range (₹)
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs text-ink-100/70">
                  <span>{filters.priceRange[0].toLocaleString()}</span>
                  <span>{filters.priceRange[1].toLocaleString()}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    value={filters.priceRange[0]}
                    onChange={(e) => handlePriceRangeChange([parseInt(e.target.value, 10), filters.priceRange[1]])}
                    className="flex-1 accent-emerald-300"
                  />
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value, 10)])}
                    className="flex-1 accent-emerald-300"
                  />
                </div>
              </div>
            </div>
            <label className="text-sm uppercase tracking-[0.3em] text-ink-100/60">
              Sort by
              <select
                className="input mt-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="recent">Most recent</option>
                <option value="rent_asc">Rent: Low to High</option>
                <option value="rent_desc">Rent: High to Low</option>
              </select>
            </label>
          </div>

          <div className="mt-6">
            <h4 className="text-xs uppercase tracking-[0.35em] text-ink-100/60">Essential amenities</h4>
            <div className="mt-4 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
              {facilityOptions.map((facility) => (
                <label key={facility.id} className="group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.facilities.includes(facility.id)}
                    onChange={() => handleFacilityToggle(facility.id)}
                    className="peer sr-only"
                    aria-label={`Toggle amenity ${facility.name}`}
                  />
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink-100/70 transition-all duration-300 hover:border-emerald-300/40 peer-checked:border-emerald-300 peer-checked:bg-emerald-400/10 peer-checked:text-emerald-100">
                    <facility.icon className="h-4 w-4" />
                    {facility.name}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Featured PGs Slider */}
        <Slider
          title="Signature residences"
          subtitle="Suites with the highest resonance scores this week"
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          autoSlide
          autoSlideInterval={4200}
          className="animate-fade-in-up"
        >
          {featuredPgs.map((pg) => (
            <PgCard key={pg.id} pg={pg} />
          ))}
        </Slider>

        {/* Filtered PGs Grid */}
        <div className="glass-panel border-white/10 p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-2xl text-ivory">
              {displayPgs.length > 0 ? `${displayPgs.length} ateliers curated` : 'No ateliers yet'}
            </h2>
            {displayPgs.length > 0 && (
              <span className="text-xs uppercase tracking-[0.35em] text-ink-100/60">
                {pagination ? `Page ${pagination.currentPage} of ${pagination.totalPages}` : 'Tailored just for you'}
              </span>
            )}
          </div>
          {false && error && (
            <div className="mb-4 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-4 animate-pulse">
                  <div className="h-56 w-full rounded-2xl bg-white/10" />
                  <div className="mt-4 h-5 w-2/3 rounded bg-white/10" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-white/10" />
                  <div className="mt-4 flex gap-2">
                    <div className="h-7 w-16 rounded-full bg-white/10" />
                    <div className="h-7 w-16 rounded-full bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayPgs.length > 0 ? (
            <>
            <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" initial="hidden" animate="show" variants={containerVariants}>
              {displayPgs.map((pg) => (
                <PgCard key={pg.id} pg={pg} />
              ))}
            </motion.div>
              {pagination && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    className="btn btn-secondary"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  <span className="text-xs uppercase tracking-[0.35em] text-ink-100/60">Page {pagination.currentPage} of {pagination.totalPages}</span>
                  <button
                    className="btn btn-secondary"
                    disabled={pagination.currentPage >= pagination.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-3xl border border-white/8 bg-white/3 p-10 text-center text-ink-100/60">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Search className="h-6 w-6 text-emerald-200" />
              </div>
              <h3 className="mt-4 font-display text-2xl text-ivory">No ateliers match your filters</h3>
              <p className="mt-2 text-sm">
                Adjust your investment range or amenities to expand the curation. Our concierge can help craft bespoke options.
              </p>
              <button
                className="btn btn-secondary mt-6"
                onClick={() => setFilters({ location: '', priceRange: [3000, 15000], roomType: '', facilities: [] })}
              >
                Clear refinements
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const sampleFallback = [
  {
    id: 'sample-1',
    title: "Modern PG Clement Town",
    location: "Clement Town, Dehradun",
    roomType: "Double",
    price: 5500,
    rating: 4.5,
    image: DEFAULT_IMAGE,
    facilities: ["WiFi", "AC", "RO Water", "Parking", "Food", "Security"]
  },
  {
    id: 'sample-2',
    title: "Comfort Zone PG",
    location: "Rajpur Road, Dehradun",
    roomType: "Single",
    price: 7500,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    facilities: ["WiFi", "AC", "RO Water", "Parking", "Food"]
  },
  {
    id: 'sample-3',
    title: "Student Hub PG",
    location: "Dharampur, Dehradun",
    roomType: "Triple",
    price: 4000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    facilities: ["WiFi", "RO Water", "Food", "Security"]
  }
];

export default PgListings
