// "What to Expect" timeline data for each product
// Last updated: 2026-03-21 — based on clinical trials & research literature

const timelineData = {
  'retatrutide-5mg': {
    summary: 'Progressive weight management results over 24-48 weeks. GI side effects typically ease after the first few weeks as the body adjusts.',
    phases: [
      {
        period: 'Week 1-2',
        title: 'Initial Adaptation',
        icon: '🌱',
        color: 'blue',
        effects: [
          'Appetite suppression begins within 24-72 hours',
          'Feel satisfied with smaller portions',
          'Decreased cravings',
          'Mild nausea may occur (temporary)',
          'Slight increase in energy expenditure'
        ]
      },
      {
        period: 'Week 3-4',
        title: 'Early Results',
        icon: '📉',
        color: 'indigo',
        effects: [
          'Consistent appetite control',
          'Initial weight loss ~2-4% body weight',
          'Clothes start feeling looser',
          'Glucagon activation increases fat metabolism',
          'GI side effects begin to ease'
        ]
      },
      {
        period: 'Week 5-8',
        title: 'Visible Changes',
        icon: '💪',
        color: 'purple',
        effects: [
          'Visible body composition changes',
          'Average ~5-7% body weight loss',
          'Improved energy levels',
          'Blood sugar stabilization',
          'Waistline tightening'
        ]
      },
      {
        period: 'Week 9-12',
        title: 'Significant Progress',
        icon: '🔥',
        color: 'orange',
        effects: [
          'Weight loss noticeable to others',
          '5-10% total body weight reduction',
          'Hunger cues normalized',
          'Eating habits more controlled',
          'Metabolic improvements measurable'
        ]
      },
      {
        period: 'Week 13-24',
        title: 'Peak Results',
        icon: '⭐',
        color: 'yellow',
        effects: [
          'Major body transformation',
          'Average 15-20% body weight loss',
          'Significant health marker improvements',
          'Sustained, consistent loss',
          'Phase 2 trials: up to 24.2% at 48 weeks'
        ]
      }
    ],
    note: 'Results vary based on starting weight, dosage, diet, and exercise. Dose titration is gradual — full effects build over time.'
  },

  'ss31-elamipretide-10mg': {
    summary: 'SS-31 targets mitochondria directly for cellular energy improvement. Some effects are rapid, while structural changes take longer.',
    phases: [
      {
        period: 'Day 1-3',
        title: 'Cellular Activation',
        icon: '⚡',
        color: 'blue',
        effects: [
          'Mitochondrial membrane stabilization begins',
          'Cardiolipin interaction starts',
          'Reduction in oxidative stress at cellular level',
          'Some notice subtle energy shift'
        ]
      },
      {
        period: 'Week 1-2',
        title: 'Early Energy',
        icon: '🔋',
        color: 'indigo',
        effects: [
          'Improved fatigue resistance',
          'Enhanced ATP production begins',
          'Subtle improvement in exercise recovery',
          'Cellular repair mechanisms activated'
        ]
      },
      {
        period: 'Week 3-4',
        title: 'Building Momentum',
        icon: '📈',
        color: 'purple',
        effects: [
          'More consistent energy levels',
          'Improved endurance capacity',
          'Better exercise tolerance',
          'Mitochondrial function optimization'
        ]
      },
      {
        period: 'Week 5-8',
        title: 'Functional Improvement',
        icon: '💪',
        color: 'orange',
        effects: [
          'Significant increase in mitochondrial sensitivity',
          'Enhanced whole-body endurance',
          'Improved cardiovascular markers',
          'Sustained energy throughout the day'
        ]
      },
      {
        period: 'Month 3+',
        title: 'Long-Term Optimization',
        icon: '⭐',
        color: 'yellow',
        effects: [
          'Structural and functional cellular improvements',
          'Sustained mitochondrial health',
          'Long-term cardioprotective benefits',
          'Cumulative anti-aging effects at cellular level'
        ]
      }
    ],
    note: 'SS-31 acts on mitochondria upon administration. Cellular effects are rapid, but noticeable physical improvements build over weeks to months.'
  },

  'nad-500mg': {
    summary: 'NAD+ works at the cellular level to restore energy and repair. Some effects are felt immediately, while deeper benefits compound over weeks.',
    phases: [
      {
        period: 'Immediately',
        title: 'First Session',
        icon: '⚡',
        color: 'blue',
        effects: [
          'Energy boost and increased alertness',
          'Mild warmth/flushing (normal — improved circulation)',
          'Enhanced mental clarity',
          'Some may feel temporary fatigue as body processes NAD+'
        ]
      },
      {
        period: 'Day 1-2',
        title: 'Initial Response',
        icon: '🧠',
        color: 'indigo',
        effects: [
          'Improved focus and mental clarity',
          'Enhanced physical and mental energy',
          'Better sleep quality',
          'Effects typically last 3-5 days per session'
        ]
      },
      {
        period: 'Week 1-2',
        title: 'Building Baseline',
        icon: '📈',
        color: 'purple',
        effects: [
          'Continued energy and mood improvements',
          'Better cognitive function',
          'Body adapting to elevated NAD+ levels',
          'Recommended: 1-2 injections per week'
        ]
      },
      {
        period: 'Week 3-4',
        title: 'Noticeable Benefits',
        icon: '✨',
        color: 'orange',
        effects: [
          'More pronounced mood and vitality improvements',
          'Reduced inflammation',
          'Improved overall well-being',
          'NAD+ levels stabilizing'
        ]
      },
      {
        period: 'Month 2-3+',
        title: 'Deep Cellular Repair',
        icon: '🔬',
        color: 'yellow',
        effects: [
          'Increased stress resilience',
          'Sustained skin health improvements',
          'Metabolic support for energy and weight management',
          'Shift to maintenance schedule (monthly/bi-monthly)',
          'Cumulative anti-aging benefits'
        ]
      }
    ],
    note: 'Individual responses vary based on age, health, and initial NAD+ depletion. Consistency is key — an initial loading phase of weekly injections maximizes results.'
  },

  'glow70-bpc-ghk-tb': {
    summary: 'Triple peptide blend (BPC-157 + GHK-Cu + TB-500) working synergistically for comprehensive healing, tissue repair, and skin rejuvenation.',
    phases: [
      {
        period: 'Week 1-2',
        title: 'Inflammation Reduction',
        icon: '🛡️',
        color: 'blue',
        effects: [
          'Reduced pain and inflammation',
          'Decreased soreness and stiffness',
          'Better digestion (BPC-157)',
          'Initial skin hydration improvement (GHK-Cu)',
          'Immune cell activation (TB-500)'
        ]
      },
      {
        period: 'Week 2-4',
        title: 'Active Repair',
        icon: '🔧',
        color: 'indigo',
        effects: [
          'Improved mobility and flexibility',
          'Decreased joint and tendon discomfort',
          'Improved range of motion',
          'Skin texture starting to improve',
          'Accelerated wound/injury healing',
          'Gut issues showing improvement (BPC-157)'
        ]
      },
      {
        period: 'Week 4-8',
        title: 'Peak Healing',
        icon: '💪',
        color: 'purple',
        effects: [
          'Significant tissue regeneration',
          'Noticeable collagen synthesis (GHK-Cu)',
          'Functional recovery from injuries',
          'Vascular repair and new blood vessel formation',
          'Visible skin glow and firmness',
          'Tissue remodeling and strengthening'
        ]
      },
      {
        period: 'Week 8-12',
        title: 'Full Regeneration',
        icon: '⭐',
        color: 'orange',
        effects: [
          'Reduced fine lines and wrinkles',
          'Improved skin firmness and collagen density',
          'Structural robustness restored',
          'Most soft-tissue injuries fully recovered',
          'Enhanced overall skin radiance'
        ]
      },
      {
        period: 'Month 3+',
        title: 'Long-Term Benefits',
        icon: '🌟',
        color: 'yellow',
        effects: [
          'Hair growth improvements may appear (GHK-Cu)',
          'Sustained anti-inflammatory protection',
          'Continued skin rejuvenation',
          'Long-term tissue health maintenance'
        ]
      }
    ],
    note: 'This is a synergistic blend — the three peptides work together for faster, more comprehensive results than any single peptide alone. Often called the "Wolverine stack" for its healing properties.'
  },

  'motsc-40mg': {
    summary: 'MOTS-c is a mitochondrial peptide that enhances metabolism and exercise performance. Effects build gradually over weeks to months.',
    phases: [
      {
        period: 'Week 1-2',
        title: 'Cellular Integration',
        icon: '🧬',
        color: 'blue',
        effects: [
          'MOTS-c integrates into cellular machinery',
          'AMPK pathway activation begins',
          'Subtle increase in baseline energy',
          'Slight improvement in workout recovery'
        ]
      },
      {
        period: 'Week 3-4',
        title: 'Early Metabolic Shifts',
        icon: '🔥',
        color: 'indigo',
        effects: [
          'Energy levels becoming more noticeable',
          'Early shifts in glucose uptake',
          'Beginning of insulin sensitivity improvement',
          'Minor endurance enhancements'
        ]
      },
      {
        period: 'Week 5-8',
        title: 'Performance Gains',
        icon: '🏃',
        color: 'purple',
        effects: [
          'Enhanced endurance and exercise capacity',
          'More efficient fat utilization',
          'Better insulin sensitivity measurable',
          'Consistent energy — fewer post-meal crashes',
          'Improved fasting glucose levels'
        ]
      },
      {
        period: 'Week 9-12',
        title: 'Body Composition',
        icon: '💪',
        color: 'orange',
        effects: [
          'Noticeable body composition changes',
          'Reduction in fat mass while preserving lean muscle',
          'Significant metabolic marker improvements',
          'Peak exercise performance benefits'
        ]
      },
      {
        period: 'Month 3+',
        title: 'Metabolic Optimization',
        icon: '⭐',
        color: 'yellow',
        effects: [
          'Metabolic system operating at peak efficiency',
          'Sustained metabolic health and vitality',
          'Long-term metabolic resilience',
          'Supports healthy aging ("healthspan")',
          'Maintained lean body composition'
        ]
      }
    ],
    note: 'Best results when paired with regular physical activity. MOTS-c enhances your body\'s response to exercise — it\'s not a replacement for it. Consistent use for 3+ months recommended.'
  },

  'retatrutide-10mg': {
    summary: 'Progressive weight management results over 24-48 weeks. GI side effects typically ease after the first few weeks as the body adjusts.',
    phases: [
      {
        period: 'Week 1-2',
        title: 'Initial Adaptation',
        icon: '🌱',
        color: 'blue',
        effects: [
          'Appetite suppression begins within 24-72 hours',
          'Feel satisfied with smaller portions',
          'Decreased cravings',
          'Mild nausea may occur (temporary)',
          'Slight increase in energy expenditure'
        ]
      },
      {
        period: 'Week 3-4',
        title: 'Early Results',
        icon: '📉',
        color: 'indigo',
        effects: [
          'Consistent appetite control',
          'Initial weight loss ~2-4% body weight',
          'Clothes start feeling looser',
          'Glucagon activation increases fat metabolism',
          'Side effects typically diminish'
        ]
      },
      {
        period: 'Week 5-12',
        title: 'Steady Progress',
        icon: '⚖️',
        color: 'purple',
        effects: [
          'Sustained weight loss of 1-2 lbs per week',
          'Total loss ~5-10% body weight',
          'Improved energy and mood',
          'Better sleep quality',
          'Reduced inflammation markers'
        ]
      },
      {
        period: 'Week 13-24',
        title: 'Peak Benefits',
        icon: '🎯',
        color: 'pink',
        effects: [
          'Weight loss plateau or gradual continued loss',
          'Total loss ~8-15% body weight',
          'Significantly improved metabolic markers',
          'Enhanced insulin sensitivity',
          'Stable appetite control'
        ]
      },
      {
        period: 'Week 25+',
        title: 'Long-term Maintenance',
        icon: '🏆',
        color: 'rose',
        effects: [
          'Weight maintenance becomes easier',
          'Total loss ~10-20% body weight',
          'Improved cardiovascular health',
          'Better relationship with food',
          'Consider maintenance dosing strategy'
        ]
      }
    ],
    note: 'Individual results vary. Best results achieved with lifestyle modifications including balanced nutrition and regular physical activity.'
  },

  'retatrutide-20mg': {
    summary: 'Progressive weight management results over 24-48 weeks. GI side effects typically ease after the first few weeks as the body adjusts.',
    phases: [
      {
        period: 'Week 1-2',
        title: 'Initial Adaptation',
        icon: '🌱',
        color: 'blue',
        effects: [
          'Appetite suppression begins within 24-72 hours',
          'Feel satisfied with smaller portions',
          'Decreased cravings',
          'Mild nausea may occur (temporary)',
          'Slight increase in energy expenditure'
        ]
      },
      {
        period: 'Week 3-4',
        title: 'Early Results',
        icon: '📉',
        color: 'indigo',
        effects: [
          'Consistent appetite control',
          'Initial weight loss ~2-4% body weight',
          'Clothes start feeling looser',
          'Glucagon activation increases fat metabolism',
          'Side effects typically diminish'
        ]
      },
      {
        period: 'Week 5-12',
        title: 'Steady Progress',
        icon: '⚖️',
        color: 'purple',
        effects: [
          'Sustained weight loss of 1-2 lbs per week',
          'Total loss ~5-10% body weight',
          'Improved energy and mood',
          'Better sleep quality',
          'Reduced inflammation markers'
        ]
      },
      {
        period: 'Week 13-24',
        title: 'Peak Benefits',
        icon: '🎯',
        color: 'pink',
        effects: [
          'Weight loss plateau or gradual continued loss',
          'Total loss ~8-15% body weight',
          'Significantly improved metabolic markers',
          'Enhanced insulin sensitivity',
          'Stable appetite control'
        ]
      },
      {
        period: 'Week 25+',
        title: 'Long-term Maintenance',
        icon: '🏆',
        color: 'rose',
        effects: [
          'Weight maintenance becomes easier',
          'Total loss ~10-20% body weight',
          'Improved cardiovascular health',
          'Better relationship with food',
          'Consider maintenance dosing strategy'
        ]
      }
    ],
    note: 'Individual results vary. Best results achieved with lifestyle modifications including balanced nutrition and regular physical activity.'
  }
}

export const getTimelineData = (productId) => {
  return timelineData[productId] || null
}
