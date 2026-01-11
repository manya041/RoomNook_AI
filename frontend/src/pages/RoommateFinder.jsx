import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'
import {
  MapPin,
  CalendarDays,
  Users,
  Search,
  Filter,
  Star,
  Heart,
  MessageCircle,
  UserCheck,
} from 'lucide-react';

const buildSampleRoommates = (count = 30) => {
  const names = [
    'Priya Sharma', 'Rahul Verma', 'Anjali Singh', 'Amit Kumar', 'Sneha Reddy', 'Vikram Gupta',
    'Riya Kapoor', 'Arjun Mehta', 'Neha Joshi', 'Kunal Arora', 'Isha Kapoor', 'Varun Patel',
    'Meera Nair', 'Siddharth Rao', 'Pooja Desai', 'Rajat Bansal', 'Anita Chauhan', 'Yash Pandey',
    'Tanvi Shah', 'Aarav Jain', 'Simran Kaur', 'Deepak Yadav', 'Rohit Mishra', 'Kritika Singh',
    'Nikhil Gupta', 'Aisha Khan', 'Harshit Sharma', 'Radhika Iyer', 'Abhishek Mehta', 'Devika Rao'
  ]
  const locations = [
    'Clement Town, Dehradun', 'Rajpur Road, Dehradun', 'Dharampur, Dehradun', 'Ballupur, Dehradun',
    'Sahastradhara, Dehradun', 'Prem Nagar, Dehradun', 'Karanpur, Dehradun'
  ]
  const pics = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29329?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face'
  ]
  const occupations = ['Student', 'Software Engineer', 'Designer', 'Data Analyst', 'Marketing', 'Research Associate']
  const lifestyles = ['early_bird', 'night_owl', 'social', 'quiet']
  const clean = ['very_clean', 'clean', 'moderate']
  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length]
    const emailLocal = name.toLowerCase().replace(/\s+/g, '.')
    return {
      id: i + 1,
      name,
      age: 20 + (i % 15),
      gender: i % 2 === 0 ? 'Male' : 'Female',
      occupation: occupations[i % occupations.length],
      description: 'Looking for a compatible roommate and focused living environment.',
      preferences: ['Non-smoker', 'Quiet hours'],
      location: locations[i % locations.length],
      availableFrom: '2024-03-01',
      price: 9000 + (i % 12) * 300,
      profilePic: pics[i % pics.length],
      lifestyle: lifestyles[i % lifestyles.length],
      cleanliness: clean[i % clean.length],
      compatibility: 75 + (i % 25),
      email: `${emailLocal}@example.com`,
      phone: `+91-99${String(50000000 + i).slice(0,8)}`
    }
  })
}

const sampleRoommates = buildSampleRoommates(30)

