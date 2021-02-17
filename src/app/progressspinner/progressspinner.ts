import {Component} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

/**
 * @title Basic progress-spinner
 */
@Component({
  selector: 'progressspinner',
  templateUrl: 'progressspinner.html',
})
export class ProgressSpinnerDialog {

  constructor() {  
  
  }  

  // start(message?) {  
      
  //     const dialogRef = this.dialog.open(ProgressSpinnerDialog,{  
  //         disableClose: true ,  
  //         data: message == ''|| message == undefined ? "Loading..." : message  
  //     });  
  //     return dialogRef;  
  //   };  

  // stop(){  
  //   this.dialog.closeAll();  
  // }    

}