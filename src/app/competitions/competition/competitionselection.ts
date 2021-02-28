import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataproviderService } from '../../dataprovider.service';


export interface CompetitionData {
  id_season : number;
  season : string;
  competitionsSeason : any;
  competitions : any;
}



@Component({
  selector: 'competitionselection',
  templateUrl: './competitionselection.html',
  styleUrls : ['./competitionselection.css']
})


export class CompetitionDialog {

  @ViewChild('newCompetition') newCompetition: TemplateRef<any>;

  newCompetitionName : string;

  constructor(
    public dataprovider : DataproviderService,
    public comdialog : MatDialog,
    public dialogRef: MatDialogRef<CompetitionDialog>,
   @Inject(MAT_DIALOG_DATA) public data: CompetitionData) {
    this.getCompetitions();
   }


  setSeason(name){
    this.dataprovider.setSeason(name).then( () => {
      this.dialogRef.close({refresh : true});
    }).catch( err => {
      console.log('err', err)
    })
  }

  setCompetition(){
    this.dataprovider.UpdateCompetitionsSeason(this.data.id_season,0,this.newCompetitionName,'insert').then(()=>{
      this.getCompetitions();
      this.closeDialog();
    }).catch( err => {
      console.log('err', err)
    })
  }
  
  Competitionchanges(subtask) {
    this.dataprovider.UpdateCompetitionsSeason(this.data.id_season,subtask.ID,subtask.competition,'select')
  }

  closeDialog() {
    this.dialogRef.close();
  }

  CompetitionChecks(competition) : Boolean {
    let competitionchecked : Boolean = false ;
    if (this.data.competitionsSeason !== undefined ){
      for (let J = 0; J < this.data.competitionsSeason.length; J++) {
        if (this.data.competitionsSeason[J].competition === competition.competition){
          competitionchecked = true;
        }
      }
    }
    return competitionchecked ;
  }


  //https
  getCompetitions() {
    this.dataprovider.getcompetitionsSeason().then(data => {
      this.data.competitions = data as [];
    }).catch( err => {
      console.log('err', err)
    })
  }




}

