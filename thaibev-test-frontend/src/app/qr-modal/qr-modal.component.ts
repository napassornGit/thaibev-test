import { Component, Input, OnInit } from '@angular/core';
import { product } from '../product/model/productModel';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import QRCode from 'qrcode';

@Component({
  selector: 'app-qr-modal',
  standalone: true,
  imports: [],
  templateUrl: './qr-modal.component.html',
  styleUrl: './qr-modal.component.scss',
})
export class QrModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) { }
  
  @Input() data!: product;

  qrImageUrl: string = '';

  ngOnInit(): void {
    if (this.data && this.data.id && this.data.code) {
      this.generateQR()
    }
  }

  async generateQR() {
    const qrUrl = `http://localhost:4200/product-detail?id=${this.data.id}&code=${this.data.code}`;
    this.qrImageUrl = await QRCode.toDataURL(qrUrl);
  }
}
