import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrProductDetailComponent } from './qr-product-detail.component';

describe('QrProductDetailComponent', () => {
  let component: QrProductDetailComponent;
  let fixture: ComponentFixture<QrProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrProductDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
