import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from '../../admin/components/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from '../../admin/components/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from '../../admin/components/admin-footer/admin-footer.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminNavbarComponent, AdminSidebarComponent, AdminFooterComponent],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private loadedStyles: HTMLElement[] = [];
  private loadedScripts: HTMLElement[] = [];

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // 1. Dynamically inject all required Admin CSS stylesheets
    const adminStyles = [
      'assets/template-admin/vendors/mdi/css/materialdesignicons.min.css',
      'assets/template-admin/vendors/ti-icons/css/themify-icons.css',
      'assets/template-admin/vendors/css/vendor.bundle.base.css',
      'assets/template-admin/vendors/font-awesome/css/font-awesome.min.css',
      'assets/template-admin/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css',
      'assets/template-admin/css/style.css'
    ];

    adminStyles.forEach(href => {
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.className = 'dynamic-admin-style';
      this.renderer.appendChild(this.document.head, link);
      this.loadedStyles.push(link);
    });

    // 2. Dynamically inject all required Admin JS scripts
    const adminScripts = [
      'assets/template-admin/vendors/js/vendor.bundle.base.js',
      'assets/template-admin/vendors/chart.js/chart.umd.js',
      'assets/template-admin/vendors/bootstrap-datepicker/bootstrap-datepicker.min.js',
      'assets/template-admin/js/off-canvas.js',
      'assets/template-admin/js/misc.js',
      'assets/template-admin/js/settings.js',
      'assets/template-admin/js/todolist.js',
      'assets/template-admin/js/jquery.cookie.js',
      'assets/template-admin/js/dashboard.js'
    ];

    adminScripts.forEach(src => {
      const script = this.renderer.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.className = 'dynamic-admin-script';
      this.renderer.appendChild(this.document.body, script);
      this.loadedScripts.push(script);
    });
  }

  ngOnDestroy(): void {
    // 3. Clean up and remove admin styles & scripts when leaving the admin panel
    this.loadedStyles.forEach(link => {
      this.renderer.removeChild(this.document.head, link);
    });
    this.loadedScripts.forEach(script => {
      this.renderer.removeChild(this.document.body, script);
    });
  }
}