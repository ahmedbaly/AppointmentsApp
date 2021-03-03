import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataproviderService } from '../dataprovider.service';
import { ProgressSpinnerDialog } from '../progressspinner/progressspinner';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})


export class AppointmentsComponent implements OnInit {
  // displayedColumns = ['type','referee', 'assistant','fourth', 'var', 'avar'];

  RefereAppointed = [];
  displayedColumns = ['name'] ;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  DateTraining : Date ;

  tabReferees : boolean =true;
  tabAssistants : boolean;
  stadiums : any = [];
  competitions : any = [];
  Referees : any = [];
  Clubs : any = [];

  standings : any = [];

  refsgrid : any = [];
  Appointments : any = [];
  RefereesScores: any = [];
  AssistantsScores: any = [];
  FourthScores : any = []

  origItems : any = [];
  origRefs : any = [];
  origAss : any = [];
  origFourth : any = []
  origStads : any = [];
  origClubs: any = [];
  cuprounds: string[] = ['1/32', '1/16', '1/8', 'QA', 'SE', 'FI'];
  NamesRef = [];
  Nature : any = []
  Seasons = [];
  SeasonSelected = [];
  GameImportance = [];
  comptype : any =[];
  compLimit : number = 0;
  ref = []
  ass = []
  fou = []
  Var = []
  ava = []
  ope = []

  step = 0;

  season : string ;
  competition : string;
  game : any ;
  round : any;
  stadium : any = [];
  datesGeneral : any = [];
  date : any = [];
  time : any = []
  teamA : any = [];
  teamB : any = [];
  teamselected: any = []
  truefalse : any = []
  
  league : boolean = true ;
  // j =0;
  constructor(
    public dialog : MatDialog,
    public dataprovider : DataproviderService) { }

  ngOnInit(): void {
    this.callProgressSpinner();
    this.game = 6;
    this.getSeasons();
    this.getStadiums();
    this.getLevels();
  }

  ngAfterViewInit() {
    this.DateTraining = this.getdate();
  }

  callProgressSpinner(){
    this.dialog.open(ProgressSpinnerDialog, {
    });
  }

  getdate() : Date{
    let date = new Date();
    for (let i = 0; i < 7; i++) {
      date.setTime(date.getTime()-86400000) ;
      if(date.getDay()===5){
        date.setHours(0,0,0,0)
        return date;
      }
    }
  }
  
  NavChanged(option){
    this.tabReferees = false;
    this.tabAssistants = false;
    if (option ==='R') {
        this.tabReferees = true ;
    } else if (option ==='A') {
      this.tabAssistants = true ;
    }
  }

  onChangeofOptions(newGov,control,i,j) {
    switch(control){
      case 'season' :{
        this.season = newGov;
        break; 
      }
      case 'competition' :{
        // console.log('comp',newGov)
        this.competition = newGov.competition;
        this.comptype = newGov; 
        this.compLimit = newGov.limit
        this.getClubs(newGov)
        break; 
      }

      case 'stadiums' :{
        this.stadium[j] = newGov;
        this.StadiumfilterItem("");
        break; 
      }
      case 'date' :{
        console.log('date' + j, newGov)
        this.time[j] = '';
        let d = new Date();
        d.setTime(newGov)
        this.date[j]=d;
        this.datesGeneral[j] = d;
        break; 
      }
      case 'time' :{
        if (this.date[j]) {
          let d0 = new Date(this.date[j])
          let d = new Date(newGov);
          d0.setHours(d.getHours())
          d0.setMinutes(d.getMinutes())
          this.time[j] = d;
          this.datesGeneral[j] = d0.getTime();
        }
        break; 
      }
      case 'round' :{
        console.log('round',newGov)
        this.round = newGov;
        break; 
      }
      case 'game' :{
        console.log('games' , newGov)
        if (newGov === 0) {
          this.game = 1 ;
        } else if (newGov > 12) {
          this.game = 12;

        } else {
          this.game = newGov;
        }
        break; 
      }
      case 'teama' :{
        if (!this.teamA[j]) {
          this.teamselected.push(newGov);
          this.teamA[j] = newGov.name;
        }

        break; 
      }
      case 'teamb' :{
        if (!this.teamB[j]) {
          this.teamselected.push(newGov);
          this.teamB[j] = newGov.name;
        }
        break; 
      }
      default :
        // traitement 
      break;
    }
  }

