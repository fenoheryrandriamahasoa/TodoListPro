export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3
}

export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: Priority;
  createdAt: Date;
  dueDate?: Date;
  categoryId?: number;
  categoryName?: string;
  categoryColor?: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: Date;
  categoryId?: number;
}

export interface UpdateTodoRequest {
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: Priority;
  dueDate?: Date;
  categoryId?: number;
}