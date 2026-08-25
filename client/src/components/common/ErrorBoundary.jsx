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
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-luxury-dark text-luxury-light">
          <span className="text-xs uppercase tracking-luxury text-luxury-accent mb-4">Notice</span>
          <h2 className="text-3xl font-serif mb-4">Unable to display this sanctuary experience</h2>
          <p className="text-luxury-muted max-w-md mb-8 text-sm">
            We encountered a temporary interface state. Please refresh or navigate back to explore our other destinations.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
          >
            Reload Experience
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
