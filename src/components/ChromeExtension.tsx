import { Chrome, Download, Shield, Zap, Lock, AlertTriangle, CheckCircle, FolderOpen, Settings, Puzzle, Upload, X, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function ChromeExtension() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showGuide) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showGuide]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Create a link to download the pre-built extension zip
      const link = document.createElement('a');
      link.href = '/phishing-email-detector-extension.zip';
      link.download = 'phishing-email-detector-extension.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Show installation guide after download
      setShowGuide(true);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again or download from GitHub.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Modal component to render via portal
  const InstallationGuideModal = () => (
    <div 
      className="fixed top-0 left-0"
      style={{ width: '100vw', height: '100vh', zIndex: 99999 }}
    >
      {/* Backdrop - covers everything including navbar */}
      <div 
        className="fixed top-0 left-0 bg-black/50"
        style={{ width: '100vw', height: '100vh', zIndex: 99999 }}
        onClick={() => setShowGuide(false)}
      />
      
      {/* Scrollable Modal Container */}
      <div 
        className="fixed top-0 left-0"
        style={{ width: '100vw', height: '100vh', zIndex: 100000, overflowY: 'auto' }}
        onClick={() => setShowGuide(false)}
      >
        <div className="flex justify-center items-start px-4" style={{ minHeight: '100%', paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="relative bg-white shadow-2xl w-full max-w-2xl h-fit" style={{ borderRadius: '16px' }} onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-[#005461] to-[#018790] text-white p-6" style={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Installation Guide</h3>
                    <p className="text-white/80 text-sm">Follow these steps to install the extension</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowGuide(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="bg-[#018790] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2 font-medium">Extract the Downloaded ZIP</h4>
                  <p className="text-gray-600 mb-3">
                    Find the downloaded ZIP file and extract it to a folder on your computer.
                  </p>
                  <div className="bg-[#F4F4F4] border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                    <FolderOpen className="w-6 h-6 text-[#018790]" />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">phishing-email-detector-extension/</p>
                      <p className="text-xs text-gray-500">Remember this folder location</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="bg-[#018790] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2 font-medium">Open Chrome Extensions Page</h4>
                  <p className="text-gray-600 mb-3">
                    Open Chrome and navigate to the extensions page:
                  </p>
                  <div className="space-y-2">
                    <div className="bg-[#F4F4F4] border border-gray-200 rounded-lg p-3 flex items-center gap-3">
                      <code className="bg-[#005461] text-white px-3 py-1 rounded text-sm font-mono">chrome://extensions</code>
                      <span className="text-gray-500 text-sm">Type in address bar</span>
                    </div>
                    <p className="text-gray-500 text-sm text-center">— OR —</p>
                    <div className="bg-[#F4F4F4] border border-gray-200 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        Click <strong>⋮</strong> → <strong>Extensions</strong> → <strong>Manage Extensions</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="bg-[#018790] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2 font-medium">Enable Developer Mode</h4>
                  <p className="text-gray-600 mb-3">
                    Toggle on <strong>"Developer mode"</strong> in the top-right corner.
                  </p>
                  <div className="bg-[#00B7B5]/10 border border-[#00B7B5]/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-[#005461]" />
                        <span className="text-[#005461] font-medium">Developer mode</span>
                      </div>
                      <div className="w-12 h-6 bg-[#018790] rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="bg-[#018790] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2 font-medium">Load the Extension</h4>
                  <p className="text-gray-600 mb-3">
                    Click <strong>"Load unpacked"</strong> and select the extracted folder.
                  </p>
                  <div className="bg-[#F4F4F4] border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <button className="bg-white border border-gray-300 px-4 py-2 rounded text-sm font-medium flex items-center gap-2 shadow-sm cursor-default">
                        <Upload className="w-4 h-4" />
                        Load unpacked
                      </button>
                      <span className="text-gray-500 text-sm">← Click this button</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FolderOpen className="w-4 h-4" />
                      <span>Select folder with <code className="bg-gray-200 px-1 rounded">manifest.json</code></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 - Done */}
              <div className="flex gap-4">
                <div className="bg-[#00B7B5] text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-semibold">
                  ✓
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-2 font-medium">Done! Extension Installed</h4>
                  <p className="text-gray-600 mb-3">
                    You should see the FakEye icon in your Chrome toolbar.
                  </p>
                  <div className="bg-[#00B7B5]/10 border border-[#00B7B5]/30 rounded-lg p-4 flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg border border-[#00B7B5]/30">
                      <Puzzle className="w-6 h-6 text-[#018790]" />
                    </div>
                    <div>
                      <p className="text-[#005461] font-medium">Phishing Email Detector</p>
                      <p className="text-[#018790] text-sm">Extension enabled and ready to use</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="text-amber-800 font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Tips
                </h4>
                <ul className="text-amber-700 text-sm space-y-1 list-disc list-inside">
                  <li>Pin the extension to your toolbar for easy access</li>
                  <li>The extension will automatically scan emails when you open Gmail</li>
                  <li>Click the extension icon to see the scan results</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#F4F4F4] p-4 border-t border-gray-200" style={{ borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
              <button 
                onClick={() => setShowGuide(false)}
                className="w-full bg-[#018790] text-white px-6 py-3 rounded-lg hover:bg-[#005461] transition-colors font-medium cursor-pointer"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Installation Guide Modal - rendered via portal */}
      {showGuide && createPortal(<InstallationGuideModal />, document.body)}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#005461] to-[#018790] rounded-xl shadow-lg text-white p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-white/20 p-3 rounded-lg">
            <Chrome className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-white mb-2">Chrome Extension</h2>
            <p className="text-[#00B7B5]">
              Real-time phishing detection and email safety checker for Gmail and other email clients
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-white text-[#005461] px-6 py-3 rounded-lg hover:bg-[#F4F4F4] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium cursor-pointer"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? 'Downloading...' : 'Download Extension'}
          </button>
          <button 
            onClick={() => setShowGuide(true)}
            className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2 font-medium cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            Installation Guide
          </button>
        </div>
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
            <div className="bg-[#018790] p-3 rounded-lg h-fit">
              <Shield className="w-6 h-6 text-white" />
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
            <div className="bg-[#018790] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="text-gray-900 mb-1">Install the Extension</h4>
              <p className="text-gray-600">
                Download and install the extension using the guide above
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-[#018790] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
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
            <div className="bg-[#018790] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
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
            <div className="bg-[#018790] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
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
              className="border border-gray-200 rounded-lg p-4 text-center hover:border-[#018790] hover:bg-[#00B7B5]/10 transition-colors cursor-pointer"
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
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-[#018790] text-white px-6 py-3 rounded-lg hover:bg-[#005461] transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {isDownloading ? 'Downloading...' : 'Download Extension'}
          </button>
        </div>
      </div>
    </div>
  );
}