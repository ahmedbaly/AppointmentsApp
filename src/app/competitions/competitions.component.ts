import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CompetitionsDataSource, CompetitionsItem } from './competitions-datasource';
import { HttpClient } from '@angular/common/http';
import { DataproviderService } from '../dataprovider.service';
import { SeasonDialog } from './season/seasondialog';
import { MatDialog } from '@angular/material/dialog';
import { CompetitionDialog } from './competition/competitionselection';
import { ClubDialog } from './club/clubselection';
import { StandingDialog } from './standing/standingdialog';
import { CompLevelSettingDialog } from './competitionlevel/competitionlevel';


export interface SeasonItem {
  id_season: number;
  season : string;
}


@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CompetitionsItem>;
  dataSource: CompetitionsDataSource;

  @ViewChild('sub') subtable: MatTable<SeasonItem>;
  subdataSource = new MatTableDataSource<SeasonItem>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','toClubs'];
  subdisplayedColumns = [ 'season'];

  Seasons : any ;
  Competitions : any ;
  SeasonSelected : any = [];
  CompetitionSelected : any = [];
  Clubs : any = [];

  constructor(
      public http : HttpClient,
      private dialog : MatDialog,
      private changeDetectorRef : ChangeDetectorRef,
      public ProviderService : DataproviderService){
  }

  ngOnInit() {
    this.dataSource = new CompetitionsDataSource();
  }

  ngAfterViewInit() {
    this.getSeasons();
  }

  Seasoncompetition(type,name,action){
    let dialogRef ;
    if(type==='competition'){
        dialogRef = this.dialog.open(CompetitionDialog, {
        width: '500px',
        data: {id_season : this.SeasonSelected.id , season : this.SeasonSelected.season, competitionsSeason : this.dataSource.data}

      });
    }else if(type==='season'){
       dialogRef = this.dialog.open(SeasonDialog, {
        width: '350px',
        data: {dialogtype : type , name : name, action : action}
      });
    }
    else if(type==='club'){
      dialogRef = this.dialog.open(ClubDialog, {
        width: '350px',
        data: {id_season : this.SeasonSelected.id , competition : this.CompetitionSelected, ClubSelected : this.Clubs}
      });
    }


    dialogRef.afterClosed().subscribe(result => {
      if(type === 'club'){
        this.getClubs(this.CompetitionSelected)
      } else 
      this.getSeasons();
    });
  }
   
  getSeasons(){
    this.ProviderService.getSeasons().then((res : SeasonItem[]) => {
      this.Seasons = res ;
      this.changeDetectorRef.detectChanges();
      this.getcompetitions(this.Seasons[this.Seasons.length-1])
    }).catch( err => {
      console.log('err', err)
    });
  }

  getcompetitions(season){
    this.SeasonSelected = season;
    this.CompetitionSelected = [];
    this.Clubs = [];
    this.ProviderService.getSeasonCompetitions(season.id).then((res : CompetitionsItem [] )=>{
      this.Competitions = res 
      this.dataSource.data = res ;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.getClubs(res[0])
   }).catch( err => {
    console.log('err', err)
  });
  }

  getClubs(row){
    this.ProviderService.getClubsCompetitions(row.id_competition).then(res=>{
      this.CompetitionSelected = row;
      this.Clubs = res;
    }).catch( err => {
      console.log('err', err)
    })
  }

  updateClubStanding(club){

    let dialogRef = this.dialog.open(StandingDialog, {
      width: '230px',
      data: { id : club.id , 
              id_club : club.id_club, 
              id_competition : club.id_competition,
              score : club.score,
              round : club.round,
              club : club.name,
              type : this.CompetitionSelected.typeComp 
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClubs(this.CompetitionSelected)
    });
  }

  getComeptitionRefLevels(){
    let dialogRef = this.dialog.open(CompLevelSettingDialog, {
      width: '500px',
      data: { Competitions : this.Competitions }
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.getClubs(this.CompetitionSelected)
    });

  }




}


let SEASON : SeasonItem[] = [];

export class SeasonDataSource extends MatTableDataSource<SeasonItem> {

  data: SeasonItem[] = SEASON;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  private getSortedData(data: SeasonItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
  
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'id': return compare(a.id_season, b.id_season, isAsc);
        case 'season': return compare(+a.season, +b.season, isAsc);
        default: return 0;
      }
    });
  }
}

  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  function compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
