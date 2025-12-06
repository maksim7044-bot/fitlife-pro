
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Bell, Shield, Trash2, Save, Globe } from 'lucide-react';
import { Card, Button } from '../components/Shared';
import { useUser } from '../context/UserContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { stats, updateProfile } = useUser();
  
  const [name, setName] = useState(stats.name || '');
  const [goal, setGoal] = useState(stats.goal || 'Снижение веса');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    updateProfile({ name, goal });
    navigate(-1);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex items-center gap-3 shadow-sm">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Настройки</h1>
      </div>

      <div className="p-4 space-y-6">
          {/* Profile Section */}
          <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 pl-1">Профиль</h3>
              <Card className="space-y-4">
                  <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Имя в профиле</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Основная цель</label>
                      <select 
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                      >
                          <option>Снижение веса</option>
                          <option>Набор мышц</option>
                          <option>Поддержание формы</option>
                          <option>Выносливость</option>
                      </select>
                  </div>
              </Card>
          </div>

          {/* App Preferences */}
          <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 pl-1">Предпочтения</h3>
              <Card className="space-y-1 divide-y divide-slate-50">
                  <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Bell size={18} /></div>
                          <span className="font-medium text-slate-700">Уведомления</span>
                      </div>
                      <div 
                        onClick={() => setNotifications(!notifications)}
                        className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${notifications ? 'bg-blue-500' : 'bg-slate-200'}`}
                      >
                          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${notifications ? 'left-6' : 'left-1'}`} />
                      </div>
                  </div>

                  <div className="flex items-center justify-between py-2 pt-4">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Moon size={18} /></div>
                          <span className="font-medium text-slate-700">Тёмная тема</span>
                      </div>
                      <div 
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${darkMode ? 'bg-blue-500' : 'bg-slate-200'}`}
                      >
                          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'left-6' : 'left-1'}`} />
                      </div>
                  </div>

                  <div className="flex items-center justify-between py-2 pt-4">
                      <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Globe size={18} /></div>
                          <span className="font-medium text-slate-700">Язык</span>
                      </div>
                      <span className="text-sm text-slate-400 font-bold">Русский</span>
                  </div>
              </Card>
          </div>

          {/* Danger Zone */}
          <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3 pl-1">Аккаунт</h3>
              <Card>
                  <button className="w-full py-2 flex items-center gap-3 text-red-500 font-bold">
                      <Trash2 size={18} /> Удалить аккаунт
                  </button>
              </Card>
          </div>

          <Button onClick={handleSave} className="flex items-center justify-center gap-2">
              <Save size={20} /> Сохранить изменения
          </Button>
      </div>
    </div>
  );
};

export default Settings;
