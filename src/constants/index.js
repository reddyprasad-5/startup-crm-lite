export const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
export const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

export const STATUS_ALIASES = {
  'Meeting Scheduled': 'Meeting',
  'Proposal Sent': 'Proposal',
};

export const SOURCE_ALIASES = {
  'Cold Call': 'Cold Email',
  'Email Campaign': 'Ads',
  Other: 'Website',
};

export const FUNNEL_STAGES = ['New', 'Contacted', 'Meeting', 'Proposal', 'Won'];

export const DATE_RANGE_OPTIONS = [
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: '90d', label: 'Last 90 Days' },
  { id: 'year', label: 'This Year' },
  { id: 'custom', label: 'Custom Range' },
];
