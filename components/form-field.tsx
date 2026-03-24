'use client';

import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  description?: string;
  htmlFor?: string;
}

export function FormField({
  label,
  error,
  required = false,
  children,
  description,
  htmlFor,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Label htmlFor={htmlFor} className="form-label">
          {label}
        </Label>
        {required && <span className="text-red-500">*</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs font-medium text-red-600">{error}</p>
      )}
      {description && !error && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
}

interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <div className="space-y-4">
      {title && (
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function Form({ children, onSubmit, className = '' }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
}
