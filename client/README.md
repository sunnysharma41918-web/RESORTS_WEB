# AURA | Luxury Resort & Boutique Hotel Showcase

A production-grade, architectural digital showcase platform for luxury resorts and boutique hotels.

## 1. Technology Stack
* **Framework**: React 18 + Vite
* **Styling**: Tailwind CSS
* **Routing**: React Router (v6) with lazy-loaded route splitting
* **State & Services**: React Context (`AppContext`, `UIContext`), Axios API abstraction (`api.js`, service layer)
* **3D Showcase**: Three.js, React Three Fiber, React Three Drei (with interactive camera rig and responsive WebGL fallback)
* **Animations**: GSAP + ScrollTrigger centralized registration & lightweight transition utilities

---

## 2. Project Architecture & Folder Structure
```text
client/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── manifest.json
│   └── images/
│       ├── placeholders/
│       └── textures/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── routes.jsx
│   │   └── providers.jsx
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── resorts/
│   │   │   ├── hotels/
│   │   │   ├── rooms/
│   │   │   ├── experiences/
│   │   │   ├── gallery/
│   │   │   └── testimonials/
│   │   ├── icons/
│   │   ├── fonts/
│   │   ├── models/3d/
│   │   └── videos/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx, MagneticButton.jsx, Container.jsx, Section.jsx
│   │   │   ├── SectionHeading.jsx, AnimatedText.jsx, ImageReveal.jsx, LazyImage.jsx
│   │   │   ├── CustomCursor.jsx, Loader.jsx, Skeleton.jsx, Modal.jsx, Lightbox.jsx
│   │   │   ├── ScrollProgress.jsx, ErrorBoundary.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx, DesktopNavbar.jsx, MobileNavbar.jsx, MobileMenu.jsx
│   │   │   ├── Footer.jsx, PageTransition.jsx, ScrollToTop.jsx, Preloader.jsx
│   │   └── three/
│   │       ├── Scene.jsx, CanvasWrapper.jsx, CameraRig.jsx, Environment.jsx
│   │       ├── Lighting.jsx, FloatingObject.jsx, ResortModel.jsx, Particles.jsx
│   │       ├── DistortionPlane.jsx, WebGLFallback.jsx
│   ├── features/
│   │   ├── home/ (HomeHero, IntroSection, FeaturedResorts, FeaturedHotels, ThreeDExperience, ExperiencesSection, RoomsPreview, GalleryPreview, TestimonialsSection, LocationSection, ContactCTA)
│   │   ├── resorts/ (ResortCard, ResortGrid, ResortFilters, ResortHero, ResortOverview, ResortGallery, ResortRooms, ResortAmenities, ResortExperiences, ResortLocation, ResortContact)
│   │   ├── hotels/ (HotelCard, HotelGrid, HotelFilters, HotelHero, HotelOverview, HotelGallery, HotelRooms, HotelFacilities, HotelLocation, HotelContact)
│   │   ├── rooms/ (RoomCard, RoomGrid, RoomAmenities, RoomDetails)
│   │   ├── experiences/ (ExperienceCard, ExperienceGrid, ExperienceHero, ExperienceDetails)
│   │   ├── gallery/ (GalleryGrid, GalleryItem, GalleryFilter, GalleryLightbox, GalleryHero)
│   │   ├── testimonials/ (TestimonialCard, TestimonialSlider)
│   │   ├── contact/ (ContactHero, ContactInformation, ContactActions, LocationMap, ContactCTA)
│   │   └── about/ (AboutHero, AboutStory, AboutPhilosophy, AboutValues, AboutCTA)
│   ├── pages/
│   │   ├── public/ (Home, Resorts, ResortDetails, Hotels, HotelDetails, Experiences, Gallery, About, Contact, NotFound)
│   │   └── legal/ (PrivacyPolicy, Terms)
│   ├── services/
│   │   ├── api.js
│   │   ├── resortService.js, hotelService.js, roomService.js, galleryService.js
│   │   ├── experienceService.js, testimonialService.js, settingsService.js
│   ├── hooks/
│   │   ├── useScroll.js, useMediaQuery.js, useIsMobile.js, useReducedMotion.js
│   │   ├── useMousePosition.js, useLenis.js, usePageTransition.js
│   ├── animations/
│   │   ├── gsapConfig.js, fadeIn.js, reveal.js, textReveal.js, imageReveal.js
│   │   ├── parallax.js, horizontalScroll.js, magnetic.js, pageTransition.js, cleanup.js
│   ├── context/
│   │   ├── AppContext.jsx, UIContext.jsx
│   ├── data/
│   │   ├── navigation.js, contact.js, siteConfig.js
│   ├── utils/
│   │   ├── cn.js, slugify.js, formatters.js, validators.js, device.js, accessibility.js
│   ├── constants/
│   │   ├── routes.js, breakpoints.js, animationConstants.js, imageConstants.js
│   ├── styles/
│   │   ├── globals.css, typography.css, animations.css, utilities.css
│   ├── App.jsx
│   └── main.jsx
```

---

## 3. Installation & Run Instructions

```bash
cd client
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 4. How Backend APIs Will Be Connected Later

All UI components consume data exclusively through the service layer located in `src/services/` (e.g. `resortService.js`, `hotelService.js`, `roomService.js`, etc.) using Axios instance `src/services/api.js`.

When the Node.js/Express + MongoDB backend is launched:
1. Update `VITE_API_URL` in `.env` (e.g. `VITE_API_URL=https://api.yourdomain.com/api`).
2. The service methods (`getAllResorts`, `getResortBySlug`, etc.) will automatically hit live endpoints.
3. No UI components need restructuring or modifications.
