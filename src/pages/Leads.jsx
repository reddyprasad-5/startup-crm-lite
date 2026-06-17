import React, { useState } from 'react';
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';

// Import common components
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';

// Context
import { useLeads } from '../context/LeadContext';

/**
 * Leads page assembling LeadTable, LeadCard, LeadForm, SearchBar, and FilterBar.
 * Pulls global lead state directly from the Context API.
 */
const Leads = () => {
  // Use LeadContext for global state instead of local state array
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  
  // State for view toggle (table vs grid/card)
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  
  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Derived variable: filtered leads safely limits what is displayed without touching context array
  const filteredLeads = leads
    .filter((lead) => activeFilter === 'All' || lead.status === activeFilter)
    .filter((lead) => {
      const query = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(query) ||
        (lead.company || '').toLowerCase().includes(query) ||
        (lead.email || '').toLowerCase().includes(query)
      );
    });

  // Handlers for Add/Edit Form Triggers
  const handleAddClick = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  // Clear search/filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  // Submission handler routing to context actions
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      updateLead(selectedLead.id, formData);
      toast.success('Lead updated successfully!', { duration: 3000 });
    } else {
      addLead(formData);
      toast.success('New lead added!', { duration: 3000 });
    }
    closeModal();
  };

  // Context Delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.error('Lead deleted.', { duration: 3000 });
    }
  };

  return (
    <div className="bg-slate-50 min-h-full p-4 md:p-6">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage, track, and convert your startup leads.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View layout toggles */}
            <div className="hidden sm:flex items-center bg-white border border-gray-200 rounded-md p-1">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-slate-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                aria-label="Table view"
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={handleAddClick}
              className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Lead
            </button>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {filteredLeads.length === 0 ? (
            <EmptyState 
              hasLeadsTotal={leads.length > 0} 
              onClearFilters={handleClearFilters} 
            />
          ) : (
            <>
              {/* Mobile Grid View */}
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${viewMode === 'table' ? 'md:hidden' : 'block'}`}>
                {filteredLeads.map(lead => (
                  <LeadCard 
                    key={lead.id} 
                    lead={lead} 
                    onEdit={handleEditClick} 
                    onDelete={handleDelete} 
                  />
                ))}
              </div>

              {/* Desktop Table View */}
              <div className={`hidden ${viewMode === 'table' ? 'md:block' : 'hidden'}`}>
                <LeadTable 
                  leads={filteredLeads} 
                  onEdit={handleEditClick} 
                  onDelete={handleDelete} 
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Interactive Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md">
            <LeadForm 
              initialData={selectedLead} 
              onSubmit={handleFormSubmit} 
              onCancel={closeModal} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
