import { Shield, Users, Zap, Download, Play, CheckCircle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F4F4] via-white to-cyan-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-[#00B7B5] rounded-full animate-pulse" />
              <span className="text-sm text-gray-700">Trusted by 50,000+ users worldwide</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-gray-900 mb-4">
                Detect Fake Content
                <br />
                <span className="text-[#018790]">with AI in Seconds</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-xl">
                Protect yourself from deepfakes, manipulated media, and phishing attacks. Our AI-powered platform analyzes images, videos, text, and emails with industry-leading accuracy.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 bg-[#018790] text-white px-6 py-3 rounded-lg hover:bg-[#005461] transition-colors shadow-lg shadow-[#018790]/20"
              >
                <Download className="w-5 h-5" />
                Download Extension
              </button>
              <button className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#018790]">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl">50K+</span>
                </div>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#018790]">
                  <Shield className="w-5 h-5" />
                  <span className="text-2xl">99.2%</span>
                </div>
                <p className="text-sm text-gray-600">Accuracy Rate</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#018790]">
                  <Zap className="w-5 h-5" />
                  <span className="text-2xl">&lt;2s</span>
                </div>
                <p className="text-sm text-gray-600">Analysis Time</p>
              </div>
            </div>
          </div>

          {/* Right Content - Analysis Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 bg-[#00B7B5]/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#005461]" />
                </div>
                <h3 className="text-gray-900">Real-time Analysis</h3>
              </div>

              {/* Analysis Results */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#00B7B5] flex-shrink-0" />
                  <span className="text-gray-700">Image authenticity verified</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#00B7B5] flex-shrink-0" />
                  <span className="text-gray-700">No manipulation detected</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#F4F4F4] rounded-lg">
                  <CheckCircle className="w-5 h-5 text-[#00B7B5] flex-shrink-0" />
                  <span className="text-gray-700">Source validated</span>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Confidence Score</span>
                  <span className="text-2xl text-[#018790]">99.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#018790] to-[#00B7B5] h-2 rounded-full transition-all duration-1000"
                    style={{ width: '99.2%' }}
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#00B7B5]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#018790]/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Comprehensive AI Detection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform analyzes multiple content types to keep you safe from AI-generated misinformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Image Detection */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#00B7B5]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#005461]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-gray-900 mb-2">Image Detection</h3>
            <p className="text-gray-600 text-sm">
              Identify AI-generated images and deepfakes with advanced neural network analysis
            </p>
          </div>

          {/* Video Detection */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#018790]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#005461]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-gray-900 mb-2">Video Detection</h3>
            <p className="text-gray-600 text-sm">
              Detect manipulated videos and analyze audio for AI-generated content
            </p>
          </div>

          {/* Text Detection */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#00B7B5]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#005461]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-gray-900 mb-2">Text Detection</h3>
            <p className="text-gray-600 text-sm">
              Analyze text patterns to identify AI-written content from GPT, Claude, and more
            </p>
          </div>

          {/* Email Detection */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[#018790]/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#005461]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-gray-900 mb-2">Email Security</h3>
            <p className="text-gray-600 text-sm">
              Detect phishing attempts and AI-generated spam emails in real-time
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#005461] to-[#018790] rounded-2xl p-12 text-center text-white">
          <h2 className="text-white mb-4">Ready to Start Detecting?</h2>
          <p className="text-cyan-50 mb-8 max-w-2xl mx-auto">
            Join thousands of users protecting themselves from AI-generated misinformation
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-[#005461] px-8 py-3 rounded-lg hover:bg-[#F4F4F4] transition-colors shadow-lg inline-flex items-center gap-2"
          >
            Sign Up
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

<footer className="bg-white border-t border-gray-200 mt-4">
  <div className="max-w-7xl mx-auto px-4 py-2">
    <p className="text-center text-gray-600 text-140s">
      © 2025 Fakeye. All rights reserved.
    </p>
  </div>
</footer>


      </div>
    </div>
  );
}
