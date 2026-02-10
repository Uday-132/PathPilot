import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MobileContainer from './components/layout/MobileContainer';
import BottomNav from './components/layout/BottomNav';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import { AppProvider } from './context/AppContext';
import GoalInputScreen from './screens/GoalInputScreen';
import LoadingScreen from './screens/LoadingScreen';
import RoadmapScreen from './screens/RoadmapScreen';
import ProgressScreen from './screens/ProgressScreen';
import ResourcesScreen from './screens/ResourcesScreen';
import ProfileScreen from './screens/ProfileScreen';
import TopicDetailScreen from './screens/TopicDetailScreen';

const AppContent = () => {
  const location = useLocation();

  // Hide bottom nav on Splash, Welcome, Goal Input, and Processing screens
  const hideNavRoutes = ['/', '/welcome', '/auth', '/goal', '/processing'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <MobileContainer>
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-slate-50 animate-fadeIn">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/auth" element={<AuthScreen />} />
          <Route path="/goal" element={<GoalInputScreen />} />
          <Route path="/processing" element={<LoadingScreen />} />
          <Route path="/roadmap" element={<RoadmapScreen />} />
          <Route path="/topic/:topicId" element={<TopicDetailScreen />} />
          <Route path="/resources" element={<ResourcesScreen />} />
          <Route path="/home" element={<ProgressScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </div>
      {showNav && <BottomNav />}
    </MobileContainer>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

export default App;
