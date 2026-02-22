import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Récupérer le token
    const token = this.tokenStorage.getToken();

    // Cloner la requête et ajouter le token dans les headers
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Gérer les erreurs HTTP
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue';

        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          errorMessage = `Erreur: ${error.error.message}`;
        } else {
          // Erreur côté serveur
          switch (error.status) {
            case 400:
              errorMessage = error.error?.message || 'Requête invalide';
              break;
            case 401:
              errorMessage = 'Session expirée. Veuillez vous reconnecter.';
              this.tokenStorage.clear();
              this.router.navigate(['/auth/login']);
              break;
            case 403:
              errorMessage = 'Accès refusé';
              break;
            case 404:
              errorMessage = 'Ressource non trouvée';
              break;
            case 500:
              errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
              break;
            default:
              errorMessage = error.error?.message || `Erreur ${error.status}`;
          }
        }

        console.error('HTTP Error:', errorMessage, error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}