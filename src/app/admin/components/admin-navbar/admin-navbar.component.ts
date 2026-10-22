import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthResponse } from '../../../shared/models/auth-Responce';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-navbar.component.html'
})
export class AdminNavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isCustomerLoggedIn = false;
  user: AuthResponse | null = null;
  
  private authSub!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Immediately hydrate from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
        this.isLoggedIn = !!this.user;
        this.isCustomerLoggedIn = this.user?.role === 'Customer';
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }

    // 2. Subscribe to reactive updates from AuthService
    this.authSub = this.auth.user$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
      this.isCustomerLoggedIn = user?.role === 'Customer';
    });
  }

  get isAdminLoggedIn(): boolean {
    if (!this.user || !this.user.role) return false;
    return this.user.role.toLowerCase() === 'admin';
  }

  // Toggles mini sidebar mode for desktop
  toggleSidebar(): void {
    const isCollapsed = document.body.classList.toggle('sidebar-icon-only');

    if (isCollapsed) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.scrollTop = 0;
        const navigation = sidebar.querySelector<HTMLElement>('.nav');
        if (navigation) {
          navigation.scrollTop = 0;
        }
      }
    }
  }

  // Toggles sidebar overlay for mobile screens
  toggleMobileSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }

  
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}