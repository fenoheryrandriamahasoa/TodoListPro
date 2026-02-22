import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem, Priority } from '../../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: TodoItem;
  @Output() toggle = new EventEmitter<TodoItem>();
  @Output() edit = new EventEmitter<TodoItem>();
  @Output() delete = new EventEmitter<TodoItem>();

  Priority = Priority;

  onToggle(): void {
    this.toggle.emit(this.todo);
  }

  onEdit(): void {
    this.edit.emit(this.todo);
  }

  onDelete(): void {
    this.delete.emit(this.todo);
  }

  getPriorityLabel(): string {
    switch (this.todo.priority) {
      case Priority.Low:
        return 'Basse';
      case Priority.Medium:
        return 'Moyenne';
      case Priority.High:
        return 'Haute';
      default:
        return '';
    }
  }

  getPriorityClass(): string {
    switch (this.todo.priority) {
      case Priority.Low:
        return 'priority-low';
      case Priority.Medium:
        return 'priority-medium';
      case Priority.High:
        return 'priority-high';
      default:
        return '';
    }
  }
}