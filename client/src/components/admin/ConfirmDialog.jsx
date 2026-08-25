import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';

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
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm text-luxury-muted leading-relaxed font-light">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-4 border-t border-luxury-border/60">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-luxury font-medium transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
