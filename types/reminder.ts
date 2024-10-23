export interface Reminder {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    category: string;
    color: string;
    isPinned: boolean;
    isRecurring: boolean;
    recurringDay?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  }
  
  export interface Category {
    id: string
    name: string
    count: number
  }