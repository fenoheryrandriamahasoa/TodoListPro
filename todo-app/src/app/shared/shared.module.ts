import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

// Composants partagés
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatIconModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSnackBarModule,
  MatMenuModule,
  MatTooltipModule,
  MatBadgeModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule
];

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    LoadingSpinnerComponent,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }