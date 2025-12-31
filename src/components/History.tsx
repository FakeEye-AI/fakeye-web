import { useState } from 'react';
import { useHistory, HistoryItem } from '../context/HistoryContext';
import { useAuth } from '../context/AuthContext';
import { ShareToCommunity } from './ShareToCommunity';
import {
  Image,
  Video,
  FileText,
  Mail,
  Trash2,
  Calendar,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
} from 'lucide-react';

export function History() {
  const { history, clearHistory, deleteItem } = useHistory();
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'text' | 'email'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'confidence'>('newest');

  // Calculate statistics
  const stats = {
    total: history.length,
    aiDetected: history.filter((item) => item.isAIGenerated).length,
    authentic: history.filter((item) => !item.isAIGenerated).length,
    byType: {
      image: history.filter((item) => item.type === 'image').length,
      video: history.filter((item) => item.type === 'video').length,
      text: history.filter((item) => item.type === 'text').length,
      email: history.filter((item) => item.type === 'email').length,
    },
  };

  // Filter and sort history
  const filteredHistory = history
    .filter((item) => filter === 'all' || item.type === filter)
    .sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'oldest') return a.timestamp - b.timestamp;
      return b.confidence - a.confidence;
    });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'text':
        return <FileText className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Analyzed</span>
            <Shield className="w-5 h-5 text-[#018790]" />
          </div>
          <p className="text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-500">All time</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">AI-Generated</span>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-gray-900">{stats.aiDetected}</p>
          <p className="text-sm text-gray-500">
            {stats.total > 0 ? Math.round((stats.aiDetected / stats.total) * 100) : 0}% of total
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Authentic</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-gray-900">{stats.authentic}</p>
          <p className="text-sm text-gray-500">
            {stats.total > 0 ? Math.round((stats.authentic / stats.total) * 100) : 0}% of total
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Most Analyzed</span>
            <TrendingUp className="w-5 h-5 text-[#018790]" />
          </div>
          <p className="text-gray-900 capitalize">
            {Object.entries(stats.byType).reduce((a, b) => (b[1] > a[1] ? b : a))[0] || 'None'}
          </p>
          <p className="text-sm text-gray-500">
            {Math.max(...Object.values(stats.byType), 0)} items
          </p>
        </div>
      </div>

      {/* Type Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Analysis by Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.byType).map(([type, count]) => (
            <div
              key={type}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="bg-[#00B7B5]/20 p-2 rounded-lg text-[#005461]">
                {getTypeIcon(type)}
              </div>
              <div>
                <p className="text-gray-900">{count}</p>
                <p className="text-sm text-gray-600 capitalize">{type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['all', 'image', 'video', 'text', 'email'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type as typeof filter)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filter === type
                      ? 'bg-[#018790] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="confidence">Highest Confidence</option>
            </select>

            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">No Analysis History</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all'
              ? 'Start analyzing content to see your history here'
              : `No ${filter} analyses found. Try a different filter.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Type Icon */}
                  <div
                    className={`p-3 rounded-lg ${
                      item.type === 'image'
                        ? 'bg-[#00B7B5]/20 text-[#005461]'
                        : item.type === 'video'
                        ? 'bg-[#018790]/20 text-[#005461]'
                        : item.type === 'text'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    {getTypeIcon(item.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-900 capitalize">{item.type} Analysis</span>
                      {item.isAIGenerated ? (
                        <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                          <XCircle className="w-3 h-3" />
                          AI-Generated
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Authentic
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1 text-sm text-gray-600">
                      {item.metadata?.fileName && (
                        <p className="truncate">File: {item.metadata.fileName}</p>
                      )}
                      {item.metadata?.subject && (
                        <p className="truncate">Subject: {item.metadata.subject}</p>
                      )}
                      {item.metadata?.sender && (
                        <p className="truncate">From: {item.metadata.sender}</p>
                      )}
                      {item.metadata?.textLength && (
                        <p>Length: {item.metadata.textLength} characters</p>
                      )}
                      {item.metadata?.phishingRisk && (
                        <p className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Phishing Risk: <span className={`capitalize font-medium ${
                            item.metadata.phishingRisk === 'High' ? 'text-red-600' : 
                            item.metadata.phishingRisk === 'Medium' ? 'text-orange-600' : 
                            'text-green-600'
                          }`}>{item.metadata.phishingRisk}</span>
                        </p>
                      )}
                      {item.metadata?.flags && item.metadata.flags.length > 0 && (
                        <div className="mt-2">
                          <p className="text-gray-700 font-medium mb-1">Suspicious indicators:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.metadata.flags.map((flag, idx) => (
                              <span 
                                key={idx} 
                                className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-xs"
                              >
                                {flag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preview Text */}
                    {item.preview && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.preview}</p>
                    )}

                    {/* Confidence Bar */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-gray-600">Confidence:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                        <div
                          className={`h-2 rounded-full ${
                            item.isAIGenerated ? 'bg-red-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{item.confidence}%</span>
                    </div>

                    {/* Timestamp */}
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.timestamp)}
                    </p>

                    {/* Actions */}
                    {isAuthenticated && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <ShareToCommunity
                          type={item.type}
                          isAIGenerated={item.isAIGenerated}
                          confidence={item.confidence}
                          preview={item.preview}
                          metadata={item.metadata}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}