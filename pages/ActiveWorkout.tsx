
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Clock, Check, ChevronDown, Play, Pause, SkipForward, Info, Youtube, Lightbulb } from 'lucide-react';
import { Card, Button } from '../components/Shared';
import { useUser } from '../context/UserContext';

const ActiveWorkout: React.FC = () => {
    const navigate = useNavigate();
    const { addXp, addZc, updateTaskProgress, addWorkoutLog } = useUser();

    // Timer State
    const [elapsed, setElapsed] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const startTimeRef = useRef(Date.now());
    const pausedTimeRef = useRef(0);

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    // Modal State
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState<any>(null);

    // Rest Timer State
    const [restSeconds, setRestSeconds] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const restIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Mock Workout Data (In a real app, this would come from the route ID)
    const exercises = [
        { id: 'e1', name: 'Присед со штангой', sets: 3, reps: 10, weight: 80, restTime: 90, muscle: 'Квадрицепсы', tips: ['Держите грудь раскрытой', 'Колени направляйте по линии носков', 'Толкайтесь пятками'] },
        { id: 'e2', name: 'Жим ногами', sets: 3, reps: 12, weight: 120, restTime: 60, muscle: 'Ноги', tips: ['Не выпрямляйте колени до конца', 'Делайте медленный негатив'] },
        { id: 'e3', name: 'Выпады с ходьбой', sets: 3, reps: 20, weight: 20, restTime: 60, muscle: 'Ягодицы', tips: ['Держите корпус ровно', 'Касайтесь пола коленом мягко'] },
    ];

    const [completedSets, setCompletedSets] = useState<boolean[][]>(
        exercises.map(ex => Array(ex.sets).fill(false))
    );

    // Global Workout Timer with Date delta for accuracy
    useEffect(() => {
        const timer = setInterval(() => {
            if (!isPaused) {
                setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const togglePause = () => {
        if (isPaused) {
            // Resuming: Adjust start time to account for pause duration
            const now = Date.now();
            const pauseDuration = now - pausedTimeRef.current;
            startTimeRef.current += pauseDuration;
            setIsPaused(false);
        } else {
            // Pausing
            pausedTimeRef.current = Date.now();
            setIsPaused(true);
        }
    };

    // Rest Timer Logic
    useEffect(() => {
        if (isResting && restSeconds > 0) {
            restIntervalRef.current = setInterval(() => {
                setRestSeconds(prev => {
                    if (prev <= 1) {
                        setIsResting(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (restIntervalRef.current) clearInterval(restIntervalRef.current);
        }
        return () => {
            if (restIntervalRef.current) clearInterval(restIntervalRef.current);
        };
    }, [isResting, restSeconds]);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const toggleSet = (exIdx: number, setIdx: number) => {
        const newSets = [...completedSets];
        const wasCompleted = newSets[exIdx][setIdx];
        newSets[exIdx][setIdx] = !wasCompleted;
        setCompletedSets(newSets);

        if (!wasCompleted) {
            setRestSeconds(exercises[exIdx].restTime || 60);
            setIsResting(true);
        }
    };

    const finishWorkout = () => {
        // Log to history
        addWorkoutLog({
            id: Date.now().toString(),
            name: 'День ног', // In real app, this comes from plan
            durationSeconds: elapsed,
            totalVolume: 4500, // Mock calculation
            timestamp: new Date().toISOString(),
            exercisesCompleted: exercises.length
        });

        addXp(20, 'Тренировка завершена');
        addZc(15);
        updateTaskProgress('workout');
        navigate('/workout/summary');
    };

    const addRestTime = (seconds: number) => {
        setRestSeconds(prev => prev + seconds);
        if (!isResting) setIsResting(true);
    };

    const openInfo = (ex: any, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedInfo(ex);
        setInfoModalOpen(true);
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-36 relative z-30">
            {/* Sticky Header */}
            <div className="bg-white p-4 sticky top-0 z-20 border-b border-slate-100 flex justify-between items-center shadow-sm">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
                    <ChevronDown size={24} />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-slate-900">День ног</h1>
                    <div className={`text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1 ${isPaused ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        <Clock size={10} />
                        {formatTime(elapsed)}
                    </div>
                </div>
                <button
                    onClick={finishWorkout}
                    className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-transform"
                >
                    Завершить
                </button>
            </div>

            {/* Workout Content */}
            <div className="p-4 space-y-6">
                {exercises.map((ex, exIdx) => (
                    <div key={ex.id} className={`transition-opacity duration-300 ${currentExerciseIndex === exIdx ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                        <div className="flex justify-between items-center mb-3" onClick={() => setCurrentExerciseIndex(exIdx)}>
                            <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
                                <span>{exIdx + 1}. {ex.name}</span>
                            </h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => openInfo(ex, e)}
                                    className="p-1.5 bg-blue-50 text-blue-500 rounded-full hover:bg-blue-100"
                                >
                                    <Info size={16} />
                                </button>
                                <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">{ex.sets} подхода</span>
                            </div>
                        </div>

                        <Card className="overflow-hidden !p-0 border border-slate-200">
                            {/* Table Header */}
                            <div className="grid grid-cols-10 bg-slate-50 p-2 text-[10px] uppercase font-bold text-slate-400 text-center border-b border-slate-100">
                                <div className="col-span-2">Подход</div>
                                <div className="col-span-3">Прошлый</div>
                                <div className="col-span-3">Текущий</div>
                                <div className="col-span-2">Готово</div>
                            </div>

                            {/* Sets */}
                            {Array.from({ length: ex.sets }).map((_, setIdx) => {
                                const isDone = completedSets[exIdx][setIdx];
                                return (
                                    <div key={setIdx} className={`grid grid-cols-10 p-3 items-center gap-2 border-b border-slate-50 last:border-0 ${isDone ? 'bg-green-50/50' : 'bg-white'}`}>
                                        <div className="col-span-2 flex justify-center">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center">
                                                {setIdx + 1}
                                            </div>
                                        </div>
                                        <div className="col-span-3 text-center text-xs text-slate-400">
                                            {ex.weight} кг × {ex.reps}
                                        </div>
                                        <div className="col-span-3 flex justify-center gap-1">
                                            <input
                                                defaultValue={ex.weight}
                                                className="w-10 bg-slate-100 rounded text-center text-sm font-bold p-1 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                            <input
                                                defaultValue={ex.reps}
                                                className="w-8 bg-slate-100 rounded text-center text-sm font-bold p-1 focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        </div>
                                        <div className="col-span-2 flex justify-center">
                                            <button
                                                onClick={() => toggleSet(exIdx, setIdx)}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90 ${isDone ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-100 text-slate-300'}`}
                                            >
                                                <Check size={18} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </Card>
                    </div>
                ))}
            </div>

            {/* Controls Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20 flex flex-col gap-3 max-w-[480px] mx-auto">

                {/* Rest Timer Bar */}
                {(isResting || restSeconds > 0) && (
                    <div className="bg-slate-900 text-white rounded-xl p-2 flex items-center justify-between px-4 animate-fade-in">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Отдых</span>
                        </div>
                        <span className="font-mono text-xl font-bold text-white">{formatTime(restSeconds)}</span>
                        <div className="flex gap-2">
                            <button onClick={() => addRestTime(30)} className="px-2 py-1 bg-slate-700 rounded text-xs font-bold hover:bg-slate-600">+30 с</button>
                            <button onClick={() => setIsResting(false)} className="px-2 py-1 bg-slate-700 rounded text-xs font-bold hover:bg-slate-600">Пропустить</button>
                        </div>
                    </div>
                )}

                <div className="flex gap-4 items-center justify-between">
                    <button
                        onClick={togglePause}
                        className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
                    >
                        {isPaused ? <Play fill="currentColor" size={24} /> : <Pause fill="currentColor" size={24} />}
                    </button>

                    <div className="flex-1 text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wide mb-1">Следующее упражнение</p>
                        <p className="text-sm font-bold text-slate-800 truncate px-2">
                            {exercises[Math.min(currentExerciseIndex + 1, exercises.length - 1)].name}
                        </p>
                    </div>

                    <button
                        onClick={() => setCurrentExerciseIndex(prev => Math.min(prev + 1, exercises.length - 1))}
                        className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition-transform"
                    >
                        <SkipForward fill="currentColor" size={24} />
                    </button>
                </div>
            </div>

            {/* Exercise Info Modal */}
            {infoModalOpen && selectedInfo && (
                <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center sm:justify-center animate-fade-in" onClick={() => setInfoModalOpen(false)}>
                    <div className="bg-white w-full h-[70vh] sm:h-[600px] sm:w-[400px] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{selectedInfo.name}</h2>
                                <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded uppercase">{selectedInfo.muscle}</span>
                            </div>
                            <button onClick={() => setInfoModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                                <X size={20} className="text-slate-600" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {/* Video Placeholder */}
                            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-white relative group cursor-pointer">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play fill="currentColor" size={24} />
                                </div>
                                <span className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-bold bg-black/50 px-2 py-1 rounded">
                                    <Youtube size={12} /> Смотреть разбор
                                </span>
                            </div>

                            {/* Tips */}
                            <div>
                                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                    <Lightbulb size={18} className="text-yellow-500" /> Советы
                                </h3>
                                <ul className="space-y-3">
                                    {selectedInfo.tips?.map((tip: string, i: number) => (
                                        <li key={i} className="flex gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
                                                {i + 1}
                                            </div>
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100">
                            <Button onClick={() => setInfoModalOpen(false)}>Понятно</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveWorkout;
