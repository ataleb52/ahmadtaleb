import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Solution } from './types';

interface EditSolutionModalProps {
  solution: Solution;
  onSave: (updated: Solution) => void;
  onCancel: () => void;
}

const detailComponentOptions = [
  { value: '', label: 'Generic (Default)' },
  { value: 'GenericDetailView', label: 'GenericDetailView' },
  { value: 'CustomerInsightsShowcase', label: 'CustomerInsightsShowcase' },
  { value: 'LegacySystemsShowcase', label: 'LegacySystemsShowcase' },
  { value: 'PortfolioSystemShowcase', label: 'PortfolioSystemShowcase' },
  // Add more as you create new detail components
];

const EditSolutionModal: React.FC<EditSolutionModalProps> = ({ solution, onSave, onCancel }) => {
  const [form, setForm] = useState<Solution>({ ...solution });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.form 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-gray-900 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col p-6 gap-3"
        onClick={e => e.stopPropagation()}
        onSubmit={e => { e.preventDefault(); onSave(form); }}
      >
        <h2 className="text-lg font-semibold mb-2">Edit Solution</h2>
        <label className="text-xs font-semibold">Title
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Description
          <textarea className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Impact
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.impact} onChange={e => setForm(f => ({ ...f, impact: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Status
          <select className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Solution['status'] }))}>
            <option value="blueprint">Blueprint</option>
            <option value="workbench">Workbench</option>
            <option value="showcase">Showcase</option>
          </select>
        </label>
        <label className="text-xs font-semibold">Progress
          <input type="number" min={0} max={100} className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.progress} onChange={e => setForm(f => ({ ...f, progress: Number(e.target.value) }))} />
        </label>
        <label className="text-xs font-semibold">Tags (comma separated)
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.tags.join(', ')} onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} />
        </label>
        <label className="text-xs font-semibold">Thumbnail URL
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.thumbnailUrl || ''} onChange={e => setForm(f => ({ ...f, thumbnailUrl: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Preview Description
          <input className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100" value={form.previewDescription || ''} onChange={e => setForm(f => ({ ...f, previewDescription: e.target.value }))} />
        </label>
        <label className="text-xs font-semibold">Detail View Layout
          <select
            className="w-full p-2 mt-1 mb-2 rounded bg-gray-800 border border-gray-700 text-gray-100"
            value={form.detailComponentId || ''}
            onChange={e => setForm(f => ({ ...f, detailComponentId: e.target.value || undefined }))}
          >
            {detailComponentOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 justify-end mt-2">
          <button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200">Cancel</button>
          <button type="submit" className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white">Save</button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default EditSolutionModal;
