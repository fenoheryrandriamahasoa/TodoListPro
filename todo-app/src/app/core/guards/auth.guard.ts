import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree,
  Router,
  CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Vérifier si l'utilisateur est authentifié
    if (this.tokenStorage.isAuthenticated()) {
      return true;
    }

    // Rediriger vers la page de connexion avec l'URL de retour
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}