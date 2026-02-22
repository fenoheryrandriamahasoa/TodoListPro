import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { TodoService } from '../../../core/services/todo.service';
import { CategoryService } from '../../../core/services/category.service';
import { TodoItem } from '../../../models/todo.model';
import { Category } from '../../../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  //  Utiliser des Observables
  private searchTermSubject = new BehaviorSubject<string>('');
  private currentFilterSubject = new BehaviorSubject<'all' | 'pending' | 'completed'>('all');
  private isLoadingSubject = new BehaviorSubject<boolean>(true);

  todos$: Observable<TodoItem[]>;
  filteredTodos$: Observable<TodoItem[]>;
  categories$: Observable<Category[]>;
  isLoading$ = this.isLoadingSubject.asObservable();

  searchTerm = '';
  currentFilter: 'all' | 'pending' | 'completed' = 'all';
  showForm = false;
  editingTodo: TodoItem | null = null;

  constructor(
    private todoService: TodoService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.todos$ = this.todoService.todos$;
    this.categories$ = this.categoryService.categories$;

    //  Filtrer automatiquement quand les données changent
    this.filteredTodos$ = combineLatest([
      this.todos$,
      this.searchTermSubject,
      this.currentFilterSubject
    ]).pipe(
      map(([todos, searchTerm, filter]) => {
        let result = [...todos];

        // Filtre par statut
        if (filter === 'pending') {
          result = result.filter(t => !t.isCompleted);
        } else if (filter === 'completed') {
          result = result.filter(t => t.isCompleted);
        }

        // Filtre par recherche
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase().trim();
          result = result.filter(t =>
            t.title.toLowerCase().includes(term) ||
            (t.description && t.description.toLowerCase().includes(term)) ||
            (t.categoryName && t.categoryName.toLowerCase().includes(term))
          );
        }

        return result;
      })
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoadingSubject.next(true);

    this.todoService.getAllTodos().subscribe({
      next: () => {
        this.isLoadingSubject.next(false);
      },
      error: (error) => {
        console.error('Erreur chargement todos:', error);
        this.isLoadingSubject.next(false);
        this.snackBar.open('Erreur lors du chargement des taches', 'Fermer', { duration: 3000 });
      }
    });

    this.categoryService.getAllCategories().subscribe();
  }

  onFilterChange(filter: 'all' | 'pending' | 'completed'): void {
    this.currentFilter = filter;
    this.currentFilterSubject.next(filter);
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchTermSubject.next(term);
  }

  onToggleStatus(todo: TodoItem): void {
    this.todoService.toggleTodoStatus(todo.id).subscribe({
      next: () => {
        this.snackBar.open('Statut mis a jour', 'Fermer', { duration: 2000 });
      },
      error: (error) => {
        console.error('Erreur toggle status:', error);
        this.snackBar.open('Erreur lors de la mise a jour', 'Fermer', { duration: 3000 });
      }
    });
  }

  onDeleteTodo(todo: TodoItem): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Supprimer la tache',
        message: `Voulez-vous vraiment supprimer "${todo.title}" ?`,
        confirmText: 'Supprimer',
        cancelText: 'Annuler'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteTodo(todo.id).subscribe({
          next: () => {
            this.snackBar.open('Tache supprimee', 'Fermer', { duration: 2000 });
          },
          error: (error) => {
            console.error('Erreur suppression:', error);
            this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 3000 });
          }
        });
      }
    });
  }

  onEditTodo(todo: TodoItem): void {
    this.editingTodo = todo;
    this.showForm = true;
  }

  onAddTodo(): void {
    this.editingTodo = null;
    this.showForm = true;
  }

  onFormClose(): void {
    this.showForm = false;
    this.editingTodo = null;
  }

  onFormSave(): void {
    this.showForm = false;
    this.editingTodo = null;
  }
}