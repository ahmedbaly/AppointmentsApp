import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DataproviderService } from 'src/app/dataprovider.service';
import { DOCUMENT } from '@angular/common'; 


export interface SessionData {
  id : number,
  group : string,
  date : number
}


@Component({
  selector: 'session',
  templateUrl: './session.html'
})


export class DebriefingSessionDialog {
    isLinear = false;

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    displayedColumns = [ 'id' , 'group' , 'date'] ;

    RefdisplayedColumns = [ 'id' , 'name' , 'presence']
    
    Groups = [];
    SessionDate = new Date();
    groupSelected : any ;
    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatCheckbox) check: MatCheckbox

    
    Sessions : SessionData[] = [];

    Referees = []

  constructor(
    public serviceProvider : DataproviderService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SessionData>,
    @Inject(DOCUMENT) document,
    @Inject(MAT_DIALOG_DATA) public data: SessionData) {

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
    this.getGroups();
  }

  onSelectDate(date){
    this.SessionDate = date._validSelected
   }

  Selectgroup(row){
    this.groupSelected = row;
    this.getRefereesGroups(row.id);
  }

  selectPresence(row,i){
    if (this.Referees[i].presence) {
      this.Referees[i].presence = false
    } else {
      this.Referees[i].presence = true;
    }
  }

  newSession(){
    this.setDebriefingSession();
  }


  //HTTPS
  getGroups(){
    this.serviceProvider.getGroupsDebriefing().then(res=>{
      this.Groups = res as []
    })
  }

  getRefereesGroups(id_group){
    this.serviceProvider.getGroupsDebriefingReferees(id_group).then(res => {
      this.Referees = res as [];
      for (let i = 0; i < this.Referees.length; i++) {
            this.Referees[i].presence = true;         
      }
    })
  }

  setDebriefingSession(){
    for (let i = 0; i < this.Referees.length; i++) {
      this.serviceProvider.setDebriefingSession(this.groupSelected.id,this.Referees[i].ID,
        (this.SessionDate.getTime()/1000),this.Referees[i].presence).then(res => {
           this.dialogRef.close();
      })
    }
  }

  
}

