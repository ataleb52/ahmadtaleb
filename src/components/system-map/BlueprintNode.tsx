import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';

export function BlueprintNode({ data }: NodeProps) {
  return (
    <div className={`p-3 rounded-sm bg-slate-800 border ${data.selected ? 'border-blue-400 shadow-[0_0_15px_rgba(2,132,199,0.5)]' : 'border-blue-600'} min-w-[180px] transition-all duration-300`}>
      <div className="bg-slate-900 p-2 rounded-sm">
        <div className="flex items-center gap-2 mb-1">
          {data.icon && <div className="text-blue-400">{data.icon}</div>}
          <div className="font-heading text-slate-50 font-medium">{data.label}</div>
        </div>
        {data.description && (
          <div className="text-xs text-slate-300">{data.description}</div>
        )}
      </div>
      {data.items && (
        <div className="mt-2 border-t border-slate-700 pt-2">
          <ul className="text-xs space-y-1">
            {data.items.map((item: string, i: number) => (
              <li key={i} className="text-slate-300 flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-blue-400"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Handle type="target" position={Position.Top} className="!bg-blue-400" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-400" />
    </div>
  );
}