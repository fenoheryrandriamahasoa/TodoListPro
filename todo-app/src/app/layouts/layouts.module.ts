import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    MainLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class LayoutsModule { }