  SaveForm(){
    // this.dataprovider.PostForm(this.form.value).then(data=>{
    //   console.log("data return",data);
    // }).catch(err=>console.log("err return",err));
  }


  //HTTP

  //// ON INIT 
  getSeasons(){
    this.dataprovider.getSeasons().then((res : []) => {
      this.Seasons = res ;
      this.season = this.Seasons[this.Seasons.length-1].season
      this.getcompetitions(this.Seasons[this.Seasons.length-1])
    }).catch( err => {
      console.log('err', err)
    });
  }

  getcompetitions(season){
    this.season = season.season;
    this.competition = "";
    this.SeasonSelected = season;
    this.dataprovider.getSeasonCompetitions(season.id).then(res =>{
      this.origItems = res  as []; 
      this.competitions = this.origItems;
      this.competition = this.competitions[0].competition
      this.comptype = this.competitions[0];
      this.compLimit =  this.competitions[0].limit
      this.round = "6";
       this.getClubs(res[0])
   }).catch( err => {
    console.log('err', err)
  });
  }
  
  getClubs(row){  
    if (row.typeComp === 'cup') {
      this.league = false;
    } else {
      this.league = true;
    }
    // this.round = row.round;
    this.competition = row.competition
    this.dataprovider.getClubsCompetitions(row.id_competition).then(res=>{
      this.origClubs = res ; 
      this.Clubs = this.origClubs;
      this.getRefereesScorematch();
      this.getAssistantsScorematch();
      this.getFourthScorematch();
      this.Clubs.forEach(element => {
        this.truefalse.push(false)
        console.log(element)
    });
    }).catch( err => {
      console.log('err', err)
    })
  }

  getStadiums(){
    this.dataprovider.getStadiums().then(data =>{
      this.origStads = data ; 
      this.stadiums = this.origStads;
    }).catch( err => {
      console.log('err', err)
    });
   }

  getStandings(){
    this.dataprovider.getStandings(this.competition).then(data =>{
      this.standings = data ; 
    }).catch( err => {
      console.log('err', err)
    });
  }

  getLevels(){
    this.dataprovider.getRefereesNatures().then(data =>{
      this.Nature = data as []; 
      this.Referees = [];
      for (let i = 0; i < this.Nature.length; i++) {
        this.getRefereesbyLevelNature(this.Nature[i])
      }
    }).catch( err => {
      console.log('err', err)
    });
  }

  getRefereesbyLevelNature(nature){
    this.dataprovider.getRefereesbyLevelNature(0,nature.id).then(res=>{
      switch (nature.nature) {
        case "Referee":
          this.ref.push(res) 
          // console.log('refs',this.ref)
          break;
        case "fassistant":
          this.ass.push(res)  

          break;
        case "fourth":
          this.fou.push(res) 
          break;
        case "VAR":
          this.Var.push(res) 
          break;
        case "AVAR":
          this.ava.push(res) 
          break;

        case "operator":
          this.ope.push(res) 
          break;

        default:
          break;
      }
    }).catch( err => {
      console.log('err', err)
    })
  }



