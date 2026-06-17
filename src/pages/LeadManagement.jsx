// Import React hooks for local state management and performance memoization
import { useState, useMemo } from 'react';
// Import beautiful icon elements from lucide-react
import { Search, Plus, Trash2, Filter, Mail, DollarSign, Building } from 'lucide-react';

// Define the LeadManagement functional component
export default function LeadManagement() {
  // Define initial static leads database array
  const initialLeads = [
    { id: 1, name: 'Alice Henderson', email: 'alice@quantumlabs.io', company: 'Quantum Labs', value: 12000, status: 'Qualified', date: '2026-06-10' },
    { id: 2, name: 'David Miller', email: 'david.m@cloudscale.net', company: 'CloudScale Inc', value: 8500, status: 'Contacted', date: '2026-06-12' },
    { id: 3, name: 'Sophia Chen', email: 'sophia@innovate.co', company: 'Innovate Co', value: 24000, status: 'Proposal Sent', date: '2026-06-14' },
    { id: 4, name: 'Marcus Brody', email: 'm.brody@apexflow.org', company: 'ApexFlow Systems', value: 18500, status: 'New', date: '2026-06-15' },
    { id: 5, name: 'Elena Rostova', email: 'elena@cyberdefense.com', company: 'CyberDefense', value: 31000, status: 'Closed Won', date: '2026-06-08' }
  ];

  // Set up local state to store the reactive list of leads
  const [leads, setLeads] = useState(initialLeads);
  // Set up state for search inputs
  const [searchTerm, setSearchTerm] = useState('');
  // Set up state for filtering leads by stage
  const [statusFilter, setStatusFilter] = useState('All');

  // Handle lead entry creation
  const handleAddLead = () => {
    // Generate mock company name array
    const companies = ['StellarAI', 'VeloTech', 'AlphaLogistics', 'NovaFinance', 'HelixBio'];
    // Generate mock names array
    const names = ['Jordan Peterson', 'Clara Oswald', 'Ethan Hunt', 'Selena Gomez', 'Bruce Wayne'];
    // Generate mock statuses array
    const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent'];
    
    // Pick random indices from array lists
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomCompany = companies[Math.floor(Math.random() * companies.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomValue = Math.floor(Math.random() * 40 + 5) * 1000;
    
    // Create new lead payload
    const newLead = {
      id: Date.now(),
      name: randomName,
      email: `${randomName.toLowerCase().replace(' ', '.')}@${randomCompany.toLowerCase()}.io`,
      company: randomCompany,
      value: randomValue,
      status: randomStatus,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Update the state array with the new lead
    setLeads([newLead, ...leads]);
  };

  // Handle lead entry deletion
  const handleDeleteLead = (id) => {
    // Filter out the lead matching the target ID
    setLeads(leads.filter(lead => lead.id !== id));
  };

  // Perform search matching and status filter updates using React useMemo for performance optimization
  const filteredLeads = useMemo(() => {
    // Return filtered results matching filters
    return leads.filter(lead => {
      // Check if lead matches status filter select
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      // Check if lead matches name or company search strings
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            lead.company.toLowerCase().includes(searchTerm.toLowerCase());
      // Return combined boolean match
      return matchesStatus && matchesSearch;
    });
  }, [leads, searchTerm, statusFilter]);

  // Return a tailwind color mapping string for statuses to render styled pills
  const getStatusStyle = (status) => {
    // Switch block assigning visual color palettes
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200/50 dark:bg-blue-950/45 dark:text-blue-300 dark:border-blue-800/50';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200/50 dark:bg-amber-950/45 dark:text-amber-300 dark:border-amber-800/50';
      case 'Qualified':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/50 dark:bg-indigo-950/45 dark:text-indigo-300 dark:border-indigo-800/50';
      case 'Proposal Sent':
        return 'bg-purple-50 text-purple-700 border-purple-200/50 dark:bg-purple-950/45 dark:text-purple-300 dark:border-purple-800/50';
      case 'Closed Won':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/50 dark:bg-emerald-950/45 dark:text-emerald-300 dark:border-emerald-800/50';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800';
    }
  };

  // Render the lead management dashboard structure
  return (
    // Outer wrap div
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Title Header area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white m-0">Lead Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Qualify leads, track value, and manage deal stages across your pipeline
          </p>
        </div>
        {/* Dynamic Add Lead CTA trigger */}
        <button
          onClick={handleAddLead}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Random Lead
        </button>
      </div>

      {/* Filter and search bar layout */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
        {/* Search input container */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        {/* Dropdown status selection filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            <option value="All">All Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed Won">Closed Won</option>
          </select>
        </div>
      </div>

      {/* Leads Table panel */}
      <div className="overflow-hidden rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-slate-500 dark:text-slate-400">
            {/* Table Header block */}
            <thead className="bg-slate-50 dark:bg-slate-800/40 text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
              <tr>
                <th className="px-6 py-4">Lead Info</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            {/* Table Body listing */}
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    {/* Lead Detail column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-white">{lead.name}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                          <Mail className="h-3.5 w-3.5" />
                          {lead.email}
                        </span>
                      </div>
                    </td>
                    {/* Company Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-700 dark:text-slate-300">{lead.company}</span>
                      </div>
                    </td>
                    {/* Deal Value column */}
                    <td className="px-6 py-4 font-medium text-slate-950 dark:text-slate-50">
                      <div className="flex items-center">
                        <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                        {lead.value.toLocaleString()}
                      </div>
                    </td>
                    {/* Status Pill Badge column */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    {/* Creation Date column */}
                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{lead.date}</td>
                    {/* Actions column (Trash bin button) */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // Table placeholder if list is empty
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                    No leads found matching your criteria. Try adding some leads or adjusting filters!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
