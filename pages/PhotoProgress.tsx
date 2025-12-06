
import React, { useState } from 'react';
import { ArrowLeft, Camera, Grid, Columns, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { notificationFeedback, hapticFeedback } from '../utils/telegram';
import { Button } from '../components/Shared';

const PhotoProgress: React.FC = () => {
  const navigate = useNavigate();
  const { addXp, addZc, updateTaskProgress } = useUser();
  
  // Comparison State
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Mock photos
  const [photos, setPhotos] = useState([
      { id: 1, date: '27 окт', weight: '75.5 кг', src: 'https://picsum.photos/id/1005/300/400' },
      { id: 2, date: '10 окт', weight: '76.8 кг', src: 'https://picsum.photos/id/1011/300/400' },
      { id: 3, date: '25 сен', weight: '78.2 кг', src: 'https://picsum.photos/id/1027/300/400' },
      { id: 4, date: '1 сен', weight: '79.5 кг', src: 'https://picsum.photos/id/1012/300/400' },
  ]);

  const handleAddPhoto = () => {
      notificationFeedback('success');
      addXp(25, 'Фото загружено');
      addZc(10);
      updateTaskProgress('photo');
      
      // Mock add new photo
      const newPhoto = {
          id: Date.now(),
          date: 'Сегодня',
          weight: '75.0 кг',
          src: `https://picsum.photos/seed/${Date.now()}/300/400`
      };
      setPhotos([newPhoto, ...photos]);
  };

  const toggleSelection = (id: number) => {
      hapticFeedback('light');
      if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter(pid => pid !== id));
      } else {
          if (selectedIds.length < 2) {
              setSelectedIds([...selectedIds, id]);
          }
      }
  };

  const startComparison = () => {
      if (selectedIds.length === 2) {
          setShowComparison(true);
          notificationFeedback('success');
      }
  };

  const toggleMode = () => {
      setIsSelectionMode(!isSelectionMode);
      setSelectedIds([]);
  };

  const getSelectedPhotos = () => {
      return photos.filter(p => selectedIds.includes(p.id)).sort((a, b) => b.id - a.id); // Newest first
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-20 text-white relative">
       {/* Header */}
       <div className="p-4 flex justify-between items-center sticky top-0 z-10 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
           <div className="flex items-center gap-4">
               <button onClick={() => navigate(-1)}><ArrowLeft size={24} /></button>
               <h1 className="text-xl font-bold">Прогресс</h1>
           </div>
           <div className="flex gap-2">
               <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white"><Grid size={20} /></button>
               <button 
                onClick={toggleMode}
                className={`p-2 rounded-lg transition-colors ${isSelectionMode ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
               >
                   <Columns size={20} />
               </button>
           </div>
       </div>

       {/* Photo Grid */}
       <div className="p-4 grid grid-cols-2 gap-3 pb-32">
           {/* Add New Card */}
           {!isSelectionMode && (
                <button 
                        onClick={handleAddPhoto}
                        className="aspect-[3/4] bg-slate-800 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-blue-400 hover:border-blue-500 hover:bg-slate-800/50 transition-all"
                >
                    <Camera size={32} />
                    <span className="text-xs font-bold uppercase tracking-wide">Добавить фото</span>
                </button>
           )}

           {photos.map(photo => {
               const isSelected = selectedIds.includes(photo.id);
               return (
                   <div 
                        key={photo.id} 
                        onClick={() => isSelectionMode ? toggleSelection(photo.id) : null}
                        className={`relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-800 group cursor-pointer transition-all ${isSelected ? 'ring-4 ring-blue-500 transform scale-[0.98]' : ''}`}
                   >
                       <img src={photo.src} alt={photo.date} className={`w-full h-full object-cover transition-opacity ${isSelectionMode ? 'opacity-60' : 'opacity-80 group-hover:opacity-100'}`} />
                       
                       <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                           <p className="font-bold text-sm">{photo.date}</p>
                           <p className="text-xs text-slate-300">{photo.weight}</p>
                       </div>

                       {/* Checkbox Overlay */}
                       {isSelectionMode && (
                           <div className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-white/50 bg-black/20'}`}>
                               {isSelected && <CheckCircle size={16} className="text-white" />}
                           </div>
                       )}
                   </div>
               );
           })}
       </div>

       {/* Comparison Floating Action Bar */}
       {isSelectionMode && (
           <div className="fixed bottom-6 left-0 right-0 px-6 z-20 animate-slide-up">
               <div className="bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between">
                   <span className="font-bold text-slate-300">{selectedIds.length} / 2 выбрано</span>
                   <div className="flex gap-3">
                       <Button variant="secondary" onClick={toggleMode} className="!w-auto !py-2 !px-4 !bg-slate-700 !text-white">
                           Отмена
                       </Button>
                       <Button 
                        onClick={startComparison} 
                        disabled={selectedIds.length !== 2} 
                        className={`!w-auto !py-2 !px-4 ${selectedIds.length !== 2 ? 'opacity-50' : ''}`}
                       >
                           Сравнить
                       </Button>
                   </div>
               </div>
           </div>
       )}

       {/* Comparison Modal */}
       {showComparison && (
           <div className="fixed inset-0 z-50 bg-black flex flex-col animate-fade-in">
               <div className="p-4 flex justify-between items-center bg-black/50 backdrop-blur-md absolute top-0 left-0 right-0 z-10">
                   <h2 className="font-bold text-lg">Сравнение</h2>
                   <button onClick={() => setShowComparison(false)} className="p-2 bg-white/10 rounded-full">
                       <X size={20} />
                   </button>
               </div>
               
               <div className="flex-1 grid grid-cols-2 h-full">
                   {getSelectedPhotos().reverse().map((photo, idx) => (
                       <div key={photo.id} className="h-full relative border-r border-white/10 last:border-0">
                           <img src={photo.src} className="w-full h-full object-cover" />
                           <div className="absolute bottom-10 left-0 right-0 text-center bg-black/50 backdrop-blur-sm py-2">
                               <p className="font-bold text-lg">{idx === 0 ? 'До' : 'После'}</p>
                               <p className="text-sm text-slate-300">{photo.date} • {photo.weight}</p>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       )}
    </div>
  );
};

export default PhotoProgress;
