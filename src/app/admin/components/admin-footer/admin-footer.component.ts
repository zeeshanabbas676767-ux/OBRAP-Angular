import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
 selector: 'app-admin-footer',
 standalone: true,
 imports: [DatePipe],
templateUrl: './admin-footer.component.html'
})
export class AdminFooterComponent {
   today: Date = new Date();
}