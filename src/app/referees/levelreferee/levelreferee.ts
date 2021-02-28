import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataproviderService } from 'src/app/dataprovider.service';


export interface RefData {
  id : number,
  name: string;
  natures : any;
  levels : any;
  type : string
}


@Component({
  selector: 'levelreferee',
  templateUrl: './levelreferee.html',
  styleUrls : ['./levelreferee.css']
})


export class LevelRefereeDialog {
  Natures : any = [];
  Levels : any = [];

  constructor(
    public dataprovider : DataproviderService,
    public dialogRef: MatDialogRef<LevelRefereeDialog>,
   @Inject(MAT_DIALOG_DATA) public data: RefData) {
    this.getRefereeNatures() 
    this.getRefereeNature(this.data.id)
    this.getRefereesLevels();
    this.getRefereeLevel(this.data.id)
    
   }


  Naturechanges(subtask) {
    this.dataprovider.setRefereeNatures(this.data.id,subtask.id)
    .catch( err => {
      console.log('err', err)
    });
  }

  Levelchanges(level) {
    let id_ref_lev = 0;
    if (this.Levels !== undefined ){
      id_ref_lev = this.Levels.id
    }
    this.dataprovider.updateRefereeLevel(this.data.id,level.id,id_ref_lev)
    .catch( err => {
      console.log('err', err)
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  NatureChecks(nature,i) : Boolean {
    let naturechecked : Boolean = false ;
    if (this.data.natures[i] !== undefined ){
      for (let J = 0; J < this.Natures.length; J++) {
        if (this.Natures[J].nature === nature){
          naturechecked = true;
        }
      }
    }
    return naturechecked ;
  }

  LevelChecks(level,i) : Boolean {
    let levelchecked : Boolean = false ;
    if (this.Levels !== undefined ){
        if (this.Levels.levels === level){
          levelchecked = true;
        }
    }
    return levelchecked ;
  }


  //https
  getRefereeNatures() {
    this.dataprovider.getRefereesNatures().then(data => {
      this.data.natures = data;
    }).catch( err => {
      console.log('err', err)
    });
  }

  getRefereeNature(id_referee) {
    this.dataprovider.getRefereeNature(id_referee).then(data => {
    this.Natures = data
    }).catch( err => {
      console.log('err', err)
    });
  }

  getRefereesLevels() {
    this.dataprovider.getRefereesLevels().then(data => {
      this.data.levels = data;
    }).catch( err => {
      console.log('err', err)
    });
  }

  getRefereeLevel(id_referee) {
    this.dataprovider.getRefereeLevel(id_referee).then(data => {
    this.Levels = data[0];
    }).catch( err => {
      console.log('err', err)
    });
  }
}

