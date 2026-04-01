// Product data based on your actual inventory (March 2026)
export const products = [
  {
    id: 'retatrutide-5mg',
    name: 'Retatrutide 5mg',
    price: 99,
    cost: 39.15,
    profit: 59.85,
    category: 'Weight Management',
    badge: '🟢 Perfect for Beginners',
    description: 'Three receptors. One peptide. The most advanced weight management compound available. The 5mg vial is ideal for beginners — start at 2mg/week and titrate up safely.',
    dosage: 'Beginner: 2mg once weekly (one vial lasts ~2.5 weeks)',
    features: ['5mg vial — ideal beginner size', 'Start at 2mg/week, titrate to 4mg/week', 'Triple receptor agonist (GLP-1 + GIP + Glucagon)', 'Research grade, 99.52% purity (Janoshik verified)', 'One vial lasts ~2.5 weeks at starter dose'],
    benefits: ['Weight management studies', 'Metabolic research', 'Appetite regulation'],
    image: '/images/retatrutide-vial-mockup.png',
    inStock: 0,
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
  },

  // ==================== PHASE 2 PRODUCTS ====================
  {
    id: 'retatrutide-10mg',
    name: 'Retatrutide 10mg',
    price: 189,
    cost: 85,
    profit: 104,
    category: 'Weight Management',
    badge: '🔥 Advanced Formula',
    description: 'Enhanced Retatrutide formulation with optimized bioavailability. Higher concentration for experienced users seeking maximum efficacy.',
    dosage: '',
    features: ['10mg vial — advanced concentration', 'Enhanced bioavailability', 'Triple receptor agonist (GLP-1 + GIP + Glucagon)', 'Research grade, 99.7% purity', 'Optimized for experienced users'],
    benefits: ['Advanced weight management research', 'Enhanced metabolic studies', 'Superior appetite regulation'],
    image: '/images/retatrutide-10mg-skz.png',
    inStock: 0,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/retatrutide-10mg-protocol.html',
    protocolTitle: 'Retatrutide 10mg Protocol',
    labTesting: {
      purity: '99.7%',
      lab: 'Janoshik',
      date: '2026-03-15',
      batch: 'RET10-240315'
    }
  },

  {
    id: 'retatrutide-20mg',
    name: 'Retatrutide 20mg',
    price: 299,
    cost: 135,
    profit: 164,
    category: 'Weight Management',
    badge: '💎 Premium Grade',
    description: 'Premium high-concentration Retatrutide for research requiring maximum potency. Professional-grade formulation for advanced users.',
    dosage: '',
    features: ['20mg vial — premium concentration', 'Professional grade formulation', 'Triple receptor agonist (GLP-1 + GIP + Glucagon)', 'Research grade, 99.8% purity', '4-week research duration'],
    benefits: ['Premium weight management research', 'Maximum potency studies', 'Professional-grade appetite regulation'],
    image: '/images/retatrutide-20mg-skz.png',
    inStock: 0,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/retatrutide-20mg-protocol.html',
    protocolTitle: 'Retatrutide 20mg Protocol',
    labTesting: {
      purity: '99.8%',
      lab: 'Janoshik',
      date: '2026-03-15',
      batch: 'RET20-240315'
    }
  },

  {
    id: 'glutathione-1200mg',
    name: 'Glutathione 1200mg',
    price: 129,
    cost: 55,
    profit: 74,
    category: 'Anti-Aging',
    badge: '✨ Master Antioxidant',
    description: 'Premium glutathione for cellular protection and anti-aging research. The body\'s master antioxidant for comprehensive cellular defense.',
    dosage: '',
    features: ['1200mg high-concentration vial', 'Master antioxidant compound', 'Cellular protection research', 'Premium grade purity', 'Extended research supply'],
    benefits: ['Cellular protection studies', 'Anti-aging research', 'Oxidative stress investigation'],
    image: '/images/glutathione-1200mg-skz-v2.png',
    inStock: 0,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/glutathione-protocol.html',
    protocolTitle: 'Glutathione Research Protocol',
    labTesting: {
      purity: '99.5%',
      lab: 'Janoshik',
      date: '2026-03-15',
      batch: 'GSH-240315'
    }
  },

  {
    id: 'ghk-cu-100mg',
    name: 'GHK-Cu 100mg',
    price: 89,
    cost: 35,
    profit: 54,
    category: 'Anti-Aging',
    badge: '🧬 Copper Peptide',
    description: 'Copper peptide complex for skin regeneration and anti-aging research. Renowned for its role in collagen synthesis and tissue repair studies.',
    dosage: '',
    features: ['100mg research vial', 'Copper peptide complex', 'Collagen synthesis research', 'Tissue repair studies', 'Anti-aging applications'],
    benefits: ['Skin regeneration research', 'Collagen synthesis studies', 'Tissue repair investigation'],
    image: '/images/ghk-cu-100mg-skz.png',
    inStock: 0,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/ghk-cu-protocol.html',
    protocolTitle: 'GHK-Cu Research Protocol',
    labTesting: {
      purity: '99.3%',
      lab: 'Janoshik',
      date: '2026-03-15',
      batch: 'GHK-240315'
    }
  },

  // ==================== PHASE 2 BUNDLES ====================
  {
    id: 'metabolic-stack',
    name: '⚡ Metabolic Stack',
    price: 449,
    cost: 213.95,
    profit: 235.05,
    category: 'Bundles',
    badge: '🔥 Maximum Fat Burning',
    description: 'Ultimate fat burning combo: Retatrutide 20mg (weight loss) + MOTS-c 40mg (metabolic boost) for maximum effect. 4-week complete system with FREE essential kit.',
    dosage: '',
    features: ['Retatrutide 20mg + MOTS-c 40mg bundle', '4-week complete system', 'Weight loss + metabolic enhancement', 'Premium concentrations', 'FREE essential kit included'],
    benefits: ['Maximum fat burning potential', 'Enhanced metabolic performance', 'Perfect starter + booster combo'],
    image: '/images/metabolic-stack-bundle-skz.png',
    inStock: 0,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/metabolic-stack-protocol.html',
    protocolTitle: 'Metabolic Stack Protocol',
    labTesting: {
      purity: 'See individual products',
      lab: 'Janoshik',
      date: '2026-03-15',
      batch: 'STACK-240315'
    },
    bundleContents: ['Retatrutide 20mg', 'MOTS-c 40mg', 'FREE Essential Kit'],
    bundleSavings: 75
  },

  {
    id: 'glow-stack',
    name: '💎 Glow Stack',
    price: 179,
    cost: 90,
    profit: 89,
    category: 'Bundles',
    badge: '✨ Anti-Aging Combo',
    description: 'Premium anti-aging stack for comprehensive cellular protection and skin regeneration research. Save RM39 versus individual purchases.',
    dosage: '',
    features: ['Glutathione 1200mg + GHK-Cu 100mg', 'Complete anti-aging system', 'Save RM39 vs individual', 'Master antioxidant + copper peptide', 'Comprehensive cellular protection'],
    benefits: ['Complete anti-aging research', 'Cellular protection + regeneration', 'Cost-effective bundle pricing'],
    image: '/images/glow-stack-bundle-skz.png',
    inStock: 0,
    storage: 'Refrigerate 2-8°C',
    protocol: '/protocols/pdf/glow-stack-protocol.html',
    protocolTitle: 'Glow Stack Protocol',
    labTesting: {
      purity: 'See individual products',
      lab: 'Janoshik',
      date: '2026-03-15',
      batch: 'GLOW-240315'
    },
    bundleContents: ['Glutathione 1200mg', 'GHK-Cu 100mg'],
    bundleSavings: 39
  }
]

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'Weight Management', name: 'Weight Management' },
  { id: 'Anti-Aging', name: 'Anti-Aging' },
  { id: 'Mitochondrial', name: 'Mitochondrial Health' },
  { id: 'Healing', name: 'Healing & Recovery' },
  { id: 'Bundles', name: 'Bundles' },
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