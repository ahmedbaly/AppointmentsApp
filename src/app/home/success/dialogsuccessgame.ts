import { Component, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlider } from '@angular/material/slider';
import { DataproviderService } from 'src/app/dataprovider.service';

export interface RefData {
  game : any ,
}


@Component({
  selector: 'dialogsuccessgame',
  templateUrl: './dialogsuccessgame.html',
  styleUrls: ['./dialogsuccessgame.css']})


export class SuccessGameDialog {
  successvalue : number = 1 ;
  Referees : any = [];
  disable : boolean = false;

  @ViewChild('sliderref') sliderref: MatSlider;
  @ViewChild('slider1as') slider1as: MatSlider;
  @ViewChild('slider2as') slider2as: MatSlider;
  @ViewChild('slidervar') slidervar: MatSlider;
  @ViewChild('slideravar') slideravar: MatSlider;


  constructor(
    public serviceProvider : DataproviderService,
    public dialogRef: MatDialogRef<SuccessGameDialog>,
   @Inject(MAT_DIALOG_DATA) public data: RefData) {
    this.getSuccessGame()

   }

   formatLabel(value: number) {
    return value;
  }

  getValue(id) : number{
    return id.value
  }

  getSuccessGame(){
    this.serviceProvider.getSuccessGame(this.data.game.ID).then(res=>{
      if (Object.keys(res).length>0){
        this.Referees = res ;
        console.log("referes", this.Referees)
        this.disable = true;
        for (let i = 0; i < Object.keys(res).length; i++) {
          switch (res[i].role) {
            case 'referee':
              console.log("refs", res[i].note)
              this.sliderref.writeValue(res[i].note)
              break;
            case 'fassistant':
              console.log("fass", res[i].note)
              this.slider1as.writeValue(res[i].note)
              break;
            case 'sassistant':
              this.slider2as.writeValue(res[i].note)
              break;
            case 'faddassistant':
              this.slidervar.writeValue(res[i].note)
              break;
            case 'saddassistant':
              this.slideravar.writeValue(res[i].note)
              break;
            default:
              break;
          }
        }
      }
      
    }).catch( err => {
      console.log('err', err)
    });
  }

  SendNotes(): void {
    this.Referees = [];
    this.Referees  = {
      id_success : 0,
      id_match : this.data.game.ID,
      referees : [
        {
        name : this.data.game.Referee,
        role : 'referee',
        note : this.sliderref.value
          },{
        name : this.data.game.Fassistant,
        role : 'fassistant',
        note : this.slider1as.value
          },{
        name : this.data.game.sassistant,
        role : 'sassistant',
        note : this.slider2as.value
          },{
        name : this.data.game.faddassistant,
        role : 'faddassistant',
        note : this.slidervar.value
          },{
        name : this.data.game.saddassistant,
        role : 'saddassistant',
        note : this.slideravar.value
          }
      ]
    }


    for (let i = 0; i < this.Referees.referees.length; i++) {
      console.log('refereesssss ',this.Referees.referees[i] )
      this.serviceProvider.setSuccessGame(this.Referees, this.Referees.referees[i]).then(data=>{
        this.dialogRef.close();
      }).catch( err => {
        console.log('err', err)
      });
    }

  }

    closeDialog() {
    this.dialogRef.close();
  }

}

