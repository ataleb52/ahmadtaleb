import { ComponentType } from 'react';
import { PenTool, Wrench, CheckCircle, Clock } from 'lucide-react';

export interface StatusStyle {
  icon: ComponentType<{ size?: number }>;
  color: string;
  bgColor: string;
  borderColor: string;
  progressColor: string;
}

export const statusConfig: Record<string, StatusStyle> = {
  blueprint: { icon: PenTool, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30', progressColor: 'bg-blue-500' },
  workbench: { icon: Wrench, color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30', progressColor: 'bg-amber-500' },
  showcase: { icon: CheckCircle, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30', progressColor: 'bg-emerald-500' },
  draft: { icon: PenTool, color: 'text-gray-400', bgColor: 'bg-gray-500/10', borderColor: 'border-gray-500/30', progressColor: 'bg-gray-500' },
  published: { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-500/30', progressColor: 'bg-green-500' },
  archived: { icon: Clock, color: 'text-slate-400', bgColor: 'bg-slate-500/10', borderColor: 'border-slate-500/30', progressColor: 'bg-slate-500' },
};
