import {Component , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataproviderService } from 'src/app/dataprovider.service';

export interface Referee {
  id: number,
  id_referee : number,
  name : string ,
  date : number ,
  id_session : number,
  session : string,
  training : string,
  color : string,
  designation : number,
  description : string,
  types : any,
  colors : any,
  firstDay : number,
  lastDay : number
}

@Component({
  selector: 'training',
  templateUrl: 'training.html',
  styleUrls : ['training.css']
})
export class TrainingDialog{
  description : string = "";
  date : string ;
  colorList = []
  sessionSelected : any = [];
  colorSelected : any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : Referee,
    private dialogRef: MatDialogRef<Referee>,
    private serviceProvider : DataproviderService){
      if (this.data.description) {
        this.description = this.data.description;
      }
      this.sessionSelected.training = this.data.training;
      this.sessionSelected.color = this.data.color

      let d = new Date();
      d.setTime(data.date)
      this.date = d.getDate() + '-' + d.getMonth()+1 + '-' + d.getFullYear();
  }


  sessionchanges(item){
    if (!item.training) {
      item.training = ""
    }
    this.sessionSelected.training= item.training
  }

  colorschanges(item){
    if (!item.color) {
      item.color = 'ffffff'
    }
    this.colorSelected.color = item.color
  }

  ifundefined(Value) {
    if (!Value) {
      Value = ""
    }
    return Value;
  }

  saveSession(){
    this.data.training = this.ifundefined(this.sessionSelected.training)
    this.data.color = this.ifundefined(this.colorSelected.color)
    this.data.description = this.ifundefined(this.description)

    let f = new Date (this.data.firstDay)
    let l = new Date (this.data.lastDay)

    
    if (this.data.id_session) {
      this.serviceProvider.setTrainingSessions(this.data.id_session,this.data.training,
        this.data.color,this.data.id_referee,
        this.data.name,this.data.date/1000,0,this.description,'update',
        f.getTime() / 1000 , l.getTime() / 1000 ).then(res=>{
          this.dialogRef.close(res)
      })
    } else {
      this.serviceProvider.setTrainingSessions(0,this.data.training,this.data.color,
      this.data.id_referee, this.data.name,this.data.date/1000,0,this.description,'insert',
      f.getTime() / 1000 , l.getTime() / 1000 ).then(res=>{
        this.dialogRef.close(res)
      })   
    }
  }

  

}
