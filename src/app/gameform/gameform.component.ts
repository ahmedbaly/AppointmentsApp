import { Component, OnInit, ElementRef, ViewChild, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataproviderService } from '../dataprovider.service';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DateAlertDialog } from './datealert';


export interface Game {
  
}

@Component({
  selector: 'app-gameform',
  templateUrl: './gameform.component.html',
  styleUrls: ['./gameform.component.css']
})

export class GameformComponent implements OnInit {
  data : any = [] ;
  form : FormGroup;

  public readonly : boolean = false ;
  public readonlymagic : boolean = false ;

  lastID : any ='';

  stadiums : any = [];
  competitions : any = [];
  Referees : any = [];
  Clubs : any = [];
  Assessors : any = [];

  origItems : any = [];
  origRefs : any = [];
  origStads : any = [];
  origClubs: any = [];

  teamA : any ="";
  teamB : any ="";

  stadiumfilter = "";
  competitionfilter = ""

  @ViewChild('stadiumselect', { static: false }) selectList: ElementRef;
  @ViewChild('competitionselect', { static: false }) competitionList: ElementRef;

  constructor( 
    public route : ActivatedRoute, 
    @Inject(MAT_DIALOG_DATA) public rout : any,
    private formBuilder : FormBuilder,
    public location : Location,
    public dialog : MatDialog,
    public dataprovider : DataproviderService) { }

  ngOnInit(){
      this.data = {
        Competition : this.isnull(this.rout.Competition),
        Datetime : this.isnull(this.rout.Datetime),
        TeamA : this.isnull(this.rout.EquipeA),
        TeamB : this.isnull(this.rout.EquipeB),
        ID : this.isnull(this.rout.ID),
        Round: this.isnull(this.rout.Round),
        Score: this.isnull(this.rout.Score),
        Stadium: this.isnull(this.rout.Stadium),
        IncidentEqA : this.isnull(this.rout['Incident Eq A']),
        IncidentEqB : this.isnull(this.rout['Incident Eq B']),
        Motif : this.isnull(this.rout.Motif),
        Rapport : this.isnull(this.rout.Rapport),
        ObsfstAss : this.isnull(this.rout['Obs 1st Ass']),
        ObssndAss : this.isnull(this.rout['Obs 2nd Ass']),
        ObsReferee : this.isnull(this.rout.ObsReferee),

        Fassistant : this.isnull(this.rout.Fassistant),
        Fourthofficial : this.isnull(this.rout.Fourthofficial),
        Operator : this.isnull(this.rout.Operateur),
        Referee : this.isnull(this.rout.Referee),
        Refereeobserver : this.isnull(this.rout.Refereeobserver),
        faddassistant: this.isnull(this.rout.faddassistant),
        saddassistant: this.isnull(this.rout.saddassistant),
        sassistant: this.isnull(this.rout.sassistant)
      };

    this.readonly = this.getreadyonly();
    this.getCompetitions();
    this.getStadiums();
    this.getClubs();
    this.getLastID();
    this.getReferees();
    this.getAssessors()
    this.getform();
  }

 
  //Validation form type
  getreadyonly() : boolean {
    if(this.data.ID === undefined ){
      return false;
    }else 
      return true;
  }
  isValidField(field,item) : Boolean{
    switch(field){
      case('round'):
        return !this.form.get(item).valid && this.form.get(item).touched;
      default:
        //traitement
        break;
    }
  }
  isnull (param) : string{
    if (param === null || param ==='null'){
      return "";
    } else {
      return param;
    }
  }


