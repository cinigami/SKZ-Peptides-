import React from 'react'
import { Zap, Heart, Brain, TrendingUp, Shield, Activity } from 'lucide-react'

const ProductBenefits = ({ product }) => {
  const getBenefitsContent = (productId) => {
    switch (productId) {
      case 'retatrutide-5mg':
        return {
          title: 'Retatrutide Research Benefits',
          subtitle: 'Triple Agonist Peptide for Advanced Metabolic Research',
          primaryBenefits: [
            {
              icon: TrendingUp,
              title: 'Weight Management Research',
              description: 'Studies show 15-25% body weight reduction over 12 weeks with significant appetite suppression (70-85% reduction in hunger ratings).',
              metrics: ['15-25% weight reduction', '70-85% appetite suppression', 'Sustained effects throughout cycle']
            },
            {
              icon: Heart,
              title: 'Glucose Homeostasis',
              description: 'Enhanced insulin sensitivity with 15-30% improvement in glucose levels and 1.0-2.0% HbA1c reduction.',
              metrics: ['15-30% glucose improvement', '40-60% insulin sensitivity boost', '50-70% reduced glucose spikes']
            },
            {
              icon: Activity,
              title: 'Cardiovascular Health',
              description: 'Comprehensive cardiovascular improvements including lipid profile optimization and blood pressure benefits.',
              metrics: ['20-35% LDL reduction', '30-50% triglyceride improvement', '5-15 mmHg BP reduction']
            }
          ],
          mechanism: {
            title: 'Triple Receptor Mechanism',
            description: 'Targets GLP-1 (40%), GIP (30%), and glucagon receptors (25%) simultaneously for comprehensive metabolic effects.',
            pathways: [
              'Incretin system activation for glucose regulation',
              'Neural appetite signaling modulation',
              'Metabolic rate enhancement and thermogenesis',
              'Enhanced fat oxidation and energy expenditure'
            ]
          },
          timeline: [
            { phase: 'Week 1-2', effects: 'Initial appetite reduction, early weight loss, improved postprandial glucose' },
            { phase: 'Week 3-6', effects: 'Steady weight reduction (1-2 lbs/week), enhanced sleep quality, stable energy' },
            { phase: 'Week 7-12', effects: 'Continued loss with metabolic adaptation, optimized cardiovascular markers' },
            { phase: 'Week 12+', effects: 'Maintenance phase with stable appetite control and sustained benefits' }
          ]
        }

      case 'retatrutide-10mg':
        return {
          title: 'Retatrutide 10mg Research Benefits',
          subtitle: 'Triple Agonist Peptide for Advanced Metabolic Research',
          primaryBenefits: [
            {
              icon: TrendingUp,
              title: 'Weight Management Research',
              description: 'Studies show 15-25% body weight reduction over 12 weeks with significant appetite suppression (70-85% reduction in hunger ratings).',
              metrics: ['15-25% weight reduction', '70-85% appetite suppression', 'Sustained effects throughout cycle']
            },
            {
              icon: Heart,
              title: 'Glucose Homeostasis',
              description: 'Enhanced insulin sensitivity with 15-30% improvement in glucose levels and 1.0-2.0% HbA1c reduction.',
              metrics: ['15-30% glucose improvement', '40-60% insulin sensitivity boost', '50-70% reduced glucose spikes']
            },
            {
              icon: Activity,
              title: 'Cardiovascular Health',
              description: 'Comprehensive cardiovascular improvements including lipid profile optimization and blood pressure benefits.',
              metrics: ['20-35% LDL reduction', '30-50% triglyceride improvement', '5-15 mmHg BP reduction']
            }
          ],
          mechanism: {
            title: 'Triple Receptor Mechanism',
            description: 'Targets GLP-1 (40%), GIP (30%), and glucagon receptors (25%) simultaneously for comprehensive metabolic effects.',
            pathways: [
              'Incretin system activation for glucose regulation',
              'Neural appetite signaling modulation',
              'Metabolic rate enhancement and thermogenesis',
              'Enhanced fat oxidation and energy expenditure'
            ]
          },
          timeline: [
            { phase: 'Week 1-2', effects: 'Initial appetite reduction, early weight loss, improved postprandial glucose' },
            { phase: 'Week 3-6', effects: 'Steady weight reduction (1-2 lbs/week), enhanced sleep quality, stable energy' },
            { phase: 'Week 7-12', effects: 'Continued loss with metabolic adaptation, optimized cardiovascular markers' },
            { phase: 'Week 12+', effects: 'Maintenance phase with stable appetite control and sustained benefits' }
          ]
        }

      case 'retatrutide-20mg':
        return {
          title: 'Retatrutide 20mg Research Benefits',
          subtitle: 'Triple Agonist Peptide for Advanced Metabolic Research',
          primaryBenefits: [
            {
              icon: TrendingUp,
              title: 'Weight Management Research',
              description: 'Studies show 15-25% body weight reduction over 12 weeks with significant appetite suppression (70-85% reduction in hunger ratings).',
              metrics: ['15-25% weight reduction', '70-85% appetite suppression', 'Sustained effects throughout cycle']
            },
            {
              icon: Heart,
              title: 'Glucose Homeostasis',
              description: 'Enhanced insulin sensitivity with 15-30% improvement in glucose levels and 1.0-2.0% HbA1c reduction.',
              metrics: ['15-30% glucose improvement', '40-60% insulin sensitivity boost', '50-70% reduced glucose spikes']
            },
            {
              icon: Activity,
              title: 'Cardiovascular Health',
              description: 'Comprehensive cardiovascular improvements including lipid profile optimization and blood pressure benefits.',
              metrics: ['20-35% LDL reduction', '30-50% triglyceride improvement', '5-15 mmHg BP reduction']
            }
          ],
          mechanism: {
            title: 'Triple Receptor Mechanism',
            description: 'Targets GLP-1 (40%), GIP (30%), and glucagon receptors (25%) simultaneously for comprehensive metabolic effects.',
            pathways: [
              'Incretin system activation for glucose regulation',
              'Neural appetite signaling modulation',
              'Metabolic rate enhancement and thermogenesis',
              'Enhanced fat oxidation and energy expenditure'
            ]
          },
          timeline: [
            { phase: 'Week 1-2', effects: 'Initial appetite reduction, early weight loss, improved postprandial glucose' },
            { phase: 'Week 3-6', effects: 'Steady weight reduction (1-2 lbs/week), enhanced sleep quality, stable energy' },
            { phase: 'Week 7-12', effects: 'Continued loss with metabolic adaptation, optimized cardiovascular markers' },
            { phase: 'Week 12+', effects: 'Maintenance phase with stable appetite control and sustained benefits' }
          ]
        }

      case 'glutathione-1200mg':
        return {
          title: 'Glutathione Research Benefits',
          subtitle: 'Master Antioxidant for Cellular Protection & Anti-Aging',
          primaryBenefits: [
            {
              icon: Shield,
              title: 'Cellular Protection',
              description: 'Superior antioxidant defense with 40-60% reduction in oxidative stress markers and enhanced cellular repair mechanisms.',
              metrics: ['40-60% oxidative stress reduction', '50-70% improved cellular repair', 'Enhanced DNA protection']
            },
            {
              icon: Brain,
              title: 'Cognitive Enhancement',
              description: 'Neurological support with improved mental clarity, focus enhancement, and neuroprotective benefits.',
              metrics: ['25-40% improved mental clarity', '30-50% better focus retention', 'Enhanced memory consolidation']
            },
            {
              icon: Activity,
              title: 'Detoxification Support',
              description: 'Superior liver detoxification with enhanced Phase II conjugation and improved toxin elimination pathways.',
              metrics: ['60-80% enhanced detox capacity', '40-55% improved liver function', 'Accelerated toxin clearance']
            }
          ],
          mechanism: {
            title: 'Master Antioxidant System',
            description: 'Primary cellular antioxidant that regenerates other antioxidants (Vitamin C, E) and directly neutralizes free radicals.',
            pathways: [
              'Direct free radical scavenging and neutralization',
              'Regeneration of oxidized vitamins C and E',
              'Enhanced Phase II liver detoxification',
              'Mitochondrial protection and energy optimization'
            ]
          },
          timeline: [
            { phase: 'Week 1-2', effects: 'Initial detox response, improved energy, enhanced mental clarity' },
            { phase: 'Week 3-4', effects: 'Visible skin improvements, better sleep quality, reduced inflammation' },
            { phase: 'Week 5-8', effects: 'Optimized immune function, enhanced recovery, stable energy levels' },
            { phase: 'Week 8+', effects: 'Long-term cellular protection, anti-aging benefits, sustained wellness' }
          ]
        }

      case 'ghk-cu-100mg':
        return {
          title: 'GHK-Cu Research Benefits',
          subtitle: 'Copper Peptide for Tissue Repair & Regeneration',
          primaryBenefits: [
            {
              icon: Activity,
              title: 'Tissue Regeneration',
              description: 'Enhanced collagen synthesis with 30-50% improvement in skin elasticity and accelerated wound healing.',
              metrics: ['30-50% improved skin elasticity', '40-60% faster wound healing', 'Enhanced collagen production']
            },
            {
              icon: Shield,
              title: 'Anti-Inflammatory Effects',
              description: 'Significant reduction in inflammation markers with improved tissue repair and recovery processes.',
              metrics: ['50-70% inflammation reduction', '40-55% faster recovery', 'Enhanced tissue repair']
            },
            {
              icon: Heart,
              title: 'Vascular Health',
              description: 'Improved circulation and vascular integrity with enhanced blood flow and capillary health.',
              metrics: ['25-40% improved circulation', '30-50% better vascular health', 'Enhanced capillary function']
            }
          ],
          mechanism: {
            title: 'Copper Peptide Complex',
            description: 'Bioactive copper-peptide complex that modulates gene expression for tissue repair and regeneration.',
            pathways: [
              'Collagen and elastin synthesis stimulation',
              'Anti-inflammatory cytokine modulation',
              'Growth factor activation and signaling',
              'Antioxidant enzyme system enhancement'
            ]
          },
          timeline: [
            { phase: 'Week 1-2', effects: 'Initial tissue repair activation, reduced inflammation markers' },
            { phase: 'Week 3-4', effects: 'Visible skin texture improvements, enhanced healing response' },
            { phase: 'Week 5-8', effects: 'Significant collagen remodeling, improved skin elasticity' },
            { phase: 'Week 8+', effects: 'Sustained regenerative effects, long-term tissue health' }
          ]
        }

      case 'metabolic-stack':
        return {
          title: '⚡ Metabolic Stack Research Benefits',
          subtitle: 'Ultimate Fat Burning Combo: Retatrutide 20mg + MOTS-c 40mg',
          primaryBenefits: [
            {
              icon: TrendingUp,
              title: 'Maximum Weight Management',
              description: 'Synergistic fat burning with 20-30% body weight reduction potential combining triple receptor agonism with mitochondrial optimization.',
              metrics: ['20-30% weight reduction potential', '80-90% appetite suppression', 'Enhanced metabolic efficiency']
            },
            {
              icon: Zap,
              title: 'Metabolic Amplification',
              description: 'MOTS-c amplifies Retatrutide effects with enhanced fat oxidation, improved exercise performance, and metabolic flexibility.',
              metrics: ['50-70% improved fat oxidation', '40-60% better exercise capacity', 'Enhanced metabolic adaptation']
            },
            {
              icon: Activity,
              title: 'Comprehensive System',
              description: 'Complete 4-week system targeting multiple pathways: appetite control, metabolic rate, fat oxidation, and energy optimization.',
              metrics: ['Multi-pathway targeting', '4-week complete protocol', 'Synergistic compound effects']
            }
          ],
          mechanism: {
            title: 'Dual-Pathway Fat Burning',
            description: 'Combines Retatrutide\'s triple receptor agonism (GLP-1/GIP/Glucagon) with MOTS-c mitochondrial optimization for maximum effect.',
            pathways: [
              'Triple incretin receptor activation for appetite control',
              'Mitochondrial biogenesis and optimization',
              'Enhanced fat oxidation and thermogenesis',
              'Improved insulin sensitivity and glucose metabolism'
            ]
          },
          timeline: [
            { phase: 'Week 1', effects: 'Rapid appetite suppression, initial fat burning activation, energy optimization begins' },
            { phase: 'Week 2-3', effects: 'Synergistic effects peak, accelerated weight loss, enhanced exercise capacity' },
            { phase: 'Week 4', effects: 'Maximum metabolic benefits, sustained fat loss, optimized body composition' },
            { phase: 'Post-cycle', effects: 'Maintained metabolic improvements, sustained appetite control, enhanced fitness' }
          ]
        }

      case 'glow-stack':
        return {
          title: '💎 Glow Stack Research Benefits',
          subtitle: 'Anti-Aging Powerhouse: Glutathione 1200mg + GHK-Cu 100mg',
          primaryBenefits: [
            {
              icon: Shield,
              title: 'Complete Cellular Protection',
              description: 'Master antioxidant defense combined with tissue regeneration for comprehensive anti-aging and cellular optimization.',
              metrics: ['60-80% oxidative stress reduction', '50-70% enhanced cellular repair', 'Comprehensive anti-aging effects']
            },
            {
              icon: Activity,
              title: 'Tissue Regeneration',
              description: 'GHK-Cu copper peptide enhances collagen synthesis and tissue repair while glutathione protects against cellular damage.',
              metrics: ['40-60% improved skin elasticity', '50-70% enhanced tissue repair', 'Accelerated regenerative processes']
            },
            {
              icon: Brain,
              title: 'Systemic Wellness',
              description: 'Dual-action approach targeting detoxification, cognitive enhancement, and overall wellness optimization.',
              metrics: ['Enhanced mental clarity', 'Improved detoxification', 'Optimized overall wellness']
            }
          ],
          mechanism: {
            title: 'Synergistic Anti-Aging System',
            description: 'Combines master antioxidant protection with copper peptide regeneration for comprehensive cellular health and longevity.',
            pathways: [
              'Glutathione: Direct antioxidant protection and detoxification',
              'GHK-Cu: Collagen synthesis and tissue regeneration',
              'Synergistic cellular repair and protection',
              'Enhanced longevity and wellness pathways'
            ]
          },
          timeline: [
            { phase: 'Week 1-2', effects: 'Initial detox and repair activation, early skin improvements, enhanced clarity' },
            { phase: 'Week 3-4', effects: 'Visible anti-aging benefits, improved skin texture, enhanced energy' },
            { phase: 'Week 5-8', effects: 'Significant regenerative effects, optimized cellular function, sustained wellness' },
            { phase: 'Week 8+', effects: 'Long-term anti-aging benefits, sustained cellular protection, enhanced longevity' }
          ]
        }

      case 'motsc-40mg':
        return {
          title: 'MOTS-c Research Benefits',
          subtitle: 'Mitochondrial-Derived Peptide for Cellular Energy Optimization',
          primaryBenefits: [
            {
              icon: Zap,
              title: 'Enhanced Exercise Performance',
              description: '15-25% increase in VO2 max with 30-50% improvement in exercise duration and enhanced recovery.',
              metrics: ['15-25% VO2 max increase', '30-50% endurance improvement', '40-60% faster recovery']
            },
            {
              icon: Activity,
              title: 'Metabolic Optimization',
              description: 'Improved glucose tolerance (25-40%) and insulin sensitivity (30-50%) with enhanced fat oxidation.',
              metrics: ['25-40% glucose improvement', '30-50% insulin sensitivity', '35-55% fat oxidation increase']
            },
            {
              icon: Brain,
              title: 'Cellular Energy Enhancement',
              description: '20-35% increase in ATP production with improved mitochondrial density and respiratory capacity.',
              metrics: ['20-35% ATP increase', '15-25% mitochondrial density', 'Enhanced oxygen consumption']
            }
          ],
          mechanism: {
            title: 'Mitochondrial-Nuclear Communication',
            description: 'MOTS-c directly regulates nuclear gene expression through AMPK activation and mitochondrial signaling.',
            pathways: [
              'AMPK activation for enhanced glucose uptake',
              'Nuclear translocation under metabolic stress',
              'Mitochondrial biogenesis stimulation',
              'Enhanced cellular stress resistance'
            ]
          },
          timeline: [
            { phase: 'Day 1-7', effects: 'Enhanced energy levels, improved exercise tolerance, better recovery' },
            { phase: 'Week 1-4', effects: 'Noticeable endurance improvements, enhanced metabolic flexibility' },
            { phase: 'Week 4-12', effects: 'Significant performance gains, optimal metabolic function' },
            { phase: 'Week 12+', effects: 'Sustained performance improvements, optimized mitochondrial function' }
          ]
        }

      case 'ss31-elamipretide-10mg':
        return {
          title: 'SS-31 Research Benefits',
          subtitle: 'Clinically-Validated Mitochondrial Protection Peptide',
          primaryBenefits: [
            {
              icon: Heart,
              title: 'Cardiovascular Function',
              description: '20-35% improvement in exercise tolerance with enhanced cardiac efficiency and endothelial function.',
              metrics: ['20-35% exercise improvement', 'Enhanced cardiac output', '25-40% vascular reactivity']
            },
            {
              icon: Shield,
              title: 'Mitochondrial Protection',
              description: '25-45% increase in ATP production with improved respiratory capacity and cellular efficiency.',
              metrics: ['25-45% ATP increase', 'Enhanced respiratory rates', 'Better energy utilization']
            },
            {
              icon: Activity,
              title: 'Exercise Performance',
              description: '15-30% improvement in endurance with 40-60% faster recovery and reduced fatigue.',
              metrics: ['15-30% endurance boost', '40-60% faster recovery', 'Reduced exercise fatigue']
            }
          ],
          mechanism: {
            title: 'Cardiolipin Targeting Technology',
            description: 'Selectively binds to cardiolipin in mitochondrial membranes, providing unprecedented cellular protection.',
            pathways: [
              'Inner mitochondrial membrane stabilization',
              'Cardiolipin-cytochrome c interaction preservation',
              'Reduced oxidative stress and ROS production',
              'Enhanced bioenergetic capacity'
            ]
          },
          timeline: [
            { phase: 'Day 1-7', effects: 'Enhanced cellular energy, improved exercise tolerance, better recovery' },
            { phase: 'Week 1-4', effects: 'Significant endurance improvements, enhanced cardiovascular function' },
            { phase: 'Week 4-12', effects: 'Peak cardiovascular benefits, optimal mitochondrial function' },
            { phase: 'Week 12+', effects: 'Sustained improvements, optimized cellular function' }
          ]
        }

      case 'nad-500mg':
        return {
          title: 'NAD+ Research Benefits',
          subtitle: 'Essential Coenzyme for Cellular Energy, Repair & Longevity',
          primaryBenefits: [
            {
              icon: Zap,
              title: 'Cellular Energy & ATP Production',
              description: 'NAD+ is a key driver of ATP production — the body\'s energy currency. Replenishing NAD+ levels boosts mitochondrial efficiency, reducing fatigue and increasing stamina without stimulants.',
              metrics: ['Enhanced ATP production', 'Sustained energy without crashes', 'Reduced chronic fatigue', 'Improved physical stamina']
            },
            {
              icon: Shield,
              title: 'DNA Repair & Anti-Aging',
              description: 'NAD+ activates sirtuins — the "longevity genes" — which are essential for DNA repair, cellular maintenance, and slowing age-related decline. NAD+ levels drop 50%+ between ages 40-60.',
              metrics: ['Sirtuin activation (longevity genes)', '50%+ NAD+ decline reversed', 'Enhanced DNA damage repair', 'Telomere protection support']
            },
            {
              icon: Brain,
              title: 'Cognitive Function & Neuroprotection',
              description: 'NAD+ supports neuronal health, neuroplasticity, and neurotransmitter production. Users report improved memory, sharper focus, and reduced brain fog.',
              metrics: ['Improved mental clarity & focus', 'Enhanced memory retention', 'Reduced brain fog', 'Neuroplasticity support']
            },
            {
              icon: Heart,
              title: 'Cardiovascular & Metabolic Health',
              description: 'Research shows NAD+ repletion can normalize insulin signaling, lower blood pressure, and improve neurovascular coupling for heart and metabolic health.',
              metrics: ['Improved insulin signaling', 'Blood pressure regulation', 'Enhanced metabolic function', 'Cardiovascular protection']
            },
            {
              icon: Activity,
              title: 'Inflammation & Recovery',
              description: 'NAD+ regulates inflammatory pathways and supports cellular repair, helping the body recover faster and reducing chronic inflammation linked to aging.',
              metrics: ['Reduced chronic inflammation', 'Faster recovery from stress', 'Enhanced immune regulation', 'Improved skin health & collagen']
            }
          ],
          mechanism: {
            title: 'NAD+ Cellular Mechanism',
            description: 'NAD+ is a coenzyme found in every living cell. It serves as an electron carrier in metabolic reactions and activates key enzymes (sirtuins, PARPs, CD38) that regulate aging, DNA repair, and energy production.',
            pathways: [
              'Mitochondrial electron transport chain — drives ATP synthesis',
              'Sirtuin activation (SIRT1-7) — regulates gene expression & longevity',
              'PARP enzyme activation — enables DNA damage repair',
              'CD38 regulation — modulates immune response & NAD+ consumption',
              'Circadian rhythm support — influences sleep-wake cycle regulation'
            ]
          },
          timeline: [
            { phase: 'Immediately', effects: 'Energy boost, mental clarity, warmth/flushing (improved circulation)' },
            { phase: 'Week 1-2', effects: 'Consistent energy, better focus, improved sleep quality' },
            { phase: 'Week 3-4', effects: 'Mood and vitality improvements, reduced inflammation' },
            { phase: 'Month 2-3+', effects: 'Deep cellular repair, stress resilience, sustained anti-aging benefits' }
          ]
        }

      case 'glow70-bpc-ghk-tb':
        return {
          title: 'GLOW 70 Research Benefits',
          subtitle: 'Triple Peptide Blend — BPC-157 + GHK-Cu + TB-500 for Complete Regeneration',
          primaryBenefits: [
            {
              icon: Heart,
              title: 'Accelerated Healing & Tissue Repair',
              description: 'BPC-157 promotes angiogenesis (new blood vessels) and activates growth hormone receptors for tendon, ligament, muscle, and gut repair. TB-500 enhances cell migration to injury sites.',
              metrics: ['Tendon & ligament repair', 'Muscle injury recovery', 'Gut lining protection (BPC-157)', 'Accelerated wound closure']
            },
            {
              icon: Shield,
              title: 'Anti-Inflammatory & Immune Support',
              description: 'All three peptides work synergistically to reduce inflammation. TB-500 facilitates immune cell trafficking while BPC-157 stabilizes the gut-immune axis.',
              metrics: ['Reduced chronic inflammation', 'Joint & tendon pain relief', 'Immune system modulation (TB-500)', 'Gut health restoration']
            },
            {
              icon: Zap,
              title: 'Skin Rejuvenation & Collagen Synthesis',
              description: 'GHK-Cu stimulates collagen Type I & III production, elastin synthesis, and glycosaminoglycan production for firmer, glowing skin with reduced wrinkles.',
              metrics: ['Enhanced collagen production', 'Reduced fine lines & wrinkles', 'Improved skin firmness & elasticity', 'Enhanced skin radiance & glow']
            },
            {
              icon: Activity,
              title: 'Comprehensive Tissue Regeneration',
              description: 'The "Wolverine Stack" — three peptides targeting different repair pathways for faster, more complete recovery than any single peptide alone.',
              metrics: ['Synergistic triple-action healing', 'Faster recovery from injuries', 'Tissue remodeling & strengthening', 'Hair growth support (GHK-Cu)']
            }
          ],
          mechanism: {
            title: 'Triple Peptide Synergy',
            description: 'GLOW 70 combines three complementary peptides that target different healing pathways simultaneously for comprehensive regenerative effects.',
            pathways: [
              'BPC-157: Angiogenesis + nitric oxide pathway → blood flow & gut healing',
              'GHK-Cu: Collagen/elastin stimulation + antioxidant → skin & tissue repair',
              'TB-500: Actin regulation + cell migration → wound healing & flexibility',
              'Combined: Multi-pathway activation for accelerated whole-body repair'
            ]
          },
          timeline: [
            { phase: 'Week 1-2', effects: 'Reduced pain & inflammation, better digestion, skin hydration' },
            { phase: 'Week 2-4', effects: 'Improved mobility, joint comfort, skin texture improvement' },
            { phase: 'Week 4-8', effects: 'Significant tissue regeneration, visible skin glow, collagen synthesis' },
            { phase: 'Week 8-12+', effects: 'Full recovery, reduced wrinkles, hair growth, sustained healing' }
          ]
        }

      default:
        return {
          title: 'Research Benefits',
          subtitle: 'Professional Research Applications',
          primaryBenefits: [
            {
              icon: Activity,
              title: 'Research Applications',
              description: 'Professional research applications for scientific studies and investigations.',
              metrics: ['Research grade purity', 'Consistent results', 'Professional support']
            }
          ],
          mechanism: {
            title: 'Research Mechanism',
            description: 'Detailed mechanism information available in research protocols.',
            pathways: ['Professional research applications', 'Scientific methodology', 'Controlled studies']
          },
          timeline: [
            { phase: 'Research Phase', effects: 'Professional research applications with comprehensive support' }
          ]
        }
    }
  }

  const benefits = getBenefitsContent(product.id)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{benefits.title}</h3>
        <p className="text-gray-600">{benefits.subtitle}</p>
      </div>

      {/* Primary Benefits */}
      <div className="grid gap-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Primary Research Benefits</h4>
        {benefits.primaryBenefits.map((benefit, index) => (
          <div key={index} className="bg-gradient-to-r from-primary-50 to-white p-6 rounded-xl border border-primary-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <benefit.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="flex-1">
                <h5 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h5>
                <p className="text-gray-700 mb-3">{benefit.description}</p>
                <div className="space-y-1">
                  {benefit.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mechanism */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">{benefits.mechanism.title}</h4>
        <p className="text-gray-700 mb-4">{benefits.mechanism.description}</p>
        <div className="grid gap-2">
          {benefits.mechanism.pathways.map((pathway, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-gray-600">{pathway}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Research Applications */}
      <div className="bg-blue-50 dark:bg-purple-50 dark:bg-opacity-10 p-6 rounded-xl border border-blue-200 dark:border-purple-200 dark:border-opacity-30">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-purple-400 mb-3">🔬 Research Applications</h4>
        <p className="text-blue-800 dark:text-purple-300 text-sm mb-3">
          This comprehensive benefits analysis is based on current scientific literature and clinical research. 
          Individual research outcomes may vary based on study design, population, and methodology.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-purple-100 dark:bg-opacity-20 dark:text-purple-300 text-xs rounded-full">Research Grade</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-purple-100 dark:bg-opacity-20 dark:text-purple-300 text-xs rounded-full">Scientific Studies</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-purple-100 dark:bg-opacity-20 dark:text-purple-300 text-xs rounded-full">Professional Support</span>
        </div>
      </div>
    </div>
  )
}

export default ProductBenefits