import { Injectable } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
    constructor(private modalService: NgbModal) {}

    public confirm(
    message: string,
    btnOkText: string = 'ตกลง',
    btnCancelText: string = 'ยกเลิก',
    dialogSize: 'sm'|'md'|'lg'|'xl' = 'md'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize, backdrop: 'static', keyboard: false });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}