
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { INITIAL_USER_STATS, RECENT_FOODS, INITIAL_EXERCISES } from '../constants';
import { UserStats, FoodItem, DailyTask, InventoryItem, WorkoutLog, MeasurementLog, PlannedMeal, ExerciseDefinition } from '../types';
import { hapticFeedback, notificationFeedback } from '../utils/telegram';

interface Reward {
  message: string;
  subMessage?: string;
  type: 'xp' | 'zc' | 'level_up' | 'info';
}

interface UserContextType {
  stats: UserStats;
  foodLogs: FoodItem[];
  workoutLogs: WorkoutLog[];
  measurementLogs: MeasurementLog[];
  dailyTasks: DailyTask[];
  plannedMeals: PlannedMeal[];
  exerciseLibrary: ExerciseDefinition[];
  
  addXp: (amount: number, source?: string) => void;
  addZc: (amount: number) => void;
  buyItem: (item: { id: number; name: string; price: number; type: string; image: string }) => boolean;
  updateProfile: (updates: Partial<UserStats>) => void;
  reward: Reward | null;
  showReward: (r: Reward) => void;
  clearReward: () => void;
  
  // Food Actions
  addFoodItem: (item: FoodItem) => void;
  updateFoodItem: (item: FoodItem) => void;
  deleteFoodItem: (id: string) => void;

  // Workout Actions
  addWorkoutLog: (log: WorkoutLog) => void;

  // Measurement Actions
  addMeasurementLog: (log: MeasurementLog) => void;

  // Task Actions
  updateTaskProgress: (type: DailyTask['type'], amount?: number) => void;

  // Planner Actions
  addPlannedMeal: (meal: PlannedMeal) => void;
  removePlannedMeal: (id: string) => void;

  // Coach Actions
  importExercises: (exercises: ExerciseDefinition[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const INITIAL_TASKS: DailyTask[] = [
    { 
        id: 't1', 
        title: 'Запишите завтрак', 
        description: 'Добавьте первый приём пищи', 
        current: 0, 
        target: 1, 
        rewardXP: 10, 
        rewardZC: 5, 
        completed: false, 
        icon: 'Utensils', 
        type: 'food',
        color: 'orange'
    },
    { 
        id: 't2', 
        title: 'Тренировка', 
        description: 'Завершите тренировку', 
        current: 0, 
        target: 1, 
        rewardXP: 50, 
        rewardZC: 20, 
        completed: false, 
        icon: 'Zap', 
        type: 'workout',
        color: 'blue'
    },
    { 
        id: 't3', 
        title: 'Гидратация', 
        description: 'Выпейте 2 литра воды', 
        current: 0, 
        target: 8, 
        rewardXP: 20, 
        rewardZC: 10, 
        completed: false, 
        icon: 'Droplet', 
        type: 'measure',
        color: 'cyan'
    }
];

// Initial Mock Data for Charts
const MOCK_WORKOUT_LOGS: WorkoutLog[] = [
    { id: 'w1', name: 'Верх тела', durationSeconds: 2700, totalVolume: 3500, exercisesCompleted: 6, timestamp: new Date(Date.now() - 86400000 * 2).toISOString() }, // 2 days ago
    { id: 'w2', name: 'День ног', durationSeconds: 3600, totalVolume: 4500, exercisesCompleted: 5, timestamp: new Date(Date.now() - 86400000 * 5).toISOString() } // 5 days ago
];

const MOCK_MEASUREMENTS: MeasurementLog[] = [
    { id: 'm1', weight: 76.5, timestamp: new Date(Date.now() - 86400000 * 14).toISOString() },
    { id: 'm2', weight: 76.0, timestamp: new Date(Date.now() - 86400000 * 7).toISOString() },
    { id: 'm3', weight: 75.5, timestamp: new Date(Date.now() - 86400000 * 1).toISOString() },
];

// Initial Planner Data
const MOCK_PLANNED_MEALS: PlannedMeal[] = [];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Stats
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('fitlife_stats');
    if (saved) return { ...INITIAL_USER_STATS, ...JSON.parse(saved) };
    return INITIAL_USER_STATS;
  });

  // Food Logs
  const [foodLogs, setFoodLogs] = useState<FoodItem[]>(() => {
      const saved = localStorage.getItem('fitlife_food');
      return saved ? JSON.parse(saved) : RECENT_FOODS;
  });

  // Workout Logs
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(() => {
      const saved = localStorage.getItem('fitlife_workouts');
      return saved ? JSON.parse(saved) : MOCK_WORKOUT_LOGS;
  });

  // Measurement Logs
  const [measurementLogs, setMeasurementLogs] = useState<MeasurementLog[]>(() => {
      const saved = localStorage.getItem('fitlife_measurements');
      return saved ? JSON.parse(saved) : MOCK_MEASUREMENTS;
  });