  ///// GET SCORESSSS 
  getRefereesScorematch(){
    this.RefereesScores = []
    this.dataprovider.getRefereesScorematchs(this.competition,this.round,"referee", 
    (this.DateTraining.getTime())/1000,this.compLimit).then(data=>{
      this.RefereesScores = data as [];
      // console.log('RefereesScorematch',this.RefereesScores)
      this.getColumns();
    }).catch( err => {
      console.log('err', err)
    })
  }
  getColumns(){
    let columns = this.displayedColumns ;
    this.origRefs = []
    for (let j = 0; j < (this.RefereesScores.length/this.Clubs.length); j++) {
      this.origRefs.push(this.RefereesScores[j])
    }
    for (let i = 0; i < this.RefereesScores[0].length; i++) {
      if(this.Clubs[i]!== undefined){
        columns.push(this.Clubs[i].name)
      }
    }
    this.columnsToDisplay = columns.slice();
  }
  getData(club, item): string{
    let ValueToReturn : string = "";
    for (let j = 0; j < this.RefereesScores.length; j++) {
      if (this.RefereesScores[j].team === club.name) {
        if(this.RefereesScores[j].name === item.name)
        return this.RefereesScores[j].score;
      }else{
        ValueToReturn = "0";
      }
    }
    return ValueToReturn
  }

  getAssistantsScorematch(){
    this.AssistantsScores = []
    this.dataprovider.getRefereesScorematchs(this.competition,this.round,"fassistant",
    (this.DateTraining.getTime())/1000,60).then(data=>{
      this.AssistantsScores = data as [];
      //console.log('assis', this.AssistantsScores)
      this.getColumnsAssistant();
    }).catch( err => {
      console.log('err', err)
    })
  }
  getColumnsAssistant(){  
    this.origAss = [] 
    for (let j = 0; j < (this.AssistantsScores.length/this.Clubs.length); j++) {
      this.origAss.push(this.AssistantsScores[j])
    }
  }
  getDataAssistant(club, item): string{
    let ValueToReturn : string = "";
    for (let j = 0; j < this.AssistantsScores.length; j++) {
      if (this.AssistantsScores[j].team === club.name) {
        if(this.AssistantsScores[j].name === item.name)
        return this.AssistantsScores[j].score;
      }else{
        ValueToReturn = "0";
      }
    }
    return ValueToReturn
  }

  getFourthScorematch(){
    this.FourthScores = []
    this.dataprovider.getRefereesScorematchs(this.competition,this.round,"fourth",
    (this.DateTraining.getTime())/1000,60).then(data=>{
      this.FourthScores = data as [];
      this.getColumnsFourth();
      this.dialog.closeAll();
    }).catch( err => {
      console.log('err', err)
    })
  }
  getColumnsFourth(){  
    this.origFourth = [] 
    for (let j = 0; j < (this.FourthScores.length/this.Clubs.length); j++) {
      this.origFourth.push(this.FourthScores[j])
    }
  }
  getDataFourth(club, item): string{
    let ValueToReturn : string = "";
    for (let j = 0; j < this.FourthScores.length; j++) {
      if (this.FourthScores[j].team === club.name) {
        if(this.FourthScores[j].name === item.name)
        return this.FourthScores[j].score;
      }else{
        ValueToReturn = "0";
      }
    }
    return ValueToReturn
  }

  getScoresTemporary(){
    this.dataprovider.getScoresTemporary(this.competition).then(res=>{
      // console.log("afsa",res)
    }).catch( err => {
      console.log('err', err)
    })
  }

 
  /// SET SCORES HTML
  onColNameChange(club): number{
    let scores = []
    for (let j = 0; j < this.RefereesScores.length; j++) {
      if (this.RefereesScores[j].team === club.name) {
        scores.push(this.RefereesScores[j].score)
      }
    }
    return Math.max(...scores);
  }
  getRefScore(club,item):number{
    for (let j = 0; j < this.RefereesScores.length; j++) {
      if (this.RefereesScores[j].team === club.name) {     
        if (this.RefereesScores[j].name === item.name) {   
          return this.RefereesScores[j].score
        }
      }
    }
  }

  onColAssisChange(club): number{
    let scores = []
    for (let j = 0; j < this.AssistantsScores.length; j++) {
      if (this.AssistantsScores[j].team === club.name) {
          scores.push(this.AssistantsScores[j].score)
      }
    }
    return Math.max(...scores);
  }
  getAssScore(club,item):number{
    for (let j = 0; j < this.AssistantsScores.length; j++) {
      if (this.AssistantsScores[j].team === club.name) {     
        if (this.AssistantsScores[j].name === item.name) {   
          return this.AssistantsScores[j].score
        }
      }
    }
  }
 
