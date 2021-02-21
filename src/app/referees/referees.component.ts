import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HttpClient,  } from '@angular/common/http';
import { RefereesItem, RefereesDataSource } from './referees-datasource';
import { RefereesMatchItem, RefereesMatchDataSource } from './referees-matchs-datasource';
import { DataproviderService } from '../dataprovider.service';
import { LevelRefereeDialog } from './LevelReferee';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-referees',
  templateUrl: './referees.component.html',
  styleUrls: ['./referees.component.css']
})

export class RefereesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<RefereesItem>;
  @ViewChild('sub') subtable: MatTable<RefereesMatchItem>;


  dataSource: RefereesDataSource;

  subdataSource = new MatTableDataSource<RefereesMatchItem>();

  reflist = true;
  chart = true;

  levelList = [] ;
  natureList = [] ;

  levelSelected : any = [];
  natureSelected : any = [];

  topcomp = new FormControl();
  topseas = new FormControl();

  toppingList = [] ;
  Items : any =[];
  Seasons : any = [];
  seasonSelected : any = [];

  RefereeData : any = [] ;

  RefereeSelected : any = [];
  VariableData : any = [] ;
  displayedColumns = ['position', 'name', 'match' ,'weight', 'height' , 'available', 'details'];
  secdisplayedColumns = ['id', 'competition', 'round' ,'Datetime','teamA','teamB',
  'referee','fassistant','sassistant', 'faddassistant' , "saddassistant" ,'refereeobs' ];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Referee', '1st assistant', '2nd assistant' , '4th Referee', 'VAR' ,'AVAR' , 'Assessor'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  
  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public pieChartLegend = true;

  constructor(public http:HttpClient,
              public dataprovider : DataproviderService,
              public dialog : MatDialog) { 
  }
  
  ngOnInit() {
    this.dataSource = new RefereesDataSource();
    this.subdataSource = new RefereesMatchDataSource();
    this.getreferees();
    this.getLevels();
    this.getNatures();
    this.getseason();
  }

  ngAfterViewInit() {
  }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mousEvent(event){
    console.log('event',event)
    // this.reflist = !this.reflist;
    this.RefereeSelected =  event;
    if(!this.reflist){
      this.reflist = !this.reflist;
      this.chart= true;
      this.getreferees()
    }else {
      // this.subdataSource.data = [];
      this.getrefereesmatch(event.name);
      this.getrefcharbar(event.name);
      this.getrefcharpin(event.name);

    }
  }

  charttype(){
    this.chart= ! this.chart;
  }

  onToggleClicked(group){
    console.log("goup", group);
  }

  ///HTTP
  //Oninit
  getreferees(){
    this.dataprovider.getRefereesGeneral().then(res=>{
      this.dataSource.data= res as [] 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }
  //Oninit
  getNatures() {
    this.dataprovider.getRefereesNatures().then(data => {
      this.natureList = data as [];
    })
  }
  //Oninit
  getLevels() {
    this.dataprovider.getRefereesLevels().then(data => {
      this.levelList = data as [];
    })
  }

  RefereeLevel(item,type){
    console.log('level row', type)
    let dialogRef = this.dialog.open(LevelRefereeDialog, {
      width: '500px',
      data: {id : item.ID, name: item.name, type: type}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result',result);
      if (result){
        // this.setSuccessgame(result);
      }
    });
  }

  onEmptySelection (option){
    if (option ==='level'){
      this.levelSelected = [];
    } else if (option === 'nature'){
      this.natureSelected = [];
    }
    if(this.levelSelected.length === 0 && this.natureSelected.length === 0){
      this.getreferees()
    }else{
      this.getRefereesbyLevelNature(this.levelSelected,this.natureSelected)
    }
  }

  onSelectionLevel(level){
    this.levelSelected = level ; 
    this.getRefereesbyLevelNature(this.levelSelected,this.natureSelected)
  }

  onSelectionNature(nature){
    this.natureSelected = nature ;
    this.getRefereesbyLevelNature(this.levelSelected,this.natureSelected)
  }

  getRefereesbyLevelNature(level,nature){
    this.dataprovider.getRefereesbyLevelNature(level.id,nature.id).then(res=>{
      this.dataSource.data = res as []
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }
  //Oninit
  getseason(){
    this.dataprovider.getSeasons().then(res => {
      this.Seasons = res ;
      this.getCompetitions(this.Seasons[this.Seasons.length-1])
    });
  }
  //Oninit
  getCompetitions(season){
    this.seasonSelected = season;
    this.dataprovider.getSeasonCompetitions(season.id).then(data=>{
      this.toppingList = data as [];
    })
  }

  onSelectionSeason(season){
    this.getCompetitions(season)
    this.getHistorySeason(season)
  }

  onSelectionCompetition(){
    this.Items = []
    if (this.topcomp.value.length>0) {
      for (let i = 0; i < this.topcomp.value.length; i++) {
        this.getHistoryComp(this.topcomp.value[i])
      }

    } else {
      this.subdataSource.data = this.RefereeData;
      this.subtable.dataSource = this.subdataSource;
      this.subdataSource.filter = this.RefereeSelected.name
    }
  }

  getHistoryComp(competition){
    console.log('competition gethistorycom', competition)
    console.log('referees selected gethistorycom', this.RefereeSelected)

    this.dataprovider.getRefereeCompetitions(this.RefereeSelected,competition).then((data :any) =>{
      console.log('data',data)
      if (data.length === 0) {
        this.subdataSource.data = []
        this.subtable.dataSource = this.subdataSource;
      }else {
        data.forEach( d=> {
          this.Items.push(d)
          this.subdataSource.data = this.Items
          this.subtable.dataSource = this.subdataSource;
        });  
      }
    })
  }

  getHistorySeason(season){
    this.subdataSource.filter = ''
    this.dataprovider.getHistorySeason(season.id).then(res=>{
      this.RefereeData = res ;
      this.subdataSource.data = res as [];
      this.subdataSource.sort = this.sort;
      this.subdataSource.paginator = this.paginator;
      this.subtable.dataSource = this.subdataSource;
      this.subdataSource.filter = this.RefereeSelected.name
    })
  }


  getrefcharbar(name){
    this.http.get("http://localhost/publish/api/qfareferees/refchartbar?name="+name).subscribe(data=>{
      this.getrefereesmatch(name) ;
        this.barChartData = [
          {data: [data[0].Referee,
                  data[0].fassistant,
                  data[0].sassistant,
                  data[0].fthreferee,
                  data[0].vara,
                  data[0].avar,
                  data[0].Assessor,
                ], label: 'Matchs'},
        ];  
      });
    }

  getrefcharpin(name){
    this.http.get("http://localhost/publish/api/qfareferees/refchartpin?name="+name).subscribe(data=>{
      this.pieChartLabels = [];
      this.pieChartData = [];
        for (let i = 0; i < Object.keys(data).length; i++)  {
          this.pieChartLabels.push(data[i].competition)
          this.pieChartData.push(data[i].number)
        }
        this.reflist = !this.reflist;

    });
    }

  getrefereesmatch(referee){
    this.http.get("http://localhost/publish/api/qfareferees/getmatchs?"+
    "club=&referee=" + referee + "&topping=")
      .subscribe(data=>{
        this.subdataSource.data = [];
        this.VariableData = data ;
        for (let j = 0; j < Object.keys(data).length; j++)  {
          this.subdataSource.data.push(data[j]);
          this.subtable.dataSource = this.subdataSource;
          this.subdataSource.filter = ''
        }
      });
  }

  setavailability(row,toggle){
    this.dataprovider.setavailability(row,toggle.checked).then(data =>{
      console.log('resul set ava', data);
      row.available = !row.available;
    })
  }

  }