  // Daily Tasks
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(() => {
      const saved = localStorage.getItem('fitlife_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Planned Meals
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>(() => {
      const saved = localStorage.getItem('fitlife_planner');
      return saved ? JSON.parse(saved) : MOCK_PLANNED_MEALS;
  });

  // Exercise Library
  const [exerciseLibrary, setExerciseLibrary] = useState<ExerciseDefinition[]>(() => {
      const saved = localStorage.getItem('fitlife_exercises');
      return saved ? JSON.parse(saved) : INITIAL_EXERCISES;
  });

  const [reward, setReward] = useState<Reward | null>(null);

  // Persistence
  useEffect(() => { localStorage.setItem('fitlife_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { localStorage.setItem('fitlife_food', JSON.stringify(foodLogs)); }, [foodLogs]);
  useEffect(() => { localStorage.setItem('fitlife_workouts', JSON.stringify(workoutLogs)); }, [workoutLogs]);
  useEffect(() => { localStorage.setItem('fitlife_measurements', JSON.stringify(measurementLogs)); }, [measurementLogs]);
  useEffect(() => { localStorage.setItem('fitlife_tasks', JSON.stringify(dailyTasks)); }, [dailyTasks]);
  useEffect(() => { localStorage.setItem('fitlife_planner', JSON.stringify(plannedMeals)); }, [plannedMeals]);
  useEffect(() => { localStorage.setItem('fitlife_exercises', JSON.stringify(exerciseLibrary)); }, [exerciseLibrary]);

  // Auto-clear rewards
  useEffect(() => {
    if (reward) {
      const timer = setTimeout(() => setReward(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [reward]);

  const addZc = (amount: number) => {
    setStats(prev => ({ ...prev, zc: prev.zc + amount }));
    setReward({ message: `+${amount} ZC`, type: 'zc' });
  };

  const addXp = (amount: number, source?: string) => {
    setStats(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newNextLevelXp = prev.nextLevelXp;

      if (newXp >= prev.nextLevelXp) {
        newLevel += 1;
        newXp = newXp - prev.nextLevelXp;
        newNextLevelXp = Math.floor(prev.nextLevelXp * 1.2);
        
        setTimeout(() => {
            notificationFeedback('success');
        setReward({ 
            message: `НОВЫЙ УРОВЕНЬ!`, 
            subMessage: `Добро пожаловать на уровень ${newLevel}`, 
            type: 'level_up' 
        });
        }, 500);
      } else {
        setReward({ message: `+${amount} опыта`, subMessage: source, type: 'xp' });
      }

      return { ...prev, xp: newXp, level: newLevel, nextLevelXp: newNextLevelXp };
    });
  };

  const buyItem = (item: { id: number; name: string; price: number; type: string; image: string }) => {
      if (stats.zc >= item.price) {
          const newItem: InventoryItem = {
              id: item.id,
              name: item.name,
              type: item.type as any,
              image: item.image,
              purchasedAt: new Date().toISOString()
          };
          
          setStats(prev => ({
              ...prev,
              zc: prev.zc - item.price,
              inventory: [...prev.inventory, newItem]
          }));
          
          hapticFeedback('medium');
          setReward({ message: 'Покупка оформлена!', subMessage: item.name, type: 'info' });
          return true;
      } else {
          notificationFeedback('error');
          return false;
      }
  };

  const updateProfile = (updates: Partial<UserStats>) => {
      setStats(prev => ({ ...prev, ...updates }));
  };

  // --- Food Actions ---
  const addFoodItem = (item: FoodItem) => {
      setFoodLogs(prev => [item, ...prev]);
      updateTaskProgress('food');
  };

  const updateFoodItem = (item: FoodItem) => {
      setFoodLogs(prev => prev.map(f => f.id === item.id ? item : f));
  };

  const deleteFoodItem = (id: string) => {
      setFoodLogs(prev => prev.filter(f => f.id !== id));
  };

  // --- Workout Actions ---
  const addWorkoutLog = (log: WorkoutLog) => {
      setWorkoutLogs(prev => [log, ...prev]);
  };

  // --- Measurement Actions ---
  const addMeasurementLog = (log: MeasurementLog) => {
      setMeasurementLogs(prev => [log, ...prev]);
      updateProfile({ weight: log.weight });
  };

  // --- Planner Actions ---
  const addPlannedMeal = (meal: PlannedMeal) => {
      setPlannedMeals(prev => [...prev, meal]);
      notificationFeedback('success');
  };

  const removePlannedMeal = (id: string) => {
      setPlannedMeals(prev => prev.filter(m => m.id !== id));
      hapticFeedback('light');
  };

  // --- Exercise Library Actions ---
  const importExercises = (newExercises: ExerciseDefinition[]) => {
    setExerciseLibrary(prev => {
      // Prevent duplicates by name
      const existingNames = new Set(prev.map(e => e.name.toLowerCase()));
      const filteredNew = newExercises.filter(e => !existingNames.has(e.name.toLowerCase()));
      return [...prev, ...filteredNew];
    });
    notificationFeedback('success');
    setReward({ message: 'Импорт завершён!', subMessage: `Добавлено ${newExercises.length} упражнений`, type: 'info' });
  };

  // --- Task Logic ---
  const updateTaskProgress = (type: DailyTask['type'], amount: number = 1) => {
      setDailyTasks(prev => prev.map(task => {
          if (task.type === type && !task.completed) {
              const newCurrent = Math.min(task.current + amount, task.target);
              const isJustCompleted = newCurrent >= task.target;
              
              if (isJustCompleted) {
                  setTimeout(() => {
                      notificationFeedback('success');
                      addXp(task.rewardXP, `${task.title} выполнена`);
                      addZc(task.rewardZC);
                  }, 300);
              }

              return { ...task, current: newCurrent, completed: isJustCompleted };
          }
          return task;
      }));
  };

  const showReward = (r: Reward) => setReward(r);
  const clearReward = () => setReward(null);

  return (
    <UserContext.Provider value={{ 
        stats, foodLogs, workoutLogs, measurementLogs, dailyTasks, plannedMeals, exerciseLibrary,
        addXp, addZc, updateProfile, reward, showReward, clearReward,
        addFoodItem, updateFoodItem, deleteFoodItem, updateTaskProgress,
        addWorkoutLog, addMeasurementLog,
        addPlannedMeal, removePlannedMeal,
        buyItem, importExercises
    }}>
      {children}
    </UserContext.Provider>
  );
};
