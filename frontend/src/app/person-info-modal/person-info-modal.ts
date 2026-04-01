import { CommonModule, formatDate } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { IPersonInfo, PersonFormGroup } from '../Models/IPersonInfo';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-person-info-modal',
  imports: [
    CommonModule
    , ReactiveFormsModule
    , MatDialogActions
    , MatDialogContent
    , MatFormField
    , MatDatepickerModule
    , MatNativeDateModule
    , MatInputModule
    , MatButton
  ],
  templateUrl: './person-info-modal.html',
  styleUrl: './person-info-modal.scss',
  providers: [
    provideNativeDateAdapter()
  ]
})
export class PersonInfoModal implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonInfoModal>,
    @Inject(MAT_DIALOG_DATA) public data: IPersonInfo | null
  ){}

  @Input() personInfo: IPersonInfo | null = null;
  personForm!: PersonFormGroup;
  today = new Date();
  ngOnInit(): void {
    this.initPersonFormGroup();

    if (this.data?.id) this.personForm.disable();
  }

  initPersonFormGroup(): void {
    let date = new Date();
    if (this.data?.birthDate) {
      const parts = this.data.birthDate.split('-');
      date = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    }

    this.personForm = this.fb.nonNullable.group({
      id: this.data?.id ?? '',
      name: [this.data?.name ??'', Validators.required],
      lastName: [this.data?.lastName ?? '', Validators.required],
      address: [this.data?.address ??'', Validators.required],
      birthDate: [date, Validators.required],
      age: '0'
    });
  }

  onSave(): void {
    if (this.personForm.invalid) {
      this.personForm.markAllAsTouched();
      return;
    }

    const formValue = this.personForm.value;
    const payload = {
      ...formValue,
      BirthDate: formValue.birthDate ? formatDate(formValue.birthDate, 'dd/MM/yyyy', 'en-GB') : null
    };
    this.dialogRef.close(payload);
  }

  onBirthDateChange(event: any): void {
    const date: Date = event.value;

    if (!date) return;

    const age = new Date().getFullYear() - date.getFullYear();

    this.personForm.patchValue({
      age: age.toString()
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
