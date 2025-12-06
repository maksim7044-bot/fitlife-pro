
import React, { useState } from 'react';
import { ArrowLeft, History, Save, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/Shared';
import { useUser } from '../context/UserContext';
import { notificationFeedback } from '../utils/telegram';

const Measurements: React.FC = () => {
  const navigate = useNavigate();
  const { addXp, addZc, updateTaskProgress, addMeasurementLog, measurementLogs, stats } = useUser();
  const [newWeight, setNewWeight] = useState<string>('');

  // Calculate trend based on stats (simplified for demo)
  const startWeight = 78.5; // Mock start
  const currentWeight = stats.weight || 0;
  const weightLoss = (startWeight - currentWeight).toFixed(1);

  const handleSave = () => {
      if (!newWeight) return;
      
      notificationFeedback('success');
      
      addMeasurementLog({
          id: Date.now().toString(),
          weight: parseFloat(newWeight),
          timestamp: new Date().toISOString(),
          waist: 82, // Mock default for simplicity
      });

      addXp(15, 'Замеры добавлены');
      addZc(5);
      updateTaskProgress('measure');
      
      navigate(-1);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Замеры</h1>
         </div>
         <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
             <History size={24} />
         </button>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Trend Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none">
            <div className="flex items-center gap-2 mb-2 opacity-80">
                <TrendingUp size={18} />
                <span className="text-xs font-bold uppercase">Всего потеряно</span>
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-3xl font-black">{weightLoss} кг</p>
                    <p className="text-sm opacity-80">С начала пути</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold">-2 см</p>
                    <p className="text-sm opacity-80">Талия</p>
                </div>
            </div>
        </Card>

        {/* Input Form */}
        <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">Новая запись</h2>
            <Card className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Вес (кг)</label>
                        <input 
                            type="number" 
                            placeholder={stats.weight.toString()}
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                            className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-800 text-lg focus:border-blue-500 outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Дата</label>
                        <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-600 text-sm focus:border-blue-500 outline-none" />
                    </div>
                </div>

                <div className="h-px bg-slate-100 w-full my-2"></div>

                <h3 className="text-sm font-bold text-slate-800">Замеры по зонам (см)</h3>
                <div className="grid grid-cols-2 gap-4">
                    {['Грудь', 'Талия', 'Бёдра', 'Левая рука', 'Правая рука', 'Левая нога', 'Правая нога'].map(part => (
                        <div key={part}>
                            <label className="block text-xs text-slate-500 mb-1">{part}</label>
                            <input type="number" className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800 focus:border-blue-500 outline-none" />
                        </div>
                    ))}
                </div>

                <Button className="mt-2" onClick={handleSave}>
                    <Save size={18} /> Сохранить замеры
                </Button>
            </Card>
        </div>

        {/* History */}
        <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">История</h2>
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-100">
                        <tr>
                            <th className="p-3 text-left font-medium">Дата</th>
                            <th className="p-3 text-center font-medium">Вес</th>
                            <th className="p-3 text-right font-medium">Талия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {measurementLogs.map((entry, i) => (
                            <tr key={i} className="active:bg-slate-50">
                                <td className="p-3 text-slate-800 font-medium">
                                    {new Date(entry.timestamp).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                                </td>
                                <td className="p-3 text-center text-slate-600">{entry.weight} кг</td>
                                <td className="p-3 text-right text-slate-600">{entry.waist || '-'} см</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Measurements;
