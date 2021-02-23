import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataproviderService } from '../dataprovider.service';
// import { LevelRefereeDialog } from './LevelReferee/levelreferee';

import { RefereesComponent } from './referees.component';

describe('RefereesComponent', () => {
  let component: RefereesComponent;
  let fixture: ComponentFixture<RefereesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      
      declarations: [ RefereesComponent],
      providers : [    
        {provide: APP_BASE_HREF, useValue: '/'},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef , useValue: {} },
        // { provide: MatDialog, useClass: LevelRefereeDialog }, //look this
        DataproviderService],
      imports: [
        RouterModule.forRoot([]),
        MatDialogModule,
        HttpClientModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
