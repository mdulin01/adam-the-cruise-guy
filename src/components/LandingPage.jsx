import React from 'react';
import { Anchor, Ship, Award, Phone, Mail, MapPin, Briefcase, GraduationCap, ChevronRight, LogIn } from 'lucide-react';

export default function LandingPage({ onSignIn, authError }) {
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
            <a href="#experience" className="hover:text-white transition">Experience</a>
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
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-medium mb-6">
              <Anchor className="w-3.5 h-3.5" /> Your Personal Cruise Consultant
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Adam <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Britten</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mb-8 leading-relaxed">
              With 10+ years of cruise industry experience and top rankings at Virgin Voyages, Norwegian, and World Travel Holdings,
              I craft unforgettable voyages tailored to your dreams. Let me handle every detail so you can focus on the adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white hover:opacity-90 transition text-center">
                Plan Your Cruise
              </a>
              <a href="#experience" className="px-8 py-3 border border-white/15 rounded-xl font-medium text-white/70 hover:bg-white/5 transition text-center">
                View Experience
              </a>
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center">
              <Ship className="w-20 h-20 text-cyan-400/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10+', label: 'Years in Sales' },
            { value: '#1', label: 'Globally at Virgin Voyages' },
            { value: 'Top 15%', label: 'Profit Margin at WTH' },
            { value: '4×', label: 'Repeat Client Rate vs Peers' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{s.value}</p>
              <p className="text-sm text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Cruise With Adam?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Award className="w-8 h-8" />, title: 'Top-Ranked Agent', desc: 'Consistently ranked among the highest performers at every cruise line and agency.' },
              { icon: <Ship className="w-8 h-8" />, title: 'Industry Expert', desc: 'Deep knowledge of all major cruise lines, itineraries, cabin categories, and onboard experiences.' },
              { icon: <Anchor className="w-8 h-8" />, title: 'Personal Touch', desc: 'Full consultative service from initial planning through post-cruise follow-up. Your trip, your way.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
                <div className="text-cyan-400 mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>

          <div className="space-y-1">
            {/* Sales Experience */}
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

            {/* Clinical */}
            <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 mt-8 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Clinical
            </h3>
            {[
              { role: 'Cardiovascular Sonographer', company: 'Moses Cone Health', period: '2025–Present', highlights: ['Inpatient/outpatient cardiovascular ultrasound studies'] },
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

            {/* Education */}
            <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 mt-8 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h3>
            {[
              { degree: 'Cardiovascular Sonography Diploma', school: 'Forsyth Technical Community College', year: '2025' },
              { degree: 'MBA, Digital Marketing', school: 'Hult International Business School', year: '2012' },
              { degree: 'BS, Marketing Management', school: 'Syracuse University', year: '2011' },
            ].map((edu, i) => (
              <div key={i} className="ml-4 pl-6 pb-4 border-l border-white/10 relative">
                <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-cyan-400/40 border-2 border-slate-950" />
                <h4 className="font-semibold text-sm">{edu.degree}</h4>
                <p className="text-xs text-white/40">{edu.school} — {edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Set Sail?</h2>
          <p className="text-white/50 mb-10">Let's plan your perfect cruise. Reach out and I'll take care of everything.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:248-974-5944" className="flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white/70 hover:bg-white/[0.08] transition">
              <Phone className="w-4 h-4 text-cyan-400" /> (248) 974-5944
            </a>
            <a href="mailto:AdamJosephBritten@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white/70 hover:bg-white/[0.08] transition">
              <Mail className="w-4 h-4 text-cyan-400" /> Email Adam
            </a>
          </div>
          <p className="text-xs text-white/30 mt-6 flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3" /> Winston-Salem, NC
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
