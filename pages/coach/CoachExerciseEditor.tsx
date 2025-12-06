
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Video, Image as ImageIcon, PlayCircle, Trash2 } from 'lucide-react';
import { Card, Button } from '../../components/Shared';

const CoachExerciseEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === 'new';

  const [formData, setFormData] = useState({
    name: isNew ? '' : 'Жим штанги лёжа',
    muscleGroup: isNew ? 'Грудь' : 'Грудь',
    description: isNew ? '' : 'Базовое упражнение для груди, плеч и трицепсов.',
    videoUrl: '',
  });

  const muscleGroups = ['Грудь', 'Спина', 'Ноги', 'Плечи', 'Руки', 'Кор', 'Кардио'];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <div>
                <h1 className="text-xl font-bold text-slate-900">{isNew ? 'Новое упражнение' : 'Редактировать упражнение'}</h1>
                <p className="text-xs text-slate-500">{isNew ? 'Создайте новое движение' : 'Обновите параметры'}</p>
            </div>
        </div>
        <button className="text-blue-500 font-bold text-sm hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
            Сохранить
        </button>
      </div>

      <div className="p-4 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
              <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Название</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Например, присед"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 outline-none font-bold text-slate-800"
                  />
              </div>

              <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Мышечная группа</label>
                  <div className="flex flex-wrap gap-2">
                      {muscleGroups.map(group => (
                          <button
                            key={group}
                            onClick={() => setFormData({...formData, muscleGroup: group})}
                            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${formData.muscleGroup === group ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}`}
                          >
                              {group}
                          </button>
                      ))}
                  </div>
              </div>

              <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Описание / техника</label>
                  <textarea 
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    placeholder="Опишите технику выполнения..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:border-blue-500 outline-none text-sm text-slate-700"
                  />
              </div>
          </div>

          {/* Media Section */}
          <div>
              <h3 className="font-bold text-slate-800 mb-3">Медиа</h3>
              <div className="grid grid-cols-2 gap-3">
                  <Card className="border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 py-8 text-slate-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:bg-white transition-all">
                      <Video size={32} />
                      <span className="text-xs font-bold uppercase">Добавить видео</span>
                  </Card>
                  <Card className="border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 py-8 text-slate-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 hover:bg-white transition-all">
                      <ImageIcon size={32} />
                      <span className="text-xs font-bold uppercase">Добавить фото</span>
                  </Card>
              </div>
          </div>

          {/* Preview Card */}
          <div>
              <h3 className="font-bold text-slate-800 mb-3">Предпросмотр</h3>
              <Card className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-white">
                      <PlayCircle size={24} />
                  </div>
                  <div>
                      <h4 className="font-bold text-slate-800">{formData.name || 'Название упражнения'}</h4>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">{formData.muscleGroup}</span>
                  </div>
              </Card>
          </div>

          {!isNew && (
                  <Button variant="danger" className="mt-8 flex items-center justify-center gap-2">
                  <Trash2 size={18} /> Удалить упражнение
              </Button>
          )}
      </div>
    </div>
  );
};

export default CoachExerciseEditor;
