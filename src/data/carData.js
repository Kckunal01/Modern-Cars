// Shared car data: brand → models → years, and dynamic pricing per identity+model

export const carBrands = {
  'Hyundai': {
    models: {
      'Creta': { years: ['2025', '2024', '2023', '2022', '2021', '2020'], tier: 'mid' },
      'Venue': { years: ['2025', '2024', '2023', '2022'], tier: 'compact' },
      'i20': { years: ['2025', '2024', '2023', '2022', '2021'], tier: 'compact' },
      'Verna': { years: ['2025', '2024', '2023'], tier: 'mid' },
      'Alcazar': { years: ['2025', '2024', '2023'], tier: 'premium' },
      'Tucson': { years: ['2025', '2024', '2023'], tier: 'premium' },
      'Exter': { years: ['2025', '2024', '2023'], tier: 'compact' },
    }
  },
  'Maruti Suzuki': {
    models: {
      'Brezza': { years: ['2025', '2024', '2023', '2022'], tier: 'mid' },
      'Baleno': { years: ['2025', '2024', '2023', '2022'], tier: 'compact' },
      'Swift': { years: ['2025', '2024', '2023', '2022', '2021'], tier: 'compact' },
      'Ertiga': { years: ['2025', '2024', '2023', '2022'], tier: 'mid' },
      'Grand Vitara': { years: ['2025', '2024', '2023'], tier: 'premium' },
      'Fronx': { years: ['2025', '2024', '2023'], tier: 'compact' },
      'Jimny': { years: ['2025', '2024', '2023'], tier: 'mid' },
      'Invicto': { years: ['2025', '2024', '2023'], tier: 'premium' },
    }
  },
  'Tata': {
    models: {
      'Nexon': { years: ['2025', '2024', '2023', '2022', '2021'], tier: 'mid' },
      'Punch': { years: ['2025', '2024', '2023', '2022'], tier: 'compact' },
      'Harrier': { years: ['2025', '2024', '2023'], tier: 'premium' },
      'Safari': { years: ['2025', '2024', '2023'], tier: 'premium' },
      'Altroz': { years: ['2025', '2024', '2023', '2022'], tier: 'compact' },
      'Tiago': { years: ['2025', '2024', '2023', '2022'], tier: 'compact' },
      'Curvv': { years: ['2025', '2024'], tier: 'mid' },
    }
  },
  'Kia': {
    models: {
      'Seltos': { years: ['2025', '2024', '2023', '2022', '2021'], tier: 'mid' },
      'Sonet': { years: ['2025', '2024', '2023', '2022'], tier: 'compact' },
      'Carens': { years: ['2025', '2024', '2023', '2022'], tier: 'mid' },
      'EV6': { years: ['2025', '2024', '2023'], tier: 'premium' },
      'Syros': { years: ['2025'], tier: 'mid' },
    }
  },
  'Mahindra': {
    models: {
      'Thar': { years: ['2025', '2024', '2023', '2022', '2021'], tier: 'mid' },
      'XUV700': { years: ['2025', '2024', '2023', '2022'], tier: 'premium' },
      'Scorpio N': { years: ['2025', '2024', '2023', '2022'], tier: 'mid' },
      'XUV3OO': { years: ['2025', '2024', '2023', '2022'], tier: 'compact' },
      'XUV400': { years: ['2025', '2024', '2023'], tier: 'mid' },
      'Bolero Neo': { years: ['2025', '2024', '2023'], tier: 'compact' },
      'BE 6': { years: ['2025'], tier: 'premium' },
    }
  },
  'Honda': {
    models: {
      'City': { years: ['2025', '2024', '2023', '2022', '2021'], tier: 'mid' },
      'Amaze': { years: ['2025', '2024', '2023', '2022'], tier: 'compact' },
      'Elevate': { years: ['2025', '2024', '2023'], tier: 'mid' },
    }
  },
  'Toyota': {
    models: {
      'Fortuner': { years: ['2025', '2024', '2023', '2022'], tier: 'premium' },
      'Innova Crysta': { years: ['2025', '2024', '2023', '2022'], tier: 'premium' },
      'Innova Hycross': { years: ['2025', '2024', '2023'], tier: 'premium' },
      'Glanza': { years: ['2025', '2024', '2023'], tier: 'compact' },
      'Urban Cruiser Hyryder': { years: ['2025', '2024', '2023'], tier: 'mid' },
    }
  },
  'MG': {
    models: {
      'Hector': { years: ['2025', '2024', '2023', '2022'], tier: 'premium' },
      'Astor': { years: ['2025', '2024', '2023', '2022'], tier: 'mid' },
      'ZS EV': { years: ['2025', '2024', '2023'], tier: 'mid' },
      'Gloster': { years: ['2024', '2023', '2022'], tier: 'premium' },
    }
  }
};

// Pricing tiers based on car size and identity
export const identityPricing = {
  stealth: { compact: 8999, mid: 11999, premium: 14999 },
  signature: { compact: 9499, mid: 12499, premium: 15499 },
  minimal: { compact: 8499, mid: 10999, premium: 13999 },
  vintage: { compact: 9999, mid: 12999, premium: 15999 },
};

// Get price for a specific identity + brand + model combo
export function getPrice(identityId, brand, model) {
  const brandData = carBrands[brand];
  if (!brandData) return identityPricing[identityId]?.mid || 11999;
  const modelData = brandData.models[model];
  if (!modelData) return identityPricing[identityId]?.mid || 11999;
  return identityPricing[identityId]?.[modelData.tier] || 11999;
}

// Get starting price for an identity (lowest tier)
export function getStartingPrice(identityId) {
  const pricing = identityPricing[identityId];
  if (!pricing) return 8499;
  return Math.min(pricing.compact, pricing.mid, pricing.premium);
}

// Get models for a brand
export function getModelsForBrand(brand) {
  const brandData = carBrands[brand];
  if (!brandData) return [];
  return Object.keys(brandData.models);
}

// Get years for a brand + model
export function getYearsForModel(brand, model) {
  const brandData = carBrands[brand];
  if (!brandData) return [];
  const modelData = brandData.models[model];
  if (!modelData) return [];
  return modelData.years;
}

// Available time slots (11am - 7pm)
export const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM'
];

// Get date N days from now
export function getMinDate(daysFromNow = 1) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}
