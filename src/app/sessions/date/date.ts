import { Component, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDatepicker} from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'date',
  templateUrl: './date.html',

})
  
export class DateDialog {
  dateTime : any = "";

  constructor(
    public dialogRef: MatDialogRef<DateDialog>) {}
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

  chosenYearHandler(normalizedYear) {

  }

  chosenMonthHandler(normalizedMonth, datepicker) {
    console.log('normalizedMonth',normalizedMonth)
    console.log('datepicker',datepicker)
    const ctrlValue = datepicker.value;
    // ctrlValue.month(normalizedMonth.month());
    normalizedMonth.setValue(ctrlValue);
    datepicker.close();
  }

}
