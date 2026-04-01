import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { IPersonInfo } from '../Models/IPersonInfo';
import { PersonResponse } from '../Models/PersonResponse';
import { PersonInfoService } from '../Services/person.service';
import { PersonInfoModal } from "../person-info-modal/person-info-modal";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-info',
  imports: [
    CommonModule
    , MatCard
    , MatCardActions
    , MatCardContent
    , MatTableModule
    , MatButtonModule
    , MatDialogModule
  ],
  templateUrl: './person-info.html',
  styleUrl: './person-info.scss',
})
export class PersonInfo implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog
    , private cdr: ChangeDetectorRef
    , private personInfoService: PersonInfoService
  ){}

  destroy$: Subject<any> = new Subject();

  displayedColumns: string[] = ['Id', 'Name', 'Address', 'BirthDate', 'Age', 'Action'];
  personInfoList: IPersonInfo[] = [];
  personItem: IPersonInfo | null = null;
  ngOnInit(): void {
    this.GetAllPersonInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  GetAllPersonInfo(): void {
    this.personInfoService.GetAllPersonInfo()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resp: PersonResponse) => {
        this.personInfoList = resp.result ? resp.data : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  CreatePersonInfo(): void {
    if (this.personItem) {
      this.personInfoService.CreatePersonInfo(this.personItem)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp: PersonResponse) => {
          if (resp.result) this.GetAllPersonInfo();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  onPersonInfoModal(item: IPersonInfo | null): void {
    const dialogRef = this.dialog.open(PersonInfoModal, {
      width: '50vw',
      maxWidth: '90vw',
      height: '80vh',
      disableClose: true,
      autoFocus: false,
      data: {...item}
    });
    
    dialogRef.afterClosed()
    .subscribe((result: IPersonInfo) => {
      if (result) {
        this.onSavePerson(result);
      }
    })
  }

  onSavePerson(person: IPersonInfo): void {
    this.personItem = {...person};
    if (!person.id) this.CreatePersonInfo();
  }

  closeModal(): void {
    
  }
}
