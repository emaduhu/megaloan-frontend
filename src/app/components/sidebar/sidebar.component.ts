import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../_services';
import { User } from '../../_models';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/transactions', title: 'Transactions',  icon:'library_books', class: '' },
    { path: '/meters', title: 'Meters',  icon:'library_books', class: '' },
    { path: '/reconciliation', title: 'Reconciliation',  icon:'library_books', class: '' },
    // { path: '/token-list', title: 'Tokens',  icon:'content_paste', class: '' },
    { path: '/users', title: 'Users',  icon:'person', class: '' },
    // { path: '/user-profile', title: 'Profile',  icon:'person', class: '' },
    
//     { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
//     { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
//     { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
//     { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
