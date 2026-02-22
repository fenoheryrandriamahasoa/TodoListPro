import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly TOKEN_KEY = environment.tokenKey;
  private readonly USER_KEY = environment.userKey;

  constructor() { }

  /**
   * Sauvegarder le token JWT
   */
  saveToken(token: string): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Récupérer le token JWT
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Supprimer le token
   */
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Sauvegarder les infos utilisateur
   */
  saveUser(user: User): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Récupérer les infos utilisateur
   */
  getUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Supprimer les infos utilisateur
   */
  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Vérifier si le token est expiré
    try {
      const payload = this.decodeToken(token);
      const expirationDate = new Date(payload.exp * 1000);
      return expirationDate > new Date();
    } catch (error) {
      return false;
    }
  }

  /**
   * Décoder le token JWT
   */
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  /**
   * Nettoyer tout (déconnexion)
   */
  clear(): void {
    this.removeToken();
    this.removeUser();
  }
}