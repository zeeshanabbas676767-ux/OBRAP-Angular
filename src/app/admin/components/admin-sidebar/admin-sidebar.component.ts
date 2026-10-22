import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthResponse } from '../../../shared/models/auth-Responce';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.component.html'
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  user: AuthResponse | null = null;
  
  private authSub!: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // 1. Hydrate user session from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
        this.isLoggedIn = !!this.user;
      } catch (e) {
        console.error('Error parsing stored user', e);
      }
    }

    // 2. Subscribe to live auth state changes
    this.authSub = this.auth.user$.subscribe(user => {
      this.user = user;
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}