import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard, Users, Ship, LogOut, Plus, Search, Phone, Mail,
  MessageSquare, Calendar, DollarSign, TrendingUp, UserPlus, Clock,
  ChevronDown, X, Edit3, Trash2, Eye, MapPin, Gift, Tag, MoreVertical,
  ArrowUpDown, Filter, Activity, Globe, AlertCircle, ExternalLink
} from 'lucide-react';
import { useCollection } from '../hooks/useFirestore';
import { clientStages, contactMethods, leadSources, cruiseLines, bookingStatuses } from '../constants';

// ─── Helpers ───
const fmt = (n) => parseFloat(n || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtDate = (d) => d ? new Date(d + (d.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const daysBetween = (d1, d2) => Math.ceil((new Date(d2) - new Date(d1)) / 86400000);
const today = () => new Date().toISOString().slice(0, 10);

// ─── Main CRM App ───
export default function CRMApp({ user, onSignOut, onBackToSite }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Data
  const { data: clients, add: addClient, update: updateClient, remove: removeClient } = useCollection('crm_clients');
  const { data: interactions, add: addInteraction, remove: removeInteraction } = useCollection('crm_interactions');
  const { data: bookings, add: addBooking, update: updateBooking, remove: removeBooking } = useCollection('crm_bookings');

  // Modal states
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [interactionClientId, setInteractionClientId] = useState(null);
  const [bookingClientId, setBookingClientId] = useState(null);

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Ship },
    { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
  ];

  const activeLabel = sections.find(s => s.id === activeSection)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Desktop top nav */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/[0.06] h-14 items-center px-6">
        <div className="flex items-center gap-2 mr-8">
          <Ship className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-sm">Cruise CRM</span>
        </div>
        <div className="flex items-center gap-1">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${activeSection === s.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/50 hover:text-white/70 hover:bg-white/5'}`}>
              <s.icon className="w-4 h-4" /> {s.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-white/40">{user.email}</span>
          <button onClick={onBackToSite} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/40 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition" title="Back to website">
            <ExternalLink className="w-3.5 h-3.5" /> Site
          </button>
          <button onClick={onSignOut} className="p-2 text-white/40 hover:text-white/70 transition">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/[0.06] h-14 flex items-center px-4">
        <button onClick={() => setShowMobileNav(!showMobileNav)} className="flex items-center gap-2 text-white font-semibold text-sm">
          {activeLabel} <ChevronDown className="w-4 h-4 text-white/40" />
        </button>
        {showMobileNav && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMobileNav(false)} />
            <div className="absolute top-full left-4 right-4 z-50 bg-slate-800 border border-white/15 rounded-2xl shadow-2xl py-2 mt-1">
              {sections.map(s => (
                <button key={s.id} onClick={() => { setActiveSection(s.id); setShowMobileNav(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm ${activeSection === s.id ? 'text-cyan-400 bg-cyan-500/10' : 'text-white/60'}`}>
                  <s.icon className="w-4 h-4" /> {s.label}
                </button>
              ))}
              <div className="border-t border-white/10 mt-1 pt-1">
                <button onClick={() => { onBackToSite(); setShowMobileNav(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-cyan-400">
                  <ExternalLink className="w-4 h-4" /> Back to Website
                </button>
                <button onClick={onSignOut} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </>
        )}
        <div className="ml-auto">
          <button onClick={onSignOut} className="p-2 text-white/40">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-white/[0.06]">
        <div className="flex items-center justify-around h-16">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 ${activeSection === s.id ? 'text-cyan-400' : 'text-white/40'}`}>
              <s.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{s.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="pt-16 pb-20 md:pb-6 px-4 md:px-6 max-w-7xl mx-auto">
        {activeSection === 'dashboard' && (
          <DashboardView
            clients={clients} interactions={interactions} bookings={bookings}
            onAddClient={() => { setEditingClient(null); setShowClientModal(true); }}
            onViewClient={setSelectedClient}
            onAddInteraction={(cid) => { setInteractionClientId(cid); setShowInteractionModal(true); }}
          />
        )}
        {activeSection === 'clients' && (
          <ClientsView
            clients={clients} interactions={interactions} bookings={bookings}
            onAdd={() => { setEditingClient(null); setShowClientModal(true); }}
            onEdit={(c) => { setEditingClient(c); setShowClientModal(true); }}
            onDelete={removeClient}
            onView={setSelectedClient}
            onAddInteraction={(cid) => { setInteractionClientId(cid); setShowInteractionModal(true); }}
          />
        )}
        {activeSection === 'bookings' && (
          <BookingsView
            bookings={bookings} clients={clients}
            onAdd={(cid) => { setBookingClientId(cid || null); setShowBookingModal(true); }}
            onUpdate={updateBooking}
            onDelete={removeBooking}
          />
        )}
        {activeSection === 'pipeline' && (
          <PipelineView
            clients={clients} bookings={bookings}
            onViewClient={setSelectedClient}
            onUpdateClient={updateClient}
          />
        )}
      </main>

      {/* FAB */}
      <button
        onClick={() => {
          if (activeSection === 'bookings') { setBookingClientId(null); setShowBookingModal(true); }
          else { setEditingClient(null); setShowClientModal(true); }
        }}
        className="md:hidden fixed right-4 bottom-20 z-40 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/30 flex items-center justify-center"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Modals */}
      {showClientModal && (
        <ClientModal
          client={editingClient}
          onSave={async (data) => {
            if (editingClient) await updateClient(editingClient.id, data);
            else await addClient(data);
            setShowClientModal(false);
            setEditingClient(null);
          }}
          onClose={() => { setShowClientModal(false); setEditingClient(null); }}
        />
      )}

      {selectedClient && (
        <ClientDetailModal
          client={selectedClient}
          interactions={interactions.filter(i => i.clientId === selectedClient.id)}
          bookings={bookings.filter(b => b.clientId === selectedClient.id)}
          onClose={() => setSelectedClient(null)}
          onEdit={(c) => { setSelectedClient(null); setEditingClient(c); setShowClientModal(true); }}
          onAddInteraction={() => { setInteractionClientId(selectedClient.id); setShowInteractionModal(true); }}
          onAddBooking={() => { setBookingClientId(selectedClient.id); setShowBookingModal(true); }}
          onDeleteInteraction={removeInteraction}
          onUpdateClient={updateClient}
        />
      )}

      {showInteractionModal && (
        <InteractionModal
          clientId={interactionClientId}
          clients={clients}
          onSave={async (data) => {
            await addInteraction(data);
            // Update last contact date on client
            if (data.clientId) {
              await updateClient(data.clientId, { lastContactDate: data.date || today() });
            }
            setShowInteractionModal(false);
            setInteractionClientId(null);
          }}
          onClose={() => { setShowInteractionModal(false); setInteractionClientId(null); }}
        />
      )}

      {showBookingModal && (
        <BookingModal
          clientId={bookingClientId}
          clients={clients}
          onSave={async (data) => {
            await addBooking(data);
            setShowBookingModal(false);
            setBookingClientId(null);
          }}
          onClose={() => { setShowBookingModal(false); setBookingClientId(null); }}
        />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// DASHBOARD VIEW
// ═══════════════════════════════════════════
function DashboardView({ clients, interactions, bookings, onAddClient, onViewClient, onAddInteraction }) {
  const totalClients = clients.length;
  const activeClients = clients.filter(c => ['lead', 'prospect', 'quoted', 'booked'].includes(c.stage)).length;

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthBookings = bookings.filter(b => b.sailDate && b.sailDate.startsWith(thisMonth));
  const totalRevenue = bookings.filter(b => ['deposit-paid', 'fully-paid', 'sailed'].includes(b.status)).reduce((s, b) => s + (parseFloat(b.commission) || 0), 0);

  // Clients needing follow-up (no contact in 14+ days)
  const needFollowUp = clients.filter(c => {
    if (c.stage === 'inactive') return false;
    if (!c.lastContactDate) return true;
    return daysBetween(c.lastContactDate, today()) > 14;
  }).sort((a, b) => (a.lastContactDate || '').localeCompare(b.lastContactDate || ''));

  // Upcoming birthdays (next 30 days)
  const upcomingBirthdays = clients.filter(c => {
    if (!c.birthday) return false;
    const bday = new Date(c.birthday + 'T00:00:00');
    const now = new Date();
    bday.setFullYear(now.getFullYear());
    if (bday < now) bday.setFullYear(now.getFullYear() + 1);
    return daysBetween(now.toISOString().slice(0, 10), bday.toISOString().slice(0, 10)) <= 30;
  });

  // Recent interactions
  const recentInteractions = interactions.slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={onAddClient} className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition">
          <UserPlus className="w-4 h-4" /> Add Client
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Clients', value: activeClients, total: totalClients, icon: Users, color: 'from-cyan-400 to-blue-500' },
          { label: 'Need Follow-up', value: needFollowUp.length, icon: AlertCircle, color: needFollowUp.length > 0 ? 'from-orange-400 to-red-500' : 'from-emerald-400 to-teal-500' },
          { label: 'Active Bookings', value: bookings.filter(b => ['deposit-paid', 'fully-paid'].includes(b.status)).length, icon: Ship, color: 'from-purple-400 to-indigo-500' },
          { label: 'YTD Commission', value: fmt(totalRevenue), icon: DollarSign, color: 'from-emerald-400 to-teal-500' },
        ].map((card, i) => (
          <div key={i} className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <card.icon className="w-5 h-5 text-white/30" />
              {card.total != null && <span className="text-[10px] text-white/30">of {card.total}</span>}
            </div>
            <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${card.color}`}>
              {card.value}
            </p>
            <p className="text-xs text-white/40 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Follow-up needed */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" /> Needs Follow-up
          </h3>
          {needFollowUp.length === 0 ? (
            <p className="text-sm text-white/30">All clients contacted recently!</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {needFollowUp.slice(0, 10).map(c => (
                <div key={c.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer" onClick={() => onViewClient(c)}>
                  <div>
                    <p className="text-sm font-medium">{c.firstName} {c.lastName}</p>
                    <p className="text-[10px] text-white/30">
                      {c.lastContactDate ? `Last contact: ${fmtDate(c.lastContactDate)}` : 'Never contacted'}
                    </p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onAddInteraction(c.id); }}
                    className="p-1.5 bg-cyan-500/10 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition">
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming birthdays */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
            <Gift className="w-4 h-4 text-pink-400" /> Upcoming Birthdays
          </h3>
          {upcomingBirthdays.length === 0 ? (
            <p className="text-sm text-white/30">No birthdays in the next 30 days</p>
          ) : (
            <div className="space-y-2">
              {upcomingBirthdays.map(c => {
                const bday = new Date(c.birthday + 'T00:00:00');
                bday.setFullYear(new Date().getFullYear());
                if (bday < new Date()) bday.setFullYear(new Date().getFullYear() + 1);
                const daysAway = daysBetween(today(), bday.toISOString().slice(0, 10));
                return (
                  <div key={c.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 cursor-pointer" onClick={() => onViewClient(c)}>
                    <div>
                      <p className="text-sm font-medium">{c.firstName} {c.lastName}</p>
                      <p className="text-[10px] text-white/30">{fmtDate(c.birthday)}</p>
                    </div>
                    <span className={`text-xs font-medium ${daysAway <= 7 ? 'text-pink-400' : 'text-white/30'}`}>
                      {daysAway === 0 ? 'Today!' : `${daysAway}d`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" /> Recent Activity
        </h3>
        {recentInteractions.length === 0 ? (
          <p className="text-sm text-white/30">No interactions logged yet</p>
        ) : (
          <div className="space-y-2">
            {recentInteractions.map(i => {
              const client = clients.find(c => c.id === i.clientId);
              const method = contactMethods.find(m => m.value === i.method);
              return (
                <div key={i.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    i.method === 'phone' ? 'bg-green-500/10 text-green-400' :
                    i.method === 'email' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-white/5 text-white/40'
                  }`}>
                    {i.method === 'phone' ? <Phone className="w-4 h-4" /> :
                     i.method === 'email' ? <Mail className="w-4 h-4" /> :
                     i.method === 'text' ? <MessageSquare className="w-4 h-4" /> :
                     <Globe className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{client ? `${client.firstName} ${client.lastName}` : 'Unknown'}</span>
                      <span className="text-white/40"> — {method?.label || i.method}</span>
                    </p>
                    {i.notes && <p className="text-xs text-white/30 truncate mt-0.5">{i.notes}</p>}
                  </div>
                  <span className="text-[10px] text-white/30 flex-shrink-0">{fmtDate(i.date)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// CLIENTS VIEW
// ═══════════════════════════════════════════
function ClientsView({ clients, interactions, bookings, onAdd, onEdit, onDelete, onView, onAddInteraction }) {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filtered = useMemo(() => {
    let list = [...clients];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q) ||
        (c.phone || '').includes(q)
      );
    }
    if (stageFilter !== 'all') list = list.filter(c => c.stage === stageFilter);
    list.sort((a, b) => {
      if (sortBy === 'name') return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      if (sortBy === 'lastContact') return (b.lastContactDate || '').localeCompare(a.lastContactDate || '');
      if (sortBy === 'stage') return (a.stage || '').localeCompare(b.stage || '');
      return 0;
    });
    return list;
  }, [clients, search, stageFilter, sortBy]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button onClick={onAdd} className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition">
          <UserPlus className="w-4 h-4" /> Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search clients..." className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/40" />
        </div>
        <select value={stageFilter} onChange={e => setStageFilter(e.target.value)}
          className="px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white/70 focus:outline-none">
          <option value="all">All Stages</option>
          {clientStages.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          className="px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white/70 focus:outline-none">
          <option value="name">Sort: Name</option>
          <option value="lastContact">Sort: Last Contact</option>
          <option value="stage">Sort: Stage</option>
        </select>
      </div>

      {/* Client cards */}
      <div className="grid gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{clients.length === 0 ? 'No clients yet. Add your first client!' : 'No matching clients'}</p>
          </div>
        ) : filtered.map(client => {
          const stage = clientStages.find(s => s.value === client.stage) || clientStages[0];
          const clientInteractions = interactions.filter(i => i.clientId === client.id);
          const clientBookings = bookings.filter(b => b.clientId === client.id);
          const lastContact = client.lastContactDate ? daysBetween(client.lastContactDate, today()) : null;

          return (
            <div key={client.id}
              onClick={() => onView(client)}
              className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:bg-white/[0.05] transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-cyan-400">
                      {(client.firstName || '?')[0]}{(client.lastName || '?')[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{client.firstName} {client.lastName}</h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      {client.phone && (
                        <span className="text-xs text-white/40 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {client.phone}
                        </span>
                      )}
                      {client.email && (
                        <span className="text-xs text-white/40 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {client.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stage.bg} ${stage.color} ${stage.border}`}>
                    {stage.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" /> {clientInteractions.length} interactions
                </span>
                <span className="flex items-center gap-1">
                  <Ship className="w-3 h-3" /> {clientBookings.length} bookings
                </span>
                {lastContact !== null && (
                  <span className={`flex items-center gap-1 ${lastContact > 14 ? 'text-orange-400' : ''}`}>
                    <Clock className="w-3 h-3" /> {lastContact === 0 ? 'Today' : `${lastContact}d ago`}
                  </span>
                )}
                {client.lastSaleDate && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Last sale: {fmtDate(client.lastSaleDate)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// BOOKINGS VIEW
// ═══════════════════════════════════════════
function BookingsView({ bookings, clients, onAdd, onUpdate, onDelete }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const sorted = useMemo(() => {
    let list = [...bookings];
    if (statusFilter !== 'all') list = list.filter(b => b.status === statusFilter);
    list.sort((a, b) => (b.sailDate || '').localeCompare(a.sailDate || ''));
    return list;
  }, [bookings, statusFilter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <button onClick={() => onAdd()} className="hidden md:flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition">
          <Plus className="w-4 h-4" /> New Booking
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${statusFilter === 'all' ? 'bg-cyan-500/15 text-cyan-400' : 'text-white/40 hover:text-white/60'}`}>
          All
        </button>
        {bookingStatuses.map(s => (
          <button key={s.value} onClick={() => setStatusFilter(s.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${statusFilter === s.value ? `${s.bg} ${s.color}` : 'text-white/40 hover:text-white/60'}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {sorted.length === 0 ? (
          <div className="text-center py-16 text-white/30">
            <Ship className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No bookings yet</p>
          </div>
        ) : sorted.map(booking => {
          const client = clients.find(c => c.id === booking.clientId);
          const status = bookingStatuses.find(s => s.value === booking.status) || bookingStatuses[0];
          return (
            <div key={booking.id} className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{booking.cruiseLine} — {booking.destination || 'TBD'}</h3>
                  <p className="text-xs text-white/40 mt-0.5">
                    {client ? `${client.firstName} ${client.lastName}` : 'Unknown client'}
                    {booking.passengers ? ` · ${booking.passengers} pax` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                    {status.label}
                  </span>
                  <button onClick={() => onDelete(booking.id)} className="p-1 text-white/20 hover:text-red-400 transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-white/30">
                {booking.sailDate && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Sails: {fmtDate(booking.sailDate)}
                  </span>
                )}
                {booking.totalPrice && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> {fmt(booking.totalPrice)}
                  </span>
                )}
                {booking.commission && (
                  <span className="flex items-center gap-1 text-emerald-400/60">
                    Commission: {fmt(booking.commission)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// PIPELINE VIEW (Kanban-style)
// ═══════════════════════════════════════════
function PipelineView({ clients, bookings, onViewClient, onUpdateClient }) {
  const stages = clientStages.filter(s => s.value !== 'inactive');

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pipeline</h1>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const stageClients = clients.filter(c => (c.stage || 'lead') === stage.value);
          return (
            <div key={stage.value} className="min-w-[250px] flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${stage.bg} ${stage.color} ${stage.border}`}>
                  {stage.label}
                </span>
                <span className="text-xs text-white/30">{stageClients.length}</span>
              </div>
              <div className="space-y-2">
                {stageClients.map(c => (
                  <div key={c.id} onClick={() => onViewClient(c)}
                    className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.05] transition cursor-pointer">
                    <p className="text-sm font-medium">{c.firstName} {c.lastName}</p>
                    {c.phone && <p className="text-[10px] text-white/30 mt-0.5">{c.phone}</p>}
                    {c.lastContactDate && (
                      <p className="text-[10px] text-white/30 mt-1">Last: {fmtDate(c.lastContactDate)}</p>
                    )}
                  </div>
                ))}
                {stageClients.length === 0 && (
                  <p className="text-xs text-white/20 text-center py-6">No clients</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// CLIENT MODAL (Add/Edit)
// ═══════════════════════════════════════════
function ClientModal({ client, onSave, onClose }) {
  const [form, setForm] = useState({
    firstName: client?.firstName || '',
    lastName: client?.lastName || '',
    email: client?.email || '',
    phone: client?.phone || '',
    street: client?.street || '',
    city: client?.city || '',
    state: client?.state || '',
    zip: client?.zip || '',
    birthday: client?.birthday || '',
    stage: client?.stage || 'lead',
    source: client?.source || '',
    notes: client?.notes || '',
    lastContactDate: client?.lastContactDate || '',
    lastSaleDate: client?.lastSaleDate || '',
    preferredCruiseLine: client?.preferredCruiseLine || '',
    travelPreferences: client?.travelPreferences || '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg mt-10 mb-10">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-bold text-lg">{client ? 'Edit Client' : 'New Client'}</h2>
          <button onClick={onClose} className="p-1 text-white/40 hover:text-white/70 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">First Name *</label>
              <input value={form.firstName} onChange={e => set('firstName', e.target.value)} required
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Last Name *</label>
              <input value={form.lastName} onChange={e => set('lastName', e.target.value)} required
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} type="tel"
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Email</label>
              <input value={form.email} onChange={e => set('email', e.target.value)} type="email"
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Street</label>
            <input value={form.street} onChange={e => set('street', e.target.value)}
              className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">City</label>
              <input value={form.city} onChange={e => set('city', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">State</label>
              <input value={form.state} onChange={e => set('state', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">ZIP</label>
              <input value={form.zip} onChange={e => set('zip', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
            </div>
          </div>

          {/* Birthday + Stage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Birthday</label>
              <input value={form.birthday} onChange={e => set('birthday', e.target.value)} type="date"
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Stage</label>
              <select value={form.stage} onChange={e => set('stage', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none">
                {clientStages.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Source + Preferred Cruise Line */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Lead Source</label>
              <select value={form.source} onChange={e => set('source', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none">
                <option value="">—</option>
                {leadSources.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Preferred Cruise Line</label>
              <select value={form.preferredCruiseLine} onChange={e => set('preferredCruiseLine', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none">
                <option value="">—</option>
                {cruiseLines.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Travel preferences */}
          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Travel Preferences</label>
            <textarea value={form.travelPreferences} onChange={e => set('travelPreferences', e.target.value)} rows={2}
              placeholder="Cabin type, destinations, dietary needs, special occasions..."
              className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/40 resize-none" />
          </div>

          {/* Notes */}
          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
              className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40 resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-white/50 hover:bg-white/5 transition">Cancel</button>
            <button type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition">
              {client ? 'Save Changes' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// CLIENT DETAIL MODAL
// ═══════════════════════════════════════════
function ClientDetailModal({ client, interactions, bookings, onClose, onEdit, onAddInteraction, onAddBooking, onDeleteInteraction, onUpdateClient }) {
  const [activeTab, setActiveTab] = useState('overview');
  const stage = clientStages.find(s => s.value === client.stage) || clientStages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl mt-10 mb-10">
        {/* Header */}
        <div className="p-5 border-b border-white/[0.06]">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                <span className="text-lg font-bold text-cyan-400">
                  {(client.firstName || '?')[0]}{(client.lastName || '?')[0]}
                </span>
              </div>
              <div>
                <h2 className="font-bold text-lg">{client.firstName} {client.lastName}</h2>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${stage.bg} ${stage.color} ${stage.border}`}>
                    {stage.label}
                  </span>
                  {client.source && <span className="text-[10px] text-white/30">via {client.source}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => onEdit(client)} className="p-2 text-white/40 hover:text-white/70 transition">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="p-2 text-white/40 hover:text-white/70 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact info row */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-white/50">
            {client.phone && (
              <a href={`tel:${client.phone}`} className="flex items-center gap-1 hover:text-cyan-400 transition">
                <Phone className="w-3 h-3" /> {client.phone}
              </a>
            )}
            {client.email && (
              <a href={`mailto:${client.email}`} className="flex items-center gap-1 hover:text-cyan-400 transition">
                <Mail className="w-3 h-3" /> {client.email}
              </a>
            )}
            {(client.city || client.state) && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {[client.city, client.state].filter(Boolean).join(', ')}
              </span>
            )}
            {client.birthday && (
              <span className="flex items-center gap-1">
                <Gift className="w-3 h-3" /> {fmtDate(client.birthday)}
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.06] px-5 gap-1">
          {['overview', 'interactions', 'bookings'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition border-b-2 -mb-px ${
                activeTab === tab ? 'text-cyan-400 border-cyan-400' : 'text-white/40 border-transparent hover:text-white/60'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Stage selector */}
              <div>
                <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Pipeline Stage</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {clientStages.map(s => (
                    <button key={s.value}
                      onClick={() => onUpdateClient(client.id, { stage: s.value })}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                        client.stage === s.value ? `${s.bg} ${s.color} ${s.border}` : 'border-white/10 text-white/30 hover:text-white/50'
                      }`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Key dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/[0.02] rounded-xl">
                  <p className="text-[10px] text-white/30 uppercase">Last Contact</p>
                  <p className="text-sm font-medium mt-1">{client.lastContactDate ? fmtDate(client.lastContactDate) : 'Never'}</p>
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl">
                  <p className="text-[10px] text-white/30 uppercase">Last Sale</p>
                  <p className="text-sm font-medium mt-1">{client.lastSaleDate ? fmtDate(client.lastSaleDate) : 'None'}</p>
                </div>
              </div>

              {/* Preferences */}
              {client.travelPreferences && (
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">Travel Preferences</p>
                  <p className="text-sm text-white/60">{client.travelPreferences}</p>
                </div>
              )}
              {client.preferredCruiseLine && (
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">Preferred Cruise Line</p>
                  <p className="text-sm text-white/60">{client.preferredCruiseLine}</p>
                </div>
              )}
              {client.notes && (
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">Notes</p>
                  <p className="text-sm text-white/60">{client.notes}</p>
                </div>
              )}

              {/* Address */}
              {(client.street || client.city) && (
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">Address</p>
                  <p className="text-sm text-white/60">
                    {[client.street, [client.city, client.state, client.zip].filter(Boolean).join(', ')].filter(Boolean).join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'interactions' && (
            <div className="space-y-3">
              <button onClick={onAddInteraction}
                className="w-full py-2.5 border border-dashed border-white/15 rounded-xl text-sm text-white/40 hover:text-cyan-400 hover:border-cyan-500/30 transition flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Log Interaction
              </button>
              {interactions.length === 0 ? (
                <p className="text-sm text-white/30 text-center py-6">No interactions logged</p>
              ) : interactions.map(i => {
                const method = contactMethods.find(m => m.value === i.method);
                return (
                  <div key={i.id} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      i.method === 'phone' ? 'bg-green-500/10 text-green-400' :
                      i.method === 'email' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-white/5 text-white/40'
                    }`}>
                      {i.method === 'phone' ? <Phone className="w-4 h-4" /> :
                       i.method === 'email' ? <Mail className="w-4 h-4" /> :
                       i.method === 'text' ? <MessageSquare className="w-4 h-4" /> :
                       <Globe className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{method?.label || i.method}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/30">{fmtDate(i.date)}</span>
                          <button onClick={() => onDeleteInteraction(i.id)} className="p-1 text-white/20 hover:text-red-400 transition">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {i.notes && <p className="text-xs text-white/40 mt-1">{i.notes}</p>}
                      {i.followUpDate && (
                        <p className="text-[10px] text-orange-400/70 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Follow-up: {fmtDate(i.followUpDate)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-3">
              <button onClick={onAddBooking}
                className="w-full py-2.5 border border-dashed border-white/15 rounded-xl text-sm text-white/40 hover:text-cyan-400 hover:border-cyan-500/30 transition flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Booking
              </button>
              {bookings.length === 0 ? (
                <p className="text-sm text-white/30 text-center py-6">No bookings yet</p>
              ) : bookings.map(b => {
                const status = bookingStatuses.find(s => s.value === b.status) || bookingStatuses[0];
                return (
                  <div key={b.id} className="p-3 bg-white/[0.02] rounded-xl">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{b.cruiseLine} — {b.destination || 'TBD'}</h4>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>{status.label}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                      {b.sailDate && <span>Sails: {fmtDate(b.sailDate)}</span>}
                      {b.totalPrice && <span>Total: {fmt(b.totalPrice)}</span>}
                      {b.commission && <span className="text-emerald-400/60">Comm: {fmt(b.commission)}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// INTERACTION MODAL
// ═══════════════════════════════════════════
function InteractionModal({ clientId, clients, onSave, onClose }) {
  const [form, setForm] = useState({
    clientId: clientId || '',
    method: 'phone',
    date: today(),
    notes: '',
    followUpDate: '',
    outcome: '',
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md mt-20">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-bold">Log Interaction</h2>
          <button onClick={onClose} className="p-1 text-white/40 hover:text-white/70"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (!form.clientId) return; onSave(form); }} className="p-5 space-y-4">
          {!clientId && (
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Client *</label>
              <select value={form.clientId} onChange={e => set('clientId', e.target.value)} required
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none">
                <option value="">Select client</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
              </select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Method</label>
              <select value={form.method} onChange={e => set('method', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none">
                {contactMethods.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Date</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
              placeholder="What was discussed..."
              className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none resize-none" />
          </div>
          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Follow-up Date</label>
            <input type="date" value={form.followUpDate} onChange={e => set('followUpDate', e.target.value)}
              className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-white/50 hover:bg-white/5 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// BOOKING MODAL
// ═══════════════════════════════════════════
function BookingModal({ clientId, clients, onSave, onClose }) {
  const [form, setForm] = useState({
    clientId: clientId || '',
    cruiseLine: '',
    destination: '',
    shipName: '',
    sailDate: '',
    returnDate: '',
    passengers: '2',
    cabinType: '',
    totalPrice: '',
    commission: '',
    confirmationNumber: '',
    status: 'inquiry',
    notes: '',
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg mt-10 mb-10">
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h2 className="font-bold">New Booking</h2>
          <button onClick={onClose} className="p-1 text-white/40 hover:text-white/70"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); if (!form.clientId || !form.cruiseLine) return; onSave(form); }} className="p-5 space-y-4">
          {!clientId && (
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Client *</label>
              <select value={form.clientId} onChange={e => set('clientId', e.target.value)} required
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none">
                <option value="">Select client</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
              </select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Cruise Line *</label>
              <select value={form.cruiseLine} onChange={e => set('cruiseLine', e.target.value)} required
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none">
                <option value="">Select</option>
                {cruiseLines.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Destination</label>
              <input value={form.destination} onChange={e => set('destination', e.target.value)}
                placeholder="Caribbean, Alaska..."
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Ship Name</label>
              <input value={form.shipName} onChange={e => set('shipName', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Cabin Type</label>
              <input value={form.cabinType} onChange={e => set('cabinType', e.target.value)}
                placeholder="Balcony, Suite..."
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Sail Date</label>
              <input type="date" value={form.sailDate} onChange={e => set('sailDate', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Return</label>
              <input type="date" value={form.returnDate} onChange={e => set('returnDate', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Passengers</label>
              <input type="number" value={form.passengers} onChange={e => set('passengers', e.target.value)} min="1"
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Total Price</label>
              <input type="number" value={form.totalPrice} onChange={e => set('totalPrice', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Commission</label>
              <input type="number" value={form.commission} onChange={e => set('commission', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none">
                {bookingStatuses.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Confirmation #</label>
            <input value={form.confirmationNumber} onChange={e => set('confirmationNumber', e.target.value)}
              className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none" />
          </div>
          <div>
            <label className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={2}
              className="mt-1 w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm text-white/50 hover:bg-white/5 transition">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition">Save Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
}
