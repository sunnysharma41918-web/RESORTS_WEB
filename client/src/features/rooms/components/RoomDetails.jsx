import React from 'react';
import Button from '../../../components/common/Button';

export default function RoomDetails({ room }) {
  if (!room) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-2xl font-serif text-luxury-light">{room.name}</h4>
      <p className="text-sm text-luxury-muted leading-relaxed">{room.description}</p>
      <div className="pt-4">
        <Button to="/contact" variant="primary">
          Inquire About This Suite
        </Button>
      </div>
    </div>
  );
}
