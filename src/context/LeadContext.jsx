import React, { createContext, useContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { sampleLeads } from '../data/sampleLeads';

/**
 * @typedef {Object} Lead
 * @property {string} id - Unique identifier for the lead
 * @property {string} name - Full name of the lead
 * @property {string} company - Company the lead works for
 * @property {string} email - Contact email
 * @property {string} phone - Contact phone number
 * @property {'New'|'Contacted'|'Meeting Scheduled'|'Proposal Sent'|'Won'|'Lost'} status - Current status in pipeline
 * @property {'Website'|'Referral'|'LinkedIn'|'Cold Call'|'Email Campaign'|'Other'} source - Origin of the lead
 * @property {string} createdAt - ISO date string of creation
 */

const LeadContext = createContext(undefined);

/**
 * LeadProvider component that manages the global lead state and persists it to localStorage.
 * Uses the custom useLocalStorage hook under the hood.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export const LeadProvider = ({ children }) => {
  // Replaced standard useState + useEffect with our custom useLocalStorage hook
  // It automatically populates with sampleLeads on the very first visit
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * Adds a new lead to the state with auto-generated ID and createdAt timestamp.
   *
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData - Data for the new lead
   */
  const addLead = useCallback((leadData) => {
    const newLead = {
      ...leadData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString(),
      // Backward compatibility for components checking dateAdded
      dateAdded: new Date().toISOString(),
    };
    // setLeads automatically handles the localStorage sync!
    setLeads((prev) => [newLead, ...prev]);
  }, [setLeads]);

  /**
   * Updates an existing lead in the state.
   *
   * @param {string} id - ID of the lead to update
   * @param {Partial<Lead>} updatedData - Data to merge into the existing lead
   */
  const updateLead = useCallback((id, updatedData) => {
    setLeads((prev) => 
      prev.map((lead) => (lead.id === id ? { ...lead, ...updatedData } : lead))
    );
  }, [setLeads]);

  /**
   * Deletes a lead from the state by ID.
   *
   * @param {string} id - ID of the lead to delete
   */
  const deleteLead = useCallback((id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  }, [setLeads]);

  /**
   * Retrieves a specific lead by ID from the state.
   *
   * @param {string} id - ID of the lead
   * @returns {Lead|undefined} The found lead or undefined
   */
  const getLeadById = useCallback((id) => {
    return leads.find((lead) => lead.id === id);
  }, [leads]);

  // Provide state and functions to consumers
  const value = useMemo(() => ({
    leads,
    addLead,
    updateLead,
    deleteLead,
    getLeadById,
  }), [leads, addLead, updateLead, deleteLead, getLeadById]);

  return (
    <LeadContext.Provider value={value}>
      {children}
    </LeadContext.Provider>
  );
};

/**
 * Custom hook to consume the LeadContext.
 *
 * @returns {{ leads: Lead[], addLead: Function, updateLead: Function, deleteLead: Function, getLeadById: Function }}
 * @throws {Error} If used outside of a LeadProvider
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};

export { LeadContext };
