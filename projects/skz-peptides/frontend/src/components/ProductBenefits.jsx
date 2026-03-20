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

      {/* Timeline */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Research Timeline</h4>
        <div className="space-y-4">
          {benefits.timeline.map((phase, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">{phase.phase}</h5>
                <p className="text-sm text-gray-600">{phase.effects}</p>
              </div>
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