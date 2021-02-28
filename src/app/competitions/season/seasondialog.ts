import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DataproviderService } from 'src/app/dataprovider.service';


export interface SeasonData {
  dialogtype : string,
  action : string,
  name : string
}


@Component({
  selector: 'seasondialog',
  templateUrl: './seasondialog.html',
  styleUrls : ['./seasondialog.css']
})


export class SeasonDialog {
  Message : string;
  newName : string;
  emptyinput : boolean = true;
  
  constructor(
    public dataprovider : DataproviderService,
    public dialogRef: MatDialogRef<SeasonDialog>,
   @Inject(MAT_DIALOG_DATA) public data: SeasonData) {
    this.setMessage();
   }


  setMessage(): string {
    if(this.data.dialogtype==='season') {
      if(this.data.action==='add') {
        this.Message = 'Please enter a new season'
      }
    }

    if(this.data.dialogtype==='competition') {
      if(this.data.action==='add') {
        this.Message = 'Please enter a new competition'
      }
      if(this.data.action==='modify') {
        this.Message = 'Please rename the competition'
      }
      if(this.data.action==='delete') {
        this.Message = 'Are you sure you want to remove this competition ?'
      }
    }

    return this.Message
  }

  inputchanges(e){
    this.newName = e.target.value ;
    if (e.target.value) {
      this.emptyinput = false;
    }
  }


  closeDialog(){
    this.dialogRef.close();
  }

  confirmDialog(){
    if(this.data.action==='add'){
      this.setSeason(this.newName);
    }
  }

  setSeason(name){
    this.dataprovider.setSeason(name).then( () => {
      this.dialogRef.close({refresh : true});
    }).catch( err => {
      console.log('err', err)
    })
  }
  
}

