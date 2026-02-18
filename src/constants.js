// Allowed users for portal access
export const allowedEmails = [
  'mdulin@gmail.com',
  'adamjosephbritten@gmail.com'
];

// Client lifecycle stages (CRM pipeline)
export const clientStages = [
  { value: 'lead', label: 'Lead', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { value: 'prospect', label: 'Prospect', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  { value: 'quoted', label: 'Quoted', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  { value: 'booked', label: 'Booked', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { value: 'sailed', label: 'Sailed', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  { value: 'repeat', label: 'Repeat Client', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { value: 'inactive', label: 'Inactive', color: 'text-white/40', bg: 'bg-white/5', border: 'border-white/10' },
];

// Contact methods
export const contactMethods = [
  { value: 'phone', label: 'Phone Call', icon: 'Phone' },
  { value: 'email', label: 'Email', icon: 'Mail' },
  { value: 'text', label: 'Text Message', icon: 'MessageSquare' },
  { value: 'in-person', label: 'In Person', icon: 'Users' },
  { value: 'social', label: 'Social Media', icon: 'Globe' },
];

// Lead sources
export const leadSources = [
  'Referral',
  'Website',
  'Social Media',
  'Repeat Client',
  'Walk-in',
  'Phone Inquiry',
  'Travel Show',
  'Partner Agency',
  'Other',
];

// Cruise lines
export const cruiseLines = [
  'Royal Caribbean',
  'Carnival',
  'Norwegian',
  'Celebrity',
  'MSC',
  'Disney',
  'Princess',
  'Holland America',
  'Virgin Voyages',
  'Silversea',
  'Oceania',
  'Viking',
  'Cunard',
  'Regent Seven Seas',
  'Windstar',
  'Other',
];

// Booking statuses
export const bookingStatuses = [
  { value: 'inquiry', label: 'Inquiry', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { value: 'quoted', label: 'Quoted', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { value: 'deposit-paid', label: 'Deposit Paid', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { value: 'fully-paid', label: 'Fully Paid', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { value: 'sailed', label: 'Sailed', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { value: 'cancelled', label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-500/10' },
];
