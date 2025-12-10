import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr-product-detail',
  imports: [],
  templateUrl: './qr-product-detail.component.html',
  styleUrl: './qr-product-detail.component.scss',
})
export class QrProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  id: string | null = null;
  code: string | null = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.code = this.route.snapshot.queryParamMap.get('code');
  }
}
