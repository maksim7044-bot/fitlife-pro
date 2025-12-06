
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, Button } from '../../components/Shared';

const CoachReports: React.FC = () => {
  const navigate = useNavigate();

  const revenueData = [
    { name: 'Янв', amount: 1200 },
    { name: 'Фев', amount: 1900 },
    { name: 'Мар', amount: 1500 },
    { name: 'Апр', amount: 2100 },
    { name: 'Май', amount: 2400 },
    { name: 'Июн', amount: 2800 },
  ];

  const complianceData = [
    { name: 'Высокое', value: 65, color: '#22c55e' },
    { name: 'Среднее', value: 25, color: '#eab308' },
    { name: 'Низкое', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center shadow-sm">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={24} className="text-slate-700" />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Отчёты</h1>
         </div>
         <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
             <Download size={24} />
         </button>
      </div>

      <div className="p-4 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 border-l-4 border-l-green-500">
                  <div className="flex items-center gap-2 mb-1 text-green-600">
                      <DollarSign size={16} />
                      <span className="text-xs font-bold uppercase">Выручка</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">2,8 тыс. $</p>
                  <p className="text-[10px] text-slate-400">+15% к прошлому месяцу</p>
              </Card>
              <Card className="p-4 border-l-4 border-l-blue-500">
                  <div className="flex items-center gap-2 mb-1 text-blue-600">
                      <Users size={16} />
                      <span className="text-xs font-bold uppercase">Активные клиенты</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900">18</p>
                  <p className="text-[10px] text-slate-400">+2 за неделю</p>
              </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Рост выручки</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                      <Calendar size={12} /> 6 месяцев
                  </div>
              </div>
              <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                          <defs>
                              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                          <Tooltip contentStyle={{borderRadius: '12px', border: 'none'}} />
                          <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} fill="url(#colorRev)" />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </Card>

          {/* Compliance Breakdown */}
          <Card>
              <h3 className="font-bold text-slate-800 mb-4">Соблюдение планов</h3>
              <div className="flex items-center">
                  <div className="h-40 w-40 relative">
                      <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                              <Pie 
                                data={complianceData} 
                                innerRadius={40} 
                                outerRadius={60} 
                                paddingAngle={5} 
                                dataKey="value"
                              >
                                  {complianceData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                              </Pie>
                          </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-2xl font-bold text-slate-800">92%</span>
                          <span className="text-[10px] text-slate-400">сред.</span>
                      </div>
                  </div>
                  <div className="flex-1 pl-4 space-y-3">
                      {complianceData.map(item => (
                          <div key={item.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}} />
                                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                              </div>
                              <span className="font-bold text-slate-800">{item.value}%</span>
                          </div>
                      ))}
                  </div>
              </div>
          </Card>

          {/* Retention Stats */}
          <div className="p-4 bg-slate-900 rounded-2xl text-white">
              <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-slate-800 rounded-lg"><TrendingUp size={20} className="text-green-400" /></div>
                  <div>
                      <h3 className="font-bold text-lg">Удержание клиентов</h3>
                      <p className="text-xs text-slate-400">Лучше, чем у 85% тренеров</p>
                  </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{width: '94%'}}></div>
              </div>
              <div className="flex justify-between text-xs font-medium opacity-70">
                  <span>0%</span>
                  <span>94%</span>
                  <span>100%</span>
              </div>
          </div>

          <Button className="mt-4" variant="secondary">
              Экспортировать отчёт (PDF)
          </Button>
      </div>
    </div>
  );
};

export default CoachReports;
