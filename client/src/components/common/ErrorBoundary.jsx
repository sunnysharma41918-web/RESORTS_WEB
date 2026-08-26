import React, { Component } from 'react';
import Button from './Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center dark:bg-[#1C1C1C] bg-[#FAFDF2] dark:text-white text-[#0E0E0E] transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-[#FF1F02]/10 border border-[#FF1F02] flex items-center justify-center text-[#FF1F02] mb-6 shadow-lg">
            <span className="text-2xl font-bold">!</span>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#FF1F02] font-bold mb-3">
            ● SYSTEM NOTICE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-4">
            Unable to Display This Experience
          </h2>
          <p className="dark:text-[#D0D0D0] text-[#0E0E0E]/75 max-w-md mb-8 text-sm font-light leading-relaxed">
            {this.state.error?.message || 'We encountered a temporary interface state. Please refresh or navigate back to explore our other destinations.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/celebrations';
              }}
              className="px-8 py-3.5 bg-[#FF1F02] hover:bg-white hover:text-black text-white font-bold text-xs uppercase tracking-[0.16em] transition-all shadow-xl cursor-pointer"
            >
              Reload Celebrations
            </button>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="px-8 py-3.5 border dark:border-[#333333] border-[#E9E9DE] hover:border-[#FF1F02] dark:text-white text-[#0E0E0E] font-bold text-xs uppercase tracking-[0.16em] transition-colors cursor-pointer"
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
