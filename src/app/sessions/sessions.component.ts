import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DataproviderService } from '../dataprovider.service';
import { ProgressSpinnerDialog } from '../progressspinner/progressspinner';
import { DateDialog } from './date/date';
import { DebriefingGroupsDialog } from './debriefing/group';
import { DebriefingSessionDialog } from './debriefing/session';
import { EnglishGroupsDialog } from './english/group';
import { EnglishSessionDialog } from './english/session';
import { TrainingDialog } from './training/training';


export interface PeriodicElement {
  ID : number,
  name: string;
  available: string;
  number : number,
  weight: string;
  height: string;
}

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements AfterViewInit, OnInit {

  training : boolean = true;
  english : boolean = false;
  debriefing : boolean = false;


  presence : boolean = false ;
  debpresence: boolean = false ;

  DateTitle : string = ''
  firstDay : Date ;
  lastDay : Date ;

  displayedColumns = [ 'ID', 'name'] ;
  columnsToDisplay: string[] = this.displayedColumns.slice();
  EngdisplayedColumns = ['no','date','group']
  SessionsColumns = []
  
  RefdisplayedColumns = [ 'id' , 'name' ];

  DebdisplayedColumns = [ 'id' , 'name' ]

  Referees : any = [];
  Colors : any [];
  Types : any = [];
  dataSource = [];

  interRefs :any = [];
  interAss :any = [];
  eliteRefs :any = [];
  eliteAss :any = [];
  seniRefs :any = [];
  seniAss :any = [];
  juniRefs :any = [];
  juniAss :any = [];
  aspiRefs :any = [];
  aspiAss :any = [];
  rookRefs :any = [];
  rookAss :any = [];

  EnglishSessions= []
  EnglishSessionsGen= []
  EnglishSessionsSesPre= []
  EnglishSessionsSesAbs= []

  DebriefingSessions= []
  DebriefingSessionsGen= []
  DebriefingSessionsSesPre= []
  DebriefingSessionsSesAbs= []

  tabsSelection : any =[]

  constructor(
        private changeDetectorRefs: ChangeDetectorRef,
        private serviceProvider : DataproviderService,
        private dialog : MatDialog){

  }

  ngOnInit() {
    this.callProgressSpinner()
    this.tabChanged(0);
    this.getDatesHome();
    this.getColors();
    this.getTypes();
  }


  ngAfterViewInit() {    
    this.gethome();
    this.getEnglishSessions(0);
    this.getDebriefingSessions(0);
  }

  callProgressSpinner(){
    this.dialog.open(ProgressSpinnerDialog, {
    });
  }
  
  NavChanged(option){
    this.training = false;
    this.english = false;
    this.debriefing = false;
    if (option ==='T') {
        this.training = true ;
    } else if (option ==='E') {
      this.english = true ;
    }else if (option ==='D') {
      this.debriefing = true ;
    }
  }

  tabChanged(option){
    for (let i = 0; i < 7; i++) {
      if(option===0){
        this.tabsSelection[i]=true
      }else{
        this.tabsSelection[i]=false
      }
    }
    this.tabsSelection[option]=true ;
  }


  // ******************************** TRAINING SESSION **********************************//

  getDatesHome(){
    this.columnsToDisplay = []
    let columns = this.displayedColumns ;
    var date = new Date();

    this.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lastDay = new Date(date.getFullYear(), date.getMonth()+ 1, 0);

    console.log('first',this.firstDay)
    console.log('last',this.lastDay)

    this.DateTitle = (this.firstDay.getDate()) + " " + this.firstDay.getFullYear() ;  

    for (let i = 0; i < this.lastDay.getDate(); i++) {
      columns.push((this.firstDay.getDate()+i).toString())
    }

    this.columnsToDisplay = columns.slice();
  }

  
  chosenMonthHandler(normalizedMonth, datepicker) {

    let date = new Date(normalizedMonth)

    this.firstDay = new Date(date.getFullYear() , date.getMonth(), 1 )
    this.lastDay = new Date(date.getFullYear() , date.getMonth()+1 , 0 ) ;

    console.log('first1',this.firstDay)
    console.log('last1',this.lastDay)
    this.getDateSearch()
    datepicker.close();
  }


  getDateSearch(){
    this.columnsToDisplay = []
    this.displayedColumns = [ 'ID', 'name'] ;

    let columns = this.displayedColumns ;

    this.DateTitle = (this.firstDay.getMonth()+1)  + " " + this.firstDay.getFullYear() ;  

    this.gethome();
    for (let i = 0; i < this.lastDay.getDate(); i++) {
      columns.push((this.firstDay.getDate()+i).toString())
    }
    this.columnsToDisplay = columns.slice();
  }

  WeekendColor(column) : boolean{
    let green = false ;
      let date = new Date()
      date.setTime(this.firstDay.getTime())
      date.setMonth(this.firstDay.getMonth())
      date.setDate(column)

      if (date.getDay()=== 5) {
        green = true;
      }

    return green
  }

  SessionColor(element,column){
    let first = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), column);
    let j =0;
    let ValueToReturn : string = '#ffffff';

    if (this.SessionsColumns.length > 0) {
      while (j<this.SessionsColumns.length) {
        if (parseInt(column) > 0) {
          if ( this.SessionsColumns[j].referee === element.name ) {
              let d1 =  new Date ((this.SessionsColumns[j].date)*1000)
              let d2 = new Date (first.getTime())
              if (d1.getDate() === d2.getDate()) {
                ValueToReturn = '#'+ this.SessionsColumns[j].color
                return ValueToReturn;
              } 
              else{
                ValueToReturn = element[column];
              }
            } else {
            ValueToReturn = element[column];
          }
        }
        j++; 
      }
         
    }
    else {
      ValueToReturn = "#ffffff";
    } 
  return ValueToReturn
  }

  WeekendToggle(column) : boolean{
    let toggle = false ;
      if (column === 1) {
        toggle = true;
      }
    return toggle
  }

  OpenCalendar(date){   
    let dialogref = this.dialog.open(DateDialog, {
      width: '350px',
    });

    dialogref.afterClosed().subscribe(result => {
      date.setValue()
    });
  }


  opensession(element,column){
    let session = this.getRowSelected(element,column)

    let date = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), column) ;
    
    let dialogref = this.dialog.open(TrainingDialog, {
      width: '450px',
      data : { id_referee: element.ID, name : element.name , date: date , types : this.Types, 
              color : session.color , id_session : session.id,
              training : session.training, description : session.description,
              colors : this.Colors, firstDay : this.firstDay, lastDay: this.lastDay }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result.length> 0) {
        this.SessionsColumns = result as [];
      }
    });
  }

  getRowSelected(element,column) : any {
    let first = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), column);
    let j =0;
    let ValueToReturn : [] ;

    if (this.SessionsColumns.length > 0) {
      while (j<this.SessionsColumns.length) {
        if (parseInt(column) > 0) {
          if ( this.SessionsColumns[j].referee === element.name ) {
              let d1 =  new Date ((this.SessionsColumns[j].date)*1000)
              let d2 = new Date (first.getTime())
              if (d1.getDate() === d2.getDate()) {
                ValueToReturn = this.SessionsColumns[j]
                return ValueToReturn;
              } 
              else{
                ValueToReturn = [];
              }
            } else {
            ValueToReturn = [];
          }
        }
        j++; 
      }
         
    }
    else {
      ValueToReturn = [];
    } 

    return ValueToReturn;
  }

  gethome(){
    let levels = [];
    let natures = ['referee','fassistant'];
    this.serviceProvider.getRefereesLevels().then(res=>{
      levels = res as [];
      for (let i = 0; i < natures.length; i++) {
        for (let j = 0; j < levels.length; j++) {
          this.getReferees(levels[j].levels,natures[i]) ;         
        }        
      }
    })      
  }
  
  getReferees(level, nature){
    this.serviceProvider.getRefereesTraining(level,nature).then(res=>{
      if (level === 'international') {
          if (nature === 'referee') {
            // console.log('first R',this.firstDay)
            // console.log('last R',this.lastDay)
            this.getTrainingSessions(this.firstDay.getTime()/1000,this.lastDay.getTime()/1000);
            this.interRefs = res as []
          } else {
            this.interAss = res as []
          }
          // console.log('this.interAss ', this.interAss);

      } 
      if (level === 'elite') {
        if (nature === 'referee') {
          this.eliteRefs = res as []
        } else {
          this.eliteAss = res as []
        }
      }
      if (level === 'senior') {
        if (nature === 'referee') {
          this.seniRefs = res as []
        } else {
          this.seniAss = res as []
        }
      }
      if (level === 'junior') {
        if (nature === 'referee') {
          this.juniRefs = res as []
        } else {
          this.juniAss = res as []
        }
      }
      if (level === 'aspire') {
        if (nature === 'referee') {
          this.aspiRefs = res as []
        } else {
          this.aspiAss = res as []
        }
      }
      if (level === 'rookie') {
        if (nature === 'referee') {
          this.rookRefs = res as []
        } else {
          this.rookAss = res as []
        }
      }
    })
  }

  getTrainingSessions(first,last){
    this.SessionsColumns = [];
    this.serviceProvider.getTrainingSessions(first,last).then(res=>{
      this.SessionsColumns = res as []
      this.dialog.closeAll();
    })
  }

  getColors(){
    this.serviceProvider.getTraningColors().then(res=>{
      this.Colors = res as []
    })
  }

  getTypes(){
    this.serviceProvider.getTrainingTypes().then(res=>{
      this.Types = res as []
    })
  }

  getData(element, column, i): string{
    let first = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), column);
    let j =0;
    let ValueToReturn : string = element[column];

    if (this.SessionsColumns.length > 0) {
      while (j<this.SessionsColumns.length) {
        if (parseInt(column) > 0) {
          if ( this.SessionsColumns[j].referee === element.name ) {
              let d1 =  new Date ((this.SessionsColumns[j].date)*1000)
              let d2 = new Date (first.getTime())
              if (d1.getDate() === d2.getDate()) {
                ValueToReturn = this.SessionsColumns[j].training
                return ValueToReturn;
              } 
              else{
                ValueToReturn = element[column];
              }
            } else {
            ValueToReturn = element[column];
          }
        }
        j++; 
      }
         
    }
    else {
      ValueToReturn = "";
    } 
  return ValueToReturn
  }

  /// add spinner loading alert when loading get home 

  // fixx date alert 

  // ******************************** ENGLISH SESSION **********************************//

  getEnglishSessions(date){
    this.callProgressSpinner();
    this.serviceProvider.getEnglishSession(date).then((res: []) =>{
      this.EnglishSessionsGen = [];
      this.EnglishSessions = [];
      if (res.length >0) {
        this.EnglishSessionsGen = res;
        let d = this.EnglishSessionsGen[0].date
        let g = this.EnglishSessionsGen[0].id_group
        this.EnglishSessions.push(this.EnglishSessionsGen[0])
        for (let i = 1; i < this.EnglishSessionsGen.length; i++) {
          if ((this.EnglishSessionsGen[i].date!==d) || (g !== this.EnglishSessionsGen[i].id_group)) {
            d =this.EnglishSessionsGen[i].date;
            g = this.EnglishSessionsGen[i].id_group;
            this.EnglishSessions.push(this.EnglishSessionsGen[i] )
          }        
        }
      }
      this.dialog.closeAll()
    })
  }

  getDateForm(date) : string {
    let d = new Date(date * 1000);
    let value = d.getFullYear()+'/'+ d.getMonth() +1+ '/' + d.getDate()
    return value 
  }

   onGroupSelect(item){
    this.presence = true;
    this.EnglishSessionsSesPre = []
    this.EnglishSessionsSesAbs = []
    
    for (let i = 1; i < this.EnglishSessionsGen.length; i++) {
      if ((this.EnglishSessionsGen[i].date ===item.date) &&  (item.id_group === this.EnglishSessionsGen[i].id_group)) {
        if (this.EnglishSessionsGen[i].presence==="true") {
          this.EnglishSessionsSesPre.push(this.EnglishSessionsGen[i])
          this.EnglishSessionsSesPre.slice();
        } else {
          this.EnglishSessionsSesAbs.push(this.EnglishSessionsGen[i])
          this.EnglishSessionsSesAbs.slice();
        }

      }        
    }
   }

   onSelectDate(date){
     let d = new Date(date._validSelected)
    this.getEnglishSessions((d.getTime())/1000)
   }

   configGroups(){    
    let dialogref = this.dialog.open(EnglishGroupsDialog, {
      width: '800px',
    });

    dialogref.afterClosed().subscribe(result => {
      this.getEnglishSessions(0)
    });
   }

   configSessions(){
    let dialogref = this.dialog.open(EnglishSessionDialog, {
      width: '500px',
    });

    dialogref.afterClosed().subscribe(result => {
      this.getEnglishSessions(0)
    });
   }




   //******************************* DEBRIEFING SESSION ************************************//
  getDebriefingSessions(date){
    this.serviceProvider.getDebriefingSession(date).then((res:[]) =>{
      this.DebriefingSessionsGen = [];
      this.DebriefingSessions=[];      
      if (res.length >0) {
        this.DebriefingSessionsGen = res;
        let d = this.DebriefingSessionsGen[0].date
        let g = this.DebriefingSessionsGen[0].id_group
        this.DebriefingSessions.push(this.DebriefingSessionsGen[0])

        for (let i = 1; i < this.DebriefingSessionsGen.length; i++) {
          if ((this.DebriefingSessionsGen[i].date!==d) ||  (g !== this.DebriefingSessionsGen[i].id_group)) {
            d =this.DebriefingSessionsGen[i].date;
            g = this.DebriefingSessionsGen[i].id_group;
            this.DebriefingSessions.push(this.DebriefingSessionsGen[i])
            this.DebriefingSessions.slice();
          }        
        }
      }
    })
  }

  onSelectDateDebriefing(date){
    let d = new Date(date._validSelected)
   this.getDebriefingSessions((d.getTime())/1000)
  }

  onSelectGroupDebriefing(item){
    this.debpresence = true;
    this.DebriefingSessionsSesPre = []
    this.DebriefingSessionsSesAbs = []
    for (let i = 1; i < this.DebriefingSessionsGen.length; i++) {
      if ((this.DebriefingSessionsGen[i].date ===item.date) &&  (item.id_group === this.DebriefingSessionsGen[i].id_group)) {
        if (this.DebriefingSessionsGen[i].presence==="true") {
          this.DebriefingSessionsSesPre.push(this.DebriefingSessionsGen[i])
          this.DebriefingSessionsSesPre.slice();
        } else {
          this.DebriefingSessionsSesAbs.push(this.DebriefingSessionsGen[i])
          this.DebriefingSessionsSesAbs.slice();
        }

      }        
    }
  }

  configGroupsDebriefing(){
    let dialogref = this.dialog.open(DebriefingGroupsDialog, {
      width: '800px',
    });

    dialogref.afterClosed().subscribe(result => {
      this.onSelectDateDebriefing(0)
    });
  }

  configSessionsDebriefing(){
    let dialogref = this.dialog.open(DebriefingSessionDialog, {
      width: '800px',
    });

    dialogref.afterClosed().subscribe(result => {
      this.onSelectDateDebriefing(0)
    });

  }

  getDateFormDebriefing(date): string{
    let d = new Date(date * 1000);
    let value = d.getFullYear()+'/'+ d.getMonth() +1+ '/' + d.getDate()
    return value 
  }

}

