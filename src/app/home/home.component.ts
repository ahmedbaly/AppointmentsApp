import { AfterViewInit, Component, OnInit, ViewChild , Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { HomeDataSource, HomeItem } from './home-datasource';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataproviderService } from '../dataprovider.service';
import { SuccessGameDialog } from './success/dialogsuccessgame';
import { GameformComponent } from '../gameform/gameform.component';
import { SanctionDialog } from './sanction/sanction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<HomeItem>;

  dataSource: HomeDataSource;
  topcomp = new FormControl();
  topseas = new FormControl();
  toppingList = [] ;

  Seasons : any = [];
  Items : any ;
  seasonSelected : any = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'competition', 'round' ,'Datetime','teamA','teamB',
  'referee','fassistant','sassistant', 'fourth','faddassistant' , 'saddassistant' ,'refereeobs','obsReferee' , 'details'];

  constructor(
    public http : HttpClient, 
    public dataProvider : DataproviderService,
    public dialog : MatDialog ){
  }

  ngOnInit() {
    this.dataSource = new HomeDataSource();
  }

  ngAfterViewInit() {
    this.getHome();
    this.getseason();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase() 
  }

  mousEvent(event){
    this.openDialog(event)
  }
  openDialog( information): void {
    this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {name: information.Refereeobserver, motif: information.ObsReferee}
    });
  }

  reussiteref(item){
    let dialogRef = this.dialog.open(SuccessGameDialog, {
      width: '600px',
      data: {game : item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result',result);
      if (result){
        // this.setSuccessgame(result);
      }
    });
  }

  Gameform(item){
    console.log('item',item)
    let dialogRef = this.dialog.open(GameformComponent, {
      width: '100%',
      height : '100%',
      hasBackdrop : true,

      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result',result);
      if (result){
        // this.setSuccessgame(result);
      }
    });
  }

  SanctionForm(item){
    let dialogRef = this.dialog.open(SanctionDialog, {
      width: '800px',
      height : '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result',result);
      if (result){
        // this.setSuccessgame(result);
      }
    });
  }


  //HTTP Services
  getHome(){
    this.dataSource.data = [];
    this.dataProvider.getHome().then(data=>{
      this.dataSource.data = data as [];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  getseason(){
    this.dataProvider.getSeasons().then(res => {
      this.Seasons = res ;
      this.toppingList = [];
      this.dataSource.data = [];
      this.Items = []
      // this.getHistorySeason(this.Seasons[this.Seasons.length-1])
    });
  }

  onSelectionSeason(season){
    this.getCompetitions(season)
    this.getHistorySeason(season)
  }

  getCompetitions(season){
    this.seasonSelected = season;
    this.dataProvider.getSeasonCompetitions(season.id).then(data=>{
      this.toppingList = data as [];
    })
  }


  onSelectionCompetition(){
    this.dataSource.data = [];
    this.Items = []
    if (this.topcomp.value.length>0) {
      for (let i = 0; i < this.topcomp.value.length; i++) {
        this.getHistoryComp(this.topcomp.value[i])
      }

    } else {
      this.getHistorySeason(this.seasonSelected)
    }
  }

  getHistoryComp(topping){
    this.dataProvider.getselection(topping).then((data :any) =>{
      data.forEach( d=> {
        this.Items.push(d)
        this.dataSource.data = this.Items
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });  
    })
  }

  getHistorySeason(season){
    this.dataProvider.getHistorySeason(season.id).then(res=>{
      this.dataSource.data = res as [];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }


// ng generate @angular/material:material-table --name=home
  
}

export interface DialogData {
  motif: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './success/dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


