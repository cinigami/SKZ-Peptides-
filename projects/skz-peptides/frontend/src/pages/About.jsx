import { Shield, Zap, FileText, MessageCircle, Coffee, Code } from 'lucide-react'

const About = () => {
  const realValues = [
    {
      icon: Shield,
      title: 'Honest Business',
      description: 'We tell you exactly what you get. No inflated claims, no fake reviews, just quality peptides with proper documentation.'
    },
    {
      icon: FileText,
      title: 'Real Protocols',
      description: 'We actually create comprehensive research protocols because we believe in educating our customers, not just selling to them.'
    },
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Questions? Message @nadojiken directly on Telegram. You get real answers from real people, not chatbots.'
    },
    {
      icon: Zap,
      title: 'Fast & Simple',
      description: 'Order online or through our Telegram bot. We ship quickly and keep things straightforward.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">About SKZ Peptides</h1>
            <p className="text-xl text-primary-100">
              A straightforward peptide seller focused on quality products, 
              honest communication, and actually useful customer support.
            </p>
          </div>
        </div>
      </section>

      {/* Our Real Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Real Story</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
                <p className="text-lg">
                  <strong>SKZ Peptides started simple:</strong> We needed quality research peptides 
                  without the BS marketing, fake reviews, and overpriced "premium" packaging 
                  that dominates this industry.
                </p>

                <p>
                  Most peptide sellers either give you zero information about their products 
                  or bombard you with questionable claims. We thought there had to be a better way.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">What We Actually Do</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Source quality peptides with proper documentation</li>
                    <li>• Create detailed research protocols (because we actually use them)</li>
                    <li>• Provide straight answers to your questions</li>
                    <li>• Ship quickly without unnecessary drama</li>
                    <li>• Keep prices reasonable because we're not funding a yacht</li>
                  </ul>
                </div>

                <p>
                  We're not trying to be the biggest peptide company. We're trying to be 
                  the most useful one for people who actually want to do research.
                </p>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Actually Believe */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What We Actually Stand For</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {realValues.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <value.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Team (Real) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Team</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">AU (@nadojiken)</h3>
                  <p className="text-gray-600">Founder & Everything Person</p>
                </div>
              </div>
              
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  I'm the person behind SKZ Peptides. I source the products, write the protocols, 
                  answer customer questions, and handle shipping. It's a small operation, which means:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">✅ Advantages:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• You always talk to the same person</li>
                      <li>• Quick decisions and problem-solving</li>
                      <li>• Personal investment in quality</li>
                      <li>• No corporate bureaucracy</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-600 mb-2">⚠️ Limitations:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Response times might vary (usually 24-48h)</li>
                      <li>• No 24/7 customer service</li>
                      <li>• Can't compete with huge inventory</li>
                      <li>• Limited to what one person can handle</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-6">
                  <strong>Bottom line:</strong> If you want personal service and honest information, 
                  you're in the right place. If you need instant corporate support or have huge volume requirements, 
                  you might be better served elsewhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact (Honest) */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get In Touch (For Real)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-primary-700 p-6 rounded-lg">
                <MessageCircle className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Telegram</h3>
                <p className="text-primary-100 text-sm mb-3">
                  Message @nadojiken directly. This is usually the fastest way to reach me.
                </p>
                <p className="text-xs text-primary-200">Response time: Usually same day</p>
              </div>
              
              <div className="bg-primary-700 p-6 rounded-lg">
                <Code className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Telegram Bot</h3>
                <p className="text-primary-100 text-sm mb-3">
                  Use our bot for browsing products and placing orders 24/7.
                </p>
                <p className="text-xs text-primary-200">Available: Always</p>
              </div>
              
              <div className="bg-primary-700 p-6 rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">This Website</h3>
                <p className="text-primary-100 text-sm mb-3">
                  Browse products, download protocols, and place orders anytime.
                </p>
                <p className="text-xs text-primary-200">Always online</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-primary-700 rounded-lg text-left max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-3">💬 Real Talk About Communication</h3>
              <p className="text-primary-100 text-sm">
                I try to answer every message personally, but I'm just one person. If you need immediate 
                responses, this might not be the best fit. But if you want thoughtful, honest answers 
                to your questions about peptide research, I'm here for that.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About