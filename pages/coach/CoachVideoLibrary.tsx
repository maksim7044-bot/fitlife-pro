
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Play, Grid, List } from 'lucide-react';
import { Card } from '../../components/Shared';

const CoachVideoLibrary: React.FC = () => {
  const navigate = useNavigate();

  const videos = [
      { id: 1, title: 'Техника приседа', duration: '0:45', thumb: 'https://picsum.photos/seed/v1/300/200' },
      { id: 2, title: 'Форма становой тяги', duration: '1:20', thumb: 'https://picsum.photos/seed/v2/300/200' },
      { id: 3, title: 'Прогрессии отжиманий', duration: '2:10', thumb: 'https://picsum.photos/seed/v3/300/200' },
      { id: 4, title: 'Настройка жима лёжа', duration: '0:55', thumb: 'https://picsum.photos/seed/v4/300/200' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
       {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center shadow-sm">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Видеотека</h1>
         </div>
         <div className="flex gap-2">
             <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><Grid size={20} /></button>
             <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><List size={20} /></button>
         </div>
      </div>

      <div className="p-4 space-y-4">
          {/* Upload Box */}
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-slate-400 gap-3 bg-slate-100/50 hover:bg-white hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400">
                  <Upload size={24} />
              </div>
              <p className="text-sm font-bold uppercase tracking-wide">Загрузить новое видео</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-3">
              {videos.map(vid => (
                  <Card key={vid.id} className="!p-0 overflow-hidden group cursor-pointer">
                      <div className="relative aspect-video bg-slate-800">
                          <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                                  <Play size={20} fill="currentColor" />
                              </div>
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                              {vid.duration}
                          </span>
                      </div>
                      <div className="p-3">
                          <h3 className="font-bold text-sm text-slate-800 leading-tight">{vid.title}</h3>
                      </div>
                  </Card>
              ))}
          </div>
      </div>
    </div>
  );
};

export default CoachVideoLibrary;
