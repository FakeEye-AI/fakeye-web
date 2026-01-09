import { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Loader2, Mail, AlertTriangle } from 'lucide-react';
import { useHistory } from '../context/HistoryContext';
import { ShareToCommunity } from './ShareToCommunity';

interface EmailAnalysis {
  isAIGenerated: boolean;
  phishingRisk: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  threats: {
    type: string;
    severity: 'low' | 'medium' | 'high';
    detected: boolean;
  }[];
  indicators: string[];
  recommendation: string;
}

export function EmailDetector() {
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<EmailAnalysis | null>(null);
  const { addToHistory } = useHistory();

  const analyzeEmail = () => {
    if (!emailContent.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      const hasPhishingIndicators = Math.random() > 0.6;
      const isAI = Math.random() > 0.55;
      const riskLevels: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'high', 'critical'];
      const risk = hasPhishingIndicators ? riskLevels[Math.floor(Math.random() * 3) + 1] : 'low';
      
      const indicators: string[] = [];
      if (hasPhishingIndicators) {
        const possibleIndicators = [
          'Suspicious sender domain',
          'Urgent call-to-action language',
          'Request for sensitive information',
          'Mismatched link destinations',
          'Unusual grammar or spelling patterns',
          'Sense of urgency or threat',
          'Generic greetings',
          'Embedded suspicious links',
        ];
        const numIndicators = Math.floor(Math.random() * 4) + 2;
        for (let i = 0; i < numIndicators; i++) {
          indicators.push(possibleIndicators[Math.floor(Math.random() * possibleIndicators.length)]);
        }
      }

      const analysisResult = {
        isAIGenerated: isAI,
        phishingRisk: risk,
        confidence: Math.round((70 + Math.random() * 25) * 10) / 10,
        threats: [
          {
            type: 'Phishing Attempt',
            severity: risk === 'critical' || risk === 'high' ? 'high' : 'medium',
            detected: hasPhishingIndicators,
          },
          {
            type: 'Malicious Links',
            severity: 'medium',
            detected: hasPhishingIndicators && Math.random() > 0.5,
          },
          {
            type: 'Spoofed Sender',
            severity: 'high',
            detected: hasPhishingIndicators && Math.random() > 0.6,
          },
          {
            type: 'Social Engineering',
            severity: 'medium',
            detected: hasPhishingIndicators && Math.random() > 0.4,
          },
        ],
        indicators,
        recommendation:
          risk === 'critical' || risk === 'high'
            ? 'DO NOT interact with this email. Delete immediately and report as phishing.'
            : risk === 'medium'
            ? 'Exercise caution. Verify sender authenticity before taking any action.'
            : 'Email appears safe, but always verify sender identity before clicking links or providing information.',
      };

      setResult(analysisResult);
      
      // Add to history
      addToHistory({
        type: 'email',
        isAIGenerated: analysisResult.isAIGenerated,
        confidence: analysisResult.confidence,
        preview: emailContent.substring(0, 150),
        metadata: {
          subject: emailSubject,
          sender: senderEmail,
          phishingRisk: risk,
        },
      });
      
      setIsAnalyzing(false);
    }, 2500);
  };

  const exampleEmails = [
    {
      label: 'Phishing Example',
      subject: 'URGENT: Your Account Has Been Suspended',
      sender: 'security@paypa1-support.com',
      content:
        'Dear User,\n\nYour account has been temporarily suspended due to suspicious activity. You must verify your identity within 24 hours or your account will be permanently closed.\n\nClick here to verify: http://paypal-verify-account.suspicious.com\n\nThank you,\nPayPal Security Team',
    },
    {
      label: 'Legitimate Email',
      subject: 'Your Order #12345 Has Shipped',
      sender: 'orders@amazon.com',
      content:
        'Hello John,\n\nGreat news! Your order #12345 has shipped and is on its way. You can track your package using the tracking number: 1Z999AA10123456784.\n\nExpected delivery: December 25, 2025\n\nThank you for shopping with us!\nThe Amazon Team',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-gray-900 mb-2">AI Email & Phishing Detection</h2>
        <p className="text-gray-600 mb-6">
          Analyze emails to detect AI-generated content and identify potential phishing attempts
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="sender-email" className="block text-gray-700 mb-2">
              Sender Email Address
            </label>
            <input
              id="sender-email"
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="sender@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email-subject" className="block text-gray-700 mb-2">
              Subject Line
            </label>
            <input
              id="email-subject"
              type="text"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="Email subject..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email-content" className="block text-gray-700 mb-2">
              Email Content
            </label>
            <textarea
              id="email-content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Paste the email content here..."
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Try examples:</span>
            {exampleEmails.map((example, index) => (
              <button
                key={index}
                onClick={() => {
                  setEmailSubject(example.subject);
                  setSenderEmail(example.sender);
                  setEmailContent(example.content);
                  setResult(null);
                }}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                {example.label}
              </button>
            ))}
          </div>

          <button
            onClick={analyzeEmail}
            disabled={!emailContent.trim() || isAnalyzing}
            className="w-full bg-[#018790] text-white py-3 rounded-lg hover:bg-[#005461] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Email...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                Analyze Email
              </>
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          {/* Risk Level Alert */}
          <div
            className={`rounded-lg p-4 flex gap-4 ${
              result.phishingRisk === 'critical'
                ? 'bg-red-100 border border-red-300'
                : result.phishingRisk === 'high'
                ? 'bg-orange-100 border border-orange-300'
                : result.phishingRisk === 'medium'
                ? 'bg-yellow-100 border border-yellow-300'
                : 'bg-green-100 border border-green-300'
            }`}
          >
            <div
              className={`p-2 rounded-full h-fit ${
                result.phishingRisk === 'critical' || result.phishingRisk === 'high'
                  ? 'bg-red-200'
                  : result.phishingRisk === 'medium'
                  ? 'bg-yellow-200'
                  : 'bg-green-200'
              }`}
            >
              {result.phishingRisk === 'low' ? (
                <CheckCircle
                  className={`w-6 h-6 ${
                    result.phishingRisk === 'low' ? 'text-green-700' : ''
                  }`}
                />
              ) : (
                <AlertTriangle
                  className={`w-6 h-6 ${
                    result.phishingRisk === 'critical'
                      ? 'text-red-700'
                      : result.phishingRisk === 'high'
                      ? 'text-orange-700'
                      : 'text-yellow-700'
                  }`}
                />
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`mb-1 ${
                  result.phishingRisk === 'critical'
                    ? 'text-red-900'
                    : result.phishingRisk === 'high'
                    ? 'text-orange-900'
                    : result.phishingRisk === 'medium'
                    ? 'text-yellow-900'
                    : 'text-green-900'
                }`}
              >
                Phishing Risk: {result.phishingRisk.toUpperCase()}
              </h3>
              <p
                className={`${
                  result.phishingRisk === 'critical'
                    ? 'text-red-800'
                    : result.phishingRisk === 'high'
                    ? 'text-orange-800'
                    : result.phishingRisk === 'medium'
                    ? 'text-yellow-800'
                    : 'text-green-800'
                }`}
              >
                {result.recommendation}
              </p>
            </div>
          </div>

          {/* AI Detection */}
          <div className="flex items-start gap-4 border-t border-gray-200 pt-6">
            {result.isAIGenerated ? (
              <div className="bg-[#00B7B5]/20 p-3 rounded-full">
                <XCircle className="w-6 h-6 text-[#005461]" />
              </div>
            ) : (
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            )}
            <div className="flex-1">
                <h4 className="text-gray-900 mb-1">
                {result.isAIGenerated ? 'AI-Generated Content Detected' : 'Human-Written Content'}
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Confidence:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                  <div
                    className="h-2 rounded-full bg-[#018790]"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
                <span className="text-gray-900">{result.confidence}%</span>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <div className="flex justify-end border-t border-gray-200 pt-4">
            <ShareToCommunity
              type="email"
              isAIGenerated={result.isAIGenerated}
              confidence={result.confidence}
              preview={emailContent.substring(0, 150)}
              metadata={{
                subject: emailSubject,
                sender: senderEmail,
                phishingRisk: result.phishingRisk,
              }}
            />
          </div>

          {/* Threat Analysis */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-gray-900 mb-4">Threat Analysis</h4>
            <div className="space-y-3">
              {result.threats.map((threat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {threat.detected ? (
                      <XCircle
                        className={`w-5 h-5 ${
                          threat.severity === 'high'
                            ? 'text-red-600'
                            : threat.severity === 'medium'
                            ? 'text-orange-600'
                            : 'text-yellow-600'
                        }`}
                      />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    <span className="text-gray-900">{threat.type}</span>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      threat.detected
                        ? threat.severity === 'high'
                          ? 'bg-red-100 text-red-700'
                          : threat.severity === 'medium'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {threat.detected ? threat.severity : 'Not Detected'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          {result.indicators.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-gray-900 mb-3">Suspicious Indicators Found</h4>
              <ul className="space-y-2">
                {result.indicators.map((indicator, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-blue-900">
              This is a demonstration. Real email analysis would check sender authentication (SPF, DKIM, DMARC),
              link destinations, attachment safety, and compare against known phishing patterns.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}