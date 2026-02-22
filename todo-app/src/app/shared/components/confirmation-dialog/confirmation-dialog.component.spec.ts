import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialog', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
