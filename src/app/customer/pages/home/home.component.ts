import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Shop } from '../../../shared/models/shop.model';
import { ShopService } from '../../../shared/services/shop.service';
import { CartService } from '../../../shared/services/cart.service';

declare var $: any;

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  products: Shop[] = [];
  filteredProducts: Shop[] = [];
  vegetables: Shop[] = [];
  categories: string[] = [];
  activeCategory = 'All';

  constructor(
    private shopService: ShopService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadHomeProducts();
  }

  loadHomeProducts() {

    this.shopService.getAll().subscribe((response: any) => {
      
      const data = response.data || response;
      this.products = data;
      this.filteredProducts = [...this.products];

      if (this.products && this.products.length > 0) {
        this.categories = [...new Set(this.products.map(p => p.categoryName))];
      }

      this.vegetables = this.products.filter(
        p => p.categoryName?.toLowerCase() === 'vegetables' || p.categoryName?.toLowerCase() === 'vegetable'
      );
      if (this.vegetables.length === 0) {
        this.vegetables = data.slice(0, 6);
      }

      // Initialize carousel via jQuery after database items are loaded into memory
      setTimeout(() => {
        this.initOwlCarousel();
      }, 100);
    });
  }

  initOwlCarousel() {
    if ($('.vegetable-carousel').length) {
      // Destroy previous instance if it exists to prevent overlapping bugs
      if ($('.vegetable-carousel').hasClass('owl-loaded')) {
        $('.vegetable-carousel').trigger('destroy.owl.carousel');
        $('.vegetable-carousel').removeClass('owl-loaded');
      }

      $('.vegetable-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
          '<i class="bi bi-arrow-left"></i>',
          '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 2 },
          992: { items: 3 },
          1200: { items: 4 }
        }
      });
    }
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    if (category === 'All') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        p => p.categoryName === category
      );
    }
  }

  addToCart(product: Shop): void {
    this.cartService.addToCart(product);
  }
}