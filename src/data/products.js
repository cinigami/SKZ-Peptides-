// Product data based on your actual inventory (March 2026)
export const products = [
  {
    id: 'retatrutide-5mg',
    name: 'Retatrutide 5mg',
    price: 99,
    cost: 39.15,
    profit: 59.85,
    category: 'Weight Management',
    description: 'Three receptors. One peptide. The most advanced weight management compound available.',
    features: ['5mg vial', 'Research grade', 'Triple receptor agonist', 'Lyophilized'],
    benefits: ['Weight management studies', 'Metabolic research', 'Appetite regulation'],
    image: '/images/retatrutide-vial-mockup.png',
    inStock: 8,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/retatrutide-protocol.html',
    protocolTitle: 'Retatrutide Research Protocol',
    labTesting: {
      tested: true,
      lab: 'Janoshik Analytical',
      purity: '99.52%',
      testDate: 'June 2025',
      result: 'PASS — Exceeds labeled content'
    }
  },
  {
    id: 'ss31-elamipretide-10mg',
    name: 'SS-31 (Elamipretide) 10mg',
    price: 89,
    cost: 34.88,
    profit: 54.12,
    category: 'Mitochondrial',
    description: 'Goes straight to the mitochondria — supports cellular energy, reduces oxidative stress, and protects cell function.',
    features: ['10mg vial', 'Mitochondrial targeting', 'Research grade', 'High purity'],
    benefits: ['Mitochondrial function', 'Cellular energy research', 'Cardioprotection studies'],
    image: '/images/ss31-vial-mockup.png',
    inStock: 20,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/ss31-protocol.html',
    protocolTitle: 'SS-31 Research Protocol',
    labTesting: {
      tested: true,
      lab: 'Janoshik Analytical',
      purity: '99.22%',
      testDate: 'May 2025',
      result: 'PASS — Exceeds labeled content'
    }
  },
  {
    id: 'nad-500mg',
    name: 'NAD+ 500mg',
    price: 105,
    cost: 41.15,
    profit: 63.85,
    category: 'Anti-Aging',
    description: 'Your cells run on NAD+. Replenish what aging takes away — energy, repair, resilience.',
    features: ['500mg vial', 'High concentration', 'Research grade', 'Stable formula'],
    benefits: ['Cellular repair studies', 'Anti-aging research', 'Energy metabolism'],
    image: '/images/nad-vial-mockup.png',
    inStock: 9,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/nad-protocol.html',
    protocolTitle: 'NAD+ Research Protocol',
    labTesting: {
      tested: true,
      lab: 'Janoshik Analytical',
      purity: '91.6%',
      testDate: 'May 2025',
      result: 'PASS — 458mg of 500mg labeled content'
    }
  },
  {
    id: 'glow70-bpc-ghk-tb',
    name: 'GLOW 70 (BPC10+GHK50+TB10)',
    price: 199,
    cost: 70.65,
    profit: 128.35,
    category: 'Healing',
    description: 'Our signature healing stack — repair, recover, and rejuvenate without juggling multiple vials.',
    features: ['70mg total blend', 'Triple peptide formula', 'Research grade', 'Synergistic effects'],
    benefits: ['Comprehensive healing', 'Tissue regeneration', 'Anti-inflammatory'],
    image: '/images/glow70-vial-mockup.png',
    inStock: 10,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/glow70-protocol.html',
    protocolTitle: 'GLOW 70 Research Protocol',
  },
  {
    id: 'motsc-40mg',
    name: 'MOTS-c 40mg',
    price: 225,
    cost: 78.95,
    profit: 146.05,
    category: 'Mitochondrial',
    description: 'Metabolic powerhouse — supports energy, endurance & cellular performance.',
    features: ['40mg vial', 'Mitochondrial peptide', 'Research grade', 'High potency'],
    benefits: ['Metabolic enhancement', 'Exercise performance', 'Longevity research'],
    image: '/images/motsc-vial-proper-margins.png',
    inStock: 10,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/mots-c-protocol.html',
    protocolTitle: 'MOTS-c Research Protocol',
    labTesting: {
      tested: true,
      lab: 'Janoshik Analytical',
      purity: '99.28–99.71%',
      testDate: 'November 2025',
      result: 'PASS — Exceeds labeled content'
    }
  },
  {
    id: 'bac-water-3ml-free',
    name: 'BAC Water 3mL',
    price: 5,
    cost: 0,
    profit: 5,
    category: 'Supplies',
    description: 'Bacteriostatic water for peptide reconstitution - 3mL vial.',
    features: ['3mL sterile vial', '0.9% benzyl alcohol', 'Single-use recommended', 'Research grade'],
    benefits: ['Safe reconstitution', 'Single peptide use', 'Sterile solution'],
    image: '/images/bacwater-3ml-vial-mockup.png',
    inStock: 15,
    dosage: 'As needed for mixing',
    storage: 'Room temperature',
  },
  {
    id: 'bac-water-10ml',
    name: 'BAC Water 10mL',
    price: 15,
    cost: 8.40,
    profit: 6.60,
    category: 'Supplies',
    description: 'Bacteriostatic water for peptide reconstitution - 10mL vial.',
    features: ['10mL sterile vial', '0.9% benzyl alcohol', 'Multi-use', 'Pharmaceutical grade'],
    benefits: ['Safe reconstitution', 'Extended shelf life', 'Sterile mixing'],
    image: '/images/bacwater-10ml-vial-mockup.png',
    inStock: 10,
    dosage: 'As needed for mixing',
    storage: 'Room temperature',
  }
]

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'Weight Management', name: 'Weight Management' },
  { id: 'Mitochondrial', name: 'Mitochondrial Health' },
  { id: 'Anti-Aging', name: 'Anti-Aging' },
  { id: 'Healing', name: 'Healing & Recovery' },
  { id: 'Supplies', name: 'Supplies' }
]

// Inventory summary for admin
export const inventorySummary = {
  totalProducts: products.length,
  totalValue: products.reduce((sum, p) => sum + (p.price * p.inStock), 0),
  totalInvestment: products.reduce((sum, p) => sum + (p.cost * p.inStock), 0),
  totalProfit: products.reduce((sum, p) => sum + (p.profit * p.inStock), 0),
  roiPercent: 61.48, // From your Excel calculation
}