import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Instagram, Youtube, Twitter, ArrowUpRight, MapPin } from 'lucide-react'

const footerLinks = [
  {
    heading: 'Residency',
    links: [
      { label: 'Signature PG Curation', href: '/pg-listings' },
      { label: 'Mess Masterpieces', href: '/mess-listings' },
      { label: 'Roommate Atelier', href: '/roommate-finder' },
      { label: 'Compatibility Studio', href: '/compatibility-tester' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About RoomNook', href: '/' },
      { label: 'Careers', href: '#' },
      { label: 'Press & Media', href: '#' },
      { label: 'Sustainability', href: '#' }
    ]
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Centre', href: '#' },
      { label: 'Contact Concierge', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms & Conditions', href: '#' }
    ]
  }
]

const social = [
  { label: 'Instagram', icon: Instagram, href: '#', color: 'text-champagne-200' },
  { label: 'YouTube', icon: Youtube, href: '#', color: 'text-emerald-200' },
  { label: 'Twitter', icon: Twitter, href: '#', color: 'text-emerald-100' }
]

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-midnight via-charcoal to-midnight/95 pt-24 pb-12 text-ink-200">
      <div className="absolute inset-x-0 -top-20 h-24 bg-hero-radiance opacity-60 blur-3xl pointer-events-none"></div>

      <div className="container">
        <div className="glass-panel mb-16 grid grid-cols-1 gap-10 px-8 py-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6 pr-0 lg:pr-10">
            <div>
              <span className="pill mb-3 inline-flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                The Habitat Atelier
              </span>
              <h3 className="font-display text-3xl text-ivory">
                Tailored sanctuaries for <span className="text-emerald-200">students with ambition</span>.
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-ink-100/70">
              RoomNook curates living narratives, pairing discerning students with harmonious roommates,
              culinary ateliers, and trusted PG experiences. Our Perfect Match Score™ reveals the living
              ecosystem you didn’t know you needed.
            </p>
            <div className="flex flex-wrap gap-3">
              {social.map(({ label, icon: Icon, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-ink-100/70 transition-all duration-300 hover:bg-white/8"
                >
                  <Icon className={`h-4 w-4 ${color}`} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.heading} className="flex flex-col gap-4">
              <h4 className="text-sm uppercase tracking-[0.32em] text-emerald-200/80">{group.heading}</h4>
              <ul className="flex flex-col gap-3 text-sm text-ink-100/70">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center gap-2 rounded-xl px-1 py-1 transition-all duration-300 hover:text-emerald-100"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-10 text-sm text-ink-100/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <span>© {new Date().getFullYear()} RoomNook Atelier. Crafted for modern student living.</span>
            <span className="flex items-center gap-2 text-emerald-100">
              <MapPin className="h-4 w-4" />
              Dehradun • Bengaluru • Pune
            </span>
          </div>
          <div className="flex gap-3 text-xs uppercase tracking-[0.38em] text-ink-100/60">
            <span>Live Intentionally</span>
            <span>Curate Connections</span>
            <span>Belong Here</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
