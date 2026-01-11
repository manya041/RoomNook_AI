import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  Compass,
  ShieldCheck,
  GaugeCircle,
  LineChart,
  Lamp,
  MessageCircle,
  Calendar,
  Crown
} from 'lucide-react'

const statHighlights = [
  { label: 'curated residences', value: '640+', accent: 'text-emerald-200' },
  { label: 'roommate stories', value: '1.2k', accent: 'text-champagne-200' },
  { label: 'mess ateliers', value: '310', accent: 'text-emerald-200' },
  { label: 'match accuracy', value: '97%', accent: 'text-champagne-200' }
]

const signatureFeatures = [
  {
    icon: GaugeCircle,
    title: 'Perfect Match Score™',
    description:
      'Live compatibility intelligence layers your lifestyle, cadence, culinary leanings, and financial comfort into a single intuitive score.',
    cta: { label: 'Explore the algorithm', href: '/perfect-match-score' }
  },
  {
    icon: ShieldCheck,
    title: 'Verified Habitat Vault',
    description:
      'Every PG is audit-tracked with provenance badges, 8-point safety checks, and dynamic availability feeds pushed by owners.',
    cta: { label: 'Browse verified spaces', href: '/pg-listings' }
  },
  {
    icon: Compass,
    title: 'Lifestyle Playbooks',
    description:
      'Curated roommate archetypes—from “Research Maven” to “Night Owl Creator”—match you with people who elevate your journey.',
    cta: { label: 'Find your cohort', href: '/roommate-finder' }
  }
]