  onColFourthChange(club): number{
  let scores = []
    for (let j = 0; j < this.FourthScores.length; j++) {
      if (this.FourthScores[j].team === club.name) {
          scores.push(this.FourthScores[j].score)
      }
    }
  return Math.max(...scores);
  }
  getFourthScore(club,item):number{
    for (let j = 0; j < this.FourthScores.length; j++) {
      if (this.FourthScores[j].team === club.name) {     
        if (this.FourthScores[j].name === item.name) {   
          return this.FourthScores[j].score
        }
      }
    }
  }



  getAppointments(){
    // this.teamA = ['Al-Sadd SC','Al-Duhail SC', 'Al-Gharafa SC',	'Qatar SC',	'Al-Ahli SC',	'Al-Rayyan SC']
    // this.teamB = ['Al-Arabi SC',	'Al-Sailiya SC',	'Umm Salal SC',	'Al-Wakrah SC',	'Al-Khor SC',	'Al-Kharaitiyat SC']
    this.callProgressSpinner();
    this.Appointments = this.getGamesImportance();
    // console.log("getAppointments",this.Appointments)
  }

  checkRefsAppointed(referees, name):boolean{
    let check : boolean = true
    for (let i = 0; i < referees.length; i++) {
      if (referees[i] === name ){
        check = false;
      }
    }
    return check
  }

  getGamesImportance() : []{
    let result : any = []
    for (let i = 0; i < this.game; i++) {

      result.push(
          { id_match : (i+1),
            teamA : this.teamA[i] , 
            teamB: this.teamB[i] , 
            date : this.date[i],
            difference: Math.abs((this.getTeamStandingPTS(this.teamA[i])) - (this.getTeamStandingPTS (this.teamB[i])) )})
      // if(i === (this.game-1)){
      //   console.log('kamalet',i)
      // }
    }
    result.sort((a, b) => (a.difference > b.difference) ? 1 : -1);
    this.setGamesTemporary()
    return  result
  }

  getTeamStandingPTS(team): number{
    if(this.comptype.typeComp === 'league'){
      for (let i = 0; i < this.Clubs.length; i++) {
        if (team === this.Clubs[i].name) {
          return this.Clubs[i].score
        }        
      }
    }
    return 0;
  }

  getGameReferees(){
    let lista : any = [];
    let maxRefs = []

    for (let p = 0; p < 2; p++) {
      for (let j = 0; j < this.Appointments.length; j++) {
        let listscore : any =[];
        for (let k = 0; k < ((this.RefereesScores.length)/(this.Clubs.length)); k++) {
          let score : number = 0;
          for (let i = 0; i < this.RefereesScores.length; i++) {
            if (this.RefereesScores[k].appointed === 'Appointed') {
              if (!this.checkAvailableRef(this.Appointments,this.Appointments[j].date, this.FourthScores[i].name,'fourth')){
                if (this.RefereesScores[k].name === this.RefereesScores[i].name){
                  if (!this.checkRefsAppointed(maxRefs,this.RefereesScores[i].name)){
                    score = 0 ;
                  } 
                  else {
                    if (this.Appointments[j].teamA === this.RefereesScores[i].team) {
                      score = score + this.RefereesScores[i].score ;
                    }
                    if (this.Appointments[j].teamB === this.RefereesScores[i].team) {
                      score = score + this.RefereesScores[i].score ;
                    }
                  }
                }
              }
            }    
          }
          listscore.push(score)
        }

        lista[j] = listscore; 
        var maxscore = Math.max(...lista[j]);
        var maxindex = lista[j].indexOf(maxscore)
        maxRefs.push(this.RefereesScores[maxindex].name);
        lista[j][maxindex]= 0;
        if (maxscore !==0 ){
          if (p === 0) {
            this.Appointments[j].referee = this.RefereesScores[maxindex].name;
            this.Appointments[j].scoreRef = maxscore
          }
          if (p === 1) {
            this.Appointments[j].faddassistant = this.RefereesScores[maxindex].name;
            this.Appointments[j].scoreFadd = maxscore
          }
        }else {
          this.Appointments[j].faddassistant = "";
          this.Appointments[j].scoreFadd = '';
        }
      }
    }
    this.getGameVAR();
    this.getGameAssistants();
  }

