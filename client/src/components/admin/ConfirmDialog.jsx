import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import Modal from '../common/Modal';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this record? This action cannot be undone.',
  confirmText = 'Delete Permanently',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6 text-white font-manrope">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-950/60 border border-[#FF1F02]/40 text-[#FF1F02] shrink-0 shadow-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm text-[#D0D0D0] leading-relaxed font-light">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-5 border-t border-[#333333]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1C1C1C] hover:bg-[#2A2A2A] border border-[#333333] text-xs font-mono uppercase tracking-wider text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center space-x-2 px-5 py-2.5 bg-[#FF1F02] hover:bg-red-700 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-lg hover:scale-102 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
