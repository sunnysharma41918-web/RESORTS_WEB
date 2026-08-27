const User = require('../models/User');
const Accommodation = require('../models/Accommodation');
const Offer = require('../models/Offer');
const GalleryItem = require('../models/GalleryItem');
const Setting = require('../models/Setting');

const seedDefaultData = async () => {
  try {
    // 1. Ensure ONLY Super Admin ID CHHR0012 exists and delete old demo users
    await User.deleteMany({ email: { $ne: 'chhr0012' } });

    let chhrAdmin = await User.findOne({ email: 'chhr0012' });
    if (!chhrAdmin) {
      await User.create({
        name: 'Super Administrator',
        email: 'chhr0012',
        password: 'CHR456',
        role: 'superadmin',
      });
      console.log('\x1b[36m✔ Seeded Super Admin ID: CHHR0012 (Password: CHR456)\x1b[0m');
    } else {
      chhrAdmin.password = 'CHR456';
      await chhrAdmin.save();
    }

    // 2. Seed Accommodations
    const accCount = await Accommodation.countDocuments();
    if (accCount === 0) {
      await Accommodation.insertMany([
        {
          tier: '01',
          name: 'THE FOREST POOL VILLA',
          category: 'Cantilevered Over Emerald Cliffs',
          specs: ['Private Pool', '2–4 Guests', '1,990 SQ FT'],
          description:
            'Private infinity plunge pool cantilevered over emerald coastal cliffs, featuring floor-to-ceiling glass pavilions, private sundeck, and outdoor stone soaking tub.',
          image:
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=75',
          price: '₹45,000 / Night',
          featured: true,
          order: 1,
        },
        {
          tier: '02',
          name: 'THE MONOLITH GLASS CHALET',
          category: 'Alpine Pine Ridge Sanctuary',
          specs: ['Skyroof Stargazing', '4–6 Guests', '2,580 SQ FT'],
          description:
            'Heated timber floors, a panoramic glass sky-roof for celestial stargazing, and an outdoor cedarwood hot tub directly overlooking high-altitude pine peaks.',
          image:
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=75',
          price: '₹55,000 / Night',
          featured: true,
          order: 2,
        },
        {
          tier: '03',
          name: 'BOTANICAL SANCTUARY SUITE',
          category: 'Ancient Spice Garden Estate',
          specs: ['Zen Courtyard', '2 Guests', '1,500 SQ FT'],
          description:
            'Surrounded by ancient spice trees and a private zen water courtyard, hand-crafted with locally quarried slate, teak finishings, and open-air botanical garden bath.',
          image:
            'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=75',
          price: '₹35,000 / Night',
          featured: true,
          order: 3,
        },
      ]);
      console.log('\x1b[36m✔ Seeded Default Signature Suites\x1b[0m');
    }

    // 3. Seed Offers
    const offerCount = await Offer.countDocuments();
    if (offerCount === 0) {
      await Offer.insertMany([
        {
          title: 'Royal Destination Wedding Package',
          category: 'Weddings',
          description:
            'All-inclusive royal wedding curation across our private palace lawns and banquets. Includes bespoke floral decor, royal banquet feasts, and complimentary bridal suites.',
          inclusions: ['Exclusive Lawns', 'Master Chef Tasting', 'Bridal Suite Upgrade', 'Helicopter Arrival'],
          discount: '20% Royal Privilege',
          tag: 'FEATURED WEDDING',
          image:
            'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=75',
          location: 'Jaipur & Udaipur Palaces',
          validTill: 'December 2026',
          featured: true,
        },
        {
          title: 'Corporate Leadership Conclave Privilege',
          category: 'Corporate',
          description:
            'High-level executive board retreats featuring state-of-the-art amphitheaters, high-speed encrypted telepresence, private wine cellar networking, and bespoke outdoor team expeditions.',
          inclusions: ['Private Boardroom', 'Sommelier Dinner', 'High-Speed Starlink', 'Executive Chauffeur'],
          discount: '15% Group Tariff',
          tag: 'EXECUTIVE RETREAT',
          image:
            'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=75',
          location: 'Bengaluru & Mumbai Urban Towers',
          validTill: 'Quarterly Booking',
          featured: true,
        },
      ]);
      console.log('\x1b[36m✔ Seeded Default Offers & Packages\x1b[0m');
    }

    // 4. Seed Gallery
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) {
      await GalleryItem.insertMany([
        {
          title: 'High-Altitude Sunrise Ridge Horizon',
          category: 'ARCHITECTURE',
          specs: 'Elevation 1,850m • Morning Mist',
          aspect: 'aspect-[16/10]',
          gridSpan: 'lg:col-span-8',
          url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=90',
          featured: true,
        },
        {
          title: 'Cantilevered Slate Soaking Tub',
          category: 'VILLAS',
          specs: 'Forest Pool Villa • Private Cedar Deck',
          aspect: 'aspect-[3/4]',
          gridSpan: 'lg:col-span-4',
          url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=90',
          featured: true,
        },
        {
          title: 'Sommelier Subterranean Cellar',
          category: 'GASTRONOMY',
          specs: 'Biodynamic Vintages • Natural Rock Vault',
          aspect: 'aspect-[4/5]',
          gridSpan: 'lg:col-span-4',
          url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=90',
          featured: true,
        },
        {
          title: 'Geothermal Mineral Thermal Lagoon',
          category: 'WELLNESS',
          specs: 'Sound Therapy • 38°C Spring Water',
          aspect: 'aspect-[16/10]',
          gridSpan: 'lg:col-span-8',
          url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=90',
          featured: true,
        },
      ]);
      console.log('\x1b[36m✔ Seeded Default Gallery Vault\x1b[0m');
    }

    // 5. Seed Settings
    const setting = await Setting.findOne({ key: 'global_site_settings' });
    if (!setting) {
      await Setting.create({
        key: 'global_site_settings',
        siteConfig: {
          name: 'Country Holidays Hotels & Resorts',
          tagline: 'Sanctuaries of Distinction & Wonder',
          description:
            'An international collection of world-class architectural resorts, tranquil nature escapes, and boutique hotels.',
        },
        contactInfo: {
          phone: '+91 98765 43210',
          phoneRaw: '+919876543210',
          whatsapp: '+919876543210',
          whatsappMessage: 'Hello Country Holidays Concierge, I would like to enquire about your luxury stays.',
          email: 'info@countryholidaysresorts.com',
          enquiriesEmail: 'info@countryholidaysresorts.com',
          address: '111, Rajiv Gandhi Salai, OMR, Kottivakkam, Chennai, Tamil Nadu 600041',
          hours: '24/7 Global Luxury Concierge',
        },
      });
      console.log('\x1b[36m✔ Seeded Global Site Settings\x1b[0m');
    }
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
};

module.exports = { seedDefaultData };
