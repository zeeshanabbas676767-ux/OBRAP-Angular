import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../customer/components/navbar/navbar.component';
import { FooterComponent } from '../../customer/components/footer/footer.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './user-layout.component.html'
})
export class UserLayoutComponent {

  showBackToTop = false;

  // Show/Hide button based on window scroll position
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 300;
  }

  // Smooth scroll back to top
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
}
