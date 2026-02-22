import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  returnUrl: string = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open('Connexion reussie!', 'Fermer', { duration: 3000 });
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Erreur de connexion', 'Fermer', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}