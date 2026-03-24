import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  bgColor?: string;
  iconColor?: string;
}

export function AnalyticsCard({
  label,
  value,
  icon: Icon,
  trend,
  bgColor = 'from-purple-500 to-purple-600',
  iconColor = 'text-white',
}: AnalyticsCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-green-600 text-xs font-semibold mt-2">{trend}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bgColor} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
