import { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { useAuth } from '../context/AuthContext';
import { Share2, X, Check } from 'lucide-react';
import { HistoryItemType } from '../context/HistoryContext';

interface ShareToCommunityProps {
  type: HistoryItemType;
  isAIGenerated: boolean;
  confidence: number;
  preview?: string;
  metadata?: {
    fileName?: string;
    subject?: string;
    sender?: string;
    textLength?: number;
    phishingRisk?: string;
  };
}

export function ShareToCommunity({
  type,
  isAIGenerated,
  confidence,
  preview,
  metadata,
}: ShareToCommunityProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [isShared, setIsShared] = useState(false);
  const { addPost } = useCommunity();
  const { isAuthenticated } = useAuth();

  const handleShare = () => {
    addPost({
      type,
      isAIGenerated,
      confidence,
      preview,
      description: description.trim() || undefined,
      metadata,
    });
    setIsShared(true);
    setTimeout(() => {
      setIsOpen(false);
      setDescription('');
      setTimeout(() => setIsShared(false), 500);
    }, 1500);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-[#00B7B5]/20 text-[#005461] rounded-lg hover:bg-[#00B7B5]/30 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share to Community
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            {isShared ? (
              <div className="text-center py-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-2">Shared Successfully!</h3>
                <p className="text-gray-600">Your analysis has been shared with the community</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">Share to Community</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Preview Info */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Type:</span>
                      <span className="text-sm text-gray-900 capitalize">{type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Result:</span>
                      <span
                        className={`text-sm ${
                          isAIGenerated ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {isAIGenerated ? 'AI-Generated' : 'Authentic'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Confidence:</span>
                      <span className="text-sm text-gray-900">{confidence}%</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-gray-700 mb-2">
                      Add a description (optional)
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Share your thoughts about this analysis..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 px-4 py-2 bg-[#018790] text-white rounded-lg hover:bg-[#005461] transition-colors"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}