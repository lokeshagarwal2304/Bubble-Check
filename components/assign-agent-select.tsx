'use client';

import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { AddAgentModal, type Agent } from './add-agent-modal';

interface AssignAgentSelectProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

export function AssignAgentSelect({ value, onChange, name = 'assignAgent' }: AssignAgentSelectProps) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch agents from API on mount
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch('/api/agents');
        if (res.ok) {
          const data = await res.json();
          setAgents(data);
        }
      } catch {
        // If agents table doesn't exist yet or DB not set up,
        // silently fall back to empty list
        setAgents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  // Called when a new agent is saved — adds to list and auto-selects
  const handleAgentAdded = (agent: Agent) => {
    setAgents((prev) => [...prev, agent].sort((a, b) => a.name.localeCompare(b.name)));
    onChange(agent.id);
  };

  return (
    <>
      <div className="flex gap-2 items-stretch">
        {/* Agent Select Dropdown */}
        <div className="relative flex-1">
          {loading && (
            <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none">
              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            </div>
          )}
          <select
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900
              focus:border-purple-500 focus:outline-none appearance-none pr-8"
            disabled={loading}
          >
            <option value="">Select team member</option>
            {agents.length > 0 ? (
              agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} — {agent.role}
                </option>
              ))
            ) : (
              !loading && (
                <option disabled value="">
                  No agents yet — click + to add one
                </option>
              )
            )}
          </select>
        </div>

        {/* Add Agent "+" Button */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          title="Add new agent"
          className="px-3.5 py-3 rounded-lg border border-purple-300 bg-purple-50
            hover:bg-purple-100 hover:border-purple-500 text-purple-600
            transition-all active:scale-95 flex items-center justify-center"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Add Agent Modal */}
      <AddAgentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAgentAdded={handleAgentAdded}
      />
    </>
  );
}
