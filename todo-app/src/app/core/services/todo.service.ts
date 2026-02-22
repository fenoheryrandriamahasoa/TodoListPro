import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  TodoItem, 
  CreateTodoRequest, 
  UpdateTodoRequest 
} from '../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly API_URL = `${environment.apiUrl}/Todos`;

  // Observable pour la liste des tâches
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  public todos$ = this.todosSubject.asObservable();

  // Statistiques
  private statsSubject = new BehaviorSubject<{
    total: number;
    completed: number;
    pending: number;
    highPriority: number;
  }>({ total: 0, completed: 0, pending: 0, highPriority: 0 });
  public stats$ = this.statsSubject.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Récupérer toutes les tâches
   */
  getAllTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.API_URL)
      .pipe(
        tap(todos => {
          this.todosSubject.next(todos);
          this.updateStats(todos);
        })
      );
  }

  /**
   * Récupérer les tâches en cours
   */
  getPendingTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.API_URL}/pending`)
      .pipe(
        tap(todos => this.todosSubject.next(todos))
      );
  }

  /**
   * Récupérer les tâches terminées
   */
  getCompletedTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.API_URL}/completed`)
      .pipe(
        tap(todos => this.todosSubject.next(todos))
      );
  }

  /**
   * Récupérer une tâche par ID
   */
  getTodoById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.API_URL}/${id}`);
  }

  /**
   * Créer une nouvelle tâche
   */
  createTodo(todo: CreateTodoRequest): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.API_URL, todo)
      .pipe(
        tap(() => {
          this.refreshTodos(); 
        })
      );
  }

  /**
   * Mettre à jour une tâche
   */
  updateTodo(id: number, todo: UpdateTodoRequest): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, todo)
      .pipe(
        tap(() => this.refreshTodos())
      );
  }

  /**
   * Supprimer une tâche
   */
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(
        tap(() => this.refreshTodos())
      );
  }

  /**
   * Basculer le statut d'une tâche
   */
  toggleTodoStatus(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/toggle`, {})
      .pipe(
        tap(() => this.refreshTodos())
      );
  }

  /**
   * Rafraîchir la liste des tâches
   */
  private refreshTodos(): void {
    this.getAllTodos().subscribe();
  }

  /**
   * Mettre à jour les statistiques
   */
  private updateStats(todos: TodoItem[]): void {
    const stats = {
      total: todos.length,
      completed: todos.filter(t => t.isCompleted).length,
      pending: todos.filter(t => !t.isCompleted).length,
      highPriority: todos.filter(t => t.priority === 3 && !t.isCompleted).length
    };
    this.statsSubject.next(stats);
  }

  /**
   * Filtrer les tâches localement
   */
  filterTodos(filter: 'all' | 'pending' | 'completed'): TodoItem[] {
    const todos = this.todosSubject.value;
    
    switch (filter) {
      case 'pending':
        return todos.filter(t => !t.isCompleted);
      case 'completed':
        return todos.filter(t => t.isCompleted);
      default:
        return todos;
    }
  }

  /**
   * Rechercher des tâches
   */
  searchTodos(searchTerm: string): TodoItem[] {
    const todos = this.todosSubject.value;
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
      return todos;
    }

    return todos.filter(todo => 
      todo.title.toLowerCase().includes(term) ||
      (todo.description && todo.description.toLowerCase().includes(term)) ||
      (todo.categoryName && todo.categoryName.toLowerCase().includes(term))
    );
  }
}