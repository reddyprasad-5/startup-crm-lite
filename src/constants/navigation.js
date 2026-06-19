import { LayoutDashboard, Users, BarChart3 } from 'lucide-react';

export const NAV_ITEMS = [
  {
    to: '/',
    label: 'Dashboard',
    sublabel: 'Overview & stats',
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: '/leads',
    label: 'Leads',
    sublabel: 'Pipeline & contacts',
    icon: Users,
  },
  {
    to: '/analytics',
    label: 'Analytics',
    sublabel: 'Reports & insights',
    icon: BarChart3,
  },
];
