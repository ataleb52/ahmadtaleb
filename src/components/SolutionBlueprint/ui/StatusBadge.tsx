import React from 'react';
import { cn } from '@/lib/utils';
import { Problem } from '@/types/problem';
import { Lightbulb, Wrench, CheckCircle } from 'lucide-react';

type StatusBadgeProps = {
  status: Problem['status'];
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusInfo = {
    idea: {
      icon: <Lightbulb size={12} />,
      label: "Idea",
      color: "text-amber-500 bg-amber-500/10"
    },
    building: {
      icon: <Wrench size={12} />,
      label: "Building",
      color: "text-blueprint bg-blueprint/10"
    },
    solved: {
      icon: <CheckCircle size={12} />,
      label: "Solved",
      color: "text-emerald-500 bg-emerald-500/10"
    }
  };
  
  const info = statusInfo[status];
  
  return (
    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] ${info.color}`}>
      {info.icon}
      <span>{info.label}</span>
    </div>
  );
}
