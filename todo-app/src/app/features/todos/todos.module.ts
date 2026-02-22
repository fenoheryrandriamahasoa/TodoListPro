import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosRoutingModule } from './todos-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutsModule } from '../../layouts/layouts.module';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoFormComponent,
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
    LayoutsModule
  ]
})
export class TodosModule { }