  getGameAssistants(){
    let lista : any = [];
    let maxRefs = []
    for (let p = 0; p < 2; p++) {
      for (let j = 0; j < this.Appointments.length; j++) {
        let listscore : any =[];
        for (let k = 0; k < ((this.AssistantsScores.length)/(this.Clubs.length)); k++) {
          let score : number = 0;
          for (let i = 0; i < this.AssistantsScores.length; i++) {
            if (this.AssistantsScores[k].appointed === 'Appointed') {
              if (this.AssistantsScores[k].name === this.AssistantsScores[i].name){
                if (!this.checkRefsAppointed(maxRefs,this.AssistantsScores[i].name)){
                  score = 0 ;
                } else {
                  if (this.Appointments[j].teamA === this.AssistantsScores[i].team) {
                    score = score + this.AssistantsScores[i].score ;
                  }
                  if (this.Appointments[j].teamB === this.AssistantsScores[i].team) {
                    score = score + this.AssistantsScores[i].score ;
                  }
                }
              }
            }    
          }
          listscore.push(score)
        }
  
        lista[j] = listscore; 
        var maxscore = Math.max(...lista[j]);
        if (maxscore !== 0) {
          var maxindex = lista[j].indexOf(maxscore)
          maxRefs.push(this.AssistantsScores[maxindex].name);
          lista[j][maxindex]= 0;
          if (p === 0) {
            this.Appointments[j].fassistant = this.AssistantsScores[maxindex].name;
            this.Appointments[j].scoreFass = maxscore
          }
          if (p ===1) {
            this.Appointments[j].sassistant = this.AssistantsScores[maxindex].name;
            this.Appointments[j].scoreSass = maxscore
            if (j === (this.Appointments.length-1)) {
              this.getGameAVAR();
            }
          }
        }
      }  
    }
    this.getGameFourth()
    console.log('lista ass',this.Appointments)  
  }

  getGameFourth(){
    let lista : any = [];
    let maxRefs = []
    for (let j = 0; j < this.Appointments.length; j++) {
      let listscore : any =[];
        for (let k = 0; k < ((this.FourthScores.length)/(this.Clubs.length)); k++) {
          let score : number = 0;
          for (let i = 0; i < this.FourthScores.length; i++) {
            if (this.FourthScores[k].appointed === 'Appointed') {
              if (!this.checkAvailableRef(this.Appointments,this.Appointments[j].date, this.FourthScores[i].name,'fourth')){
                if (this.FourthScores[k].name === this.FourthScores[i].name){
                  if (!this.checkRefsAppointed(maxRefs,this.FourthScores[i].name)){
                    score = 0 ;
                  } 
                  else {
                    if (this.Appointments[j].teamA === this.FourthScores[i].team) {
                      score = score + this.FourthScores[i].score ;
                    }
                    if (this.Appointments[j].teamB === this.FourthScores[i].team) {
                      score = score + this.FourthScores[i].score ;
                    }
                  }
                }
              }                
            }
          }
          listscore.push(score)
        }

      lista[j] = listscore; 
      var maxscore = Math.max(...lista[j]);
      if(maxscore!== 0) {
        var maxindex = lista[j].indexOf(maxscore)
        maxRefs.push(this.FourthScores[maxindex].name);
        lista[j][maxindex]= 0;
        this.Appointments[j].fourth = this.FourthScores[maxindex].name;
        this.Appointments[j].scoreFourth = maxscore
      }
    }
    this.dialog.closeAll();
  }

