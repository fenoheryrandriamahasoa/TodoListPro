import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItem', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
