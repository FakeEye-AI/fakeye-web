import { Chrome, Download, Shield, Zap, Lock, AlertTriangle, CheckCircle } from 'lucide-react';

export function ChromeExtension() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg text-white p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-white/20 p-3 rounded-lg">
            <Chrome className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-white mb-2">Chrome Extension</h2>
            <p className="text-blue-100">
              Real-time phishing detection and email safety checker for Gmail and other email clients
            </p>
          </div>
        </div>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
          <Download className="w-5 h-5" />
          Download Extension
        </button>
      </div>

      {/* Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">Key Features</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex gap-4">
            <div className="bg-[#00B7B5] p-3 rounded-lg h-fit">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Real-Time Scanning</h4>
              <p className="text-gray-600">
                Automatically scans emails as you receive them, providing instant threat assessments
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-[#018790] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              4
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Phishing Protection</h4>
              <p className="text-gray-600">
                Advanced detection algorithms identify phishing attempts, spoofed domains, and malicious links
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-green-100 p-3 rounded-lg h-fit">
              <Lock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Privacy First</h4>
              <p className="text-gray-600">
                All analysis happens locally in your browser - your emails are never sent to external servers
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-orange-100 p-3 rounded-lg h-fit">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Visual Warnings</h4>
              <p className="text-gray-600">
                Clear visual indicators and warnings appear directly in your email interface
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">How It Works</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Install the Extension</h4>
              <p className="text-gray-600">
                Add the AI Content Detector extension to your Chrome browser from the Chrome Web Store
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Automatic Monitoring</h4>
              <p className="text-gray-600">
                The extension integrates with your email client and automatically monitors incoming messages
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Real-Time Analysis</h4>
              <p className="text-gray-600">
                Each email is analyzed for phishing indicators, AI-generated content, and suspicious patterns
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              4
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Get Instant Alerts</h4>
              <p className="text-gray-600">
                Receive color-coded safety badges and detailed warnings for suspicious emails
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Demo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Extension in Action</h3>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          {/* Safe Email Example */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#00B7B5]/20 rounded-full flex items-center justify-center text-[#005461]">
                  AM
                </div>
                <div>
                  <p className="text-gray-900">Amazon Orders</p>
                  <p className="text-sm text-gray-600">orders@amazon.com</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                <CheckCircle className="w-4 h-4" />
                Safe
              </div>
            </div>
            <p className="text-gray-700">Your order has been shipped</p>
          </div>

          {/* Phishing Email Example */}
          <div className="bg-white border-2 border-red-300 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                  PP
                </div>
                <div>
                  <p className="text-gray-900">PayPal Security</p>
                  <p className="text-sm text-gray-600">security@paypa1-support.com</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                <AlertTriangle className="w-4 h-4" />
                Phishing Risk
              </div>
            </div>
            <p className="text-gray-700">URGENT: Your account has been suspended</p>
            <div className="mt-3 bg-red-50 border border-red-200 rounded p-3 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-900">
                This email contains suspicious indicators: Spoofed sender domain, urgent language, suspicious links
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compatibility */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Compatible Email Clients</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Gmail', 'Outlook', 'Yahoo Mail', 'ProtonMail'].map((client) => (
            <div
              key={client}
              className="border border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <p className="text-gray-900">{client}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#F4F4F4] to-white border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-gray-900 mb-1">Ready to protect your inbox?</h3>
            <p className="text-gray-600">Join thousands of users staying safe from phishing attacks</p>
          </div>
          <button className="bg-[#018790] text-white px-6 py-3 rounded-lg hover:bg-[#005461] transition-colors flex items-center gap-2 whitespace-nowrap">
            <Download className="w-5 h-5" />
            Install Extension
          </button>
        </div>
      </div>
    </div>
  );
}