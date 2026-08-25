import { ScrollTrigger } from './gsapConfig';

export function killScrollTriggers() {
  if (typeof window !== 'undefined' && ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
