import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AssessorsItem, AssessorsDataSource } from './assessors-datasource';
import { DataproviderService } from '../dataprovider.service';

@Component({
  selector: 'app-assessors',
  templateUrl: './assessors.component.html',
  styleUrls: ['./assessors.component.css']
})

export class AssessorsComponent  implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AssessorsItem>;

  dataSource: AssessorsDataSource;
  
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'number'];


  constructor(public dataProvider: DataproviderService) { 
  }

  ngOnInit() {
    this.dataSource = new AssessorsDataSource();
  }

  ngAfterViewInit() {
    this.getAssessors();
  }

  getAssessors(){
    this.dataProvider.getAssessor().then(data=>{
      console.log('assessors', data)
      this.dataSource.data = data as []; 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
   }).catch( err => {
    console.log('err', err)
  });
 }

  applyFilter(event: Event) {
    let result =[];
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
}
