import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Shop } from '../../../shared/models/shop.model';
import { ShopService } from '../../../shared/services/shop.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-shop-detail',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shop-detail.component.html',
})
export class ShopDetailComponent implements OnInit {
  product: Shop | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const productId = Number(idParam);
      this.loadProduct(productId);
    }
  }

  loadProduct(id: number): void {
    // Assuming your ShopService has a method to fetch a single product by ID
    this.shopService.getById(id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.log('Error fetching product details:', err);
      }
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      alert(`🎉 Added ${this.quantity} item(s) to cart successfully!`);
    }
  }
}