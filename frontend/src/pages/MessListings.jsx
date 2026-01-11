import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Utensils, MapPin, Star, Clock, Search, Filter, Loader2 } from 'lucide-react'
import Slider from '../components/Slider'
import { getMessListings } from '../redux/slices/messSlice'

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop'

const MessListings = () => {
  const dispatch = useDispatch()
  const { messListings, loading, error, pagination } = useSelector((state) => state.mess)
  const [filters, setFilters] = useState({
    location: '',
    foodType: '',
    maxPrice: ''
  })

  useEffect(() => {
    dispatch(getMessListings())
  }, [dispatch])

  const transformedMess = useMemo(() => {
    if (!Array.isArray(messListings)) return []

    return messListings.map((mess) => ({
      id: mess.id,
      name: mess.name,
      location: mess.location || mess.address || 'Location unavailable',
      foodType: mess.food_type ? mess.food_type.replace(/^\w/, c => c.toUpperCase()) : 'N/A',
      price: Number(mess.monthly_cost || mess.price || 0),
      rating: Number(mess.rating || 0).toFixed(1),
      timings: mess.meal_timing || 'Timings available on request',
      image: Array.isArray(mess.images) && mess.images.length ? mess.images[0] : DEFAULT_IMAGE,
      status: mess.status
    }))
  }, [messListings])

  const filteredMess = useMemo(() => {
    return transformedMess.filter(mess => {
      const matchesLocation = !filters.location ||
        mess.location.toLowerCase().includes(filters.location.toLowerCase())

      const matchesFoodType = !filters.foodType ||
        mess.foodType.toLowerCase() === filters.foodType.toLowerCase()

      const matchesPrice = !filters.maxPrice ||
        mess.price <= parseInt(filters.maxPrice, 10)

      return matchesLocation && matchesFoodType && matchesPrice
    })
  }, [filters, transformedMess])

  const handleSearch = () => {
    const params = {
      location: filters.location || undefined,
      foodType: filters.foodType || undefined,
      maxPrice: filters.maxPrice || undefined
    }
    dispatch(getMessListings(params))
  }

  const featuredMess = filteredMess.length > 0
    ? filteredMess.slice(0, Math.min(filteredMess.length, 6))
    : sampleMessFallback

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 }
  }

  const MessCard = ({ mess }) => (
    <motion.div className="floating-card group animate-fade-in-up h-full overflow-hidden border border-white/10" variants={itemVariants} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={mess.image}
          alt={mess.name}
          loading="lazy"
          decoding="async"
          className="h-48 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-emerald-100 backdrop-blur-xl">
          <Star className="h-3.5 w-3.5 text-champagne-200" />
          {mess.rating}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <h3 className="font-display text-xl text-ivory">{mess.name}</h3>
        <div className="flex items-center gap-2 text-sm text-ink-100/70">
          <MapPin className="h-4 w-4 text-emerald-200" />
          <span className="truncate">{mess.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-100/70">
          <Utensils className="h-4 w-4 text-emerald-200" />
          <span className="capitalize">{mess.foodType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-100/70">
          <Clock className="h-4 w-4 text-champagne-200" />
          <span>{mess.timings}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl text-emerald-200">₹{mess.price.toLocaleString()}</span>
          <button 
            className="btn btn-secondary cursor-pointer relative z-10"
            type="button"
            onClick={() => toast.success('Reservation requested')}
          >
            Reserve tasting
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
            <Filter className="h-3 w-3" />
            Culinary ateliers
          </span>
          <h1 className="font-display text-4xl text-ivory md:text-5xl">
            The Mess Atelier: curated plates for every learning journey.
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-ink-100/70 md:text-base">
            Explore handpicked mess experiences with provenance, reviews, and subscription-friendly pricing.
            Filter by lifestyle, cuisine, and investment, then reserve tastings effortlessly.
          </p>
        </div>

        {/* Filters */}
        <div className="glass-panel animate-fade-in-up border-white/10 p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h3 className="font-display text-2xl text-ivory">Refine the culinary mood</h3>
            <button
              aria-label="Reset Mess filters"
              className="btn btn-secondary"
              onClick={() => {
                setFilters({ location: '', foodType: '', maxPrice: '' })
                handleSearch()
              }}
            >
              Reset filters
            </button>
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
              Culinary style
              <select
                className="input mt-2"
                value={filters.foodType}
                onChange={(e) => setFilters({ ...filters, foodType: e.target.value })}
              >
                <option value="">All cuisines</option>
                <option value="veg">Vegetarian Atelier</option>
                <option value="non-veg">Non-Veg Indulgence</option>
                <option value="both">Hybrid Gastronomy</option>
              </select>
            </label>
            <label className="text-sm uppercase tracking-[0.3em] text-ink-100/60">
              Investment ceiling (₹)
              <input
                type="number"
                className="input mt-2"
                placeholder="3200"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <button aria-label="Search Mess listings" className="btn btn-primary flex items-center gap-2" onClick={handleSearch}>
              <Search className="h-4 w-4" />
              Curate menu
            </button>
          </div>
        </div>
        {/* Featured Mess Slider */}
        <Slider
          title="Signature tastings"
          subtitle="Handpicked culinary ateliers with rave resident reviews"
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          autoSlide
          autoSlideInterval={4800}
          className="animate-fade-in-up"
        >
          {featuredMess.map((mess) => (
            <motion.div key={mess.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <MessCard mess={mess} />
            </motion.div>
          ))}
        </Slider>

        {/* Filtered Mess Grid */}
        <div className="glass-panel border-white/10 p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-2xl text-ivory">
              {filteredMess.length > 0 ? `${filteredMess.length} tastings curated` : 'No ateliers match yet'}
            </h2>
            {filteredMess.length > 0 && (
              <span className="text-xs uppercase tracking-[0.35em] text-ink-100/60">
                {pagination ? `Page ${pagination.currentPage} of ${pagination.totalPages}` : 'Refined curation'}
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
                  <div className="h-48 w-full rounded-2xl bg-white/10" />
                  <div className="mt-4 h-5 w-2/3 rounded bg-white/10" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-white/10" />
                  <div className="mt-4 flex gap-2">
                    <div className="h-7 w-16 rounded-full bg-white/10" />
                    <div className="h-7 w-16 rounded-full bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMess.length > 0 ? (
            <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" initial="hidden" animate="show" variants={containerVariants}>
              {filteredMess.map((mess) => (
                <MessCard key={mess.id} mess={mess} />
              ))}
            </motion.div>
          ) : (
            <div className="rounded-3xl border border-white/8 bg-white/3 p-10 text-center text-ink-100/60">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Search className="h-6 w-6 text-emerald-200" />
              </div>
              <h3 className="mt-4 font-display text-2xl text-ivory">No culinary atelier yet</h3>
              <p className="mt-2 text-sm">
                Try expanding your cuisine or investment filters—the tasting lab will reveal more options.
              </p>
              <button
                className="btn btn-secondary mt-6"
                onClick={() => setFilters({ location: '', foodType: '', maxPrice: '' })}
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

const sampleMessFallback = [
  {
    id: 'sample-1',
    name: "Delicious Mess",
    location: "Clement Town, Dehradun",
    foodType: "Vegetarian",
    price: 2500,
    rating: 4.2,
    timings: "7AM-9PM",
    image: DEFAULT_IMAGE
  },
  {
    id: 'sample-2',
    name: "Spice Garden Mess",
    location: "Rajpur Road, Dehradun",
    foodType: "Both",
    price: 3000,
    rating: 4.5,
    timings: "7AM-10PM",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop"
  },
  {
    id: 'sample-3',
    name: "Home Style Mess",
    location: "Dharampur, Dehradun",
    foodType: "Vegetarian",
    price: 2200,
    rating: 4.7,
    timings: "6AM-9PM",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop"
  }
];

export default MessListings
