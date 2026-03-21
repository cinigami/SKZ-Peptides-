import { Shield, Zap, FileText, MessageCircle, Coffee, Code } from 'lucide-react'

const About = () => {
  const realValues = [

    {
      icon: FileText,
      title: 'Actually Useful Info',
      description: 'I write the protocols myself because I use them. No copy-paste from forums or AI-generated fluff.'
    },
    {
      icon: MessageCircle,
      title: 'Real Person Available',
      description: 'Message me directly @nadojiken on Telegram. You\'ll get actual answers, not "please allow 3-5 business days."'
    },
    {
      icon: Zap,
      title: 'Just Works',
      description: 'Order on the website or through Telegram. I ship fast and don\'t overcomplicate things.'
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
              Just a person who got tired of overpriced peptides with zero useful information.
              So I started selling them myself.
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
                  <strong>Here's what happened:</strong> I needed peptides for my own research but kept running 
                  into the same problems everywhere I looked. Either ridiculously expensive with fancy packaging, 
                  or cheap with zero information about what you're actually getting.
                </p>

                <p>
                  I wanted fair pricing, proper documentation, and someone who could actually answer questions 
                  about the products. Most importantly, I needed protocols that were written by someone who 
                  actually uses these compounds.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">So I started doing it differently:</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Source directly from quality labs with fair pricing</li>
                    <li>• Write actual research protocols instead of just safety disclaimers</li>
                    <li>• Answer questions honestly, even if it means you might not buy</li>
                    <li>• Include everything you need to get started (essential kit)</li>
                    <li>• Price things fairly instead of "what the market will bear"</li>
                  </ul>
                </div>





              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Actually Believe */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How I Actually Run This</h2>
            
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
                  <p className="text-gray-600">Founder & Fellow Researcher</p>
                </div>
              </div>
              
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  I started SKZ because I couldn't find a Malaysian source I trusted — so I built one myself. 
                  I'm not just selling these peptides, I use them. Every product in this store is something 
                  I've personally researched, tested, and believe in.
                </p>
                
                <p className="mb-4 font-medium">What that means for you:</p>
                
                <div className="text-left">
                  <h4 className="font-semibold text-green-600 mb-3">✅ Good stuff:</h4>
                  <ul className="text-sm space-y-2 mb-4">
                    <li>• I only stock what I'd use myself</li>
                    <li>• You talk directly to me — no support tickets, no bots</li>
                    <li>• I'll tell you if something isn't right for your goals</li>
                  </ul>
                </div>
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
              <h3 className="text-lg font-semibold mb-3">💬 How I Actually Communicate</h3>
              <p className="text-primary-100 text-sm mb-3">
                I read and respond to every message myself. No assistants, no copy-paste responses. 
                Sometimes that means waiting a bit longer, but you get real answers from someone 
                who actually knows what they're talking about.
              </p>
              <p className="text-primary-100 text-xs italic">
                Pro tip: Don't message me asking "is this legit?" - just look at the protocols I write 
                and judge for yourself. Scammers don't usually spend months writing detailed research guides.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About