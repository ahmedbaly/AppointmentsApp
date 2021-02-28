import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataproviderService } from 'src/app/dataprovider.service';


export interface StandingData {
  id : number,
  id_club : number,
  id_competition : number,
  score : number,
  round : number,
  club : string,
  type : string
}


@Component({
  selector: 'standingdialog',
  templateUrl: './standingdialog.html',
  styleUrls : ['./standingdialog.css']
})


export class StandingDialog {
  cup : boolean = false;
  toppings = new FormControl();
  toppingList: string[] = ['1/32', '1/16', '1/8', 'QA', 'SE', 'FI'];

  constructor(
    public serviceProvider : DataproviderService,
    public dialogRef: MatDialogRef<StandingDialog>,
   @Inject(MAT_DIALOG_DATA) public data: StandingData) {
    if (data.type === 'cup') {
      this.cup = true;
      this.toppings.setValue(this.data.round)  
    }
  }

  updateround(option) : number{
    if (option==='remove') {
      this.data.round--;
    } 
    else if (option==='add') {
      this.data.round++;
    } 
    else if (option === 'cup'){
      console.log('topping',this.toppings.value)
      this.data.round = this.toppings.value
      this.data.score = 0 ;
    }
    return this.data.round
  }

  updateScore(option): number{
    if (option==='remove') {
      this.data.score--;
    } else if (option==='add') {
      this.data.score++;
    }
    return this.data.score
  }

  confirmDialog(){
    console.log(this.data)
    this.updateClubStanding();
  }


  //HTTPS
  // add method to update score and round 
  // add method to add type competition 
  updateClubStanding(){
    this.serviceProvider.updateClubStanding(this.data).then(res=> {
      this.dialogRef.close();
    }).catch( err => {
      console.log('err', err)
    })
  }
  
}

