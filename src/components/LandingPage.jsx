import React, { useState, useEffect } from 'react';
import { Anchor, Ship, Award, Phone, Mail, MapPin, Briefcase, ChevronRight, LogIn, Star, Globe, Users, Heart, Compass, Waves, Calendar, ArrowRight } from 'lucide-react';

const CRUISE_LINES = [
  'Royal Caribbean', 'Norwegian Cruise Line', 'Virgin Voyages', 'Celebrity Cruises',
  'Disney Cruise Line', 'Carnival Cruise Line', 'MSC Cruises', 'Holland America',
  'Princess Cruises', 'Cunard', 'Silversea', 'Regent Seven Seas',
];

const DESTINATIONS = [
  { name: 'Caribbean', emoji: '🌴', desc: 'Crystal-clear waters & white sand beaches', gradient: 'from-cyan-500 to-teal-600', img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&h=400&fit=crop' },
  { name: 'Mediterranean', emoji: '🏛️', desc: 'Ancient wonders & coastal charm', gradient: 'from-blue-500 to-indigo-600', img: 'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=600&h=400&fit=crop' },
  { name: 'Alaska', emoji: '🏔️', desc: 'Glaciers, wildlife & breathtaking fjords', gradient: 'from-slate-400 to-blue-500', img: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&h=400&fit=crop' },
  { name: 'Northern Europe', emoji: '🌅', desc: 'Norwegian fjords & Baltic capitals', gradient: 'from-purple-500 to-blue-600', img: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&h=400&fit=crop' },
  { name: 'Asia & Pacific', emoji: '⛩️', desc: 'Ancient cultures & tropical paradises', gradient: 'from-rose-500 to-orange-500', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop' },
  { name: 'Transatlantic', emoji: '🚢', desc: 'The classic ocean voyage experience', gradient: 'from-blue-600 to-cyan-500', img: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=600&h=400&fit=crop' },
];

const TESTIMONIALS = [
  { name: 'Sarah & James M.', trip: 'Mediterranean Cruise, 2024', text: 'Adam made our honeymoon absolutely perfect. Every detail was handled and we had the best cabin on the ship. Can\'t wait to book our next trip with him!' },
  { name: 'The Rodriguez Family', trip: 'Caribbean Cruise, 2024', text: 'First time cruising with kids and Adam thought of everything — kids\' clubs, family excursions, connecting cabins. We\'re already planning trip #2!' },
  { name: 'David & Marcus T.', trip: 'Alaska Cruise, 2024', text: 'Adam helped us plan the most incredible anniversary trip. He knew exactly which ship and itinerary would be perfect for us. Already booked our next voyage!' },
  { name: 'Mike & Linda K.', trip: 'Alaska Cruise, 2023', text: 'Adam\'s insider knowledge got us upgraded and into excursions that were sold out. His follow-up after booking was exceptional. True professional.' },
];

export default function LandingPage({ onSignIn, authError }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ship className="w-6 h-6 text-cyan-400" />
            <span className="font-bold text-lg">Adam The Cruise Guy</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#destinations" className="hover:text-white transition">Destinations</a>
            <a href="#experience" className="hover:text-white transition">Experience</a>
            <a href="#testimonials" className="hover:text-white transition">Reviews</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
          <button
            onClick={onSignIn}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition"
          >
            <LogIn className="w-4 h-4" /> Portal
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        {/* Background cruise image */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&h=900&fit=crop" alt="" className="w-full h-full object-cover opacity-[0.07]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium mb-6">
              <Anchor className="w-3.5 h-3.5" /> Your Personal Cruise Consultant
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Adam <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Britten</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mb-8 leading-relaxed">
              With 10+ years of cruise industry experience and top rankings at Virgin Voyages, Norwegian, and World Travel Holdings,
              I craft unforgettable voyages for every traveler. Whether you're celebrating a milestone, planning a family reunion, or
              escaping with someone special — I handle every detail so you can focus on the adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contact" className="group px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:opacity-90 transition text-center flex items-center justify-center gap-2">
                Plan Your Cruise <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#destinations" className="px-8 py-3.5 border border-white/15 rounded-xl font-medium text-white/70 hover:bg-white/5 transition text-center">
                Explore Destinations
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-64 h-72 md:w-80 md:h-96 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-cyan-500/10">
                <img
                  src="/adam-photo.jpg"
                  alt="Adam Britten - Your Personal Cruise Consultant"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-cyan-500/20', 'to-blue-600/20');
                    e.target.insertAdjacentHTML('afterend', '<div class="text-6xl font-bold text-cyan-400/40">AB</div>');
                  }}
                />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl px-4 py-2 shadow-lg">
                <p className="text-xs font-bold text-white">#1 Globally</p>
                <p className="text-[10px] text-white/70">Virgin Voyages</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10+', label: 'Years in Sales', icon: <Calendar className="w-5 h-5" /> },
            { value: '#1', label: 'Globally at Virgin Voyages', icon: <Award className="w-5 h-5" /> },
            { value: 'Top 15%', label: 'Profit Margin at WTH', icon: <Star className="w-5 h-5" /> },
            { value: '4×', label: 'Repeat Client Rate vs Peers', icon: <Heart className="w-5 h-5" /> },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3">
                {s.icon}
              </div>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{s.value}</p>
              <p className="text-sm text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo strip */}
      <section className="py-8 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { src: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=400&h=250&fit=crop', alt: 'Cruise ship at sea' },
              { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop', alt: 'Tropical beach' },
              { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop', alt: 'Sunset beach' },
              { src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop', alt: 'Ocean view' },
              { src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=250&fit=crop', alt: 'Mediterranean coast' },
            ].map((photo, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-28 md:w-56 md:h-32 rounded-xl overflow-hidden border border-white/[0.08]">
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cruise With Adam */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">Why Cruise With Adam?</h2>
          <p className="text-white/40 text-center mb-12 max-w-2xl mx-auto">Skip the DIY booking headaches. Get expert guidance, exclusive perks, and a personalized experience from start to finish.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Award className="w-8 h-8" />, title: 'Top-Ranked Agent', desc: 'Consistently ranked among the highest performers at every cruise line and agency I\'ve worked with.' },
              { icon: <Globe className="w-8 h-8" />, title: 'Every Cruise Line', desc: 'Deep knowledge of all major cruise lines, itineraries, cabin categories, and onboard experiences worldwide.' },
              { icon: <Users className="w-8 h-8" />, title: 'Personal Touch', desc: 'Full consultative service for every kind of traveler — couples, families, solo adventurers, and groups. Your trip, your way, always.' },
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] hover:border-cyan-500/20 transition-all duration-300">
                <div className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">Popular Destinations</h2>
          <p className="text-white/40 text-center mb-12 max-w-2xl mx-auto">From tropical getaways to arctic adventures, I'll help you find the perfect voyage.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {DESTINATIONS.map((dest, i) => (
              <a
                key={i}
                href="#contact"
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] hover:border-white/20 transition-all duration-300 aspect-[4/3]"
              >
                <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${dest.gradient} opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-5">
                  <span className="text-2xl mb-2">{dest.emoji}</span>
                  <h3 className="font-semibold text-lg mb-1">{dest.name}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{dest.desc}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">Cruise Industry Experience</h2>
          <p className="text-white/40 text-center mb-12 max-w-2xl mx-auto">A proven track record of exceptional service across top cruise companies.</p>

          <div className="space-y-1">
            <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Sales & Travel
            </h3>
            {[
              { role: 'Travel Sales Agent', company: 'World Travel Holdings', period: '2023–Present', highlights: ['Top 15% in profit margin', 'Repeat-customer rate 4× higher than peers', 'Full consultative sales cycle management'] },
              { role: 'Future Voyage Sales Asst. Manager', company: 'Virgin Voyages', period: '2022–2023', highlights: ['Ranked #1 globally across all sales metrics', 'Increased rebooking rates through cross-functional initiatives'] },
              { role: 'Personal Cruise Consultant', company: 'Norwegian Cruise Line', period: '2020–2022', highlights: ['150+ outbound calls daily with top-tier conversion', 'Two-time Agent of the Month'] },
              { role: 'Marketing Strategy Manager', company: 'MXM', period: '2015–2017', highlights: ['Led digital strategy for NBC, SeaWorld, and other national brands'] },
            ].map((job, i) => (
              <div key={i} className="ml-4 pl-6 pb-6 border-l border-white/10 relative">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-cyan-400/60 border-2 border-slate-950" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <h4 className="font-semibold">{job.role}</h4>
                  <span className="text-xs text-white/40">{job.period}</span>
                </div>
                <p className="text-sm text-cyan-400/70 mb-2">{job.company}</p>
                <ul className="space-y-1">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-white/50 flex items-start gap-2">
                      <ChevronRight className="w-3 h-3 mt-1 text-cyan-400/40 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cruise Line Partners */}
      <section className="py-16 px-6 border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm text-white/30 mb-8 uppercase tracking-wider">Trusted Cruise Line Partners</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {CRUISE_LINES.map((line, i) => (
              <div key={i} className="flex items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-xs text-white/40 text-center font-medium">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-center">What Clients Say</h2>
          <p className="text-white/40 text-center mb-12">Real experiences from happy travelers.</p>

          <div className="relative">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${i === activeTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
              >
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 text-center">
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-white/70 leading-relaxed mb-6 italic">"{t.text}"</p>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-cyan-400/60 mt-1">{t.trip}</p>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? 'bg-cyan-400 w-6' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-white/10 p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-600/5" />
            <div className="relative">
              <Compass className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">Your Dream Cruise Awaits</h2>
              <p className="text-white/50 max-w-lg mx-auto mb-8">Whether it's your first voyage or your fiftieth, solo or with your favorite people — I'll make it the best one yet. No fees, no hassle — just expert guidance for everyone.</p>
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:opacity-90 transition">
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Set Sail?</h2>
          <p className="text-white/50 mb-10">Let's plan your perfect cruise. Reach out and I'll take care of everything.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:248-974-5944" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white/70 hover:bg-white/[0.08] transition">
              <Phone className="w-4 h-4 text-cyan-400" /> (248) 974-5944
            </a>
            <a href="mailto:AdamJosephBritten@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white/70 hover:bg-white/[0.08] transition">
              <Mail className="w-4 h-4 text-cyan-400" /> Email Adam
            </a>
          </div>
          <p className="text-xs text-white/30 mt-6 flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3" /> Winston-Salem, NC
          </p>
          <p className="text-xs text-white/25 mt-3 flex items-center justify-center gap-1.5">
            <Heart className="w-3 h-3 text-pink-400/50" /> All travelers welcome
          </p>
        </div>
      </section>

      {/* Auth error */}
      {authError && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-400 text-sm">
          {authError}
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/[0.06] text-center text-xs text-white/30">
        © {new Date().getFullYear()} Adam The Cruise Guy. All rights reserved.
      </footer>
    </div>
  );
}
