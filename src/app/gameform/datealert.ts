import { Component, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

    

@Component({
  selector: 'datealert',
  templateUrl: './datealert.html',
})
  
export class DateAlertDialog {
  dateTime : any = "";

  constructor(
    public dialogRef: MatDialogRef<DateAlertDialog>) {}
    @Input('matDialogClose') dialogResult: any

    @ViewChild('time') time: ElementRef;
    @ViewChild('date') date: ElementRef;


  onNoClick(): void {

    if(this.date.nativeElement.value !== "" && this.time.nativeElement.value !== ""){
      this.dateTime =this.date.nativeElement.value +" " + this.time.nativeElement.value;
      this.dialogRef.close(this.dateTime );
    }
   
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
