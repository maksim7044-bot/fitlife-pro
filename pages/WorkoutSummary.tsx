import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Dumbbell, Flame, Home, Share2 } from 'lucide-react';
import { Button, Card } from '../components/Shared';
import { notificationFeedback } from '../utils/telegram';

const WorkoutSummary: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        notificationFeedback('success');
    }, []);

    return (
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-6 z-50 overflow-y-auto text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full mx-auto animate-bounce-in">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/50 mb-6">
                    <CheckCircle size={48} strokeWidth={3} />
                </div>

                <h1 className="text-3xl font-black mb-2 text-center">Тренировка покорена!</h1>
                <p className="text-slate-400 mb-8 text-center">Отличная стабильность.</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center">
                        <Clock className="text-blue-400 mb-2" size={24} />
                        <span className="text-2xl font-black">45:20</span>
                        <span className="text-xs text-slate-400 uppercase font-bold">Длительность</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center">
                        <Dumbbell className="text-purple-400 mb-2" size={24} />
                        <span className="text-2xl font-black">4,250</span>
                        <span className="text-xs text-slate-400 uppercase font-bold">Объём (кг)</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center">
                        <Flame className="text-orange-400 mb-2" size={24} />
                        <span className="text-2xl font-black">320</span>
                        <span className="text-xs text-slate-400 uppercase font-bold">Калории</span>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-4 flex flex-col items-center shadow-lg shadow-orange-500/20">
                        <span className="text-xs font-bold uppercase text-white/80 mb-1">Получено</span>
                        <span className="text-3xl font-black">+20</span>
                        <span className="text-xs font-bold">опыта</span>
                    </div>
                </div>

                <div className="w-full space-y-3">
                    <Button onClick={() => navigate('/')} className="!bg-white !text-slate-900">
                        <Home size={20} /> На главную
                    </Button>
                    <Button variant="ghost" className="!text-white/70 hover:!bg-white/10">
                        <Share2 size={20} /> Поделиться результатом
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutSummary;