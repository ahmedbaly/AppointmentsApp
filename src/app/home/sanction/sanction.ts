import { Component, Inject, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataproviderService } from 'src/app/dataprovider.service';

export interface GameData {
  game : any ,
}


@Component({
  selector: 'sanction',
  templateUrl: './sanction.html',
  styleUrls: ['./sanction.css']})


export class SanctionDialog implements OnInit{
  Team : string ;
  Referees : any = [];
  checked : boolean = true;
  disable : boolean = false;
  teams : string[] = []; 

  @ViewChild('description') Description: ElementRef;
  @ViewChild('picker') picker: ElementRef;


  constructor(
    public serviceProvider : DataproviderService,
    public dialogRef: MatDialogRef<SanctionDialog>,
   @Inject(MAT_DIALOG_DATA) public data: any) {
    //this.getSuccessGame()
      console.log('sanction',this.data) 
      this.teams = [ this.data.EquipeA , this.data.EquipeB]
   }

  ngOnInit(){
    this.SetGameForm()

  }

  ngAfterViewInit(){

    this.getSanctions();
    // console.log('radio',this.radio) 

  }

  SetGameForm(){
    this.Team = this.data.EquipeA
    this.Referees = [
      {
        name : this.data.Referee,
        role : "Referee",
        type : 'Referee',
        date : "" ,
        check : false},
      {
        name : this.data.Fassistant,
        role : "1st Assistant",
        type : 'fassistant',
        date : "",
        check : false},
      {
        name : this.data.sassistant,
        role : "2nd Assistant",
        type : 'sassistant',
        date : "",
        check : false},
      {
        name : this.data.Fourthofficial,
        role : "Fourth Official",
        type : 'fourth',
        date : "", 
        check : false},
      {
        name : this.data.faddassistant,
        role : "VAR",
        type : 'faddassistant',
        date : "",
        check : false},
      {
        name : this.data.saddassistant,
        role : "AVAR",
        type : 'saddassistant',
        date : "",
        check : false 
      }
    ]
  }

  checkRef(i){
    this.Referees[i].check = !this.Referees[i].check
  }

  DateRef(i,picker){
    let d = new Date(picker._validSelected)
    console.log("date",d)
    this.Referees[i].date = d.getTime();
  }

  convertDate(D) : string {
    let s : string ;
    let d = new Date(D)
    s = d.getDate() + "-" +(d.getMonth()+1) + '-' + d.getFullYear();
    return s;
  }

  teamRef(team){
    this.Team = team;
  }

  getSanctions(){
    this.serviceProvider.getSanctions(this.data.ID).then(res=>{
        console.log("referes", res)
        for (let i = 0; i < Object.keys(res).length; i++) {
          switch (res[i].role) {
            case 'Referee':
              console.log("refs", res[i])
              this.Description = res[i].description
              this.Team = res[i].team
              console.log("picker", this.picker)
              this.Referees[i].name = res[i].referee,
              this.Referees[i].type = res[i].role,
              this.Referees[i].date = (res[i].date*1000)
              this.Referees[i].check=  true 
              break;
            case 'fassistant':
              console.log("fass", res[i])
              this.Referees[i].name = res[i].referee;
              this.Referees[i].type = res[i].role;
              this.Referees[i].date = (res[i].date*1000);
              this.Referees[i].check=  true ;
              break;
            case 'fourth':
              console.log("fass", res[i])
              this.Referees[i].name = res[i].referee;
              this.Referees[i].type = res[i].role;
              this.Referees[i].date = (res[i].date*1000);
              this.Referees[i].check=  true ;
              break;
            case 'sassistant':
              this.Referees[i].name = res[i].referee;
              this.Referees[i].type = res[i].role;
              this.Referees[i].date = (res[i].date*1000);
              this.Referees[i].check=  true ;              
              break;
            case 'faddassistant':
              this.Referees[i].name = res[i].referee;
              this.Referees[i].type = res[i].role;
              this.Referees[i].date = (res[i].date*1000);
              this.Referees[i].check=  true ;
              break;
            case 'saddassistant':
              this.Referees[i].name = res[i].referee;
              this.Referees[i].type = res[i].role;
              this.Referees[i].date = (res[i].date*1000);
              this.Referees[i].check=  true ;
              break;
            default:
              break;
          }
        }
    }).catch( err => {
      console.log('err', err)
    });
  }

  SendNotes(): void {
    console.log("Referee",this.Referees)
    console.log("data",this.data)
    console.log("Team",this.Team)    
    console.log("descri",this.Description)

    let msg = this.Description.nativeElement.value


    // for (let i = 0; i < this.Referees.length; i++) {
    //   if (this.Referees[i].check) {
    //     this.serviceProvider.setSanction(this.Referees[i], this.data.ID, this.Team, msg,'insert',0).then(data=>{
    //       this.dialogRef.close();
    //     })
    //   }
    // }
  }

    closeDialog() {
    this.dialogRef.close();
  }

}

