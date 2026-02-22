import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../../core/services/todo.service';
import { CategoryService } from '../../../core/services/category.service';
import { TodoItem, Priority } from '../../../models/todo.model';
import { Category } from '../../../models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-form',
  standalone: false,
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  @Input() todo: TodoItem | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  todoForm!: FormGroup;
  categories: Category[] = [];
  isLoading = false;
  priorities = [
    { value: Priority.Low, label: 'Basse' },
    { value: Priority.Medium, label: 'Moyenne' },
    { value: Priority.High, label: 'Haute' }
  ];

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  private initForm(): void {
    this.todoForm = this.fb.group({
      title: [this.todo?.title || '', [Validators.required, Validators.maxLength(200)]],
      description: [this.todo?.description || '', [Validators.maxLength(1000)]],
      priority: [this.todo?.priority || Priority.Medium, [Validators.required]],
      dueDate: [this.todo?.dueDate || null],
      categoryId: [this.todo?.categoryId || null]
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

 onSubmit(): void {
  if (this.todoForm.invalid) {
    return;
  }

  this.isLoading = true;
  const formData = this.todoForm.value;

  if (this.todo) {
    // Mode édition
    const updateData = { ...formData, isCompleted: this.todo.isCompleted };
    this.todoService.updateTodo(this.todo.id, updateData).subscribe({
      next: () => {
        this.snackBar.open('Tache mise a jour', 'Fermer', { duration: 2000 });
        this.isLoading = false;
        this.save.emit(); // ✅ Émettre l'événement
      },
      error: (error) => {
        console.error('Erreur update:', error);
        this.snackBar.open('Erreur lors de la mise a jour', 'Fermer', { duration: 3000 });
        this.isLoading = false;
      }
    });
  } else {
    // Mode création
    this.todoService.createTodo(formData).subscribe({
      next: () => {
        this.snackBar.open('Tache creee', 'Fermer', { duration: 2000 });
        this.isLoading = false;
        this.save.emit(); // ✅ Émettre l'événement
      },
      error: (error) => {
        console.error('Erreur creation:', error);
        this.snackBar.open('Erreur lors de la creation', 'Fermer', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}

  onCancel(): void {
    this.close.emit();
  }

  get f() {
    return this.todoForm.controls;
  }

  get isEditMode(): boolean {
    return !!this.todo;
  }
}