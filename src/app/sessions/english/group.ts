import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DataproviderService } from 'src/app/dataprovider.service';


export interface GroupData {
  id : number,
  name : string
}

export interface RefereeData {
  ID : number,
  name : string,
  id1 : number
}



@Component({
  selector: 'group',
  templateUrl: './group.html',
  styleUrls : ['group.css']
})


export class EnglishGroupsDialog {

  isLinear = false;
  season : any;
  displayedColumns = [ 'id' , 'name' , 'check']
  RefdisplayedColumns = [ 'id' , 'name' , 'check']

  Groups: GroupData[] ;

  Referees = [];

  RefereesSelected = []



  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  groupSelected : GroupData ;

  @ViewChild(MatTable) table: MatTable<any>;


  constructor(
    public serviceProvider : DataproviderService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GroupData>,
   @Inject(MAT_DIALOG_DATA) public data: GroupData) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.getGroups();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.table._contentColumnDefs.filter( (resolve) => {

    //   return filterValue.trim().toLowerCase();
    // }) 
  }


  ////// HTTPS////


  Selectgroup(row){
    this.groupSelected = row;
    this.getRefereesGroups(row.id);
    this.getReferees();
  }




  Grouplist(row){
    this.setRefereesGroups(row.id1,this.groupSelected.id,row.ID)
  }

  RefereeList(row,check){
    if(!check.disabled){
      this.setRefereesGroups(0,this.groupSelected.id,row.ID)
    }
  }

  ifchecked(row): boolean{
    // console.log('ifchecked',row)
    for (let i = 0; i < this.RefereesSelected.length; i++) {
      if (row.ID === this.RefereesSelected[i].ID){
        return true;
      }
    }
    return false;
  }

  //HTTPS
  getGroups(){
    this.serviceProvider.getGroupsEnglish().then(res=>{
      this.Groups = res as []
    })
  }

  creategroup(creategroup){
    this.serviceProvider.CreateGroupEnglish(creategroup.value).then(res=>{
      this.Groups = res as []
    })
  }

  getReferees(){
    this.serviceProvider.getRefereesGeneral().then(res  => {
      this.Referees = res as [];
    })
  }

  getRefereesGroups(id_group){
    this.serviceProvider.getGroupsEnglishReferees(id_group).then(res => {
      this.RefereesSelected = res as [];
    })
  }

  setRefereesGroups(id,id_group,id_referee){
    this.serviceProvider.setGroupsEnglishReferees(id,id_group,id_referee).then(res => {
      this.RefereesSelected = res as [];
    })
  }
  
}

