
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import { Role } from './types';
import { UserProvider, useUser } from './context/UserContext';
import { RewardToast } from './components/Shared';

// Client Pages
import Dashboard from './pages/Dashboard';
import AddFood from './pages/AddFood';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';
import Diary from './pages/Diary';
import Measurements from './pages/Measurements';
import Workouts from './pages/Workouts';
import Challenges from './pages/Challenges';
import Shop from './pages/Shop';
import PhotoProgress from './pages/PhotoProgress';
import Planner from './pages/Planner';
import Reminders from './pages/Reminders';
import ActiveWorkout from './pages/ActiveWorkout';
import Achievements from './pages/Achievements';
import Onboarding from './pages/Onboarding';
import Settings from './pages/Settings';
import WorkoutSummary from './pages/WorkoutSummary';
import Chat from './pages/Chat';

// Coach Pages
import CoachDashboard from './pages/coach/CoachDashboard';
import CoachPlans from './pages/coach/CoachPlans';
import CoachPlanEditor from './pages/coach/CoachPlanEditor';
import CoachExercises from './pages/coach/CoachExercises';
import CoachExerciseEditor from './pages/coach/CoachExerciseEditor';
import CoachClientProfile from './pages/coach/CoachClientProfile';
import CoachMealPlans from './pages/coach/CoachMealPlans';
import CoachMealPlanEditor from './pages/coach/CoachMealPlanEditor';
import CoachVideoLibrary from './pages/coach/CoachVideoLibrary';
import CoachReports from './pages/coach/CoachReports';
import CoachClientActivity from './pages/coach/CoachClientActivity';

// Wrapper to handle layout based on route
const Layout: React.FC = () => {
  const location = useLocation();
  const { reward, stats } = useUser();
  
  // Onboarding Protection
  if (!stats.hasOnboarded && location.pathname !== '/onboarding') {
      return <Navigate to="/onboarding" replace />;
  }

  // Simple logic: if path starts with /coach, we are in coach role view
  const role = location.pathname.startsWith('/coach') ? Role.COACH : Role.CLIENT;
  
  // Hide bottom nav on specific active pages
  const hideNav = location.pathname.includes('/workout/active') || 
                  location.pathname.includes('/coach/plan/edit') || 
                  location.pathname.includes('/coach/meal-plan/edit') ||
                  location.pathname.includes('/coach/exercises/') ||
                  location.pathname === '/onboarding' ||
                  location.pathname === '/workout/summary' ||
                  location.pathname.includes('/chat');

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-blue-100 flex justify-center">
      <div className="w-full max-w-[480px] min-h-screen bg-slate-50 relative shadow-2xl">
        {reward && <RewardToast {...reward} />}
        
        <Routes>
          {/* Common Routes */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat/:id" element={<Chat />} />

          {/* Client Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/add" element={<AddFood />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/measure" element={<Measurements />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workout/active/:id" element={<ActiveWorkout />} />
          <Route path="/workout/summary" element={<WorkoutSummary />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/photo-progress" element={<PhotoProgress />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/reminders" element={<Reminders />} />

          {/* Coach Routes */}
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/coach/client/:id" element={<CoachClientProfile />} />
          <Route path="/coach/client-activity" element={<CoachClientActivity />} />
          <Route path="/coach/exercises" element={<CoachExercises />} />
          <Route path="/coach/exercises/:id" element={<CoachExerciseEditor />} />
          <Route path="/coach/plans" element={<CoachPlans />} />
          <Route path="/coach/plan/edit/:id" element={<CoachPlanEditor />} />
          <Route path="/coach/meal-plans" element={<CoachMealPlans />} />
          <Route path="/coach/meal-plan/edit/:id" element={<CoachMealPlanEditor />} />
          <Route path="/coach/video-library" element={<CoachVideoLibrary />} />
          <Route path="/coach/reports" element={<CoachReports />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {!hideNav && <BottomNav role={role} />}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#1e293b"; // Dark background outside the app
  }, []);

  return (
    <HashRouter>
      <UserProvider>
        <Layout />
      </UserProvider>
    </HashRouter>
  );
};

export default App;
