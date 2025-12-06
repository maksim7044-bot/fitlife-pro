
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, MoreVertical, PlayCircle, Upload } from 'lucide-react';
import { Card } from '../../components/Shared';
import { useUser } from '../../context/UserContext';
import * as XLSX from 'xlsx';
import { ExerciseDefinition } from '../../types';

const CoachExercises: React.FC = () => {
  const navigate = useNavigate();
  const { exerciseLibrary, importExercises } = useUser();
  const [selectedGroup, setSelectedGroup] = useState('Все');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const newExercises: ExerciseDefinition[] = data.map((row: any) => ({
        id: crypto.randomUUID(),
        name: row.Name || row.name || 'Без названия',
        muscle: row.Muscle || row.muscle || 'Другое',
        type: row.Type || row.type || 'Сила',
        videoUrl: row.Video || row.video || '',
        description: row.Description || row.description || ''
      }));

      importExercises(newExercises);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsBinaryString(file);
  };

  const muscleGroups = ['Все', 'Грудь', 'Спина', 'Ноги', 'Плечи', 'Руки', 'Кор'];

  const filteredExercises = selectedGroup === 'Все' 
    ? exerciseLibrary 
    : exerciseLibrary.filter(e => e.muscle === selectedGroup);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center mb-4">
             <h1 className="text-2xl font-extrabold text-slate-900">Упражнения</h1>
             <div className="flex gap-2">
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".xlsx, .xls"
                    className="hidden"
                />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 active:scale-95 transition-transform"
                >
                    <Upload size={20} />
                </button>
                <button 
                    onClick={() => navigate('/coach/exercises/new')}
                    className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-transform"
                >
                    <Plus size={24} />
                </button>
             </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
            <input 
                className="w-full bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-xl py-3 pl-10 pr-4 focus:outline-none transition-colors"
                placeholder="Поиск упражнений..."
            />
            <button className="absolute right-3 top-3 text-slate-400"><Filter size={20} /></button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {muscleGroups.map(group => (
                <button 
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedGroup === group ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                    {group}
                </button>
            ))}
        </div>
      </div>

      {/* List */}
      <div className="p-4 grid gap-3">
          {filteredExercises.map(ex => (
              <Card 
                key={ex.id} 
                className="flex items-center p-3 gap-3 active:scale-[0.99] transition-transform cursor-pointer"
                onClick={() => navigate(`/coach/exercises/${ex.id}`)}
              >
                  <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center relative overflow-hidden group">
                       {/* Placeholder for image */}
                       <div className="absolute inset-0 bg-slate-300 flex items-center justify-center text-slate-500">
                          <PlayCircle size={24} />
                       </div>
                  </div>
                  <div className="flex-1">
                      <h3 className="font-bold text-slate-800">{ex.name}</h3>
                      <div className="flex gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded">{ex.muscle}</span>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded">{ex.type}</span>
                      </div>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-slate-600">
                      <MoreVertical size={20} />
                  </button>
              </Card>
          ))}
      </div>
    </div>
  );
};

export default CoachExercises;
