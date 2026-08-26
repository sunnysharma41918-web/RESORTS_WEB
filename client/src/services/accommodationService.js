import api from './api';

export const DEFAULT_ACCOMMODATIONS = [
  {
    id: 'acc-01',
    tier: '01',
    name: 'THE FOREST POOL VILLA',
    category: 'Cantilevered Over Emerald Cliffs',
    specs: ['Private Pool', '2–4 Guests', '1,990 SQ FT'],
    description:
      'Private infinity plunge pool cantilevered over emerald coastal cliffs, featuring floor-to-ceiling glass pavilions, private sundeck, and outdoor stone soaking tub.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=75',
    price: '₹45,000 / Night',
    featured: true,
  },
  {
    id: 'acc-02',
    tier: '02',
    name: 'THE MONOLITH GLASS CHALET',
    category: 'Alpine Pine Ridge Sanctuary',
    specs: ['Skyroof Stargazing', '4–6 Guests', '2,580 SQ FT'],
    description:
      'Heated timber floors, a panoramic glass sky-roof for celestial stargazing, and an outdoor cedarwood hot tub directly overlooking high-altitude pine peaks.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=75',
    price: '₹55,000 / Night',
    featured: true,
  },
  {
    id: 'acc-03',
    tier: '03',
    name: 'BOTANICAL SANCTUARY SUITE',
    category: 'Ancient Spice Garden Estate',
    specs: ['Zen Courtyard', '2 Guests', '1,500 SQ FT'],
    description:
      'Surrounded by ancient spice trees and a private zen water courtyard, hand-crafted with locally quarried slate, teak finishings, and open-air botanical garden bath.',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=75',
    price: '₹35,000 / Night',
    featured: true,
  },
];

const STORAGE_KEY = 'chhr_accommodations';

function getLocalData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ACCOMMODATIONS));
      return DEFAULT_ACCOMMODATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_ACCOMMODATIONS;
  }
}

function saveLocalData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save accommodations to localStorage:', err);
  }
}

export const accommodationService = {
  async getAllAccommodations() {
    try {
      const res = await api.get('/accommodations');
      return res.data || res;
    } catch {
      return getLocalData();
    }
  },

  async getAccommodationById(id) {
    try {
      const res = await api.get(`/accommodations/${id}`);
      return res.data || res;
    } catch {
      const list = getLocalData();
      return list.find((item) => String(item.id) === String(id)) || null;
    }
  },

  async createAccommodation(data) {
    try {
      const res = await api.post('/accommodations', data);
      return res.data || res;
    } catch {
      const list = getLocalData();
      const newTierNum = String(list.length + 1).padStart(2, '0');
      const newItem = {
        ...data,
        id: `acc-${Date.now()}`,
        tier: data.tier || newTierNum,
        specs: Array.isArray(data.specs)
          ? data.specs
          : (data.specs || '').split(',').map((s) => s.trim()).filter(Boolean),
        createdAt: new Date().toISOString(),
      };
      const updated = [...list, newItem];
      saveLocalData(updated);
      return newItem;
    }
  },

  async updateAccommodation(id, data) {
    try {
      const res = await api.put(`/accommodations/${id}`, data);
      return res.data || res;
    } catch {
      const list = getLocalData();
      const index = list.findIndex((item) => String(item.id) === String(id));
      if (index === -1) throw new Error('Accommodation not found');

      const updatedItem = {
        ...list[index],
        ...data,
        specs: Array.isArray(data.specs)
          ? data.specs
          : (data.specs || '').split(',').map((s) => s.trim()).filter(Boolean),
        updatedAt: new Date().toISOString(),
      };
      list[index] = updatedItem;
      saveLocalData(list);
      return updatedItem;
    }
  },

  async deleteAccommodation(id) {
    try {
      const res = await api.delete(`/accommodations/${id}`);
      return res.data || res;
    } catch {
      const list = getLocalData();
      const filtered = list.filter((item) => String(item.id) !== String(id));
      saveLocalData(filtered);
      return { success: true, id };
    }
  },
};
