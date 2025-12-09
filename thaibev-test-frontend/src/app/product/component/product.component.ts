import { CommonModule } from "@angular/common";
import { product } from "../model/productModel";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../service/product.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: product[] = [];
  loading = true;

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        // this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}
