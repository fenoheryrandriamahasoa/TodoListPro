import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open('Inscription reussie!', 'Fermer', { duration: 3000 });
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Erreur lors de l\'inscription', 'Fermer', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}