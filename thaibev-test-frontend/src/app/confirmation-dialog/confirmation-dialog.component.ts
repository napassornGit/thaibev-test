import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirmation-dialog',
    standalone: true,
    imports: [],
    templateUrl: './confirmation-dialog.component.html',
    styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(private activeModal: NgbActiveModal) {}

  @Input() message!: string;
  @Input() btnOkText!: string;
  @Input() btnCancelText!: string;
  
  public decline() : void {
    this.activeModal.close(false);
  }

  public accept() : void {
    this.activeModal.close(true);
  }

  public dismis() : void {
    this.activeModal.dismiss();
  }
}
