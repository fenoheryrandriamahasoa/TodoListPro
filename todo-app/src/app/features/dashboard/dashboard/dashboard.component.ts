import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TodoService } from '../../../core/services/todo.service';
import { CategoryService } from '../../../core/services/category.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  
  // ✅ Utiliser des Observables
  stats$: Observable<{
    total: number;
    completed: number;
    pending: number;
    highPriority: number;
  }>;
  
  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {
    this.stats$ = this.todoService.stats$;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadData();
  }

  private loadData(): void {
    this.todoService.getAllTodos().subscribe({
      next: () => {
        this.isLoadingSubject.next(false);
      },
      error: () => {
        this.isLoadingSubject.next(false);
      }
    });

    this.categoryService.getAllCategories().subscribe();
  }
}