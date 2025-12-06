
import { UserStats, Macro, FoodItem, ExerciseDefinition } from './types';

export const INITIAL_USER_STATS: UserStats = {
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  zc: 50,
  streak: 0,
  weight: 0,
  hasOnboarded: false,
  name: 'Гость',
  goal: 'Поддержание',
  inventory: []
};

export const DAILY_TARGETS: Macro = {
  calories: 2200,
  protein: 160,
  fats: 70,
  carbs: 230,
};

export const RECENT_FOODS: FoodItem[] = [
  {
    id: '1',
    name: 'Овсянка с ягодами',
    macros: { calories: 350, protein: 12, fats: 6, carbs: 60 },
    timestamp: '2023-10-27T08:30:00',
    mealType: 'breakfast'
  },
  {
    id: '2',
    name: 'Куриная грудка на гриле',
    macros: { calories: 165, protein: 31, fats: 3.6, carbs: 0 },
    timestamp: '2023-10-27T13:00:00',
    mealType: 'lunch'
  },
  {
    id: '3',
    name: 'Рис с овощами',
    macros: { calories: 250, protein: 5, fats: 2, carbs: 50 },
    timestamp: '2023-10-27T13:00:00',
    mealType: 'lunch'
  }
];

export const MOCK_ACHIEVEMENTS = [
  { id: 1, name: 'Жаворонок', description: 'Записывайте завтрак 5 дней подряд', completed: true, icon: '🌅' },
  { id: 2, name: 'Железный атлет', description: 'Выполните 10 тренировок', completed: true, icon: '🏋️' },
  { id: 3, name: 'Мастер БЖУ', description: 'Достигайте нормы протеина 7 дней', completed: false, icon: '🥩' },
  { id: 4, name: 'Хранитель серии', description: 'Держите серию 14 дней', completed: false, icon: '🔥' },
];

export const INITIAL_EXERCISES: ExerciseDefinition[] = [
    { id: '1', name: 'Жим штанги лёжа', muscle: 'Грудь', type: 'Сила' },
    { id: '2', name: 'Жим гантелей на наклонной', muscle: 'Грудь', type: 'Гипертрофия' },
    { id: '3', name: 'Подтягивания', muscle: 'Спина', type: 'Собственный вес' },
    { id: '4', name: 'Присед со штангой', muscle: 'Ноги', type: 'Сила' },
    { id: '5', name: 'Румынская тяга', muscle: 'Ноги', type: 'Гипертрофия' },
];