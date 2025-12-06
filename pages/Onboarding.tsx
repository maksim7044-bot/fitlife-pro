
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Target, Ruler, User } from 'lucide-react';
import { Button, Card } from '../components/Shared';
import { useUser } from '../context/UserContext';
import { hapticFeedback, notificationFeedback } from '../utils/telegram';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { updateProfile } = useUser();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    goal: 'Снижение веса',
    weight: 75,
  });

  const nextStep = () => {
    hapticFeedback('light');
    setStep(s => s + 1);
  };

  const finish = () => {
    notificationFeedback('success');
    updateProfile({
      name: formData.name || 'Пользователь',
      goal: formData.goal,
      weight: formData.weight,
      hasOnboarded: true
    });
    // The App.tsx router will detect hasOnboarded changed and redirect, 
    // but we can also push to home to be safe.
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-between animate-fade-in relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-40 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Progress */}
      <div className="flex gap-2 mt-4 relative z-10">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-blue-500' : 'bg-slate-100'}`} />
        ))}
      </div>

      {/* Step 1: Welcome & Name */}
      {step === 1 && (
        <div className="flex-1 flex flex-col justify-center relative z-10 animate-fade-in">
           <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
             <User size={32} />
           </div>
           <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Добро пожаловать в FitLife Pro!</h1>
           <p className="text-slate-500 mb-8">Давайте познакомимся. Как к вам обращаться?</p>
           
           <input 
             type="text" 
             placeholder="Ваше имя" 
             className="w-full p-4 text-lg font-bold border-b-2 border-slate-200 focus:border-blue-500 outline-none bg-transparent placeholder:text-slate-300"
             value={formData.name}
             onChange={(e) => setFormData({...formData, name: e.target.value})}
             autoFocus
           />
        </div>
      )}

      {/* Step 2: Goal */}
      {step === 2 && (
        <div className="flex-1 flex flex-col justify-center relative z-10 animate-fade-in">
           <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
             <Target size={32} />
           </div>
           <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Какова ваша главная цель?</h1>
           <p className="text-slate-500 mb-8">Мы адаптируем рекомендации под выбранную цель.</p>
           
           <div className="space-y-3">
             {['Снижение веса', 'Набор мышц', 'Поддержание формы', 'Выносливость'].map(g => (
               <Card 
                 key={g} 
                 className={`!p-4 border-2 transition-all ${formData.goal === g ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-slate-50'}`}
                 onClick={() => setFormData({...formData, goal: g})}
               >
                 <p className={`font-bold ${formData.goal === g ? 'text-blue-700' : 'text-slate-800'}`}>{g}</p>
               </Card>
             ))}
           </div>
        </div>
      )}

      {/* Step 3: Stats */}
      {step === 3 && (
        <div className="flex-1 flex flex-col justify-center relative z-10 animate-fade-in">
           <div className="w-16 h-16 bg-purple-100 text-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
             <Ruler size={32} />
           </div>
           <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Текущий вес</h1>
           <p className="text-slate-500 mb-8">Эти данные помогут подсчитать калории.</p>
           
           <div className="flex items-center justify-center gap-2 mb-8">
              <input 
                type="number" 
                className="text-6xl font-black text-center bg-transparent outline-none w-40 text-slate-800"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
              />
              <span className="text-xl font-bold text-slate-400 mt-4">кг</span>
           </div>
           
           <Card className="bg-slate-50 text-center">
             <p className="text-xs text-slate-400">Позже это можно изменить в настройках профиля.</p>
           </Card>
        </div>
      )}

      {/* Footer Actions */}
      <div className="relative z-10">
        {step < 3 ? (
          <Button onClick={nextStep} disabled={step === 1 && !formData.name}>
            Далее <ArrowRight size={20} />
          </Button>
        ) : (
          <Button onClick={finish}>
            Начать путь 🚀
          </Button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