  ///Form
  getform(){    
    this.form = this.formBuilder.group({
      gamedetails: this.formBuilder.group({
        id:    [this.data.ID, Validators.required],
        stadium: [this.data.Stadium, Validators.required],
        competition: [this.data.Competition, Validators.required],
        round: [this.data.Round, [Validators.required, Validators.max(25) , Validators.min(1)]],
        date:  [this.data.Datetime, Validators.required],
        teama: [this.data.TeamA, Validators.required],
        score: [this.data.Score, Validators.required],
        teamb: [this.data.TeamB, Validators.required]
      }),
      commissaire: this.formBuilder.group({
        motif:    [this.data.Motif],
        rapport:  [this.data.Rapport],
        obsref:   [this.data.ObsReferee],
        obsfass:  [this.data.ObsfstAss],
        obssass:  [this.data.ObssndAss],
        incteama: [this.data.IncidentEqA],
        incteamb: [this.data.IncidentEqB],
      }),
      videos: this.formBuilder.group({
        video1: [this.data.video1],
        video2: [this.data.video2],
        video3: [this.data.video3],
        video4: [this.data.video4]
      }),
      refereeslist: this.formBuilder.group({
        referee:    [this.data.Referee, Validators.required ],
        fassistant: [this.data.Fassistant, Validators.required],
        sassistant: [this.data.sassistant, Validators.required],
        fofficial:  [this.data.Fourthofficial],
        var:        [this.data.faddassistant],
        avar:       [this.data.saddassistant],
        operator:   [this.data.Operator],
        commissaire:[this.data.Refereeobserver, Validators.required]
      }),
    });    
    console.log("form",this.form)
  }
  onChangeofOptions(newGov,control) {
    switch(control){
      case 'ID' :{
        this.form.controls['gamedetails']['controls']['id'].setValue(newGov);
        break; 
      }
      case 'stadiums' :{
        this.form.controls['gamedetails']['controls']['stadium'].setValue(newGov);
        break; 
      }
      case 'stadiums' :{
        this.form.controls['gamedetails']['controls']['date'].setValue(newGov);
        break; 
      }
      case 'competition' :{
        this.form.controls['gamedetails']['controls']['competition'].setValue(newGov);
        break; 
      }
      case 'teama' :{
        this.form.controls['gamedetails']['controls']['teama'].setValue(newGov);
        this.teamA = newGov;
        this.Clubs = this.origClubs;
        break; 
      }
      case 'teamb' :{
        this.form.controls['gamedetails']['controls']['teamb'].setValue(newGov);
        this.teamB = newGov
        this.Clubs = this.origClubs;
        break; 
      } 
      case 'referee' :{
        this.form.controls['refereeslist']['controls']['referee'].setValue(newGov);
        this.Referees = this.origRefs;
        break; 
      }
      case 'fassistant' :{
        this.form.controls['refereeslist']['controls']['fassistant'].setValue(newGov);
        this.Referees = this.origRefs;
        break; 
      }
      case 'sassistant' :{
        this.form.controls['refereeslist']['controls']['sassistant'].setValue(newGov);
        this.Referees = this.origRefs;
        break; 
      }
      case 'fofficial' :{
        this.form.controls['refereeslist']['controls']['fofficial'].setValue(newGov);
        this.Referees = this.origRefs;
        break; 
      }
      case 'var' :{
        this.form.controls['refereeslist']['controls']['var'].setValue(newGov);
        this.Referees = this.origRefs;
        break; 
      }
      case 'avar' :{
        this.form.controls['refereeslist']['controls']['avar'].setValue(newGov);
        this.Referees = this.origRefs;
        break; 
      }
      case 'operator' :{
        this.form.controls['refereeslist']['controls']['operator'].setValue(newGov);
        this.Referees = this.origRefs;
        break; 
      }
      case 'commissaire' :{
        this.form.controls['refereeslist']['controls']['commissaire'].setValue(newGov);
        this.Referees = this.origRefs;
        break; 
      }
      default :
        // traitement 
      break;
    }
  }

  mousEvent(){
    if(this.readonlymagic){
      this.openDialog()
    }
  }
  openDialog(): void {
    let dialogref = this.dialog.open(DateAlertDialog, {
      width: '400px'
    });

    dialogref.afterClosed().subscribe(result => {
      if (result !=="" || result !== undefined){
        this.form.controls['gamedetails']['controls']['date'].setValue(result);
      }
    });
  }

  CancelForm(){
    this.location.back();
  }

  SaveForm(){
    if(this.readonlymagic){
      this.dataprovider.PostForm(this.form.value).then(data=>{
        console.log("data return",data);
      }).catch(err=>console.log("err return",err));
    }
  }

  ///Filters
  StadiumfilterItem(event){
    if(!event){
      this.stadiums = this.origStads;
    } // when nothing has typed*/   
    if (typeof event === 'string') {
      this.stadiums = this.origStads.filter(a => a.toLowerCase().match(event.toLowerCase())); 
    }   
  }      
  CompetitionfilterItem(event){
    if(!event){
      this.competitions = this.origItems;
    } // when nothing has typed*/   
    if (typeof event === 'string') {
      this.competitions = this.origItems.filter(a => a.toLowerCase().match(event.toLowerCase())); 
    }   
  }    
  teamsfilterItem(event){
    if(!event){
      this.Clubs = this.origClubs;
    } 
    if (typeof event === 'string') {
      this.Clubs = this.origClubs.filter(a => a.toLowerCase().match(event.toLowerCase())); 
    }   
  }  
  refereefilterItem(event){
    if(!event){
      this.Referees = this.origRefs;
    } 
    if (typeof event === 'string') {
      this.Referees = this.origRefs.filter(a => a.toLowerCase().match(event.toLowerCase())); 
    }   
  }  

  //HTTP
  getCompetitions(){
    this.dataprovider.getcompetitions().then(data =>{
      this.origItems = data ; 
      this.competitions = this.origItems;
    }).catch( err => {
      console.log('err', err)
    });
  }
  getStadiums(){
    this.dataprovider.getStadiums().then(data =>{
      this.origStads = data ; 
      this.stadiums = this.origStads;
    }).catch( err => {
      console.log('err', err)
    });
   }
  getLastID(){
    this.dataprovider.getLastID().then(data =>{
      if(!this.readonly){
        this.onChangeofOptions(data,'ID')
        this.readonlymagic = true;
      }
    }).catch( err => {
      console.log('err', err)
    });
  }
  getReferees(){
    this.dataprovider.getReferees().then(data =>{
      this.origRefs = data ; 
      this.Referees = this.origRefs;
    }).catch( err => {
      console.log('err', err)
    });
  }
  getClubs(){
    this.dataprovider.getclubs().then(data =>{
      console.log('Clubs', data)
      this.origClubs = data ; 
      this.Clubs = this.origClubs;
    }).catch( err => {
      console.log('err', err)
    });
  }
  getAssessors(){
    this.dataprovider.getAssessors().then(data =>{
      this.Assessors= data ; 
    }).catch( err => {
      console.log('err', err)
    });
  }

}      ​​      ​​      ​​



