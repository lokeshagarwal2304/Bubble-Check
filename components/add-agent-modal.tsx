'use client';

import { useState, useEffect, useRef } from 'react';
import { X, UserPlus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export interface Agent {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgentAdded: (agent: Agent) => void;
}

const ROLES = ['Developer', 'Manager', 'Support'] as const;

export function AddAgentModal({ isOpen, onClose, onAgentAdded }: AddAgentModalProps) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Support' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);

  // Reset form & focus when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({ name: '', email: '', role: 'Support' });
      setErrors({});
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Map specific backend errors to field errors
        if (data.error?.toLowerCase().includes('email')) {
          setErrors({ email: data.error });
        } else {
          toast.error(data.error || 'Failed to add agent');
        }
        return;
      }

      toast.success(`✅ Agent "${data.name}" added successfully!`);
      onAgentAdded(data);
      onClose();
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal Panel */}
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)',
          border: '1px solid rgba(167, 139, 250, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/30 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Add New Agent</h2>
              <p className="text-xs text-purple-300">Team member will appear in assign dropdown</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-purple-300 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div 
          className="p-6 space-y-5"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-purple-200 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm((p) => ({ ...p, name: e.target.value }));
                if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
              }}
              placeholder="e.g. John Doe"
              className={`w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-purple-400/60 outline-none transition-all
                ${errors.name
                  ? 'border-2 border-red-400 bg-red-900/20'
                  : 'border border-purple-500/40 bg-white/10 focus:border-purple-400 focus:bg-white/15'
                }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-purple-200 mb-1.5">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm((p) => ({ ...p, email: e.target.value }));
                if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
              }}
              placeholder="e.g. john@company.com"
              className={`w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-purple-400/60 outline-none transition-all
                ${errors.email
                  ? 'border-2 border-red-400 bg-red-900/20'
                  : 'border border-purple-500/40 bg-white/10 focus:border-purple-400 focus:bg-white/15'
                }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-purple-200 mb-1.5">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg text-sm text-white outline-none transition-all
                border border-purple-500/40 bg-white/10 focus:border-purple-400 focus:bg-white/15
                [&>option]:bg-indigo-950 [&>option]:text-white"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-purple-300
                border border-purple-500/40 hover:bg-white/10 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm font-bold text-white
                bg-gradient-to-r from-purple-600 to-violet-600
                hover:from-purple-500 hover:to-violet-500
                active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Save Agent
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
