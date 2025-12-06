
export enum Role {
  CLIENT = 'CLIENT',
  COACH = 'COACH',
}

export interface Macro {
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
}

export interface FoodItem {
  id: string;
  name: string;
  macros: Macro;
  timestamp: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  rewardXP: number;
  rewardZC: number;
  completed: boolean;
  icon: string;
  type: 'food' | 'workout' | 'measure' | 'photo';
  color: string;
}

export interface InventoryItem {
    id: number;
    name: string;
    type: 'Theme' | 'Badge' | 'Avatar' | 'Feature';
    image: string;
    purchasedAt: string;
}

export interface UserStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  zc: number; // Currency
  streak: number;
  weight: number;
  hasOnboarded: boolean;
  name?: string;
  goal?: string;
  inventory: InventoryItem[];
}

export interface DailyProgress {
    calories: number;
    protein: number;
    fats: number;
    carbs: number;
    workoutsCompleted: number;
}

// Workout Plan Structures
export interface ExerciseSet {
  id: string;
  reps: number;
  weight: number;
  restSeconds: number;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  sets: ExerciseSet[];
  notes?: string;
}

// For the Coach Library
export interface ExerciseDefinition {
  id: string;
  name: string;
  muscle: string;
  type: string;
  videoUrl?: string;
  description?: string;
}

export interface WorkoutDay {
  id: string;
  name: string; // "Day 1", "Day 2"
  exercises: Exercise[];
}

export interface Microcycle {
  id: string;
  name: string; // "Week 1"
  days: WorkoutDay[];
}

export interface Cycle {
  id: string;
  name: string; // "Month 1"
  microcycles: Microcycle[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  cycles: Cycle[];
}

// History Logs
export interface WorkoutLog {
    id: string;
    name: string;
    durationSeconds: number;
    totalVolume: number;
    timestamp: string;
    exercisesCompleted: number;
}

export interface MeasurementLog {
    id: string;
    timestamp: string;
    weight: number;
    waist?: number;
    chest?: number;
    hips?: number;
}

// Planner
export interface PlannedMeal {
    id: string;
    date: string; // YYYY-MM-DD
    type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
    name: string;
    calories: number;
    protein: number;
}