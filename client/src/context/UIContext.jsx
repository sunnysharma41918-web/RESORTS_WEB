import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: null,
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openLightbox = (images, index = 0) => {
    setLightboxState({
      isOpen: true,
      images,
      currentIndex: index,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const nextLightboxImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevLightboxImage = () => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const openModal = (title, content) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <UIContext.Provider
      value={{
        mobileMenuOpen,
        isMobileMenuOpen: mobileMenuOpen,
        setMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        lightboxState,
        openLightbox,
        closeLightbox,
        nextLightboxImage,
        prevLightboxImage,
        modalState,
        openModal,
        closeModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