const RoommateFinder = () => {
  const [filters, setFilters] = useState({
    location: '',
    gender: 'All',
    ageRange: [18, 40],
    budgetRange: [3000, 15000],
    occupation: '',
    lifestyle: '',
    cleanliness: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredRoommates, setFilteredRoommates] = useState(sampleRoommates);

  useEffect(() => {
    const results = sampleRoommates.filter((roommate) => {
      const matchesLocation =
        !filters.location ||
        roommate.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesGender = filters.gender === 'All' || roommate.gender === filters.gender;
      const matchesAge =
        roommate.age >= filters.ageRange[0] && roommate.age <= filters.ageRange[1];
      const matchesBudget =
        roommate.price >= filters.budgetRange[0] && roommate.price <= filters.budgetRange[1];
      const matchesOccupation =
        !filters.occupation ||
        roommate.occupation.toLowerCase().includes(filters.occupation.toLowerCase());
      const matchesLifestyle =
        !filters.lifestyle || roommate.lifestyle === filters.lifestyle;
      const matchesCleanliness =
        !filters.cleanliness || roommate.cleanliness === filters.cleanliness;

      return (
        matchesLocation &&
        matchesGender &&
        matchesAge &&
        matchesBudget &&
        matchesOccupation &&
        matchesLifestyle &&
        matchesCleanliness
      );
    });

    setFilteredRoommates(results);
  }, [filters]);

  const RangeSlider = ({ label, min, max, value, onChange, prefix = '', suffix = '' }) => (
    <div className="flex flex-col gap-3">
      <label className="text-xs uppercase tracking-[0.3em] text-ink-100/60">{label}</label>
      <div className="flex items-center justify-between text-xs text-ink-100/60">
        <span>
          {prefix}
          {value[0]}
          {suffix}
        </span>
        <span>
          {prefix}
          {value[1]}
          {suffix}
        </span>
      </div>
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value, 10), value[1]])}
          className="w-full accent-emerald-300"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value, 10)])}
          className="absolute top-0 w-full accent-emerald-300"
        />
      </div>
    </div>
  );

  const [bookmarked, setBookmarked] = useState(() => new Set(JSON.parse(localStorage.getItem('roommateBookmarks') || '[]')))
  const [connected, setConnected] = useState(() => new Set(JSON.parse(localStorage.getItem('roommateConnections') || '[]')))

  const openMail = (email, subject, body) => {
    try {
      const a = document.createElement('a')
      a.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      toast.success('Opening email composer')
    } catch {
      navigator.clipboard?.writeText(email).then(() => toast.success('Email copied')).catch(() => {})
    }
  }

  const toggleBookmark = (id) => {
    const next = new Set(bookmarked)
    if (next.has(id)) next.delete(id); else next.add(id)
    setBookmarked(next)
    localStorage.setItem('roommateBookmarks', JSON.stringify(Array.from(next)))
    toast.success(next.has(id) ? 'Added to favorites' : 'Removed from favorites')
  }

  const connectPhone = (phone) => {
    const digits = String(phone || '').replace(/\D/g, '')
    if (digits) {
      const wa = `https://wa.me/${digits}`
      window.open(wa, '_blank')
      toast.success('Opening WhatsApp')
    } else {
      toast.error('Phone not available')
    }
  }

  const RoommateCard = ({ roommate }) => (
    <div className="floating-card relative h-full overflow-hidden border border-white/10">
      <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs uppercase tracking-[0.25em] text-emerald-200">
        <Star className="h-3.5 w-3.5" />
        {roommate.compatibility}% match
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <img
            src={roommate.profilePic}
            alt={roommate.name}
            className="h-16 w-16 rounded-[1.5rem] object-cover"
          />
          <div>
            <h3 className="font-display text-xl text-ivory">{roommate.name}</h3>
            <p className="text-sm text-ink-100/70">
              {roommate.age} • {roommate.gender} • {roommate.occupation}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-emerald-200">
              <MapPin className="h-3.5 w-3.5" />
              {roommate.location}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-100/70">{roommate.description}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-emerald-200">
          {roommate.preferences.map((pref) => (
            <span
              key={pref}
              className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 uppercase tracking-[0.3em]"
            >
              {pref}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-ink-100/60">
            <CalendarDays className="h-4 w-4 text-champagne-200" />
            {roommate.availableFrom}
          </div>
          <div className="font-display text-2xl text-emerald-200">
            ₹{roommate.price.toLocaleString()}
            <span className="ml-1 text-xs font-sans text-ink-100/60">/month</span>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <button 
            className="btn btn-primary flex-1 cursor-pointer relative z-10"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              const subject = 'RoomNook: Initiate chat'
              const body = `Hi ${roommate.name}, I found your profile on RoomNook and would like to connect.`
              const email = roommate.email || 'contact@roomnook.local'
              openMail(email, subject, body)
            }}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Initiate chat
          </button>
          <button 
            className={`btn btn-secondary cursor-pointer relative z-10 ${bookmarked.has(roommate.id) ? 'bg-emerald-400/15 border-emerald-300/40 text-emerald-100' : ''}`}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleBookmark(roommate.id)
            }}
          >
            <Heart className="h-4 w-4" />
          </button>
          <button 
            className={`btn btn-secondary cursor-pointer relative z-10 ${connected.has(roommate.id) ? 'bg-champagne-400/15 border-champagne-300/40 text-champagne-200' : ''}`}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setConnected(prev => {
                const next = new Set(prev)
                next.add(roommate.id)
                localStorage.setItem('roommateConnections', JSON.stringify(Array.from(next)))
                return next
              })
              connectPhone(roommate.phone)
            }}
          >
            <UserCheck className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen pb-24">
      <div className="absolute inset-0 bg-hero-radiance opacity-20 blur-3xl"></div>
      <div className="container relative z-10 flex flex-col gap-10 pt-10 md:pt-16">
        <div className="flex flex-col gap-4 animate-fade-in-up">
          <span className="pill flex items-center gap-2 uppercase tracking-[0.35em]">
            <Users className="h-3 w-3" />
            Roommate lab
          </span>
          <h1 className="font-display text-4xl text-ivory md:text-5xl">
            Curate a living collective that amplifies your ambition.
          </h1>
          <p className="max-w-3xl text-sm text-ink-100/70 md:text-base">
            Mix and match cadence, cleanliness ethos, and lifestyle preferences. Our Roommate Lab surfaces
            residents whose rhythms and intentions align with yours.
          </p>
        </div>

        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="btn btn-secondary w-max animate-fade-in-up flex items-center gap-2 cursor-pointer relative z-10"
          type="button"
        >
          <Filter className="h-4 w-4" />
          {showFilters ? 'Close refinement studio' : 'Open refinement studio'}
        </button>

        {showFilters && (
          <div className="glass-panel animate-fade-in-up border-white/10 p-8">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h3 className="font-display text-2xl text-ivory">Refine your cohabitation blueprint</h3>
              <button
                className="btn btn-secondary cursor-pointer relative z-10"
                type="button"
                onClick={() =>
                  setFilters({
                    location: '',
                    gender: 'All',
                    ageRange: [18, 40],
                    budgetRange: [3000, 15000],
                    occupation: '',
                    lifestyle: '',
                    cleanliness: '',
                  })
                }
              >
                Reset palette
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <label className="text-xs uppercase tracking-[0.3em] text-ink-100/60">
                Locale
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, location: e.target.value }))
                  }
                  className="input mt-2"
                  placeholder="Clement Town, Rajpur Road..."
                />
              </label>

              <label className="text-xs uppercase tracking-[0.3em] text-ink-100/60">
                Gender cadence
                <div className="mt-2 flex gap-3">
                  {['All', 'Male', 'Female'].map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, gender }))}
                      className={`rounded-2xl px-4 py-2 text-xs uppercase tracking-[0.35em] transition-all cursor-pointer relative z-10 ${
                        filters.gender === gender
                          ? 'bg-emerald-400/15 text-emerald-100 border border-emerald-300/40'
                          : 'border border-white/10 bg-white/5 text-ink-100/70 hover:border-emerald-200/30 hover:text-emerald-100'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </label>

              <label className="text-xs uppercase tracking-[0.3em] text-ink-100/60">
                Occupation pulse
                <input
                  type="text"
                  name="occupation"
                  value={filters.occupation}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, occupation: e.target.value }))
                  }
                  className="input mt-2"
                  placeholder="Designer, Researcher…"
                />
              </label>

              <label className="text-xs uppercase tracking-[0.3em] text-ink-100/60">
                Lifestyle rhythm
                <select
                  name="lifestyle"
                  value={filters.lifestyle}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, lifestyle: e.target.value }))
                  }
                  className="input mt-2"
                >
                  <option value="">All rhythms</option>
                  <option value="early_bird">Early Bird</option>
                  <option value="night_owl">Night Owl</option>
                  <option value="social">Social</option>
                  <option value="quiet">Quiet</option>
                </select>
              </label>

              <label className="text-xs uppercase tracking-[0.3em] text-ink-100/60">
                Cleanliness ethos
                <select
                  name="cleanliness"
                  value={filters.cleanliness}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, cleanliness: e.target.value }))
                  }
                  className="input mt-2"
                >
                  <option value="">All levels</option>
                  <option value="very_clean">Very Clean</option>
                  <option value="clean">Clean</option>
                  <option value="moderate">Moderate</option>
                </select>
              </label>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <RangeSlider
                label="Age interval"
                min={18}
                max={60}
                value={filters.ageRange}
                onChange={(range) => setFilters((prev) => ({ ...prev, ageRange: range }))}
                suffix="y"
              />
              <RangeSlider
                label="Investment harmony"
                min={1000}
                max={30000}
                value={filters.budgetRange}
                onChange={(range) =>
                  setFilters((prev) => ({ ...prev, budgetRange: range }))
                }
                prefix="₹"
              />
            </div>

            <div className="mt-6 text-xs uppercase tracking-[0.35em] text-ink-100/60">
              {filteredRoommates.length} residents resonate with your palette
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {filteredRoommates.length > 0 ? (
            filteredRoommates.map((roommate) => (
              <RoommateCard key={roommate.id} roommate={roommate} />
            ))
          ) : (
            <div className="glass-panel col-span-full border-white/10 p-10 text-center text-ink-100/60">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                <Search className="h-6 w-6 text-emerald-200" />
              </div>
              <h3 className="mt-4 font-display text-2xl text-ivory">No aligned roommates yet</h3>
              <p className="mt-2 text-sm">
                Relax the refinement sliders or expand your location radius. Our concierge will surface more matches.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoommateFinder;

