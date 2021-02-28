import { Component,  Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DataproviderService } from 'src/app/dataprovider.service';
import { DOCUMENT } from '@angular/common'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgressSpinnerDialog } from 'src/app/progressspinner/progressspinner';


export interface CompetitionLevelData {
  Competitions : [] 
}


@Component({
  selector: 'competitionlevel',
  templateUrl: './competitionlevel.html'
})


export class CompLevelSettingDialog {
    isLinear = false;

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    displayedColumns = [ 'id' , 'group' , 'date'] ;

    RefdisplayedColumns = [ 'id' , 'name' , 'check']
    
    competition : any = [];

    Levels : any = [];
    competitionLevels : any;

    durationInSeconds = 5;

    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatCheckbox) check: MatCheckbox


  constructor(
    public serviceProvider : DataproviderService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject(DOCUMENT) document,
    @Inject(MAT_DIALOG_DATA) public data: CompetitionLevelData) {
      console.log('data',data)
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.getRefereesLevels();
  }

  callProgressSpinner(){
    // this.spinner.start()
  }

  SelectCompetition(row){
    this.competition = row;
    console.log("rowcompetition", this.competition);
    // this._snackBar.openFromComponent(SnackBarComponent, {
    //   duration: this.durationInSeconds * 1000,
    // });
    this.callProgressSpinner();
    this.getCompetitionLevels(row);
  }

  selectLevel(row,i){
    this.Levels[i].check = !this.Levels[i].check
    console.log("selectLevel", row);
    console.log("rowcompetition", this.competition);
    if (this.competition.id_competition !== undefined) {
      if (row.check) {
        this.setLevelsCompetition(0,this.competition,row)
      } else {
        this.setLevelsCompetition(1,this.competition,row)
      }
    } else {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  LevelChecks(level) : Boolean {
    let levelchecked : Boolean = false ;
    if (this.competitionLevels){
      for (let j = 0; j < this.competitionLevels.length; j++) {
        if (this.competitionLevels[j].levels === level.levels){
          levelchecked = true;
        }
      }
    }
    return levelchecked ;
  }





  //HTTPS

  getRefereesLevels() {
    this.serviceProvider.getRefereesLevels().then(data => {
      this.Levels = data as [];
    }).catch( err => {
      console.log('err', err)
    })
  }

  getCompetitionLevels(competition) {
    this.serviceProvider.getLevelsCompetition(competition).then(data => {
      this.competitionLevels = data as [];
      console.log("come",this.competitionLevels)
    }).catch( err => {
      console.log('err', err)
    })
  }

  setLevelsCompetition(id,competition,level){
    this.serviceProvider.setLevelsCompetition(id,competition.id_competition,level.id).then(data => {
    }).catch( err => {
      console.log('err', err)
    })
  }

  


}

@Component({
  selector: 'snackbar',
  template: "<span class='example-pizza-party'>First select a competition !!</span>",
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class SnackBarComponent {}


