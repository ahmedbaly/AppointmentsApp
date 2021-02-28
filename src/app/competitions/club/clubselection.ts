import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataproviderService } from 'src/app/dataprovider.service';

export interface ClubData {
  id_season : number;
  competition : any ;
  Clubs : any;
  ClubSelected :any;
}


@Component({
  selector: 'clubselection',
  templateUrl: './clubselection.html',
  styleUrls : ['./clubselection.css']
})


export class ClubDialog {
    newClubName : string = '';

  constructor(
    public dataprovider : DataproviderService,
    public comdialog : MatDialog,
    public dialogRef: MatDialogRef<ClubData>,
   @Inject(MAT_DIALOG_DATA) public data: ClubData) {
    this.getClubs();
   }



    closeDialog() {
        this.dialogRef.close();
    }


    Clubchanges(subtask) {
        this.dataprovider.updateClubsCompetition(
        subtask.id, this.data.competition.id_competition,subtask.name, 'select')
    }


  ClubChecks(club) : Boolean {
    let clubchecked : Boolean = false ;
    if (this.data.ClubSelected !== undefined ){
      for (let J = 0; J < this.data.ClubSelected.length; J++) {
        if (this.data.ClubSelected[J].name === club.name){
            clubchecked = true;
        }
      }
    }
    return clubchecked ;
  }


  getClubs(){
    this.dataprovider.getclubs().then(res=>{
        this.data.Clubs = res ;
        this.getClubsSelected();
    })
  }

  getClubsSelected(){
    this.dataprovider.getClubsCompetitions(this.data.competition.id_competition).then(res=>{
        this.data.ClubSelected = res ;
    }).catch( err => {
      console.log('err', err)
    })
  }

  setclub(){
    this.dataprovider.updateClubsCompetition(
        0, this.data.competition.id_competition,this.newClubName, 'insert').then(res=>{
            this.dialogRef.close();
        }).catch( err => {
          console.log('err', err)
        })
  }



}

