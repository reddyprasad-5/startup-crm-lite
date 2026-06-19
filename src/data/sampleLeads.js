const NAMES = [
  'Aarav Patel', 'Priya Sharma', 'Rohan Gupta', 'Anjali Desai', 'Vikram Singh',
  'Neha Verma', 'Arjun Mehta', 'Kavya Reddy', 'Dev Malhotra', 'Isha Nair',
  'Rahul Joshi', 'Sneha Iyer', 'Karan Chopra', 'Meera Krishnan', 'Aditya Rao',
  'Pooja Banerjee', 'Sanjay Pillai', 'Divya Menon', 'Nikhil Das', 'Ritu Agarwal',
];

const COMPANIES = [
  'Fintech Solutions India', 'CloudWorks Tech', 'NextGen Retail', 'Healthcare Innovations',
  'BuildTech Infrastructure', 'EduSmart Platforms', 'GreenEnergy Labs', 'DataPulse AI',
  'SwiftLogistics', 'NovaMart', 'Zenith Consulting', 'PixelCraft Studios',
  'AgriTech Bharat', 'SecureNet Systems', 'TravelEase India',
];

const STATUSES = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const SOURCES = ['Website', 'Referral', 'LinkedIn', 'Instagram', 'Ads', 'Cold Call', 'Email Campaign'];
const OWNERS = ['Sarah', 'Alex', 'David', 'Priya', 'Rohan'];

const STATUS_TO_STAGE = {
  New: 0,
  Contacted: 1,
  'Meeting Scheduled': 2,
  'Proposal Sent': 3,
  Won: 4,
  Lost: 3,
};

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const generateLead = (index) => {
  const now = Date.now();
  const daysAgo = Math.floor(Math.random() * 180);
  const createdAt = new Date(now - daysAgo * 86400000);
  createdAt.setHours(9 + (index % 8), (index * 7) % 60, 0, 0);

  const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
  const stage = STATUS_TO_STAGE[status];
  const baseValue = [15000, 25000, 35000, 50000, 75000, 100000, 120000, 180000];
  const value = baseValue[Math.floor(Math.random() * baseValue.length)];

  const lead = {
    id: `lead-${String(index + 1).padStart(3, '0')}`,
    name: NAMES[index % NAMES.length],
    company: COMPANIES[index % COMPANIES.length],
    email: `contact${index + 1}@example.com`,
    phone: `+91 ${90000 + index} ${10000 + index}`,
    status,
    source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
    value,
    owner: OWNERS[Math.floor(Math.random() * OWNERS.length)],
    createdAt: createdAt.toISOString(),
    dateAdded: createdAt.toISOString(),
  };

  if (stage >= 1) lead.contactedAt = addDays(createdAt, 1 + (index % 3));
  if (stage >= 2) lead.meetingAt = addDays(createdAt, 3 + (index % 5));
  if (stage >= 3) lead.proposalAt = addDays(createdAt, 7 + (index % 7));
  if (status === 'Won') lead.wonAt = addDays(createdAt, 12 + (index % 14));

  return lead;
};

/**
 * Sample leads data to populate the CRM if no local storage data exists.
 * Includes analytics fields: value, owner, pipeline timestamps.
 */
export const sampleLeads = Array.from({ length: 100 }, (_, i) => generateLead(i));
