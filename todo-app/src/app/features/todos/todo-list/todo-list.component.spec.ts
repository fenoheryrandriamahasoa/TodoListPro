import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

describe('TodoList', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
