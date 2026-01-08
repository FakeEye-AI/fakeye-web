import { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { useAuth } from '../context/AuthContext';
import {
  Image,
  Video,
  FileText,
  Mail,
  Heart,
  MessageCircle,
  Send,
  Trash2,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
} from 'lucide-react';

export function Community() {
  const { posts, likePost, addComment, deletePost } = useCommunity();
  const { user, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'text' | 'email'>('all');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});

  const filteredPosts = posts.filter((post) => filter === 'all' || post.type === filter);

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
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleAddComment = (postId: string) => {
    const content = commentInputs[postId]?.trim();
    if (content) {
      addComment(postId, content);
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-gray-900 mb-2">Sign in to Access Community</h3>
        <p className="text-gray-600 mb-6">
          Join our community to share your analysis results and see what others have discovered
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-gray-900 mb-1">Community Feed</h2>
            <p className="text-gray-600">
              Share and explore AI detection results from the community
            </p>
          </div>
          <div className="bg-[#00B7B5]/20 p-3 rounded-full">
            <Shield className="w-6 h-6 text-[#005461]" />
          </div>
        </div>

        {/* Filter */}
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
                {type === 'all' ? 'All Posts' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">No Posts Yet</h3>
          <p className="text-gray-600">
            {filter === 'all'
              ? 'Be the first to share an analysis result with the community!'
              : `No ${filter} posts found. Try a different filter.`}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {post.userAvatar ? (
                    <img
                      src={post.userAvatar}
                      alt={post.username}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">{post.username.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-900">{post.username}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.timestamp)}
                    </div>
                  </div>
                </div>
                {user && post.userId === user.id && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Post Content */}
              <div className="space-y-4">
                {/* Type and Status */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                      post.type === 'image'
                        ? 'bg-[#00B7B5]/20 text-[#005461]'
                        : post.type === 'video'
                        ? 'bg-[#018790]/20 text-[#005461]'
                        : post.type === 'text'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {getTypeIcon(post.type)}
                    <span className="capitalize">{post.type} Analysis</span>
                  </div>
                  {post.isAIGenerated ? (
                    <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      <XCircle className="w-4 h-4" />
                      AI-Generated
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Authentic
                    </span>
                  )}
                  {post.metadata?.phishingRisk && (
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        post.metadata.phishingRisk === 'critical' ||
                        post.metadata.phishingRisk === 'high'
                          ? 'bg-red-100 text-red-700'
                          : post.metadata.phishingRisk === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Risk: {post.metadata.phishingRisk}
                    </span>
                  )}
                </div>

                {/* Description */}
                {post.description && (
                  <p className="text-gray-900">{post.description}</p>
                )}

                {/* Metadata */}
                {(post.metadata?.fileName ||
                  post.metadata?.subject ||
                  post.metadata?.sender ||
                  post.metadata?.textLength) && (
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 space-y-1">
                    {post.metadata.fileName && <p>File: {post.metadata.fileName}</p>}
                    {post.metadata.subject && <p>Subject: {post.metadata.subject}</p>}
                    {post.metadata.sender && <p>From: {post.metadata.sender}</p>}
                    {post.metadata.textLength && <p>Length: {post.metadata.textLength} characters</p>}
                  </div>
                )}

                {/* Preview */}
                {post.preview && (
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-3 text-sm line-clamp-3">
                    {post.preview}
                  </p>
                )}

                {/* Confidence */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Confidence:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                    <div
                      className={`h-2 rounded-full ${
                        post.isAIGenerated ? 'bg-red-600' : 'bg-green-600'
                      }`}
                      style={{ width: `${post.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-900">{post.confidence}%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => likePost(post.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    user && post.likes.includes(user.id)
                      ? 'bg-red-50 text-red-600'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      user && post.likes.includes(user.id) ? 'fill-current' : ''
                    }`}
                  />
                  <span>{post.likes.length}</span>
                </button>
                <button
                  onClick={() =>
                    setShowComments({ ...showComments, [post.id]: !showComments[post.id] })
                  }
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments.length}</span>
                </button>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                  {/* Comment List */}
                  {post.comments.length > 0 && (
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          {comment.userAvatar ? (
                            <img
                              src={comment.userAvatar}
                              alt={comment.username}
                              className="w-8 h-8 rounded-full flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm text-blue-600">
                                {comment.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-900">{comment.username}</span>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="flex gap-3">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-[#00B7B5]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm text-[#005461]">
                          {user?.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                        }
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        placeholder="Write a comment..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                        className="bg-[#018790] text-white p-2 rounded-lg hover:bg-[#005461] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}