  getGameVAR(){
    let lista : any = [];
    let maxRefs = []
    for (let j = 0; j < this.Appointments.length; j++) {
      let listscore : any =[];
      for (let k = 0; k < ((this.RefereesScores.length)/(this.Clubs.length)); k++) {
        let score : number = 0;
        for (let i = 0; i < this.RefereesScores.length; i++) {
          if (this.RefereesScores[k].appointed === 'Appointed') {
            if (!this.checkAvailableRef(this.Appointments,this.Appointments[j].date, this.RefereesScores[i].name,'fourth')){
              if (this.RefereesScores[k].name === this.RefereesScores[i].name){
                if (!this.checkRefsAppointed(maxRefs,this.RefereesScores[i].name)){
                  score = 0 ;
                } 
                else {
                  if (this.Appointments[j].teamA === this.RefereesScores[i].team) {
                    score = score + this.RefereesScores[i].score ;
                  }
                  if (this.Appointments[j].teamB === this.RefereesScores[i].team) {
                    score = score + this.RefereesScores[i].score ;
                  }
                }
              }
            }
          }    
        }
        listscore.push(score)
      }

      lista[j] = listscore; 
      var maxscore = Math.max(...lista[j]);
      var maxindex = lista[j].indexOf(maxscore)
      maxRefs.push(this.RefereesScores[maxindex].name);
      lista[j][maxindex]= 0;
      if (maxscore !==0 ){
        this.Appointments[j].faddassistant = this.RefereesScores[maxindex].name;
        this.Appointments[j].scoreFadd = maxscore
      }
    }
  }

  getGameAVAR(){
    let lista : any = [];
    let maxRefs = []
    for (let j = 0; j < this.Appointments.length; j++) {
      let listscore : any =[];
      for (let k = 0; k < ((this.AssistantsScores.length)/(this.Clubs.length)); k++) {
        let score : number = 0;
        for (let i = 0; i < this.AssistantsScores.length; i++) {
          if (this.AssistantsScores[k].appointed === 'Appointed') {
            if (!this.checkAvailableRef(this.Appointments,this.Appointments[j].date, this.AssistantsScores[i].name,'avar')){
              if (this.AssistantsScores[k].name === this.AssistantsScores[i].name){
                if (!this.checkRefsAppointed(maxRefs,this.AssistantsScores[i].name)){
                  score = 0 ;
                } else {
                  if (this.Appointments[j].teamA === this.AssistantsScores[i].team) {
                    score = score + this.AssistantsScores[i].score ;
                  }
                  if (this.Appointments[j].teamB === this.AssistantsScores[i].team) {
                    score = score + this.AssistantsScores[i].score ;
                  }
                }
              }
            } 
          }   
        }
        listscore.push(score)
      }

      lista[j] = listscore; 
      var maxscore = Math.max(...lista[j]);
      if (maxscore !== 0) {
        var maxindex = lista[j].indexOf(maxscore)
        maxRefs.push(this.AssistantsScores[maxindex].name);
        lista[j][maxindex]= 0;
        this.Appointments[j].saddassistant = this.AssistantsScores[maxindex].name;
        this.Appointments[j].scoreSadd = maxscore
      }
    }  
  }

  checkAvailableRef(list,date, name,type):boolean{
    let value : boolean = false; 
    for (let i = 0; i < list.length; i++) {
      if(type === 'fourth') {
        if(list[i].referee === name || list[i].faddassistant === name){
          if(list[i].date === date){
            return value = true
          }
        }
      }
      if(type === 'avar') {
        if(list[i].fassistant === name || list[i].sassistant === name){
          if(list[i].date === date){
            return value = true
          }
        }
      }
    }  
    return value;
  }
  

