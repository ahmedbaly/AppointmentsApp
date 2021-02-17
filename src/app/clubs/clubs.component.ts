import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ClubsDataSource, ClubsItem } from './clubs-datasource';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';

export interface ClubsRefItem {
  name: string;
  number: number;
}

export interface MatchsItem {
  referee: number;
  teamA : string;
  teamB : string;
  round : number;
  score : string;
  category : string;
}


@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements AfterViewInit, OnInit {
  
  @ViewChild(MatInput) input: MatInput;
  @ViewChild("submatInput") subinput: MatInput;
  @ViewChild("subsubmatInput") subsubinput: MatInput;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatTable) table: MatTable<ClubsItem>;
  @ViewChild('sub') sub: MatTable<ClubsRefItem>;
  @ViewChild('subsub') subsub: MatTable<MatchsItem>;

  dataSource: ClubsDataSource;
  subdataSource = new MatTableDataSource<ClubsRefItem>();
  subsubdataSource = new MatTableDataSource<MatchsItem>();

  toppings = new FormControl();
  toppingList = [] ;

  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  SecdisplayedColumns = ['name', 'number'];
  ThidisplayedColumns = ['category','round', 'referee','teamA', 'score', 'teamB' , 'motif'];

  subtable : boolean = false;
  subsubtable : boolean = false;
  Club : string = "";


  constructor(public http : HttpClient){
  }

  ngOnInit() {
    this.dataSource = new ClubsDataSource();   
  }

  ngAfterViewInit() {
    this.getclubs();
    this.getCompetitions();
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  subapplyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.subdataSource.filter = filterValue.trim().toLowerCase();
  }

  subsubapplyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.subsubdataSource.filter = filterValue.trim().toLowerCase();
  }


  onCompetitionSelection(){
    this.onselect(this.Club)
  }

  onselect(club){
    this.Club = club;
    this.subtable = true;
    this.subsubtable = false;
    this.subdataSource.data = [];
    if (this.toppings.value!= null && this.toppings.value.length >0) {
      for (let i = 0; i < this.toppings.value.length; i++) {
        this.getselection(this.toppings.value[i])
      }
    } else {
      this.subdataSource.data = [];
      this.getclubref(this.Club);
    }
  }

  onsubselect(subrow){
    this.subtable = false;
    this.subsubtable = true;
    this.subsubdataSource.data = []    
    this.getmatchs(subrow.name , this.toppings.value)
  }

  

  backsubtable(){
    this.subtable = true;
    this.subsubtable = false;
  }


  /// HTTPS

  getclubs(){
    this.http.get("http://localhost/publish/api/qfareferees/getclubs").subscribe(data=>{
     for (let i = 0; i < Object.keys(data).length; i++)  {
       this.dataSource.data.push(data[i]) 
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
       this.table.dataSource = this.dataSource;
     }
   });
  }

  getclubref(club){
    this.http.get("http://localhost/publish/api/qfareferees/getclubref?club="+ club)
    .subscribe(data=>{
      for (let j = 0; j < Object.keys(data).length; j++)  {
        this.subdataSource.data.push(data[j]);
        this.sub.dataSource = this.subdataSource;
        this.subdataSource.filter = this.subinput.value;
      }
    });
  }

  getmatchs(referee, topping){
    this.subsubdataSource.data = []

    if (this.toppings.value!= null && this.toppings.value.length >0) {
      for (let i = 0; i < topping.length; i++) {
        this.match(referee,topping[i])
      }
    }else{
      this.match(referee,[])
    }

  }
  match(referee,topping){
    this.http.get("http://localhost/publish/api/qfareferees/getmatchs?"+
    "club="+ this.Club + "&referee=" + referee + "&topping=" + topping)
      .subscribe(data=>{
        for (let j = 0; j < Object.keys(data).length; j++)  {
          this.subsubdataSource.data.push(data[j]);
          this.subsub.dataSource = this.subsubdataSource;
          console.log("susub",this.subsub.dataSource);
          
          this.subsubdataSource.filter = ""
        }
      });

  }

  getCompetitions(){
    this.http.get("http://localhost/publish/api/qfareferees/getCompetitions").subscribe(data=>{
     for (let i = 0; i < Object.keys(data).length; i++)  {
      this.toppingList.push((data[i].competition).toString()) ;
     }
   });
  }
  getselection(topping){
    this.http.get("http://localhost/publish/api/qfareferees/getclubcompetition?competition="
    + topping +"&club="+ this.Club)
    .subscribe(data=>{
      for (let j = 0; j < Object.keys(data).length; j++)  {
        if (data[j].number >0)
          this.subdataSource.data.push(data[j]);
          this.sub.dataSource = this.subdataSource;
        }
        this.subdataSource.filter = this.subinput.value;
        this.subsubdataSource.filter = this.subsubinput.value ;
    });
  }



}

let EXAMPLE_DATA: MatchsItem[] = [];


export class MatchDataSource extends MatTableDataSource<MatchsItem> {


  data: MatchsItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
    // this.getclubs();
    // console.log("ss",this.getclubs())
  }

  private getSortedData(data: MatchsItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }
  
    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'referee': return compare(a.referee, b.referee, isAsc);
        case 'category': return compare(+a.category, +b.category, isAsc);
        default: return 0;
      }
    });
  }
}


  /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
  function compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
