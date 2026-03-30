// Safety & Side Effects data for each product
// Last updated: 2026-03-21 — comprehensive research review
const safetyData = {
  'retatrutide-5mg': {
    common: [
      'Nausea (most common, especially weeks 1-2)',
      'Decreased appetite',
      'Diarrhea',
      'Vomiting',
      'Constipation',
      'Mild headache',
      'Fatigue',
      'Injection site reactions — redness, itching, small nodules (5-15%)',
      'Increased resting heart rate (+5-10 bpm, peaks ~week 24 then tapers)'
    ],
    lessCommon: [
      'Dizziness',
      'Abdominal discomfort',
      'Heart rhythm changes (~6% in clinical trials vs 3% placebo)',
      'Liver enzyme increases (rare, ~1% — overall liver markers stay stable)',
      'Gallbladder issues (~1.1% in Phase 2 trials)'
    ],
    serious: [
      'Pancreatitis (~0.4% in trials — discontinue if severe abdominal pain)',
      'Severe nausea/vomiting leading to dehydration',
      'Allergic reactions',
      'Potential bone fracture risk with rapid weight loss (under study)'
    ],
    contraindications: [
      'Under 18',
      'Pregnancy/breastfeeding',
      'Active eating disorders',
      'Severe GI conditions',
      'Personal/family history of medullary thyroid carcinoma',
      'History of pancreatitis'
    ],
    safetyTips: [
      'Start low dose and titrate slowly — 6-16% discontinue due to GI side effects',
      'Stay hydrated, especially if experiencing vomiting/diarrhea',
      'Take with food if nausea occurs',
      'Rotate injection sites to prevent nodules',
      'GI side effects typically improve as the body adjusts',
      'Monitor heart rate regularly during first few months'
    ]
  },
  'ss31-elamipretide-10mg': {
    common: [
      'Injection site reactions — redness, itching, hives, irritation',
      'Transient headache',
      'Mild dizziness',
      'Temporary fatigue'
    ],
    lessCommon: [
      'Mild nausea/stomach discomfort (usually at higher doses)',
      'Changes in serum sodium levels at higher doses',
      'Injection site urticaria (hives)'
    ],
    serious: [
      'Allergic/hypersensitivity reactions (rare — none reported in clinical trials)'
    ],
    contraindications: [
      'Known hypersensitivity to peptide components',
      'Pregnancy/breastfeeding',
      'Severe kidney or liver impairment (insufficient data)'
    ],
    safetyTips: [
      'Generally well-tolerated — no serious adverse events in clinical studies',
      'Blood pressure and heart rate remain stable in trials',
      'Long-term safety beyond 4 weeks not yet fully established',
      'Monitor injection sites and rotate regularly',
      'Report persistent reactions to healthcare provider'
    ]
  },
  'nad-500mg': {
    common: [
      'Flushing/warmth sensation (blood vessel dilation — sign of improved circulation)',
      'Mild nausea (worse on empty stomach)',
      'Headache or pressure sensation',
      'Fatigue/lethargy during first few sessions',
      'Injection site pain, redness, swelling',
      'Brief burning sensation at injection site'
    ],
    lessCommon: [
      'Chest tightness',
      'Muscle cramping',
      'Brain fog (temporary)',
      'Sleep disturbance',
      'Dizziness/lightheadedness',
      'Heart palpitations or rapid heart rate (rare)',
      'Small nodules at injection site'
    ],
    serious: [
      'Severe allergic reaction (hives, facial swelling, difficulty breathing — very rare)',
      'Significant blood pressure changes',
      'Infection (cellulitis) at injection site from poor sterile technique',
      'Chest pain or persistent shortness of breath (seek immediate care)'
    ],
    contraindications: [
      'Pregnancy/breastfeeding',
      'Active cancer (NAD may fuel rapidly dividing cells — consult oncologist)',
      'Severe kidney or liver disease',
      'Cardiovascular conditions (consult doctor first)',
      'Bleeding disorders'
    ],
    safetyTips: [
      'Slow injection rate reduces flushing significantly',
      'Hydrate well before and after',
      'Start with lower doses to let body acclimate',
      'Don\'t inject on empty stomach — eat something first',
      'Rotate injection sites to prevent irritation',
      'Staying hydrated helps prevent headaches and nausea'
    ]
  },
  'glow70-bpc-ghk-tb': {
    common: [
      'Injection site reactions (redness, itching)',
      'Mild nausea',
      'Dizziness',
      'Headache',
      'Temporary skin sensitivity'
    ],
    lessCommon: [
      'Fatigue',
      'GI discomfort',
      'Temporary changes in blood pressure',
      'Breakouts (acne-prone individuals — from GHK-Cu component)',
      '"Copper uglies" — temporary skin worsening with overuse (anecdotal, from GHK-Cu)'
    ],
    serious: [
      'Allergic reactions to any of the three peptides (BPC-157, GHK-Cu, TB-500)',
      'Copper toxicity risk with improper/excessive dosing (rare)'
    ],
    contraindications: [
      'Pregnancy/breastfeeding',
      'Active cancer',
      'Under 18',
      'Wilson\'s disease or copper metabolism disorders (GHK-Cu component)',
      'Known allergy to copper or peptides'
    ],
    safetyTips: [
      'Contains 3 peptides (BPC-157 + GHK-Cu + TB-500) — start with lower dose to assess tolerance',
      'Rotate injection sites',
      'Avoid concurrent use with strong acids (AHAs/BHAs), high-strength Vitamin C, or retinoids',
      'Monitor for unusual skin reactions — especially if acne-prone',
      'Do not exceed recommended dose — more is not better with copper peptides'
    ]
  },
  'motsc-40mg': {
    common: [
      'Mild injection site irritation, redness, or swelling',
      'Temporary fatigue or energy fluctuations',
      'Headache or lightheadedness',
      'Mild GI symptoms — nausea, bloating, stomach discomfort'
    ],
    lessCommon: [
      'Muscle soreness',
      'Heart palpitations or increased heart rate',
      'Insomnia',
      'Fever',
      'Flushing or warmth',
      'Changes in appetite or unintentional weight loss'
    ],
    serious: [
      'Hypersensitivity/allergic reactions',
      '⚠️ Contradictory cancer research — some studies suggest potential prostate/breast cancer risk (avoid with active cancer diagnosis)'
    ],
    contraindications: [
      'Pregnancy/breastfeeding',
      'Under 18',
      'Active cancer diagnosis (unless specifically recommended by oncologist)',
      'Severe kidney or liver disease',
      'Risk of hypoglycemia'
    ],
    safetyTips: [
      'Exercise enhancement peptide — pair with regular physical activity for best results',
      'Stay hydrated',
      'Monitor energy levels and blood sugar',
      '⚠️ May interact with metformin and other AMPK-activating drugs — consult doctor if on diabetes medication',
      'May interact with insulin-sensitizing drugs (thiazolidinediones) and aspirin',
      'Start with low dose and gradually increase',
      'If diabetic, monitor blood sugar closely — dosages of other meds may need adjustment'
    ]
  },
  'bac-water-3ml-free': {
    common: [
      'Mild stinging at injection site (normal due to benzyl alcohol preservative)'
    ],
    lessCommon: [
      'Injection site irritation if reused excessively'
    ],
    serious: [
      'Contamination risk if improper technique used'
    ],
    contraindications: [
      'Allergy to benzyl alcohol',
      'Neonatal use'
    ],
    safetyTips: [
      'Use proper aseptic technique',
      'Do not use if solution is cloudy or has particles',
      'Store properly after opening',
      'Discard after 28 days once opened'
    ]
  },
  'bac-water-10ml': {
    common: [
      'Mild stinging at injection site (normal due to benzyl alcohol preservative)'
    ],
    lessCommon: [
      'Injection site irritation if reused excessively'
    ],
    serious: [
      'Contamination risk if improper technique used'
    ],
    contraindications: [
      'Allergy to benzyl alcohol',
      'Neonatal use'
    ],
    safetyTips: [
      'Use proper aseptic technique',
      'Do not use if solution is cloudy or has particles',
      'Store properly after opening',
      'Discard after 28 days once opened'
    ]
  },

  'retatrutide-10mg': {
    common: [
      'Nausea (most common, especially weeks 1-2)',
      'Decreased appetite',
      'Diarrhea',
      'Vomiting',
      'Constipation',
      'Mild headache',
      'Fatigue',
      'Injection site reactions — redness, itching, small nodules (5-15%)',
      'Increased resting heart rate (+5-10 bpm, peaks ~week 24 then tapers)'
    ],
    lessCommon: [
      'Dizziness',
      'Abdominal discomfort',
      'Heart rhythm changes (~6% in clinical trials vs 3% placebo)',
      'Liver enzyme increases (rare, ~1% — overall liver markers stay stable)',
      'Gallbladder issues (~1.1% in Phase 2 trials)'
    ],
    serious: [
      'Pancreatitis (~0.4% in trials — discontinue if severe abdominal pain)',
      'Severe nausea/vomiting leading to dehydration',
      'Allergic reactions',
      'Potential bone fracture risk with rapid weight loss (under study)'
    ],
    contraindications: [
      'Under 18',
      'Pregnancy/breastfeeding',
      'Active eating disorders',
      'Severe GI conditions',
      'Personal/family history of medullary thyroid carcinoma',
      'History of pancreatitis'
    ],
    safetyTips: [
      'Start low dose and titrate slowly — 6-16% discontinue due to GI side effects',
      'Stay hydrated, especially if experiencing vomiting/diarrhea',
      'Take with food if nausea occurs',
      'Rotate injection sites to prevent nodules',
      'GI side effects typically improve as the body adjusts',
      'Monitor heart rate regularly during first few months'
    ]
  },

  'retatrutide-20mg': {
    common: [
      'Nausea (most common, especially weeks 1-2)',
      'Decreased appetite',
      'Diarrhea',
      'Vomiting',
      'Constipation',
      'Mild headache',
      'Fatigue',
      'Injection site reactions — redness, itching, small nodules (5-15%)',
      'Increased resting heart rate (+5-10 bpm, peaks ~week 24 then tapers)'
    ],
    lessCommon: [
      'Dizziness',
      'Abdominal discomfort',
      'Heart rhythm changes (~6% in clinical trials vs 3% placebo)',
      'Liver enzyme increases (rare, ~1% — overall liver markers stay stable)',
      'Gallbladder issues (~1.1% in Phase 2 trials)'
    ],
    serious: [
      'Pancreatitis (~0.4% in trials — discontinue if severe abdominal pain)',
      'Severe nausea/vomiting leading to dehydration',
      'Allergic reactions',
      'Potential bone fracture risk with rapid weight loss (under study)'
    ],
    contraindications: [
      'Under 18',
      'Pregnancy/breastfeeding',
      'Active eating disorders',
      'Severe GI conditions',
      'Personal/family history of medullary thyroid carcinoma',
      'History of pancreatitis'
    ],
    safetyTips: [
      'Start low dose and titrate slowly — 6-16% discontinue due to GI side effects',
      'Stay hydrated, especially if experiencing vomiting/diarrhea',
      'Take with food if nausea occurs',
      'Rotate injection sites to prevent nodules',
      'GI side effects typically improve as the body adjusts',
      'Monitor heart rate regularly during first few months'
    ]
  },

  'glutathione-1200mg': {
    common: [
      'Mild injection site reactions — redness, swelling',
      'Temporary fatigue during initial detox phase',
      'Mild nausea (especially at higher doses)',
      'Temporary skin flushing',
      'Mild headache during first few sessions'
    ],
    lessCommon: [
      'Digestive discomfort',
      'Temporary skin lightening (reversible)',
      'Changes in stool consistency',
      'Mild dizziness',
      'Initial worsening of symptoms (detox reaction)'
    ],
    serious: [
      'Severe allergic reactions (very rare)',
      'Asthma exacerbation in sensitive individuals',
      'Significant skin reactions'
    ],
    contraindications: [
      'Pregnancy/breastfeeding',
      'Severe asthma (may trigger bronchospasm)',
      'Known hypersensitivity to glutathione',
      'Active chemotherapy (may interfere with treatment)'
    ],
    safetyTips: [
      'Generally very well tolerated with minimal side effects',
      'Start with lower doses if sensitive to detox reactions',
      'Stay well hydrated to support detoxification',
      'Monitor for any skin changes or reactions',
      'Rotate injection sites to prevent tissue irritation',
      'May enhance effects of other antioxidants'
    ]
  },

  'ghk-cu-100mg': {
    common: [
      'Injection site reactions — redness, mild irritation',
      'Temporary skin flushing',
      'Mild headache',
      'Initial skin sensitivity'
    ],
    lessCommon: [
      'Mild nausea',
      'Temporary metallic taste',
      'Skin discoloration at injection site',
      'Mild fatigue'
    ],
    serious: [
      'Allergic reactions to copper compounds (rare)',
      'Severe skin reactions'
    ],
    contraindications: [
      'Pregnancy/breastfeeding',
      'Wilson\'s disease or copper metabolism disorders',
      'Known copper sensitivity',
      'Active skin infections at injection site'
    ],
    safetyTips: [
      'Well tolerated with minimal systemic effects',
      'Monitor injection sites for irritation',
      'Avoid if you have copper metabolism issues',
      'Start with lower doses to assess tolerance',
      'Rotate injection sites regularly',
      'Report any unusual skin reactions promptly'
    ]
  }
}

export const getSafetyData = (productId) => {
  return safetyData[productId] || null
}
