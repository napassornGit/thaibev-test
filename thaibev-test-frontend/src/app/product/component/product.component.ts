
import { product, productResponse } from "../model/productModel";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ProductService } from "../service/product.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ConfirmationDialogService } from "../../confirmation-dialog/confirmation-dialog.service";

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private confirmDialogService: ConfirmationDialogService
  ) {}

  destroy$: Subject<any> = new Subject();
  
  productForm!: FormGroup;
  product!: product;
  productList: product[] = [];

  ngOnInit(): void {
    this.productFormGroup();
    this.onSearchProduct();
    // this.productService.getAllProduct().subscribe({
    //   next: (data) => {
    //     // this.products = data;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.loading = false;
    //   }
    // });
  }

  ngOnDestroy() : void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  productFormGroup() : void {
    this.productForm = new FormGroup({
      id: new FormControl(),
      code: new FormControl('', [
        Validators.required, 
        Validators.pattern(/^[A-Z0-9]{5}(-[A-Z0-9]{5}){5}$/),
        Validators.maxLength(36)
      ])
    });
  }

  onSearchProduct() : void {
    this.productService.getAllProduct()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resp: productResponse) => {
        this.productList = resp.data;
        // if (resp.result) alert('เรียกข้อมูลสินค้าสำเร็จ จำนวน ' + this.productList.length + ' รายการ');
        // else alert('เรียกข้อมูลสินค้าสำเร็จ จำนวน ' + this.productList.length + ' รายการ');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onInputCode() : void {
    const codeControl = this.productForm.get('code');
    if (!codeControl) return;

    let value: string = codeControl.value || '';

    //ตัดตัวอักษรที่ไม่ได้อยู่ใน pattern
     value = value.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 36);

    //auto dash
    value = Array.from(value.matchAll(/.{1,5}/g)).map(m => m[0]).join('-');
    codeControl.setValue(value, { emitEvent: false });
  }

  onAddProduct() : void {
    this.productForm.get('code')?.markAsTouched();
    if (this.productForm.get('code')?.invalid) {
      this.cdr.markForCheck();
      return;
    }

    this.product = { ...this.productForm.value };
    this.productService.addProduct(this.product)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next : (resp: productResponse) => {
        alert(resp.message);
        this.onSearchProduct();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onViewProduct() : void {

  }

  onDeleteProduct(item: product) : void {
    this.confirmDialogService.confirm('ต้องการลบข้อมูล รหัสสินค้า ' + item.code + ' หรือไม่ ?')
    .then((comfirmed) => {
      if (comfirmed) {
        this.productService.deleteProduct(this.product)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next : (resp: productResponse) => {
            alert(resp.message);
            this.onSearchProduct();
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }
}