  setGamesTemporary() {
    for (let i = 0; i < this.game; i++) {
      var ptsA = this.getTeamStandingPTS(this.teamA[i])
      var ptsB = this.getTeamStandingPTS (this.teamB[i])
      var deff = Math.abs(ptsA - ptsB)
      var del = 0;
      if (i === 0){
        del =1;
      }

      let dat = new Date(this.date[i])
      let tim = new Date(this.time[i])

      this.dataprovider.setGamesTemporary(
         this.season,this.competition,this.round,this.game,this.stadium[i],(dat.getTime()/1000),(tim.getTime()/1000),
         this.teamA[i],this.teamB[i],ptsA,ptsB,deff,del)        
         .then(res=>{
           this.Appointments = res ;
           console.log("setGamesTemporary", res)
           this.getGameReferees();
      }).catch( err => {
        console.log('err', err)
      })
    }
  }



  checkname(name) : Boolean {
    let check;
      for (let i = 0; i < this.RefereAppointed.length; i++) {
          // console.log("name checdk", this.RefereAppointed[i][0]);
           if(name === this.RefereAppointed[i][0].name){
             check = true;
           }   
      }
    return check;
  }

  getMatchDate(date, time): string{
    let d = new Date();
    d.setTime(date*1000)
    let t = new Date(time)
    t.setTime(time*1000)
    let g = new Date ()
    g.setTime(d.getTime());
    g.setHours(t.getHours())
    g.setMinutes(t.getMinutes())
    
    let value = g.getDate() + "/" + (g.getMonth()+1) + '/' + g.getFullYear() + "  " + 
                g.getHours() + ':' + g.getMinutes()
 
    return value;
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

  ///////////DISABLEE
  Undo(j){
    this.deleteitem(this.teamA[j])
    this.teamA[j]="";
    this.deleteitem(this.teamB[j])
    this.teamB[j]="";
  }
  deleteitem(item) {
    for (let i = 0; i < this.teamselected.length; i++) {
      if (this.teamselected[i].name === item) {
          this.teamselected.splice(i, 1);
      }
    }
  }
  checkifExist(team) : boolean {
    if (team){
      for (let i = 0; i < this.teamselected.length; i++) {
        if (this.teamselected) {
          if (this.teamselected[i].name === team.name){
            return true;
          }
        }  
      }
    } 
    return false;
  }
  
  ////Steps
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;    
  }
  prevStep() {
    this.step--;
  }


}



// refereematchscore(){
//   this.RefereAppointed = [];
//   for (let i = 0; i < this.game; i++) {
//     this.RefereAppointed.push(this.refereematchscores(this.teamA[i], this.teamB[i]));
//   }
// }

// refereematchscores(teamA, teamb){
//   let scores = []
//   let res  ;
//   let result = [];

//   var table = (<HTMLTableElement >document.getElementById("mytab1"));
//   let sco = 0;
//   // for (let k = 0; k < this.game.length; k++) {
//     for (var i = 1; i < table.rows.length; i++) {
//       for (var j = 1 ;  j < table.rows[i].cells.length; j++) {
//         console.log("jdid",table.rows[i].cells[13].innerText);
        
//           if (teamA === table.rows[0].cells[j].innerText){
//             if (this.checkname(table.rows[i].cells[0].innerText)){
//               sco = 0;
//             }else if (table.rows[i].cells[13].innerText!==""){
//               sco = 0
//             }else{
//               sco = sco + Number(table.rows[i].cells[j].innerText)
//             }
//           }
//           if (teamb === table.rows[0].cells[j].innerText){
//             if (this.checkname(table.rows[i].cells[0].innerText)){
//               sco = 0;
//             }else if (table.rows[i].cells[13].innerText!==""){
//               sco = 0
//             }else{
//               sco = sco + Number(table.rows[i].cells[j].innerText)
//             }
//           }
//         }
//       scores.push(sco)
//       console.log("scores",scores);
      
//       sco = 0 ;
//       let max = Math.max(...scores);
//       res = {
//         scores : max,
//         name : table.rows[scores.indexOf(max)+1].cells[0].innerText,
//         teama : teamA,
//         teamb : teamb
//       }
//     }
//     result.push(res)

//   return result 
// }