const experienceStrands = [
  {
    title: 'The Arrival Ritual',
    items: [
      'Concierge onboarding with digital welcome kit',
      'Neighborhood immersion playlists + coffee guides',
      'Move-in day assistant and supply checklist'
    ]
  },
  {
    title: 'The Living Suite',
    items: [
      'Weekly vibe sync with your roommate collective',
      'Mess tasting passes & nutrition insights',
      'Hyperlocal events calendar powered by RoomNook'
    ]
  },
  {
    title: 'The Future Blueprint',
    items: [
      'Deposit tracker with smart savings nudges',
      'Landlord review ledger & trust badges',
      'Resonance score for your next upgrade'
    ]
  }
]

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
}

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <motion.section className="relative pt-40 pb-28 animate-fade-in-up" initial="hidden" animate="show" variants={containerVariants}>
        <div className="absolute inset-0 bg-hero-radiance opacity-70 mix-blend-screen"></div>
        <div className="container relative z-10 flex flex-col items-center text-center">
          <motion.span className="pill mb-8 flex items-center gap-2" variants={itemVariants}>
            <Sparkles className="h-3 w-3" />
            Crafted for discerning students
          </motion.span>

          <motion.h1 className="max-w-4xl font-display text-4xl leading-tight text-ivory md:text-6xl lg:text-[4.25rem] lg:leading-[1.1]" variants={itemVariants}>
            A living experience sculpted around your <span className="text-emerald-200">ambition</span>,
            <span className="text-champagne-200"> rhythm</span>, and <span className="text-emerald-200">taste</span>.
          </motion.h1>

          <motion.p className="mt-6 max-w-3xl text-base text-ink-100/70 md:text-lg" variants={itemVariants}>
            RoomNook curates thoughtful pairings between inspired students, verified residences, and
            culinary ateliers. Our Perfect Match Score™ decodes alignment across lifestyle, budgets, and
            daily cadence—so you can live with momentum.
          </motion.p>

          <motion.div className="mt-10 flex flex-col items-center gap-4 sm:flex-row" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link to="/register" className="btn btn-primary">
                Begin your atelier journey
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link to="/chat" className="btn btn-secondary">
                Consult the AI concierge
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="mt-16 grid w-full gap-4 rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
            {statHighlights.map((stat) => (
              <motion.div key={stat.label} className="flex flex-col items-center gap-2" variants={itemVariants}>
                <span className={`font-display text-3xl ${stat.accent}`}>{stat.value}</span>
                <span className="text-xs uppercase tracking-[0.35em] text-ink-100/60">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* SIGNATURE FEATURES */}
      <section className="section">
        <div className="container flex flex-col gap-12">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="pill mb-4">Signature intelligence</span>
              <h2 className="font-display text-3xl text-ivory md:text-4xl">
                Intelligence that choreographs how—and with whom—you live.
              </h2>
            </div>
            <Link to="/pg-listings" className="btn btn-ghost">
              Discover the rooms
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {signatureFeatures.map((feature) => (
              <motion.article key={feature.title} className="floating-card h-full p-7" whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8">
                  <feature.icon className="h-6 w-6 text-emerald-200" />
                </div>
                <h3 className="font-display text-2xl text-ivory">{feature.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-100/70">{feature.description}</p>
                <Link
                  to={feature.cta.href}
                  className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-emerald-200"
                >
                  {feature.cta.label}
                  <Sparkles className="h-3.5 w-3.5" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE STRANDS */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <span className="pill">Experience strands</span>
            <h2 className="font-display text-ivory text-3xl md:text-4xl">
              Curated rituals from arrival to ascent.
            </h2>
            <p className="text-sm text-ink-100/65">
              A roadmap that evolves with you—from move-in day to graduation. Unlock personalized nudges,
              communal events, and culinary pairings with a single tap.
            </p>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/dashboard" className="btn btn-primary">
                  View your residency plan
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/mess-listings" className="btn btn-secondary">
                  Taste the mess atelier
                </Link>
              </motion.div>
            </div>
            <div className="gradient-divider"></div>
            <div className="grid gap-5">
              {experienceStrands.map((strand) => (
                <div key={strand.title} className="glass-panel p-6">
                  <h3 className="font-display text-xl text-emerald-100">{strand.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-ink-100/70">
                    {strand.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel flex flex-col justify-between p-8">
            <div className="flex flex-col gap-5">
              <span className="pill">Live dashboard</span>
              <h3 className="font-display text-2xl text-ivory">Pulse dashboard reimagined.</h3>
              <p className="text-sm text-ink-100/70">
                Keep your roommate vibe score, mess subscription, and payment milestones in one clean,
                cinematic space. Invite parents or mentors as trusted observers.
              </p>
              <div className="rounded-3xl border border-white/8 bg-white/4 p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-ink-100/60">
                  <span>Roommate alignment</span>
                  <span className="text-emerald-200">92%</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-300 to-champagne-300"></div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-ink-100/70">
                  <div className="glass-panel border-white/5 p-3">
                    <span className="uppercase tracking-[0.3em] text-emerald-200">Mess</span>
                    <p className="mt-2 text-ink-50">Ayurvedic menu activated</p>
                  </div>
                  <div className="glass-panel border-white/5 p-3">
                    <span className="uppercase tracking-[0.3em] text-emerald-200">Host</span>
                    <p className="mt-2 text-ink-50">Deposit update: On track</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/dashboard" className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-champagne-200">
              Open my pulse <Crown className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COMMUNITY & CTA */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="glass-panel p-10">
            <span className="pill mb-4 flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              The collective
            </span>
            <h3 className="font-display text-3xl text-ivory">Events, labs, late-night think tanks.</h3>
            <p className="mt-4 text-sm text-ink-100/70">
              Join curated supper clubs, Figma jam sessions, finance clinics, and accountability cohorts.
              Residents receive invites tailored to their academic arc.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-ink-100/70">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300"></span>
                Studio Jam · Design your dream suite (Thursday, 8PM)
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-champagne-300"></span>
                Wellness Mess Crawl · Nutritionist-led tasting (Saturday, 11AM)
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300"></span>
                Founder Fireside · Alumni investors Q&A
              </span>
            </div>
            <Link to="/chat" className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-emerald-200">
              Reserve your invitation <MessageCircle className="h-4 w-4" />
            </Link>
          </div>

          <div className="glass-panel flex flex-col justify-between p-10">
            <div>
              <span className="pill mb-4">Ready?</span>
              <h3 className="font-display text-3xl text-ivory">
                Unlock the RoomNook Atelier. Living, by design.
              </h3>
              <p className="mt-4 text-sm text-ink-100/70">
                Start with your lifestyle blueprint and our AI concierge will curate roommates, mess
                experiences, and PGs that feel like an extension of your future self.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 md:flex-row">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/register" className="btn btn-primary">
                  Create your blueprint
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/pg-listings" className="btn btn-secondary">
                  View curated stays
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
