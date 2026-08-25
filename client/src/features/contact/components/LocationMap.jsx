import React from 'react';
import { Navigation, MapPin } from 'lucide-react';
import Button from '../../../components/common/Button';
import { CONTACT_INFO } from '../../../data/contact';

export default function LocationMap() {
  return (
    <div className="bg-luxury-stone/30 border border-luxury-border p-8 md:p-12 flex flex-col justify-between space-y-8">
      <div className="space-y-4">
        <span className="text-xs uppercase tracking-luxury text-luxury-accent">
          Sanctuary Map
        </span>
        <h4 className="text-2xl font-serif text-luxury-light">
          FINDING YOUR SANCTUARY
        </h4>
        <p className="text-sm text-luxury-muted font-light leading-relaxed">
          Coordinates for our private estate entrance in Morjim, Goa. Our chauffeur team is available to meet all arriving guests at Goa International Airport (GOX / GOI).
        </p>
      </div>

      <div className="p-6 bg-luxury-black/60 border border-luxury-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-luxury-accent" />
          <span className="text-xs font-mono text-luxury-sand">
            15.6333° N, 73.7333° E
          </span>
        </div>

        <Button
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`}
          variant="outline"
          size="sm"
          icon={<Navigation className="w-3.5 h-3.5" />}
        >
          Open Google Maps
        </Button>
      </div>
    </div>
  );
}
