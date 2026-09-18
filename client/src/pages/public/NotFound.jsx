import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/common/Container';
import { RoyalOrnamentDivider, IndianJaaliBorder } from '../../components/common/RoyalOrnamentDivider';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF6F0] dark:bg-[#14110E] text-[#2A1F17] dark:text-[#F3EEE0] text-center pt-36 pb-12 px-4 transition-colors duration-500 font-sans">
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#8F6B2E] dark:text-[#D4AF37] block">
            404 • UNCHARTED HORIZON
          </span>

          <h1 className="text-4xl sm:text-6xl font-serif uppercase tracking-tight">
            SANCTUARY NOT FOUND
          </h1>

          <RoyalOrnamentDivider color="#8F6B2E" />

          <p className="text-[#6E5D4F] dark:text-[#B8A89A] text-sm sm:text-base font-serif font-light max-w-md mx-auto leading-relaxed">
            The page or royal residence you seek has been relocated or is currently uncharted in our registry.
          </p>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-block px-8 py-3.5 rounded-full bg-[#8F6B2E] hover:bg-[#6E511E] text-white font-serif text-xs uppercase tracking-widest transition-all duration-300 shadow-md"
            >
              Return to Royal Home
            </Link>
          </div>
        </div>
      </Container>

      <div className="w-full mt-16">
        <IndianJaaliBorder />
      </div>
    </div>
  );
}
