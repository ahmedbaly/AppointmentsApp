import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'url';
import { rejects } from 'assert';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataproviderService {
  headers : {
    "Content-Type":'application/json; charset=utf-8'
  }

  constructor(public http: HttpClient) { }


  getHome(){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/gethistory").subscribe(data=>{
        res = data as []
        resolve(res) ;
      });
    });
  }


  getHistorySeason(id_season){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getHistorySeason?id_season="+ id_season).subscribe(data=>{
        res = data as []
        resolve(res) ;
      });
    });
  }


  getcompetitions(){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getCompetitions").subscribe(data=>{
        for (let i = 0; i < Object.keys(data).length; i++)  {
          res.push(data[i].competition) 
        }
        resolve(res) ;
      });
    });
  }

  getcompetitionsSeason(){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getCompetitions").subscribe(data=>{
        for (let i = 0; i < Object.keys(data).length; i++)  {
          res = data as []
        }
        resolve(res) ;
      });
    });
  }
  
  getselection(topping){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/gethistcat?competition="+ topping).subscribe(data=>{
        res = data as []
        resolve(res) ;
      });
    });
  }

  //get referees general 
  
  getRefereesGeneral(){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getreferees?").subscribe(data=>{
        res = data as []
        resolve(res) ;
      });
    });
  }

  /// referees.component: when select a number of game of a referee *** get his data by competitions 
  getRefereeCompetitions(referee,competition){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getRefereeCompetitions?"+
        "id_referee="+ referee.ID +
        "&competition="+ competition).subscribe(data=>{
        res = data as []
        resolve(res) ;
      });
    });
  }

  getSuccessGame(id_match){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getSuccessGame?id_match="+ id_match).subscribe(data=>{
        res = data as []
        resolve(res) ;
      });
    });
  }
    
  setSuccessGame(Game , Referee){
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/setsuccessgame?"+
      "id_success="+ Game.id_success +
      "&id_match="+ Game.id_match +
      "&referee="+ Referee.name +
      "&role="+ Referee.role +
      "&note="+ Referee.note
      ).subscribe(data=>{
        console.log('dat result', data)
        resolve(data) ;
      });
    });
  }


  getStadiums(){
    let res = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getstadiums").subscribe(data=>{
        for (let i = 0; i < Object.keys(data).length; i++)  {
          res.push(data[i].name) 
        }
        resolve(res) ;
      });
    });
  }

  getLastID(){
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getlastid").subscribe(data=>{
        resolve(data[0].Column1 +1) ;
      });
    });
  }

  getReferees(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getreferees").subscribe(data=>{
        for (let i = 0; i < Object.keys(data).length; i++)  {
          res.push(data[i].name);
        }
        resolve(res) 
      });
    })
  }

  getRefereesbyLevelNature(id_level, id_nature){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getRefereesbyLevelNature?"+
      "&id_level=" + this.returnzero(id_level) +
      "&id_nature=" + this.returnzero(id_nature)
      ).subscribe(data=>{
        for (let i = 0; i < Object.keys(data).length; i++)  {
          res.push(data[i]);
        }
        resolve(res) 
      });
    })
  }

  returnzero (number ): number {
    let r = 0;
      if(number>0){
        r = number
      }
    return r;
  }

  getclubs(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getclubs").subscribe(data=>{
        resolve(data) 
      });
    })    
  }

  getclubsCompetitions(competition){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getclubscompetition?competition="+competition)
      .subscribe(data=>{
        console.log("club name", data);
        for (let i = 0; i < Object.keys(data).length; i++)  {          
          res.push(data[i].name);
        }
        resolve(res) 
      });
    })    
  }


  getclubsdisable(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getclubs").subscribe(data=>{
        for (let i = 0; i < Object.keys(data).length; i++)  {
          res.push({club : data[i].name, disabled : false});
        }
        resolve(res) 
      });
    })    
  }

  getAssessor(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getAssessors").subscribe(data=>{
        // res = data as [];
        resolve(data) ;
      
      });
    }) 
  }

  getAssessors(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getAssessors").subscribe(data=>{
        for (let i = 0; i < Object.keys(data).length; i++)  {
          res.push(data[i].name);
        }
        resolve(res) 
      });
    }) 
  }

  getRefereesGrid(competition){
    let res = [], refs = [], ass = [], fourth =[], vaar = [], avar = []
    return new Promise(resolve => {
      this.http.get("http://localhost/publish/api/qfareferees/getrefereesgrid?competition="+ competition)
      .subscribe(data=>{
        for (let i = 0; i < Object.keys(data).length; i++)  {
          if(data[i].referee==="yes"){
            refs.push(data[i].name) ;
          }
          if(data[i].assistant==="yes"){
            ass.push(data[i].name);
          }
          if(data[i].fourthofficial==="yes"){
            fourth.push(data[i].name) ;
          }
          if(data[i].var==="yes"){
            vaar.push(data[i].name);
          }          
          if(data[i].avar==="yes"){
            avar.push(data[i].name);
          }
          
        }
        resolve({
            refs : refs,
            ass : ass,
            fourth : fourth,
            var : vaar,
            avar : avar
        }) ;
      });
    });
  }

  getStandings(competition){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getstandings?competition="+ competition)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    })    
  }

  getRefRequirements(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getRefRequirements")
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    })    
  }

  getappointments(competition,round,game,stadiums,date,teamA,teamB){

    console.log("competition", competition)
    console.log("round", round)
    console.log("game", game)
    console.log("stadiums", stadiums)
    console.log("date", date)
    console.log("teamA", teamA)
    console.log("teamB", teamB)

    let res = []
    let link =""

    for (let j = 0; j < 6; j++)  {
      link = link + "&date" + [j+1]  +"=" + date[j]
      + "&stadium" + [j+1] +"=" + stadiums[j]
      + "&teama" + [j+1]  +"=" + teamA[j]
      + "&teamb" + [j+1]  +"=" + teamB[j]
    }

    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getappointments?"+
        "competition="+ competition + "&round="+ round + link)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    })    
  }


 ////POSTs

 PostForm(form){
  console.log("postform",form)
  console.log("form.gamedetails.stadium",form.gamedetails.stadium)

  let body = "id=1&stadium="+form.gamedetails.stadium
            +"&competition="+form.gamedetails.competition
            +"&round="+form.gamedetails.round
            +"&date="+form.gamedetails.date
            +"&teama="+form.gamedetails.teama
            +"&score="+form.gamedetails.score
            +"&teamb="+form.gamedetails.teamb
            +"&motif="+form.commissaire.motif
            +"&rapport="+form.commissaire.rapport
            +"&obsref="+form.commissaire.obsref
            +"&obsfass="+form.commissaire.obsfass
            +"&obssass="+form.commissaire.obssass
            +"&incteama="+form.commissaire.incteama
            +"&incteamb="+form.commissaire.incteamb
            +"&video1="+form.videos.video1
            +"&video2="+ form.videos.video2
            +"&video3="+form.videos.video3
            +"&video4="+form.videos.video4
            +"&referee="+form.refereeslist.referee 
            +"&fassistant="+form.refereeslist.fassistant
            +"&sassistant="+form.refereeslist.sassistant
            +"&fofficial="+ form.refereeslist.fofficial
            +"&var="+form.refereeslist.var
            +"&avar="+form.refereeslist.avar
            +"&operators="+ form.refereeslist.operator
            +"&commissaire="+form.refereeslist.commissaire;

    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/postform?"+body)
      .subscribe(data=>{
        console.log("data post" , data)
        resolve(data) 
        })
    }) 
 }

  setavailability(row,checked){
    console.log('row',row);
    console.log('checked',checked);

    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setavailability?id="+row.ID+"&availability="+checked)
      .subscribe(data=>{
        resolve(data) 
        })
    }) 
  }

  setRequirements(result){
    console.log("res provider",result)

    let body = "name="+result.name
              +"&first="+ result.first
              +"&last="+result.last
              +"&debriefing="+result.debr
              +"&training="+result.trai
              +"&anglais="+result.ang
              +"&descipline="+result.desc
              +"&serious="+result.serio
              +"&weight="+result.weig
  
      return new Promise(resolve=>{
        this.http.get("http://localhost/publish/api/qfareferees/setRequirements?"+body)
        .subscribe(data=>{
          console.log("data post" , data)
          resolve(data) 
          })
      }) 
  }

  getRefereesScorematchs(competition,nextround ,type, date, limit){
    let body = "competition="+competition+"&nextround="+ nextround 
              + "&refereeType="+ type + "&dateTraining="+ date +"&limit="+ limit ;
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getRefereesScorematch?"+body)
      .subscribe(data=>{
        resolve(data) ;
        })
    }) 
  }

  getScoresTemporary(competition){
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getTemporaryScores?competition="+ competition)
      .subscribe(data=>{
        resolve(data) ;
        })
    }) 
  }

  setGamesTemporary(season,competition,nextround,games, stadium, date, time, 
          teamA, teamB, ptsA, ptsB, difference, del : number){
    let body =  "season=" + season+
                "&competition="+ competition+
                "&round="+ nextround+
                "&games="+ games+
                "&stadium=" + stadium +
                "&date="+ date +
                "&time="+ time +
                "&teamA="+ teamA +
                "&teamB="+ teamB +
                "&ptsA="+ ptsA+
                "&ptsB="+ ptsB+
                "&difference="+ difference+
                "&del="+ del;
                              
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setGamesTemporary?"+body)
      .subscribe(data=>{
        console.log('result', data)
        resolve(data) ;
        })
    }) 
  }

  // getRefereesScorematch(competition,nextround , teams , type){
  //   let T1 =[],T2 =[], T3 =[], T4 =[], T5 =[], T6 =[], T7 =[], T8 =[], T9 =[], T10 =[],T11 =[], T0 =[];
  //   let body = "competition="+competition+"&nextround="+ nextround + "&refereeType="+ type;
  //   let result = []
  //   return new Promise(resolve=>{
  //     this.http.get("http://localhost/publish/api/qfareferees/getRefereesScorematch?"+body)
  //     .subscribe(data=>{
  //        for (let i = 0; i < Object.keys(data).length; i++)  {
  //           for (let j = 0; j < teams.length; j++) {
  //             // console.log('data[i].team',data[i].team)
  //             // console.log('teams[j].name',teams[j].name)
  //             // console.log('j',j)
  //             switch (data[i].team) {
  //               case teams[j].name:
  //                   switch (j) {
  //                       case 0:
  //                         T0.push(data[i])
  //                         break;   
  //                       case 1:
  //                         T1.push(data[i])
  //                         break;
  //                       case 2:
  //                         T2.push(data[i])
  //                         break;
  //                       case 3:
  //                         T3.push(data[i])
  //                         break; 
  //                       case 4:
  //                         T4.push(data[i])
  //                         break; 
  //                       case 5:
  //                         T5.push(data[i])
  //                         break; 
  //                       case 6:
  //                         T6.push(data[i])
  //                         break; 
  //                       case 7:
  //                         T7.push(data[i])
  //                         break; 
  //                       case 8:
  //                         T8.push(data[i])
  //                         break; 
  //                       case 9:
  //                         T9.push(data[i])
  //                         break;      
  //                       case 10:
  //                         T10.push(data[i])
  //                         break; 
  //                       case 11:
  //                         T11.push(data[i])
  //                         break;            
  //                     default:
  //                       break;
  //                   }
  //                 break;
  //               default:
  //                 break;
  //             }
              
  //           }
  //         }
  //       result.push(T0,T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11)
  //       console.log('result', result)
  //       resolve(result) ;
  //       })
  //   }) 
  // }

  // getAssistantsScorematch(competition, nextround){
  //   let teams=["Al-Ahli SC","Al-Arabi SC", "Al-Duhail SC","Al-Gharafa SC","Al-Khor SC","Al-Rayyan SC",
  //   "Al-Sadd SC","Al-Sailiya SC","Al-Shahania SC","Al-Wakrah SC","Qatar SC","Umm Salal SC"]
  //   let T1 =[],T2 =[], T3 =[], T4 =[], T5 =[], T6 =[], T7 =[], T8 =[], T9 =[], T10 =[],T11 =[], T0 =[];
  //   let body = "competition="+competition+"&nextround="+ nextround;
  //   let result = []
  //   let score= []; let j=[];
  //   return new Promise(resolve=>{
  //     this.http.get("http://localhost/publish/api/qfareferees/getAssistantsScorematch?"+body)
  //     .subscribe(data=>{
  //        for (let i = 0; i < Object.keys(data).length; i++)  {
  //           for (let j = 0; j < teams.length; j++) {
  //             switch (data[i].team) {
  //               case teams[j]:
  //                   switch (j) {
  //                       case 0:
  //                         T0.push(data[i])
  //                         break;   
  //                       case 1:
  //                         T1.push(data[i])
  //                         break;
  //                       case 2:
  //                         T2.push(data[i])
  //                         break;
  //                       case 3:
  //                         T3.push(data[i])
  //                         break; 
  //                       case 4:
  //                         T4.push(data[i])
  //                         break; 
  //                       case 5:
  //                         T5.push(data[i])
  //                         break; 
  //                       case 6:
  //                         T6.push(data[i])
  //                         break; 
  //                       case 7:
  //                         T7.push(data[i])
  //                         break; 
  //                       case 8:
  //                         T8.push(data[i])
  //                         break; 
  //                       case 9:
  //                         T9.push(data[i])
  //                         break;      
  //                       case 10:
  //                         T10.push(data[i])
  //                         break; 
  //                       case 11:
  //                         T11.push(data[i])
  //                         break;            
                    
  //                     default:
  //                       break;
  //                   }
  //                 break;
  //               default:
  //                 break;
  //             }
              
  //           }
  //         }
  //       result.push(T0,T1,T2,T3,T4,T5,T6,T7,T8,T9,T10,T11)
  //       resolve(result) ;
  //       })
  //   }) 
  // }


  getRefereesNatures(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getrefereesnatures")
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getRefereeNature(id_referee){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getrefereenature?id_referee="+ id_referee)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setRefereeNatures(id_referee, id_nature){
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setRefereeNature?id_referee="+ id_referee +"&id_nature="+ id_nature)
      .subscribe(data=>{
        resolve(data) 
      });
    }) 
  }

  deleteRefereeNatures(id_referee_nature){
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setRefereeNature?id_referee_nature="+ id_referee_nature)
      .subscribe(data=>{
        resolve(data) 
      });
    }) 
  }


  


  getRefereesLevels(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getrefereeslevels")
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getRefereeLevel(id_referee){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getrefereelevel?id_referee="+ id_referee)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  updateRefereeLevel(id_referee, id_level, id_referee_level){
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/updateRefereeNature?id_referee="+ 
        id_referee +"&id_level="+ id_level + "&id_referee_level="+ id_referee_level)
      .subscribe(data=>{
        resolve(data) 
      });
    }) 
  }



  getSeasons(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getseasons")
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setSeason(season){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setseason?season="+ season)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getSeasonCompetitions(id_season){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getseasoncompetitions?id_season="+ id_season)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  UpdateCompetitionsSeason(id_season,id_competition,competitionName,option){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/UpdateCompetitionsSeason?"
      +"id_season="+ id_season
      +"&id_competition="+ id_competition
      +"&competitionName="+ competitionName
      +"&option="+ option)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }


  getClubsCompetitions(id_competition){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getClubsCompetitions?id_competition="+ id_competition)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  updateClubsCompetition(id_club,id_competition,clubName,option){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/updateClubsCompetition?"
      +"id_club="+ id_club
      +"&id_competition="+ id_competition
      +"&clubName="+ clubName
      +"&option="+ option)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  updateClubStanding(club){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/updateClubStanding?"
      +"id="+ club.id
      +"&score="+ club.score
      +"&round="+ club.round
      +"&type="+ club.type )
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }
  

  /// Sessions :  get referee by level/nature sort General tables
  getRefereesTraining(level, nature){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getRefereesTraining?"
      +"level="+ level
      +"&nature="+ nature)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  //Session : get :: set Colors 
  getTraningColors(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getTraningColors")
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setTraningColors(color){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setTraningColors?"
      +"color="+ color)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  // Sessions : get :: set training Types 
  getTrainingTypes(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getTrainingTypes")
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setTrainingTypes(training){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setTrainingTypes?"
      +"training="+ training)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  // Sessions : get :: insert , update, delete training sessions 
  getTrainingSessions(firstday, lastday){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getTrainingSessions?"
      +"firstday="+ firstday
      +"&lastday="+ lastday)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setTrainingSessions(id, training, color, id_referee, referee, date, designation, description,option, firstday, lastday){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setTrainingSessions?"
      +"id="+ id
      +"&training="+ training
      +"&color="+ color
      +"&id_referee="+ id_referee
      +"&referee="+ referee
      +"&date="+ date
      +"&designation="+ designation
      +"&description="+ description
      +"&option="+ option
      +"&firstday="+ firstday
      +"&lastday="+ lastday)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }


  ////// English Sessions Groups
  CreateGroupEnglish(groupName){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setGroupEnglish?"
      +"groupname="+ groupName)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getGroupsEnglish(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getGroupEnglish?")
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getGroupsEnglishReferees(id_group){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getGroupsEnglishReferees?"
      +"id_group="+ id_group)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setGroupsEnglishReferees(id,id_group,id_referee){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setGroupsEnglishReferees?"
      +"id="+ id
      +"&id_group="+ id_group
      +"&id_referee="+ id_referee)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setEnglishSession(id_group,id_referee,date,presence){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setEnglishSession?"
      +"id_group="+ id_group
      +"&id_referee="+ id_referee
      +"&date="+ date
      +"&presence="+ presence)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }


  getEnglishSession(date){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getEnglishSession?"
      +"date="+ date)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }


  ////// Debriefing Sessions Groups
  CreateGroupDebriefing(groupName){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setGroupDebriefing?"
      +"groupname="+ groupName)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getGroupsDebriefing(){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getGroupDebriefing?")
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getGroupsDebriefingReferees(id_group){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getGroupsDebriefingReferees?"
      +"id_group="+ id_group)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setGroupsDebriefingReferees(id,id_group,id_referee){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setGroupsDebriefingReferees?"
      +"id="+ id
      +"&id_group="+ id_group
      +"&id_referee="+ id_referee)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  setDebriefingSession(id_group,id_referee,date,presence){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setDebriefingSession?"
      +"id_group="+ id_group
      +"&id_referee="+ id_referee
      +"&date="+ date
      +"&presence="+ presence)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getDebriefingSession(date){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getDebriefingSession?"
      +"date="+ date)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }
  

  setLevelsCompetition(id,id_competition,id_level){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setLevelsCompetition?"
      +"id="+ id
      +"&id_competition="+ id_competition
      +"&id_level="+ id_level)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getLevelsCompetition(competition){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getLevelsCompetition?"
      +"id_competition="+ competition.id_competition)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }


  /// SANCTIONS ////
  setSanction(referee, id_match , team, description , option, id){
    let res = []
    // (int id, int id_match, string team, string referee, string role, int date, string description

    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/setSanction?"
      +"id="+ id
      +"&id_match="+ id_match
      +"&team="+ team
      +"&referee="+ referee.name
      +"&role="+ referee.type
      +"&date="+ (referee.date/1000)
      +"&description="+ description
      +"&option="+ option
      )
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }

  getSanctions(id_match){
    let res = []
    return new Promise(resolve=>{
      this.http.get("http://localhost/publish/api/qfareferees/getSanctions?"
      +"id_match="+ id_match)
      .subscribe(data=>{
        res = data as []
        resolve(res) 
      });
    }) 
  }
  

}
