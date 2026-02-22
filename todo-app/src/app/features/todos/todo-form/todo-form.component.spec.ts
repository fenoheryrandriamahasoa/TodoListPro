import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormComponent } from './todo-form.component';

describe('TodoForm', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
