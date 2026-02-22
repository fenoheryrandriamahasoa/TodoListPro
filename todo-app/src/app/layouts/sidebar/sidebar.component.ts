import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = true;

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'list', label: 'Mes Taches', route: '/todos' }
  ];
}