import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Services
import { AuthService } from './services/auth.service';
import { TodoService } from './services/todo.service';
import { CategoryService } from './services/category.service';
import { TokenStorageService } from './services/token-storage.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // Services
    AuthService,
    TodoService,
    CategoryService,
    TokenStorageService,
    
    // Guards
    AuthGuard,
    
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  // S'assurer que CoreModule n'est importé qu'une seule fois
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}