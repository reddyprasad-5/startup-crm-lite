import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';

const Leads = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const updateView = (e) => setViewMode(e.matches ? 'table' : 'grid');
    updateView(mq);
    mq.addEventListener('change', updateView);
    return () => mq.removeEventListener('change', updateView);
  }, []);

  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => activeFilter === 'All' || lead.status === activeFilter)
      .filter((lead) => {
        const query = searchQuery.toLowerCase();
        return (
          lead.name.toLowerCase().includes(query) ||
          (lead.company || '').toLowerCase().includes(query) ||
          (lead.email || '').toLowerCase().includes(query)
        );
      });
  }, [leads, activeFilter, searchQuery]);

  const handleAddClick = useCallback(() => {
    setSelectedLead(null);
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    if (location.state?.openAddModal) {
      handleAddClick();
      navigate('.', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleEditClick = useCallback((lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedLead(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveFilter('All');
  }, []);

  const handleFormSubmit = useCallback((formData) => {
    if (selectedLead) {
      updateLead(selectedLead.id, formData);
      toast.success('Lead updated successfully!', { duration: 3000 });
    } else {
      addLead(formData);
      toast.success('New lead added!', { duration: 3000 });
    }
    closeModal();
  }, [selectedLead, updateLead, addLead, closeModal]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.error('Lead deleted.', { duration: 3000 });
    }
  }, [deleteLead]);

  const showTable = viewMode === 'table';

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full p-4 md:p-6 transition-colors">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Lead Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Manage, track, and convert your startup leads.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* View toggle: tablet+ only */}
            <div className="hidden md:flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 transition-colors">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`min-h-11 min-w-11 flex items-center justify-center rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                aria-label="Table view"
              >
                <ListIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`min-h-11 min-w-11 flex items-center justify-center rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-slate-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                aria-label="Card view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddClick}
              className="flex-1 sm:flex-none flex justify-center items-center gap-2 min-h-11 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Add Lead
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />
        </div>

        <div>
          {filteredLeads.length === 0 ? (
            <EmptyState hasLeadsTotal={leads.length > 0} onClearFilters={handleClearFilters} />
          ) : (
            <>
              {/* Mobile: cards only */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {/* Tablet+: card view when toggled */}
              <div
                className={`hidden gap-4 md:grid-cols-2 lg:grid-cols-3 ${
                  !showTable ? 'md:grid' : ''
                }`}
              >
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              {/* Tablet+: table when toggled; desktop defaults to table */}
              <div className={`${showTable ? 'hidden md:block' : 'hidden'}`}>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm hidden md:block"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative flex flex-col w-full h-full md:h-auto md:max-h-[90vh] md:w-full md:max-w-lg md:m-auto md:mx-4 overflow-hidden md:rounded-2xl">
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
