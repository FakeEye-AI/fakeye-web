import { useLocation, useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { ImageDetector } from './components/ImageDetector';
import { VideoDetector } from './components/VideoDetector';
import { TextDetector } from './components/TextDetector';
import { EmailDetector } from './components/EmailDetector';
import { ChromeExtension } from './components/ChromeExtension';
import { History } from './components/History';
import { Community } from './components/Community';
import { Auth } from './components/Auth';
import { TermsOfService } from './components/TermsOfService';
import { HistoryProvider } from './context/HistoryContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CommunityProvider } from './context/CommunityContext';
import { routes, getRouteByPath, TabType } from './routes/routeConfig';
import { Image, Video, FileText, Mail, Chrome, Clock, Users, LogOut, User } from 'lucide-react';
import logo from './assets/logo.png';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const currentRoute = getRouteByPath(location.pathname);
  const activeTab = (currentRoute?.id || 'landing') as TabType;

  const handleNavigate = (tab: TabType) => {
    const route = routes.find(r => r.id === tab);
    if (route) navigate(route.path);
  };

  const tabs = [
    { id: 'image' as TabType, label: 'Image Detection', icon: Image },
    { id: 'video' as TabType, label: 'Video Detection', icon: Video },
    { id: 'text' as TabType, label: 'Text Detection', icon: FileText },
    { id: 'email' as TabType, label: 'Email Detection', icon: Mail },
    { id: 'extension' as TabType, label: 'Chrome Extension', icon: Chrome },
    { id: 'history' as TabType, label: 'History', icon: Clock },
    { id: 'community' as TabType, label: 'Community', icon: Users },
  ];

  // Show Landing Page without header/footer
  if (activeTab === 'landing') {
    return (
      <div className="min-h-screen">
        {/* Simple Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('landing')}>
                <img src={logo} alt="FakeEye" className="h-10" />
                <div>
                <h1 className="text-gray-900">FakeEye</h1>
                <p className="text-sm text-gray-600">AI Content Detection Platform</p>
              </div>
              </div>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => handleNavigate('image')}
                  className="text-[#018790] hover:text-[#005461] transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavigate('extension')}
                  className="text-[#018790] hover:text-[#005461] transition-colors"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => handleNavigate('history')}
                  className="text-[#018790] hover:text-[#005461] transition-colors"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => handleNavigate('community')}
                  className="text-[#018790] hover:text-[#005461] transition-colors"
                >
                  Community
                </button>
                <button 
                  onClick={() => handleNavigate('extension')}
                  className="text-[#018790] hover:text-[#005461] transition-colors"
                >
                  Extension
                </button>
              </nav>

              {/* Auth Button */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
                    ) : (
                      <div className="w-8 h-8 bg-[#00B7B5]/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-[#005461]" />
                      </div>
                    )}
                    <span className="text-sm text-gray-900 hidden sm:inline">{user?.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNavigate('community')}
                  className="px-6 py-2 bg-[#018790] text-white rounded-lg hover:bg-[#005461] transition-colors"
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </header>

        <LandingPage onGetStarted={() => handleNavigate('image')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavigate('landing')}>
              <img src={logo} alt="FakeEye" className="h-10" />
              <div>
                <h1 className="text-gray-900">FakeEye</h1>
                <p className="text-sm text-gray-600">AI Content Detection Platform</p>
              </div>
            </div>
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-[#00B7B5]/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-[#005461]" />
                    </div>
                  )}
                  <span className="text-sm text-gray-900">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigate('community')}
                className="flex items-center gap-2 px-4 py-2 bg-[#018790] text-white rounded-lg hover:bg-[#005461] transition-colors"
              >
                <User className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavigate(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#018790] text-[#005461]'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'image' && <ImageDetector />}
        {activeTab === 'video' && <VideoDetector />}
        {activeTab === 'text' && <TextDetector />}
        {activeTab === 'email' && <EmailDetector />}
        {activeTab === 'extension' && <ChromeExtension />}
        {activeTab === 'history' && <History />}
        {activeTab === 'community' && (isAuthenticated ? <Community /> : <Auth />)}
        {activeTab === 'terms' && <TermsOfService onBack={() => handleNavigate('landing')} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600">
            FakeEye uses advanced machine learning models to detect AI-generated content
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <HistoryProvider>
          <CommunityProvider>
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/image-detection" element={<AppContent />} />
              <Route path="/video-detection" element={<AppContent />} />
              <Route path="/text-detection" element={<AppContent />} />
              <Route path="/email-detection" element={<AppContent />} />
              <Route path="/extension" element={<AppContent />} />
              <Route path="/history" element={<AppContent />} />
              <Route path="/community" element={<AppContent />} />
              <Route path="/terms-of-service" element={<AppContent />} />
            </Routes>
          </CommunityProvider>
        </HistoryProvider>
      </AuthProvider>
    </Router>
  );
}