import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  User 
} from '../../models/user.model';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.apiUrl;

  // Subjects internes
  private currentUserSubject!: BehaviorSubject<User | null>;
  private isAuthenticatedSubject!: BehaviorSubject<boolean>;

  // Observables exposés
  public currentUser$!: Observable<User | null>;
  public isAuthenticated$!: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    // Initialisation après injection des dépendances
    this.currentUserSubject = new BehaviorSubject<User | null>(
      this.tokenStorage.getUser()
    );
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(
      this.tokenStorage.isAuthenticated()
    );
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/Auth/register`, registerData)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  /**
   * Connexion d'un utilisateur
   */
  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/Auth/login`, loginData)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  /**
   * Déconnexion
   */
  logout(): void {
    this.tokenStorage.clear();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }

  /**
   * Récupérer l'utilisateur courant
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return this.tokenStorage.isAuthenticated();
  }

  /**
   * Gérer la réponse d'authentification
   */
  private handleAuthResponse(response: AuthResponse): void {
    // Sauvegarder le token
    this.tokenStorage.saveToken(response.token);

    // Construire l'objet User
    const user: User = {
      userId: response.userId,
      username: response.username,
      email: response.email
    };

    // Sauvegarder les infos utilisateur
    this.tokenStorage.saveUser(user);

    // Mettre à jour les observables
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }
}