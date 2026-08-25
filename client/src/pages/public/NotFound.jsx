import React from 'react';
import Container from '../../components/common/Container';
import Button from '../../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-black text-luxury-light text-center px-4">
      <Container>
        <span className="text-xs uppercase tracking-luxury text-luxury-accent block mb-4">
          404 Error
        </span>
        <h1 className="text-5xl sm:text-7xl font-serif mb-6 uppercase">
          SANCTUARY UNCHARTED
        </h1>
        <p className="text-luxury-muted text-sm sm:text-base max-w-md mx-auto mb-8 font-light">
          The horizon you seek does not exist or has been relocated within our private collection.
        </p>
        <Button to="/" variant="primary" size="lg">
          Return to Sanctuary Home
        </Button>
      </Container>
    </div>
  );
}
